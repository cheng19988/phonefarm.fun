import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-server";
import { ProductCard, FAQAccordion } from "@/components/commerce";
import { JsonLd, ContactCTA } from "@/components/shared";
import { buildMetadata, faqJsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { ZH } from "@/messages/zh";
import { IMAGES } from "@/lib/images";
import { SITE, CONTACT } from "@/lib/config";
import { getProductMeta } from "@/data/product-meta";
import { getProductCardImage } from "@/data/product-images";

const FEATURED_SLUGS = ["phone-farm-box", "motherboard-box", "custom-cabinet"] as const;

export const metadata: Metadata = buildMetadata({
  title: ZH.home.metaTitle,
  description: ZH.home.metaDescription,
  path: "/zh",
  locale: "zh",
});

export default async function ZhHomePage() {
  const allProducts = await getPublishedProducts();
  const bySlug = new Map(allProducts.map((p) => [p.slug, p]));
  const featured = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd("zh"),
          websiteJsonLd(),
          faqJsonLd([...ZH.faq.items.slice(0, 5)]),
        ]}
      />
      <section className="shop-hero shop-hero--light">
        <div className="shop-hero-bg-pattern" aria-hidden />
        <div className="container-wide shop-hero-grid">
          <div className="relative z-10 max-w-xl lg:py-4">
            <p className="eyebrow text-[var(--accent)] mb-3">{ZH.home.eyebrow}</p>
            <h1 className="shop-hero-title text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl text-zinc-900">
              {ZH.home.h1}
            </h1>
            <p className="shop-hero-lead text-base md:text-lg mt-4 text-zinc-600">{ZH.home.lead}</p>
            <p className="text-sm text-zinc-500 mt-3">{ZH.home.keywords}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/zh/contact" className="btn-primary-lg shadow-lg shadow-orange-900/15">
                {ZH.home.ctaQuote}
              </Link>
              <Link href="/zh/products" className="btn-outline">
                {ZH.home.ctaProducts}
              </Link>
              <Link href="#shouji-nongchang" className="btn-outline">
                {ZH.home.ctaWhat}
              </Link>
            </div>
            <p className="text-xs text-zinc-500 mt-4 max-w-lg leading-relaxed">{ZH.home.pricingNote}</p>
          </div>
          <div className="relative z-10 hero-product-showcase">
            <div className="hero-product-showcase-frame">
              <Image
                src={IMAGES.productsHeroChassis}
                alt="20 节点手机农场盒子机箱 — USB、LAN、OTG 接口"
                fill
                className="object-contain object-center"
                priority
                sizes="(max-width:1024px) 100vw, 760px"
              />
            </div>
            <p className="hero-product-caption">20 节点机箱 · USB · LAN1 · LAN2 · OTG</p>
          </div>
        </div>
        <div className="relative z-10 border-t border-zinc-200/80 bg-zinc-50/90">
          <div className="container-wide py-4 md:py-5">
            <div className="trust-stat-grid">
              {ZH.home.facts.map((item) => (
                <div key={item.label} className="trust-stat-card">
                  <p className="trust-stat-value">{item.value}</p>
                  <p className="trust-stat-label">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="shouji-nongchang" className="section section-band--white">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title text-2xl md:text-3xl mb-5">{ZH.home.introTitle}</h2>
          <p className="text-base md:text-lg text-zinc-600 leading-relaxed">{ZH.home.introBody}</p>
          <p className="mt-6 text-sm text-zinc-500">
            {SITE.location} · {SITE.name} · 自 {SITE.since} 年 ·{" "}
            <Link href="/zh/phone-farm-manufacturer" className="text-[var(--accent)] font-semibold hover:underline">
              手机农场制造商详情 →
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-band--muted">
        <div className="container-wide">
          <div className="section-head max-w-3xl">
            <h2 className="section-title">{ZH.home.featuredTitle}</h2>
            <p className="section-subtitle mb-0">{ZH.home.featuredSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {featured.map((p) => {
              if (!p) return null;
              const meta = getProductMeta(p.slug);
              return (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  shortDesc={p.shortDesc}
                  priceUsd={p.priceUsd}
                  stock={p.stock}
                  imageCard={getProductCardImage(p.slug, p.imageCard)}
                  category={p.category}
                  tier={meta.tier}
                  nodeCount={meta.nodeCount}
                  deploymentType={meta.deploymentType}
                  moq={meta.moq}
                  leadTime={meta.leadTime}
                  featured
                />
              );
            })}
          </div>
          <Link href="/zh/products" className="inline-block mt-8 text-sm font-semibold text-[var(--accent)] hover:underline">
            {ZH.products.viewEnCatalog}
          </Link>
        </div>
      </section>

      <section className="section section-band--white">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title mb-8">{ZH.home.faqTitle}</h2>
          <FAQAccordion items={[...ZH.faq.items.slice(0, 6)]} />
          <Link href="/zh/faq" className="inline-block mt-6 text-sm font-semibold text-[var(--accent)] hover:underline">
            {ZH.home.faqLink} →
          </Link>
        </div>
      </section>

      <section className="section section-band--muted">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="section-title">{ZH.home.whyTitle}</h2>
          <p className="text-zinc-600 mt-4 leading-relaxed">
            工厂直供 · 老化 QC · 全球出口 · Telegram {CONTACT.telegram} · WhatsApp {CONTACT.whatsapp}
          </p>
          <ContactCTA />
        </div>
      </section>
    </>
  );
}
