import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { checkAndUpdatePayment } from "@/lib/payment";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const paymentId = String(body.paymentId || "");
  const txHash = String(body.txHash || "").trim();
  if (!paymentId || !txHash) {
    return NextResponse.json({ error: "paymentId and txHash required" }, { status: 400 });
  }

  const payment = await prisma.payment.findUnique({ where: { id: paymentId }, include: { order: true } });
  if (!payment || payment.order.userId !== session.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.payment.update({
    where: { id: paymentId },
    data: { submittedTxHash: txHash },
  });

  const result = await checkAndUpdatePayment(paymentId);
  return NextResponse.json(result);
}
