import { FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm FAQ — Hardware, Shipping, Payment & Support",
  description:
    "Answers about phone farm boxes, motherboard boxes, real device vs cloud, customization, MOQ, samples, delivery, USDT payment, and contacting sales.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ_ITEMS)} />
      <div className="section">
        <div className="container-wide max-w-3xl">
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-subtitle">
            Hardware specs, ordering, shipping, customization, and support — answered by the Guangzhou team.
          </p>
          <FAQAccordion items={FAQ_ITEMS} />
          <div className="mt-16">
            <ContactCTA title="Still Have Questions?" />
          </div>
        </div>
      </div>
    </>
  );
}
