import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getPaymentSettings } from "@/lib/payment-settings";
import { formatUsdtAmount, isAutoPaymentVerificationEnabled, usdToUsdt, usdtMatchesOrderTotal } from "@/lib/payment";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: { select: { name: true, slug: true } } } },
      payment: true,
    },
  });

  if (!order || (order.userId !== session.id && session.role !== "admin")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const settings = await getPaymentSettings();
  const expectedUsdt = order.payment?.expectedAmount ?? usdToUsdt(order.totalUsd, settings.minAmount);
  const amountsAligned = usdtMatchesOrderTotal(order.totalUsd, expectedUsdt, settings.minAmount);

  return NextResponse.json({
    ...order,
    items: order.items.map((item) => ({
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      itemType: item.itemType,
      product: item.product ?? { name: item.itemName, slug: item.itemSlug },
    })),
    paymentMeta: {
      autoVerifyEnabled: isAutoPaymentVerificationEnabled(),
      expectedUsdt: formatUsdtAmount(expectedUsdt),
      totalUsd: formatUsdtAmount(order.totalUsd),
      amountsAligned,
      minUsdt: settings.minAmount,
    },
  });
}
