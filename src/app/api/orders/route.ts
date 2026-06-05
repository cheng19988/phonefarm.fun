import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { createPaymentExpiry, usdToUsdt } from "@/lib/payment";
import { getPaymentSettings } from "@/lib/payment-settings";
import { getService } from "@/data/services";

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
  const serviceSlug = String(form.get("serviceSlug") || "");
  const action = String(form.get("action") || "buy");
  const settings = await getPaymentSettings();

  if (serviceSlug) {
    const service = getService(serviceSlug);
    if (!service || service.priceUsd <= 0) {
      return NextResponse.redirect(new URL(`/contact?service=${serviceSlug}`, req.url));
    }
    const order = await prisma.order.create({
      data: {
        orderNumber: orderNumber(),
        userId: session.id,
        status: action === "buy" ? "Waiting for Payment" : "Pending",
        totalUsd: service.priceUsd,
        items: {
          create: [{
            itemType: "service",
            itemSlug: service.slug,
            itemName: service.title,
            quantity: 1,
            unitPrice: service.priceUsd,
          }],
        },
      },
    });
    if (action === "buy") {
      await prisma.payment.create({
        data: {
          orderId: order.id,
          userId: session.id,
          expectedAmount: usdToUsdt(service.priceUsd, settings.minAmount),
          paymentAddress: settings.trc20Address,
          paymentNetwork: "Tron TRC20",
          paymentCurrency: "USDT",
          paymentStatus: "pending",
          verificationStatus: "unverified",
          expiresAt: createPaymentExpiry(settings.expiryMinutes),
        },
      });
    }
    return NextResponse.redirect(new URL(`/orders/${order.id}`, req.url));
  }

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
        create: [{
          productId: product.id,
          itemType: "product",
          itemSlug: product.slug,
          itemName: product.name,
          quantity: 1,
          unitPrice: product.priceUsd,
        }],
      },
    },
  });

  if (action === "buy") {
    await prisma.payment.create({
      data: {
        orderId: order.id,
        userId: session.id,
        productId: product.id,
        expectedAmount: usdToUsdt(product.priceUsd, settings.minAmount),
        paymentAddress: settings.trc20Address,
        paymentNetwork: "Tron TRC20",
        paymentCurrency: "USDT",
        paymentStatus: "pending",
        verificationStatus: "unverified",
        expiresAt: createPaymentExpiry(settings.expiryMinutes),
      },
    });
    return NextResponse.redirect(new URL(`/orders/${order.id}`, req.url));
  }

  return NextResponse.redirect(new URL(`/orders/${order.id}`, req.url));
}
