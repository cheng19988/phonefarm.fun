"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ContactBar } from "@/components/shared";
import { CONTACT, SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import { FormInput, FormLabel, FormSelect, FormTextarea, PageHero } from "@/components/store";

const QUOTE_CHECKLIST = [
  "Target node count (e.g. 20, 40, custom rack)",
  "Phone / device model preference (Android version, screenless motherboard, etc.)",
  "Shipping country and preferred freight method",
  "Quantity and MOQ expectations",
  "Remote setup requirement (ADB only, workstation config, or full lab management)",
];

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
      <button type="submit" disabled={status === "loading"} className="btn-primary w-full py-3.5 text-base">
        {status === "loading" ? "Sending..." : "Send Hardware Requirement"}
      </button>
      {status === "success" && <p className="text-green-700 text-sm bg-green-50 border border-green-200 rounded-lg p-4">Thank you! We will respond within 24 hours on business days.</p>}
      {status === "error" && <p className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg p-4">Failed to send. Please contact us via WhatsApp or email.</p>}
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        banner
        title="Request a Phone Farm Hardware Quote"
        subtitle="Share your node count, device models, shipping country, and setup requirements. Our Guangzhou sales team responds within one business day."
        eyebrow="B2B hardware inquiry"
        image={IMAGES.phoneFarmBox.hero}
        imageAlt="Phone farm hardware quote request"
      />
      <section className="inner-page-section">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="card p-10 text-slate-500 text-lg">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
            <div className="lg:col-span-5 space-y-6 lg:space-y-8">
              <div className="detail-section">
                <h2 className="font-bold text-slate-900 text-xl md:text-2xl mb-4">Direct contact</h2>
                <ContactBar />
                <p className="text-orange-600 font-medium mt-4">{CONTACT.email}</p>
              </div>
              <div className="detail-section bg-slate-900 text-white border-slate-800">
                <h3 className="font-bold text-xl md:text-2xl mb-4">Before you request a quote</h3>
                <ul className="space-y-3">
                  {QUOTE_CHECKLIST.map((item) => (
                    <li key={item} className="flex gap-3 text-slate-300 text-sm md:text-base leading-relaxed">
                      <span className="text-orange-400 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-section bg-slate-50">
                <h3 className="font-bold text-slate-900 text-xl mb-3">What happens next</h3>
                <ol className="space-y-3 text-sm md:text-base text-slate-600 list-decimal list-inside leading-relaxed">
                  <li>We review your node count, SKU interest, and shipping region.</li>
                  <li>Sales replies with pricing, lead time, and configuration options.</li>
                  <li>For custom racks, we schedule a short scoping call if needed.</li>
                  <li>Standard SKUs can be added to cart; custom projects get a manual invoice.</li>
                </ol>
              </div>
              <div className="detail-section">
                <h3 className="font-bold text-slate-900 text-xl mb-2">Response time</h3>
                <p className="text-sm md:text-base text-slate-600">Within 24 hours on weekdays (Guangzhou time, UTC+8).</p>
                <p className="text-sm text-slate-500 mt-2">{SITE.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
