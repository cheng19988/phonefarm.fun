import { NextRequest, NextResponse } from "next/server";
import { checkAndUpdatePayment } from "@/lib/payment";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const paymentId = req.nextUrl.searchParams.get("paymentId");
  if (!paymentId) {
    return NextResponse.json({ error: "paymentId required" }, { status: 400 });
  }

  const result = await checkAndUpdatePayment(paymentId);
  if (!result) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  return NextResponse.json({
    status: result.status,
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
