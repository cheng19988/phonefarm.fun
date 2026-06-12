import { FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { ProcurementQuickRef } from "@/components/procurement-quick-ref";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Phone Farm FAQ — Size, Power, Models, Lead Time & Warranty",
  description:
    "B2B answers: chassis dimensions, weight, voltage, power draw, supported phone models, packaging, lead time, warranty, remote setup, and pre-shipment photos.",
  path: "/faq",
});

const FAQ_CATEGORIES = [
  {
    title: "Procurement & physical specs",
    description: "Dimensions, weight, voltage, power draw, packaging, PC scaling, pre-shipment photos, and lead time.",
    indices: [27, 43, 44, 45, 46, 47, 13],
  },
  {
    title: "Products & Hardware",
    description: "Phone farm boxes, motherboard clusters, and real-device lab hardware.",
    indices: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    title: "Customization & Setup",
    description: "Custom hardware, remote control, and lab management configuration.",
    indices: [7, 8, 9],
  },
  {
    title: "Ordering & Payment",
    description: "MOQ, samples, and payment methods.",
    indices: [11, 12, 14],
  },
  {
    title: "Shipping & Lead Time",
    description: "International delivery and production timelines.",
    indices: [10],
  },
  {
    title: "Workflows & Use Cases",
    description: "Creator studios, group control, profitability, and e-commerce testing.",
    indices: [16, 19, 24],
  },
  {
    title: "Software & Compatibility",
    description: "Device management tools, Samsung models, and Android vs iPhone labs.",
    indices: [17, 20, 21, 31, 32],
  },
  {
    title: "Model & chipset selection",
    description: "CPU choice, S8+ vs starter, budget builds, N9 vs S9+, S8 Reliable vs S8+.",
    indices: [25, 26, 28, 29, 41, 42],
  },
  {
    title: "Operations & batch control",
    description: "Stability, bulk APK install, visual command center, phone bot & mobile farms.",
    indices: [30, 39, 40],
  },
  {
    title: "Support & Trust",
    description: "Warranty, RMA, remote setup, factory-direct supply, where to buy.",
    indices: [15, 22, 23, 33, 34, 35, 38, 48, 49],
  },
  {
    title: "Creator & social workflows",
    description: "Multi-account device labs for TikTok, Reels, and content teams.",
    indices: [18, 36],
  },
  {
    title: "Terminology",
    description: "Phone farm box vs cell phone farm and related terms.",
    indices: [37],
  },
] as const;

const FAQ_COVERED = FAQ_CATEGORIES.flatMap((cat) => cat.indices);
if (new Set(FAQ_COVERED).size !== FAQ_ITEMS.length) {
  throw new Error(
    `FAQ page categories must cover all ${FAQ_ITEMS.length} items (currently ${new Set(FAQ_COVERED).size})`,
  );
}

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <PageHero
        banner
        title="Phone Farm Hardware FAQ"
        subtitle="Products, ordering, shipping, customization, and setup — answered by our Guangzhou hardware team."
        eyebrow="B2B hardware support"
        image={IMAGES.banners.faq}
        imageAlt="Phone farm hardware FAQ"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide max-w-5xl space-y-12 md:space-y-14">
          <ProcurementQuickRef />
          {FAQ_CATEGORIES.map((cat, idx) => {
            const items = cat.indices.map((i) => FAQ_ITEMS[i]).filter(Boolean);
            return (
              <div key={cat.title} className="pb-10 md:pb-12 border-b border-zinc-200 last:border-0 last:pb-0">
                <div className="flex items-start gap-4 mb-6 md:mb-8">
                  <span className="step-badge h-10 w-10 text-sm rounded-lg">
                    {idx + 1}
                  </span>
                  <div>
                    <h2 className="section-title text-xl md:text-2xl mb-1">{cat.title}</h2>
                    <p className="text-zinc-600 text-sm md:text-base">{cat.description}</p>
                  </div>
                </div>
                <FAQAccordion items={items} large />
              </div>
            );
          })}
          <ContactCTA title="Still Have Questions?" />
        </div>
      </section>
    </>
  );
}
