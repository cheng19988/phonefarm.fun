import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = {
    name: String(form.get("name") || ""),
    country: String(form.get("country") || ""),
    whatsapp: String(form.get("whatsapp") || ""),
    phone: String(form.get("phone") || ""),
    email: String(form.get("email") || ""),
    deviceQuantity: String(form.get("deviceQuantity") || ""),
    productInterest: String(form.get("productInterest") || ""),
    budget: String(form.get("budget") || ""),
    message: String(form.get("message") || ""),
  };
  if (!data.name || !data.email) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }
  await prisma.contactSubmission.create({ data });
  return NextResponse.json({ ok: true });
}
