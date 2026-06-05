import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const form = await req.formData();
  const role = String(form.get("role") || "user");
  await prisma.user.update({ where: { id }, data: { role } });
  return NextResponse.redirect(new URL("/admin/users", req.url));
}
