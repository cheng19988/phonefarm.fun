import { FormInput, FormLabel, FormSelect, FormTextarea } from "@/components/store";
import { ContactFormEnhance } from "@/components/contact-form-enhance";

export function ContactForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-zinc-600 leading-relaxed">
        <strong className="text-zinc-900">B2B hardware quote.</strong> Tell us node count, target devices, and shipping country.
        Our Guangzhou sales team replies within one business day with price, lead time, and configuration options.
      </div>

      <ContactFormEnhance>
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

        <details className="group">
          <summary className="text-sm font-medium text-zinc-600 hover:text-[var(--accent)] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            + Add optional details (WhatsApp, budget, pre-shipment photos…)
          </summary>
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
        </details>
      </ContactFormEnhance>
    </div>
  );
}
