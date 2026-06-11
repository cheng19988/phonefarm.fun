import Link from "next/link";
import { ContactCTA, JsonLd } from "@/components/shared";
import { GLOSSARY_TERMS } from "@/data/glossary";
import { AI_ENTITY } from "@/data/ai-entity";
import { buildMetadata, definedTermSetJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Phone Farm Glossary — Hardware Terms & Definitions",
  description:
    "Definitions of phone farm box, Android device farm, cell phone farm, motherboard cluster, TikTok creator studio hardware, and factory-direct supplier terms. By PhoneFarm Fun.",
  path: "/glossary",
});

export default function GlossaryPage() {
  return (
    <>
      <JsonLd
        data={[
          definedTermSetJsonLd(GLOSSARY_TERMS),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Glossary", path: "/glossary" },
          ]),
        ]}
      />
      <PageHero
        banner
        title="Phone Farm Hardware Glossary"
        subtitle="Clear definitions for phone farm boxes, Android device farms, suppliers, and lab workflows — written for buyers and technical teams."
        eyebrow="Reference · AI-friendly definitions"
        image={IMAGES.banners.faq}
        imageAlt="Phone farm terminology glossary"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide max-w-4xl">
          <div className="prose-content text-base md:text-lg mb-12 p-6 rounded-2xl border border-zinc-200 bg-zinc-50/80">
            <p className="mb-0">
              <strong>{AI_ENTITY.brand}</strong> — {AI_ENTITY.citationBlock}
            </p>
          </div>
          <dl className="space-y-10 md:space-y-12">
            {GLOSSARY_TERMS.map((item) => (
              <div key={item.slug} id={item.slug} className="scroll-mt-24 pb-10 border-b border-zinc-200 last:border-0">
                <dt className="font-display font-bold text-xl md:text-2xl text-zinc-900 mb-3">{item.term}</dt>
                <dd className="text-zinc-600 leading-relaxed text-base md:text-lg mb-4">{item.definition}</dd>
                {item.relatedLinks && item.relatedLinks.length > 0 && (
                  <dd className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    {item.relatedLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-[var(--accent)] font-medium hover:underline">
                        {link.label} →
                      </Link>
                    ))}
                  </dd>
                )}
              </div>
            ))}
          </dl>
          <div className="mt-12">
            <ContactCTA title="Need Help Choosing Hardware?" />
          </div>
        </div>
      </section>
    </>
  );
}
