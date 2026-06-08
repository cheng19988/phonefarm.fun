"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ContactBar } from "@/components/shared";
import { CONTACT, SITE } from "@/lib/config";
import { FormInput, FormLabel, FormSelect, FormTextarea, PageHero } from "@/components/store";

function ContactForm() {
  const searchParams = useSearchParams();
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

  const defaultProduct = searchParams.get("product") || searchParams.get("service") || "";

  return (
    <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
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
          <FormInput name="deviceModel" placeholder="e.g. Samsung A series, Xiaomi, motherboard cluster" />
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
        <div>
          <FormLabel>Budget (optional)</FormLabel>
          <FormInput name="budget" placeholder="USD range" />
        </div>
      </div>
      <div>
        <FormLabel>Project details</FormLabel>
        <FormTextarea
          name="message"
          rows={5}
          placeholder="Target Android version, deployment timeline, rack requirements, automation workflow..."
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-3">
        {status === "loading" ? "Sending..." : "Submit Quote Request"}
      </button>
      {status === "success" && <p className="text-green-700 text-sm bg-green-50 border border-green-200 rounded-lg p-3">Thank you! We will respond within 24 hours on business days.</p>}
      {status === "error" && <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg p-3">Failed to send. Please contact us via WhatsApp.</p>}
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Request a Phone Farm Hardware Quote"
        subtitle="Share your node count, device models, shipping country, and setup requirements. Our Guangzhou sales team responds within one business day."
        eyebrow="B2B hardware inquiry"
        compact
      />
      <section className="section pt-10 md:pt-12">
        <div className="container-wide">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <Suspense fallback={<div className="card p-8 text-slate-500">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h2 className="font-bold text-slate-900 mb-4">Direct contact</h2>
                <ContactBar />
              </div>
              <div className="card p-6 bg-slate-50">
                <h3 className="font-bold text-slate-900 mb-3">What happens next</h3>
                <ol className="space-y-3 text-sm text-slate-600 list-decimal list-inside">
                  <li>We review your node count, SKU interest, and shipping region.</li>
                  <li>Sales replies with pricing, lead time, and configuration options.</li>
                  <li>For custom racks, we schedule a short scoping call if needed.</li>
                  <li>Standard SKUs can be added to cart; custom projects get a manual invoice.</li>
                </ol>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-slate-900 mb-2">Response time</h3>
                <p className="text-sm text-slate-600">Within 24 hours on weekdays (Guangzhou time, UTC+8).</p>
                <p className="text-sm text-slate-500 mt-2">{SITE.location}</p>
                <p className="text-sm text-orange-600 mt-2 font-medium">{CONTACT.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
