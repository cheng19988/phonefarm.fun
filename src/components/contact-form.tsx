"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/config";
import { FormInput, FormLabel, FormSelect, FormTextarea } from "@/components/store";

export function ContactForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);

    const extras = [
      form.get("deviceModel") && `Device model preference: ${form.get("deviceModel")}`,
      form.get("remoteControl") && `Remote control: ${form.get("remoteControl")}`,
      form.get("quantity") && `Quantity: ${form.get("quantity")}`,
    ].filter(Boolean).join("\n");

    const message = [form.get("message"), extras].filter(Boolean).join("\n\n");
    form.set("message", message);

    const res = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form onSubmit={handleSubmit} className="card product-card-heavy p-6 md:p-8 lg:p-10 xl:p-12 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <FormLabel required>Name</FormLabel>
          <FormInput name="name" required />
        </div>
        <div>
          <FormLabel required>Email</FormLabel>
          <FormInput name="email" type="email" required />
        </div>
        <div>
          <FormLabel>WhatsApp / Telegram</FormLabel>
          <FormInput name="whatsapp" placeholder="@username or phone" />
        </div>
        <div>
          <FormLabel>Phone</FormLabel>
          <FormInput name="phone" />
        </div>
        <div>
          <FormLabel>Shipping country</FormLabel>
          <FormInput name="country" placeholder="e.g. United States, Germany" />
        </div>
        <div>
          <FormLabel>Quantity</FormLabel>
          <FormInput name="quantity" placeholder="e.g. 1, 5, 20-node rack" />
        </div>
        <div>
          <FormLabel>Product / SKU</FormLabel>
          <FormInput name="productInterest" defaultValue={defaultProduct} placeholder="e.g. 20-Node Pro Box" />
        </div>
        <div>
          <FormLabel>Node count</FormLabel>
          <FormInput name="deviceQuantity" placeholder="e.g. 20, 40, custom rack" />
        </div>
        <div>
          <FormLabel>Device model preference</FormLabel>
          <FormInput name="deviceModel" placeholder="e.g. Samsung A series, motherboard cluster" />
        </div>
        <div>
          <FormLabel>Remote control requirement</FormLabel>
          <FormSelect name="remoteControl" defaultValue="">
            <option value="">Select...</option>
            <option value="ADB only">ADB only — I will manage locally</option>
            <option value="Remote workstation setup">Remote workstation setup needed</option>
            <option value="Full lab management">Full multi-device lab management</option>
            <option value="Not sure">Not sure — need recommendation</option>
          </FormSelect>
        </div>
        <div className="sm:col-span-2">
          <FormLabel>Budget (optional)</FormLabel>
          <FormInput name="budget" placeholder="USD range" />
        </div>
      </div>
      <div>
        <FormLabel>Project details</FormLabel>
        <FormTextarea
          name="message"
          rows={6}
          placeholder="Target Android version, deployment timeline, rack requirements, automation workflow..."
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-3.5 text-base min-h-[44px]">
        {status === "loading" ? "Sending..." : "Send Hardware Requirement"}
      </button>
      {status === "success" && (
        <p className="text-green-700 text-sm bg-green-50 border border-green-200 rounded-lg p-4">
          Thank you! We will respond within 24 hours on business days.
        </p>
      )}
      {status === "error" && (
        <div className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
          <p>Failed to send. Please contact us directly:</p>
          <ul className="space-y-1 font-medium">
            <li>
              <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:underline">{CONTACT.email}</a>
            </li>
            <li>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:underline">WhatsApp</a>
            </li>
            <li>
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-orange-700 hover:underline">Telegram</a>
            </li>
          </ul>
        </div>
      )}
    </form>
  );
}
