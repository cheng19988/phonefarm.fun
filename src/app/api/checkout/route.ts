import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getCart, setCart } from "@/lib/cart";
import { resolveCartItems } from "@/lib/cart-resolve";
import { prisma } from "@/lib/prisma";
import { createPaymentExpiry, usdToUsdt } from "@/lib/payment";
import { getPaymentSettings } from "@/lib/payment-settings";

function orderNumber() {
  return `PF${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", "/checkout");
    return NextResponse.redirect(loginUrl);
  }

  const items = await getCart();
  const lines = await resolveCartItems(items);
  const purchasable = lines.filter((l) => l.purchasable);

  if (purchasable.length === 0) {
    return NextResponse.redirect(new URL("/cart", req.url));
  }

  const totalUsd = purchasable.reduce((s, l) => s + l.priceUsd * l.quantity, 0);
  const settings = await getPaymentSettings();

  const order = await prisma.order.create({
    data: {
      orderNumber: orderNumber(),
      userId: session.id,
      status: "Waiting for Payment",
      totalUsd,
      items: {
        create: await Promise.all(
          purchasable.map(async (line) => {
            let productId: string | null = null;
            if (line.type === "product") {
              const p = await prisma.product.findUnique({ where: { slug: line.slug } });
              productId = p?.id ?? null;
            }
            return {
              productId,
              itemType: line.type,
              itemSlug: line.slug,
              itemName: line.name,
              quantity: line.quantity,
              unitPrice: line.priceUsd,
            };
          })
        ),
      },
    },
  });

  const amount = usdToUsdt(totalUsd, settings.minAmount);
  await prisma.payment.create({
    data: {
      orderId: order.id,
      userId: session.id,
      expectedAmount: amount,
      paymentAddress: settings.trc20Address,
      paymentNetwork: "Tron TRC20",
      paymentCurrency: "USDT",
      paymentStatus: "pending",
      verificationStatus: "unverified",
      expiresAt: createPaymentExpiry(settings.expiryMinutes),
    },
  });

  await setCart(
    items.filter(
      (item) =>
        !purchasable.some((line) => line.type === item.type && line.slug === item.slug),
    ),
  );
  return NextResponse.redirect(new URL(`/orders/${order.id}`, req.url));
}
