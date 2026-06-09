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
    title: "Customization",
    description: "Custom hardware and remote operation options.",
    indices: [7, 8],
  },
  {
    title: "Setup & Support",
    description: "Lab management setup and contacting sales.",
    indices: [9, 15],
  },
] as const;

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
      <section className="inner-page-section">
        <div className="container-wide max-w-5xl space-y-12 md:space-y-16">
          {FAQ_CATEGORIES.map((cat, idx) => {
            const items = cat.indices.map((i) => FAQ_ITEMS[i]).filter(Boolean);
            return (
              <div key={cat.title} className="detail-section">
                <div className="flex items-start gap-4 mb-8 pb-5 border-b border-slate-200">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700 font-bold text-sm">
                    {idx + 1}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-1">{cat.title}</h2>
                    <p className="text-slate-600 text-base md:text-lg">{cat.description}</p>
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
