import Link from "next/link";
import { ContactCTA, JsonLd } from "@/components/shared";
import { FAQAccordion } from "@/components/commerce";
import { PRODUCT_SEEDS } from "@/data/products";
import { buildMetadata, organizationJsonLd, faqJsonLd, itemListJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero, SectionHeader } from "@/components/store";
import { IMAGES } from "@/lib/images";
import { CONTACT, SITE } from "@/lib/config";
import { ZH } from "@/messages/zh";

export const metadata = buildMetadata({
  title: ZH.manufacturer.metaTitle,
  description: ZH.manufacturer.metaDescription,
  path: "/zh/phone-farm-manufacturer",
  locale: "zh",
});

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
  ].includes(p.slug),
);

export default function ZhManufacturerPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd("zh"),
          faqJsonLd([...ZH.manufacturer.faq]),
          itemListJsonLd(
            MODEL_TIERS.map((p) => ({
              name: p.name,
              slug: p.slug,
              priceUsd: p.priceUsd,
              imageCard: p.imageCard,
            })),
          ),
          breadcrumbJsonLd([
            { name: "首页", path: "/zh" },
            { name: "手机农场制造商", path: "/zh/phone-farm-manufacturer" },
          ]),
        ]}
      />
      <PageHero
        banner
        title={ZH.manufacturer.h1}
        subtitle={ZH.manufacturer.subtitle}
        eyebrow={ZH.manufacturer.eyebrow}
        image={IMAGES.company.workshop}
        imageAlt="广州手机农场盒子制造车间"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide max-w-4xl space-y-14">
          <div className="prose-content text-base md:text-lg">
            <p>
              <strong>{SITE.name}</strong> 位于{SITE.location}，自 {SITE.since}{" "}
              年起工厂直供<strong>手机农场盒子</strong>与 <strong>Android 设备农场</strong>
              硬件。我们组装 20 节点机箱、主板集群与定制机架 — 出口前老化测试，可选远程 ADB 配置。
            </p>
            <p>
              关键词：手机农场、手机农场盒子、手机农场设备、phone farm box、Android phone farm、设备农场硬件。
            </p>
          </div>
          <div>
            <SectionHeader title="制造商 FAQ" subtitle="关于工厂身份、产品线与适用买家" />
            <FAQAccordion items={[...ZH.manufacturer.faq]} />
          </div>
          <div>
            <SectionHeader title="机型档位（参考 SKU）" subtitle="完整规格见英文产品页" />
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              {MODEL_TIERS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-[var(--accent)] font-medium hover:underline">
                    {p.name}
                  </Link>
                  <span className="text-zinc-500"> — ${p.priceUsd} 参考价</span>
                </li>
              ))}
            </ul>
          </div>
          <ContactCTA />
          <p className="text-sm text-zinc-500">
            Telegram {CONTACT.telegram} · WhatsApp {CONTACT.whatsapp} ·{" "}
            <Link href="/zh/contact" className="text-[var(--accent)] hover:underline">
              在线询价
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
