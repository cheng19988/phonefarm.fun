"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/config";
import { FormInput, FormLabel, FormSelect, FormTextarea } from "@/components/store";

export function ContactForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showOptional, setShowOptional] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    ].filter(Boolean).join("\n");

    const message = [form.get("message"), extras].filter(Boolean).join("\n\n");
    form.set("message", message);

    const res = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-600 leading-relaxed">
        <strong className="text-zinc-900">B2B hardware quote.</strong> Tell us node count, target devices, and shipping country.
        Our Guangzhou sales team replies within one business day with price, lead time, and configuration options.
      </div>

      <form onSubmit={handleSubmit} className="card product-card-heavy p-6 md:p-8 space-y-8">
        <fieldset className="space-y-5 border-0 p-0 m-0">
          <legend className="font-display font-bold text-lg text-zinc-900 mb-1">Your contact</legend>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <FormLabel required>Full name</FormLabel>
              <FormInput name="name" required autoComplete="name" placeholder="Company contact name" />
            </div>
            <div>
              <FormLabel required>Work email</FormLabel>
              <FormInput name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
            </div>
            <div className="sm:col-span-2">
              <FormLabel required>Shipping country</FormLabel>
              <FormInput name="country" required placeholder="e.g. United States, Germany, UAE" />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-0 p-0 m-0 pt-6 border-t border-zinc-200">
          <legend className="font-display font-bold text-lg text-zinc-900 mb-1">Hardware requirements</legend>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <FormLabel required>Product / SKU interest</FormLabel>
              <FormInput name="productInterest" defaultValue={defaultProduct} required placeholder="e.g. S8+ 20-node box" />
            </div>
            <div>
              <FormLabel required>Node count</FormLabel>
              <FormInput name="deviceQuantity" required placeholder="e.g. 20, 40, custom rack" />
            </div>
            <div className="sm:col-span-2">
              <FormLabel required>Project details</FormLabel>
              <FormTextarea
                name="message"
                rows={5}
                required
                placeholder="Device models, Android version, automation workflow, timeline, remote setup needs..."
              />
            </div>
          </div>
        </fieldset>

        <div>
          <button
            type="button"
            onClick={() => setShowOptional((v) => !v)}
            className="text-sm font-medium text-zinc-600 hover:text-[var(--accent)]"
          >
            {showOptional ? "− Hide optional fields" : "+ Add optional details (WhatsApp, budget, pre-shipment photos…)"}
          </button>
          {showOptional && (
            <div className="grid sm:grid-cols-2 gap-5 mt-5 pt-5 border-t border-zinc-100">
              <div>
                <FormLabel>WhatsApp / Telegram</FormLabel>
                <FormInput name="whatsapp" placeholder="@username or +country code" />
              </div>
              <div>
                <FormLabel>Phone</FormLabel>
                <FormInput name="phone" autoComplete="tel" />
              </div>
              <div>
                <FormLabel>Quantity (units)</FormLabel>
                <FormInput name="quantity" placeholder="e.g. 1 sample, 5 bulk" />
              </div>
              <div>
                <FormLabel>Budget (USD range)</FormLabel>
                <FormInput name="budget" placeholder="e.g. $500–$1,000" />
              </div>
              <div>
                <FormLabel>Device model preference</FormLabel>
                <FormInput name="deviceModel" placeholder="Samsung S8+, motherboard cluster…" />
              </div>
              <div>
                <FormLabel>Remote control requirement</FormLabel>
                <FormSelect name="remoteControl" defaultValue="">
                  <option value="">Select…</option>
                  <option value="ADB only">ADB only — local management</option>
                  <option value="Remote workstation setup">Remote workstation setup</option>
                  <option value="Full lab management">Full lab management setup</option>
                  <option value="Not sure">Not sure — need recommendation</option>
                </FormSelect>
              </div>
              <div className="sm:col-span-2 flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="preShipmentPhotos"
                  name="preShipmentPhotos"
                  className="mt-1 h-4 w-4 rounded border-zinc-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                />
                <label htmlFor="preShipmentPhotos" className="text-sm text-zinc-700 leading-relaxed">
                  Request pre-shipment photos or factory video after burn-in (before dispatch)
                </label>
              </div>
            </div>
          )}
        </div>

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
              <li><a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:underline">{CONTACT.email}</a></li>
              <li><a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:underline">WhatsApp {CONTACT.whatsapp}</a></li>
              <li><a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:underline">Telegram {CONTACT.telegram}</a></li>
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
