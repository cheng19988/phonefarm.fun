import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkAndUpdatePayment } from "@/lib/payment";

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pending = await prisma.payment.findMany({
    where: { paymentStatus: "pending", expiresAt: { gt: new Date() } },
    take: 50,
  });

  let paid = 0;
  let expired = 0;
  for (const p of pending) {
    const result = await checkAndUpdatePayment(p.id);
    if (result?.status === "paid") paid++;
    if (result?.status === "expired") expired++;
  }

  return NextResponse.json({ checked: pending.length, paid, expired });
}
