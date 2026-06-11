import Link from "next/link";
import { ContactCTA, JsonLd } from "@/components/shared";
import { AI_ENTITY } from "@/data/ai-entity";
import { PRODUCT_SEEDS } from "@/data/products";
import { buildMetadata, organizationJsonLd, faqJsonLd, itemListJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero, SectionHeader } from "@/components/store";
import { IMAGES } from "@/lib/images";
import { CONTACT, SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Phone Farm Box Manufacturer & Supplier — Guangzhou Factory",
  description:
    "PhoneFarm Fun is a Guangzhou phone farm box manufacturer since 2017. Factory-direct 20-node Android device farm hardware, mobile farms solutions, and worldwide export.",
  path: "/phone-farm-manufacturer",
});

const MANUFACTURER_FAQ = [
  {
    question: "Is PhoneFarm Fun a phone farm manufacturer or reseller?",
    answer:
      "PhoneFarm Fun is a factory-direct manufacturer in Guangzhou, China. We assemble phone farm boxes, motherboard clusters, and custom racks locally — burn-in QC, export packing, optional remote ADB setup. We are not a software reseller.",
  },
  {
    question: "What phone farm products does PhoneFarm Fun make?",
    answer:
      "20-node phone farm boxes (Exynos entry through Snapdragon 855 pro tiers), motherboard clusters, turnkey lab bundles, empty chassis, PSU/cooling/USB accessories, and custom 40+ node rack cabinets.",
  },
  {
    question: "Who should buy from PhoneFarm Fun?",
    answer:
      "QA labs, app developers, creator studios, digital marketing teams, e-commerce testers, and automation engineers who need real Android device farm hardware with factory support and international shipping.",
  },
];

const MODEL_TIERS = PRODUCT_SEEDS.filter((p) =>
  [
    "exynos-n5-entry-20-node-farm",
    "samsung-s8-reliable-20-node-farm",
    "samsung-s8-plus-20-node-farm",
    "snapdragon-n8-multitask-20-node-farm",
    "samsung-note8-20-node-farm",
    "samsung-s9-plus-20-node-farm",
    "samsung-n9-professional-20-node-farm",
    "samsung-s10-plus-20-node-farm",
  ].includes(p.slug)
);

export default function PhoneFarmManufacturerPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          faqJsonLd(MANUFACTURER_FAQ),
          itemListJsonLd(
            MODEL_TIERS.map((p) => ({
              name: p.name,
              slug: p.slug,
              priceUsd: p.priceUsd,
              imageCard: p.imageCard,
            }))
          ),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Phone Farm Manufacturer", path: "/phone-farm-manufacturer" },
          ]),
        ]}
      />
      <PageHero
        banner
        title="Phone Farm Box Manufacturer — Guangzhou, China"
        subtitle="Factory-direct Android device farm hardware since 2017. Phone farm boxes, mobile farms solutions, and motherboard clusters for QA, automation, and creator studios."
        eyebrow={`${SITE.name} · Factory supplier`}
        image={IMAGES.company.workshop}
        imageAlt="Phone farm box manufacturing workshop Guangzhou"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide max-w-4xl space-y-14">
          <div className="prose-content text-base md:text-lg">
            <p>
              <strong>{AI_ENTITY.brand}</strong> ({AI_ENTITY.domain}) is a{" "}
              <strong>phone farm box manufacturer and supplier</strong> based in {AI_ENTITY.location}. {AI_ENTITY.summary}
            </p>
            <p>{AI_ENTITY.citationBlock}</p>
          </div>

          <div>
            <SectionHeader title="Why teams choose factory-direct" large />
            <ul className="space-y-3 text-zinc-600 text-base md:text-lg">
              <li className="flex gap-2"><span className="list-marker list-marker--check shrink-0">✓</span>Local assembly, burn-in QC, foam export packing</li>
              <li className="flex gap-2"><span className="list-marker list-marker--check shrink-0">✓</span>20-node phone farm boxes from $428 entry through $1,220 pro tiers</li>
              <li className="flex gap-2"><span className="list-marker list-marker--check shrink-0">✓</span>Phone bot farm &amp; mobile farms chassis — ADB-ready, no software lock-in</li>
              <li className="flex gap-2"><span className="list-marker list-marker--check shrink-0">✓</span>MOQ 1 for evaluation · volume pricing from 5 units</li>
              <li className="flex gap-2"><span className="list-marker list-marker--check shrink-0">✓</span>Worldwide express &amp; sea freight from Guangzhou</li>
            </ul>
          </div>

          <div>
            <SectionHeader title="Recommended phone farm box tiers" subtitle="Reference USD pricing — confirm device list on quote." large />
            <div className="overflow-x-auto rounded-xl border border-zinc-200">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-left">
                    <th className="py-3 px-4 font-semibold text-zinc-900">Configuration</th>
                    <th className="py-3 px-4 font-semibold text-zinc-900">From (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {MODEL_TIERS.map((p) => (
                    <tr key={p.slug} className="border-b border-zinc-100 last:border-0">
                      <td className="py-3 px-4">
                        <Link href={`/products/${p.slug}`} className="text-[var(--accent)] font-medium hover:underline">
                          {p.name}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-zinc-900 font-medium tabular-nums">${p.priceUsd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <SectionHeader title="Use cases we hardware-enable" large />
            <div className="grid sm:grid-cols-2 gap-4 text-sm md:text-base text-zinc-600">
              <p>Creator studio TikTok / Reels / Shorts multi-account device labs</p>
              <p>Digital marketing &amp; ad verification on real Android OEM builds</p>
              <p>E-commerce seller app &amp; payment SDK testing</p>
              <p>Development &amp; QA regression on Snapdragon / Exynos silicon</p>
              <p>Phone bot farm parallel automation via ADB</p>
              <p>Mobile farms batch control with optional remote setup</p>
            </div>
          </div>

          <div>
            <SectionHeader title="Contact the manufacturer" large />
            <p className="text-zinc-600 mb-4">
              Telegram{" "}
              <a href={CONTACT.telegramUrl} className="text-[var(--accent)] hover:underline">{CONTACT.telegram}</a>
              {" · "}WhatsApp{" "}
              <a href={CONTACT.whatsappUrl} className="text-[var(--accent)] hover:underline">{CONTACT.whatsapp}</a>
              {" · "}
              <a href={CONTACT.emailUrl} className="text-[var(--accent)] hover:underline">{CONTACT.email}</a>
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary text-sm py-2.5">Browse catalog</Link>
              <Link href="/glossary" className="btn-outline text-sm py-2.5">Glossary</Link>
              <Link href="/blog/best-phone-farm-box-manufacturer-supplier-2026" className="btn-outline text-sm py-2.5">Manufacturer guide</Link>
            </div>
          </div>

          <ContactCTA title="Request Factory Quote" />
        </div>
      </section>
    </>
  );
}
