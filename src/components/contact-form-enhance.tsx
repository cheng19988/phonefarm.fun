"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { CONTACT } from "@/lib/config";

type Props = {
  children: ReactNode;
  sent?: boolean;
};

export function ContactFormEnhance({ children, sent = false }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(sent ? "success" : "idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const privacy = formEl.querySelector<HTMLInputElement>('input[name="privacyConsent"]');
    if (!privacy?.checked) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const form = new FormData(formEl);

    const extras = [
      form.get("platform") && `Platform / use case: ${form.get("platform")}`,
      form.get("connectionMode") && `Connection mode: ${form.get("connectionMode")}`,
      form.get("quantity") && `Units / chassis quantity: ${form.get("quantity")}`,
      form.get("phone") && `Phone: ${form.get("phone")}`,
      form.get("preShipmentPhotos") === "on" && "Request pre-shipment photos/video before dispatch",
    ]
      .filter(Boolean)
      .join("\n");

    const message = [form.get("message"), extras].filter(Boolean).join("\n\n");
    form.set("message", message);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: form,
    });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) formEl.reset();
  }

  return (
    <form
      action="/api/contact"
      method="POST"
      onSubmit={handleSubmit}
      className="card product-card-heavy p-6 md:p-8 space-y-8"
    >
      {children}
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-3.5 text-base min-h-[48px]">
        {status === "loading" ? "Sending to sales team…" : "Send Factory Quote Request"}
      </button>
      {status === "success" && (
        <p className="text-green-800 text-sm bg-green-50 border border-green-200 rounded-lg p-4">
          Request received. Check your inbox — we respond within 24 hours on business days (Guangzhou, UTC+8) with a written quote.
        </p>
      )}
      {status === "error" && (
        <div className="text-red-800 text-sm bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
          <p>Could not send the form. Confirm required fields and privacy consent, or contact us directly:</p>
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
