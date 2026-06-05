import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await req.formData();
  const trc20Address = String(form.get("trc20Address") || "");
  const usdtContract = String(form.get("usdtContract") || "");
  const minAmount = Number(form.get("minAmount"));
  const expiryMinutes = Number(form.get("expiryMinutes"));

  await prisma.paymentSettings.upsert({
    where: { id: "default" },
    update: { trc20Address, usdtContract, minAmount, expiryMinutes },
    create: { id: "default", trc20Address, usdtContract, minAmount, expiryMinutes },
  });

  return NextResponse.redirect(new URL("/admin/payments", req.url));
}
