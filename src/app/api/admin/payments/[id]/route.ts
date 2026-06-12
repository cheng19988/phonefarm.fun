import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { PAYMENT_STATUS } from "@/lib/payment-status";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const form = await req.formData();
  const action = String(form.get("action") || "");
  const notes = String(form.get("notes") || "").trim();

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { order: true },
  });
  if (!payment) return NextResponse.redirect(new URL("/admin/payments", req.url));

  const now = new Date();

  if (action === "mark_paid") {
    await prisma.payment.update({
      where: { id },
      data: {
        paymentStatus: PAYMENT_STATUS.paid,
        verificationStatus: "manual_confirmed",
        paidAt: now,
        failureReason: notes || null,
      },
    });
    await prisma.order.update({ where: { id: payment.orderId }, data: { status: "Paid" } });
  } else if (action === "manual_review") {
    await prisma.payment.update({
      where: { id },
      data: {
        paymentStatus: PAYMENT_STATUS.manual_review,
        verificationStatus: "awaiting_manual",
        failureReason: notes || null,
      },
    });
    await prisma.order.update({ where: { id: payment.orderId }, data: { status: "Manual Review" } });
  } else if (action === "reset_pending") {
    await prisma.payment.update({
      where: { id },
      data: {
        paymentStatus: PAYMENT_STATUS.pending,
        verificationStatus: "unverified",
        failureReason: null,
        txHash: null,
        receivedAmount: null,
        paidAt: null,
      },
    });
    await prisma.order.update({ where: { id: payment.orderId }, data: { status: "Waiting for Payment" } });
  } else if (action === "mark_expired") {
    await prisma.payment.update({
      where: { id },
      data: {
        paymentStatus: PAYMENT_STATUS.expired,
        verificationStatus: "expired",
        failureReason: notes || "Manually expired by admin",
      },
    });
    await prisma.order.update({ where: { id: payment.orderId }, data: { status: "Expired" } });
  }

  return NextResponse.redirect(new URL("/admin/payments", req.url));
}
