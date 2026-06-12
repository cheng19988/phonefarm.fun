import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formatContactSubmission, notifyTelegram } from "@/lib/notify";

function parseContactForm(form: FormData) {
  return {
    name: String(form.get("name") || "").trim(),
    email: String(form.get("email") || "").trim(),
    whatsapp: String(form.get("whatsapp") || "").trim(),
    phone: String(form.get("phone") || "").trim(),
    country: String(form.get("country") || "").trim(),
    productInterest: String(form.get("productInterest") || "").trim(),
    deviceQuantity: String(form.get("deviceQuantity") || "").trim(),
    quantity: String(form.get("quantity") || "").trim(),
    platform: String(form.get("platform") || "").trim(),
    connectionMode: String(form.get("connectionMode") || "").trim(),
    budget: String(form.get("budget") || "").trim(),
    message: String(form.get("message") || "").trim(),
    privacyConsent: form.get("privacyConsent") === "yes",
  };
}

function validateContact(data: ReturnType<typeof parseContactForm>) {
  const missing: string[] = [];
  if (!data.name) missing.push("name");
  if (!data.email) missing.push("email");
  if (!data.whatsapp) missing.push("whatsapp");
  if (!data.country) missing.push("country");
  if (!data.productInterest) missing.push("productInterest");
  if (!data.deviceQuantity) missing.push("deviceQuantity");
  if (!data.quantity) missing.push("quantity");
  if (!data.platform) missing.push("platform");
  if (!data.connectionMode) missing.push("connectionMode");
  if (!data.message) missing.push("message");
  if (!data.privacyConsent) missing.push("privacyConsent");
  return missing;
}

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = parseContactForm(form);
  const missing = validateContact(data);

  const wantsJson =
    req.headers.get("accept")?.includes("application/json") ||
    req.headers.get("x-requested-with") === "XMLHttpRequest";

  if (missing.length > 0) {
    if (wantsJson) {
      return NextResponse.json({ error: "Missing required fields", fields: missing }, { status: 400 });
    }
    return NextResponse.redirect(new URL("/contact?error=missing", req.url));
  }

  await prisma.contactSubmission.create({
    data: {
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      phone: data.phone,
      country: data.country,
      productInterest: data.productInterest,
      deviceQuantity: data.deviceQuantity,
      budget: data.budget,
      message: [
        data.message,
        data.quantity && `Units / chassis: ${data.quantity}`,
        data.platform && `Platform: ${data.platform}`,
        data.connectionMode && `Connection mode: ${data.connectionMode}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
    },
  });

  void notifyTelegram(
    formatContactSubmission({
      ...data,
      quantity: data.quantity,
      platform: data.platform,
      connectionMode: data.connectionMode,
    }),
  );

  if (wantsJson) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/contact?sent=1", req.url));
}
