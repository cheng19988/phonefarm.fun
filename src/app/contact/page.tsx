"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ContactBar } from "@/components/shared";
import { CONTACT, SITE } from "@/lib/config";

function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/contact", { method: "POST", body: form });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Name *</label>
          <input name="name" required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Country</label>
          <input name="country" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">WhatsApp / Telegram</label>
          <input name="whatsapp" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Phone</label>
          <input name="phone" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Email *</label>
          <input name="email" type="email" required className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Device Quantity</label>
          <input name="deviceQuantity" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Product Interest</label>
          <input name="productInterest" defaultValue={searchParams.get("product") || searchParams.get("service") || ""} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Budget</label>
          <input name="budget" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
        </div>
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-1">Message</label>
        <textarea name="message" rows={4} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white" />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </button>
      {status === "success" && <p className="text-green-400 text-sm">Thank you! We will respond within 24 hours.</p>}
      {status === "error" && <p className="text-red-400 text-sm">Failed to send. Please contact us directly via WhatsApp.</p>}
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">Get your custom quote in minutes. Factory-direct support from {SITE.location}.</p>

        <div className="card p-6 mb-8">
          <h2 className="font-bold text-white mb-4">Direct Contact</h2>
          <ContactBar />
          <ul className="mt-4 space-y-2 text-slate-300">
            <li>📞 Phone: {CONTACT.phone}</li>
            <li>💬 WhatsApp: {CONTACT.whatsapp}</li>
            <li>✈️ Telegram: {CONTACT.telegram}</li>
            <li>✉️ Email: {CONTACT.email}</li>
            <li>📍 Location: {SITE.location}</li>
          </ul>
        </div>

        <Suspense fallback={<div className="card p-6 text-slate-400">Loading form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
