import { ContactForm } from "@/components/contact-form";
import { CONTACT, SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/store";

const QUOTE_CHECKLIST = [
  "Target node count (e.g. 20, 40, custom rack)",
  "Phone / device model preference (Android version, screenless motherboard, etc.)",
  "Shipping country and preferred freight method",
  "Quantity and MOQ expectations",
  "Remote setup requirement (ADB only, workstation config, or full lab management)",
];

type Props = { searchParams: Promise<{ product?: string; service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultProduct = params.product || params.service || "";

  return (
    <>
      <PageHero
        banner
        title="Request a Phone Farm Hardware Quote"
        subtitle="Share your node count, device models, shipping country, and setup requirements. Our Guangzhou sales team responds within one business day."
        eyebrow="B2B hardware inquiry"
        image={IMAGES.banners.contact}
        imageAlt="Phone farm hardware quote request"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7">
              <ContactForm defaultProduct={defaultProduct} />
            </div>
            <div className="lg:col-span-5 space-y-6 lg:space-y-8">
              <div className="detail-section">
                <h2 className="section-title text-xl md:text-2xl mb-5">Direct contact</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="eyebrow !mb-1 !text-zinc-500">Email</dt>
                    <dd>
                      <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
                        {CONTACT.email}
                      </a>
                      <p className="text-sm text-zinc-500 mt-1">Official B2B sales inbox — opens Gmail compose</p>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow !mb-1 !text-zinc-500">Telegram</dt>
                    <dd>
                      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-semibold text-zinc-800 hover:text-sky-700">
                        {CONTACT.telegram}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow !mb-1 !text-zinc-500">WhatsApp</dt>
                    <dd>
                      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-semibold text-zinc-800 hover:text-emerald-700">
                        {CONTACT.whatsapp}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow !mb-1 !text-zinc-500">Location</dt>
                    <dd className="text-base text-zinc-700">{SITE.location}</dd>
                  </div>
                </dl>
              </div>
              <div className="detail-section-accent">
                <h3 className="section-title text-xl md:text-2xl mb-4">Before you request a quote</h3>
                <ul className="space-y-3.5">
                  {QUOTE_CHECKLIST.map((item) => (
                    <li key={item} className="flex gap-3 text-zinc-800 text-sm md:text-base leading-relaxed">
                      <span className="text-[var(--accent)] shrink-0 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="detail-section bg-zinc-50 border-zinc-200/80">
                <h3 className="section-title text-xl mb-3">What happens next</h3>
                <ol className="space-y-3 text-sm md:text-base text-zinc-600 list-decimal list-inside leading-relaxed">
                  <li>We review your node count, SKU interest, and shipping region.</li>
                  <li>Sales replies with pricing, lead time, and configuration options.</li>
                  <li>For custom racks, we schedule a short scoping call if needed.</li>
                  <li>Standard SKUs can be added to cart; custom projects get a manual invoice.</li>
                </ol>
              </div>
              <div className="detail-section">
                <h3 className="section-title text-xl mb-2">Response time</h3>
                <p className="text-sm md:text-base text-zinc-600">Within 24 hours on weekdays (Guangzhou time, UTC+8).</p>
                <p className="text-sm text-zinc-500 mt-2">{SITE.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
