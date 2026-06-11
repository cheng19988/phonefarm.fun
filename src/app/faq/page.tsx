import { FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Phone Farm FAQ — Hardware, Shipping, Payment & Support",
  description:
    "Answers about phone farm boxes, motherboard arrays, ordering, shipping, customization, payment, and setup support.",
  path: "/faq",
});

const FAQ_CATEGORIES = [
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
    indices: [10, 13],
  },
  {
    title: "Workflows & Use Cases",
    description: "Creator studios, group control, profitability, and e-commerce testing.",
    indices: [16, 18, 19, 24],
  },
  {
    title: "Software & Compatibility",
    description: "Device management tools, Samsung models, and Android vs iPhone labs.",
    indices: [17, 20, 21, 31, 32],
  },
  {
    title: "Model & chipset selection",
    description: "CPU choice, S8+ vs starter, budget builds, dimensions for freight.",
    indices: [25, 26, 27, 28, 29],
  },
  {
    title: "Operations & batch control",
    description: "Stability, bulk APK install, visual command center workflows.",
    indices: [30],
  },
  {
    title: "Support & Trust",
    description: "Contacting sales, warranty, and factory-direct supply.",
    indices: [15, 22, 23],
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
