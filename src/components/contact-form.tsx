import Link from "next/link";
import { FormInput, FormLabel, FormSelect, FormTextarea } from "@/components/store";
import { ContactFormEnhance } from "@/components/contact-form-enhance";
import { PrivacyConsentField, RfqFirstBanner } from "@/components/pricing-rfq";

export function ContactForm({ defaultProduct = "", sent = false }: { defaultProduct?: string; sent?: boolean }) {
  return (
    <div className="space-y-4">
      <RfqFirstBanner />

      <ContactFormEnhance sent={sent}>
        <fieldset className="space-y-5 border-0 p-0 m-0">
          <legend className="font-display font-bold text-lg text-zinc-900 mb-1">Contact</legend>
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
              <FormLabel required>WhatsApp or Telegram</FormLabel>
              <FormInput name="whatsapp" required placeholder="@username or +country code number" />
            </div>
            <div className="sm:col-span-2">
              <FormLabel required>Shipping country</FormLabel>
              <FormInput name="country" required placeholder="e.g. United States, Germany, UAE" autoComplete="country-name" />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 border-0 p-0 m-0 pt-6 border-t border-zinc-200">
          <legend className="font-display font-bold text-lg text-zinc-900 mb-1">Hardware & deployment</legend>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <FormLabel required>Product / SKU interest</FormLabel>
              <FormInput name="productInterest" defaultValue={defaultProduct} required placeholder="e.g. S8+ 20-node box, custom rack" />
            </div>
            <div>
              <FormLabel required>Node count</FormLabel>
              <FormInput name="deviceQuantity" required placeholder="e.g. 20, 40, 80+" />
            </div>
            <div>
              <FormLabel required>Quantity (units / chassis)</FormLabel>
              <FormInput name="quantity" required placeholder="e.g. 1 sample, 5 bulk" />
            </div>
            <div>
              <FormLabel required>Primary platform / use case</FormLabel>
              <FormSelect name="platform" required defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                <option value="Mobile QA / app testing">Mobile QA / app testing</option>
                <option value="Automation / ADB lab">Automation / ADB lab</option>
                <option value="Creator studio">Creator studio</option>
                <option value="Digital marketing / ad QA">Digital marketing / ad QA</option>
                <option value="E-commerce app testing">E-commerce app testing</option>
                <option value="Enterprise rack deployment">Enterprise rack deployment</option>
                <option value="Other">Other</option>
              </FormSelect>
            </div>
            <div className="sm:col-span-2">
              <FormLabel required>Connection / control mode</FormLabel>
              <FormSelect name="connectionMode" required defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                <option value="ADB only — local PC">ADB only — local PC</option>
                <option value="Remote workstation setup">Remote workstation setup</option>
                <option value="Group control / batch management">Group control / batch management</option>
                <option value="Full lab management">Full lab management</option>
                <option value="Not sure — need recommendation">Not sure — need recommendation</option>
              </FormSelect>
            </div>
            <div>
              <FormLabel>Budget (USD range, optional)</FormLabel>
              <FormInput name="budget" placeholder="e.g. $500–$2,000" />
            </div>
            <div>
              <FormLabel>Phone (optional)</FormLabel>
              <FormInput name="phone" autoComplete="tel" />
            </div>
            <div className="sm:col-span-2">
              <FormLabel required>Message</FormLabel>
              <FormTextarea
                name="message"
                rows={5}
                required
                placeholder="Samsung/device model preference, Android version, timeline, remote setup, rackmount needs…"
              />
            </div>
            <div className="sm:col-span-2 flex items-start gap-3">
              <input
                type="checkbox"
                id="preShipmentPhotos"
                name="preShipmentPhotos"
                className="mt-1 h-4 w-4 rounded border-zinc-300 text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <label htmlFor="preShipmentPhotos" className="text-sm text-zinc-700 leading-relaxed">
                Request pre-shipment photos or factory video after burn-in (optional)
              </label>
            </div>
          </div>
        </fieldset>

        <div className="pt-6 border-t border-zinc-200 space-y-4">
          <PrivacyConsentField />
          <p className="text-xs text-zinc-500 leading-relaxed">
            Guangzhou sales replies within one business day with reference pricing, lead time, written BOM, and configuration options.
          </p>
        </div>
      </ContactFormEnhance>
    </div>
  );
}
