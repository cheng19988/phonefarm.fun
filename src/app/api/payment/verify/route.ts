import { NextRequest, NextResponse } from "next/server";
import { checkAndUpdatePayment, isAutoPaymentVerificationEnabled } from "@/lib/payment";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const paymentId = req.nextUrl.searchParams.get("paymentId");
  if (!paymentId) {
    return NextResponse.json({ error: "paymentId required" }, { status: 400 });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: { select: { userId: true } } },
  });
  if (!existing) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }
  if (existing.order.userId !== session.id && session.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = await checkAndUpdatePayment(paymentId);
  if (!result) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  return NextResponse.json({
    status: result.status,
    reason: "reason" in result ? result.reason : undefined,
    manualConfirmation: "manualConfirmation" in result ? result.manualConfirmation : undefined,
    autoVerifyEnabled: isAutoPaymentVerificationEnabled(),
    payment: payment
      ? {
          paymentStatus: payment.paymentStatus,
          verificationStatus: payment.verificationStatus,
          expectedAmount: payment.expectedAmount,
          receivedAmount: payment.receivedAmount,
          txHash: payment.txHash,
          expiresAt: payment.expiresAt,
          paidAt: payment.paidAt,
        }
      : null,
  });
}
