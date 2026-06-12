import { ContactForm } from "@/components/contact-form";
import { FactoryQuoteDifferentiators } from "@/components/pricing-rfq";
import { CONTACT, SITE } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/store";

const QUOTE_CHECKLIST = [
  "Node count and Samsung / device tier (Snapdragon vs Exynos)",
  "Shipping country and express vs sea freight",
  "Platform: QA lab, automation, creator studio, or enterprise rack",
  "Connection mode: ADB-only, remote setup, or group control",
  "Written BOM, proforma, and burn-in QC expectations",
];

type Props = { searchParams: Promise<{ product?: string; service?: string; sent?: string; error?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultProduct = params.product || params.service || "";
  const sent = params.sent === "1";

  return (
    <>
      <PageHero
        banner
        title="Request a Phone Farm Hardware Quote"
        subtitle="RFQ-first factory sales — share node count, device models, shipping country, and control mode. Guangzhou team replies with written BOM, reference pricing, and lead time."
        eyebrow="B2B hardware inquiry · Guangzhou factory"
        image={IMAGES.banners.contact}
        imageAlt="Phone farm hardware quote request"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide">
          {params.error === "missing" && (
            <p className="mb-6 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-4">
              Please complete all required fields and accept the privacy policy.
            </p>
          )}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7">
              <ContactForm defaultProduct={defaultProduct} sent={sent} />
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
                      <p className="text-sm text-zinc-500 mt-1">Official B2B sales inbox</p>
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
                <h3 className="section-title text-xl md:text-2xl mb-4">Quote checklist</h3>
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
                  <li>Sales reviews node count, SKU, platform, and shipping region.</li>
                  <li>Written quote with reference price, BOM, lead time, and freight options.</li>
                  <li>Custom racks: short scoping call if needed.</li>
                  <li>Payment only after configuration is confirmed (proforma / standard SKU checkout).</li>
                </ol>
              </div>
              <div className="detail-section">
                <h3 className="section-title text-xl mb-3">Factory quote includes</h3>
                <FactoryQuoteDifferentiators />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
