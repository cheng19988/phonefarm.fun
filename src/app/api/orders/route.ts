import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { PAYMENT } from "@/lib/config";
import { createPaymentExpiry, usdToUsdt } from "@/lib/payment";

function orderNumber() {
  return `PF${Date.now().toString(36).toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", req.headers.get("referer") || "/products");
    return NextResponse.redirect(loginUrl);
  }

  const form = await req.formData();
  const productSlug = String(form.get("productSlug") || "");
  const action = String(form.get("action") || "buy");

  const product = await prisma.product.findUnique({ where: { slug: productSlug } });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const order = await prisma.order.create({
    data: {
      orderNumber: orderNumber(),
      userId: session.id,
      status: action === "buy" ? "Waiting for Payment" : "Pending",
      totalUsd: product.priceUsd,
      items: {
        create: [{ productId: product.id, quantity: 1, unitPrice: product.priceUsd }],
      },
    },
  });

  if (action === "buy") {
    const amount = usdToUsdt(product.priceUsd);
    await prisma.payment.create({
      data: {
        orderId: order.id,
        userId: session.id,
        productId: product.id,
        expectedAmount: amount,
        paymentAddress: PAYMENT.address,
        paymentNetwork: PAYMENT.network,
        paymentCurrency: PAYMENT.currency,
        paymentStatus: "pending",
        verificationStatus: "unverified",
        expiresAt: createPaymentExpiry(),
      },
    });
    return NextResponse.redirect(new URL(`/orders/${order.id}`, req.url));
  }

  return NextResponse.redirect(new URL(`/orders/${order.id}`, req.url));
}
