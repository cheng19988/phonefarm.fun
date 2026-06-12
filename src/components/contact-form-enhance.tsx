"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CONTACT } from "@/lib/config";

type Props = {
  children: ReactNode;
};

export function ContactFormEnhance({ children }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);

    const extras = [
      form.get("deviceModel") && `Device model preference: ${form.get("deviceModel")}`,
      form.get("remoteControl") && `Remote control: ${form.get("remoteControl")}`,
      form.get("quantity") && `Quantity: ${form.get("quantity")}`,
      form.get("whatsapp") && `WhatsApp/Telegram: ${form.get("whatsapp")}`,
      form.get("phone") && `Phone: ${form.get("phone")}`,
      form.get("budget") && `Budget: ${form.get("budget")}`,
      form.get("preShipmentPhotos") === "on" && "Request pre-shipment photos/video before dispatch",
    ]
      .filter(Boolean)
      .join("\n");

    const message = [form.get("message"), extras].filter(Boolean).join("\n\n");
    form.set("message", message);

    const res = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form onSubmit={handleSubmit} className="card product-card-heavy p-6 md:p-8 space-y-8">
      {children}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-3.5 text-base min-h-[48px]">
        {status === "loading" ? "Sending to sales team…" : "Send Quote Request"}
      </button>
      {status === "success" && (
        <p className="text-green-800 text-sm bg-green-50 border border-green-200 rounded-lg p-4">
          Request received. Check your inbox — we respond within 24 hours on business days (Guangzhou, UTC+8).
        </p>
      )}
      {status === "error" && (
        <div className="text-red-800 text-sm bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
          <p>Could not send the form. Contact us directly:</p>
          <ul className="space-y-1 font-medium">
            <li>
              <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:underline">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:underline">
                WhatsApp {CONTACT.whatsapp}
              </a>
            </li>
            <li>
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:underline">
                Telegram {CONTACT.telegram}
              </a>
            </li>
          </ul>
        </div>
      )}
    </form>
  );
}
