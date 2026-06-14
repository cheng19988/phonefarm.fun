import { FAQAccordion } from "@/components/commerce";
import { ContactCTA, JsonLd } from "@/components/shared";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/store";
import { IMAGES } from "@/lib/images";
import { ZH } from "@/messages/zh";

export const metadata = buildMetadata({
  title: ZH.faq.metaTitle,
  description: ZH.faq.metaDescription,
  path: "/zh/faq",
  locale: "zh",
});

export default function ZhFaqPage() {
  return (
    <>
      <JsonLd data={[faqJsonLd([...ZH.faq.items])]} />
      <PageHero
        banner
        title={ZH.faq.h1}
        subtitle={ZH.faq.subtitle}
        eyebrow="手机农场 · Android 设备农场"
        image={IMAGES.banners.faq}
        imageAlt="手机农场硬件采购常见问题"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide max-w-3xl">
          <FAQAccordion items={[...ZH.faq.items]} />
          <div className="mt-12">
            <ContactCTA />
          </div>
        </div>
      </section>
    </>
  );
}
