import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const form = await req.formData();
  const status = String(form.get("status") || "");
  if (!status) return NextResponse.redirect(new URL("/admin/orders", req.url));

  await prisma.order.update({ where: { id }, data: { status } });
  return NextResponse.redirect(new URL("/admin/orders", req.url));
}
