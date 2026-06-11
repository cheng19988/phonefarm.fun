import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/products-server";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, FAQAccordion } from "@/components/commerce";
import { HomeHero } from "@/components/home-hero";
import { buildMetadata, faqJsonLd, naverSiteVerificationMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { BLOG_POSTS } from "@/data/blog";
import { SERVICES } from "@/data/services";
import { getProductMeta } from "@/data/product-meta";
import { getProductCardImage } from "@/data/product-images";
import { IMAGES } from "@/lib/images";
import { DeviceModelGrid } from "@/components/device-model-grid";
import { getFeaturedCatalogModels, getCatalogModels } from "@/data/device-models";
import {
  TRUST_STATS,
  USE_CASES,
  SOFTWARE_CAPABILITIES,
  VALUE_PROPS,
  WHY_CHOOSE,
} from "@/data/use-cases";
import { SITE, CONTACT } from "@/lib/config";
import { AI_ENTITY } from "@/data/ai-entity";
import {
  CaseStudyCards,
  CertBadgeStrip,
  ClientLogoWall,
  TestimonialStrip,
  TrustSectionLinks,
} from "@/components/trust-sections";

const FEATURED_SLUGS = ["phone-farm-box", "motherboard-box", "custom-cabinet"] as const;

const MODEL_CONFIG_SLUGS = [
  "exynos-n5-entry-20-node-farm",
  "samsung-s8-reliable-20-node-farm",
  "samsung-s8-plus-20-node-farm",
  "samsung-n9-professional-20-node-farm",
  "samsung-s9-plus-20-node-farm",
  "samsung-s10-plus-20-node-farm",
  "samsung-note8-20-node-farm",
  "snapdragon-n8-multitask-20-node-farm",
] as const;

const RECOMMENDED_MODELS = getFeaturedCatalogModels(8);

const FACTORY_SHOWCASE = [
  IMAGES.company.workshop,
  IMAGES.phoneFarmBox.detail,
  IMAGES.motherboardBox.detail,
  IMAGES.company.warehouse,
  IMAGES.factoryGallery[5],
  IMAGES.factoryGallery[7],
] as const;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Professional Phone Farm Boxes & Motherboard Arrays",
    description: SITE.description,
    path: "/",
  }),
  ...naverSiteVerificationMetadata(),
};

function SectionHead({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-head max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle mb-0">{subtitle}</p>}
    </div>
  );
}

export default async function HomePage() {
  const allProducts = await getPublishedProducts();
  const bySlug = new Map(allProducts.map((p) => [p.slug, p]));
  const featured = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
  const modelConfigs = MODEL_CONFIG_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
  const previewFaq = FAQ_ITEMS;
  const featuredServices = SERVICES.filter((s) => s.priceUsd > 0).slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />
      <HomeHero />

      {/* What is a phone farm — intro */}
      <section className="section section-band--white" id="phone-farm-intro">
        <div className="container-wide grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="eyebrow">New to phone farms?</p>
            <h2 className="section-title">What Is a Phone Farm?</h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-4">
              A <strong className="text-zinc-900">phone farm</strong> runs many real Android phones together for QA testing,
              app compatibility, automation, and multi-device workflows — with centralized power, USB, and network ports in factory-built chassis.
            </p>
            <ul className="space-y-2 text-sm text-zinc-700 mb-6">
              <li className="flex gap-2"><span className="list-marker">→</span> QA teams running regression on real Android silicon</li>
              <li className="flex gap-2"><span className="list-marker">→</span> Automation labs controlling 20+ devices via ADB</li>
              <li className="flex gap-2"><span className="list-marker">→</span> Agencies validating apps across Samsung, OnePlus, Pixel SKUs</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link href="/about#what-is-phone-farm" className="btn-primary text-sm py-2.5">
                Full Introduction
              </Link>
              <Link href="/blog/how-to-choose-phone-farm-box" className="btn-outline text-sm py-2.5">
                Buying Guide
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="photo-stage photo-stage--wide col-span-2 min-h-[200px]">
              <Image src={IMAGES.company.workshop} alt="Guangzhou phone farm assembly workshop" fill className="object-cover object-center" sizes="50vw" />
            </div>
            <div className="photo-stage photo-stage--card">
              <Image src={IMAGES.phoneFarmBox.hero} alt="Configured phone farm box with Android devices" fill className="photo-fit" sizes="25vw" />
            </div>
            <div className="photo-stage photo-stage--card">
              <Image src={IMAGES.motherboardBox.hero} alt="Android motherboard cluster array" fill className="photo-fit" sizes="25vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturer entity — citable block for AI search */}
      <section className="section-tight section-band--soft" id="phone-farm-manufacturer">
        <div className="container-wide max-w-4xl">
          <p className="eyebrow">Factory-direct supplier</p>
          <h2 className="section-title text-2xl md:text-3xl mb-4">
            {AI_ENTITY.brand} — Phone Farm Box Manufacturer, Guangzhou
          </h2>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-4">
            {AI_ENTITY.summary} Standard MOQ is 1 unit for evaluation. Volume pricing from 5 units.
          </p>
          <p className="text-zinc-700 text-sm md:text-base leading-relaxed mb-6 border-l-4 border-[var(--accent)] pl-4">
            {AI_ENTITY.citationBlock}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/glossary" className="btn-outline text-sm py-2.5">Hardware glossary</Link>
            <Link href="/about" className="btn-outline text-sm py-2.5">About the factory</Link>
            <Link href="/contact" className="btn-primary text-sm py-2.5">Get a quote</Link>
          </div>
        </div>
      </section>

      {/* Value props + track record */}
      <section className="section-tight section-band--soft">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-10 mb-8 md:mb-10 border-b border-zinc-200/80">
            {VALUE_PROPS.map((item) => (
              <div key={item.title}>
                <h2 className="font-display font-bold text-zinc-900 text-base mb-1.5">{item.title}</h2>
                <p className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="eyebrow !text-zinc-500 !tracking-widest mb-4">Factory track record</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TRUST_STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl md:text-3xl font-bold text-zinc-900 tabular-nums">{s.value}</p>
                <p className="text-xs md:text-sm text-zinc-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core hardware SKUs */}
      <section className="section section-band--white">
        <div className="container-wide">
          <SectionHead
            eyebrow="Shop hardware"
            title="Phone Farm Boxes, Motherboard Arrays & Custom Racks"
            subtitle="Order standard 20-node chassis online — or send node count, device list, and shipping country for a factory quote."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {featured.map((p) => {
              const meta = getProductMeta(p!.slug);
              return (
                <ProductCard
                  key={p!.id}
                  slug={p!.slug}
                  name={p!.name}
                  shortDesc={p!.shortDesc}
                  priceUsd={p!.priceUsd}
                  stock={p!.stock}
                  imageCard={getProductCardImage(p!.slug, p!.imageCard)}
                  category={p!.category}
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
          <div className="text-center mt-8">
            <Link href="/products" className="btn-primary">Browse Full Catalog</Link>
          </div>
        </div>
      </section>

      {/* Samsung / chipset model configurations — reference-style SKU row */}
      <section className="section-tight section-band--muted">
        <div className="container-wide">
          <SectionHead
            eyebrow="Samsung &amp; chipset builds"
            title="Recommended Phone Farm Box Configurations"
            subtitle="Factory-configured 20-node clusters by silicon tier — Snapdragon 835/845/855 and Exynos entry kits with reference USD pricing."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {modelConfigs.map((p) => {
              const meta = getProductMeta(p!.slug);
              return (
                <ProductCard
                  key={p!.id}
                  slug={p!.slug}
                  name={p!.name}
                  shortDesc={p!.shortDesc}
                  priceUsd={p!.priceUsd}
                  stock={p!.stock}
                  imageCard={getProductCardImage(p!.slug, p!.imageCard)}
                  category={p!.category}
                  tier={meta.tier}
                  nodeCount={meta.nodeCount}
                  deploymentType={meta.deploymentType}
                  moq={meta.moq}
                  leadTime={meta.leadTime}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Recommended models + why choose — side by side on large screens */}
      <section className="section section-band--muted">
        <div className="container-wide">
          <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8 xl:gap-10 items-start">
            <div>
              <SectionHead
                eyebrow="Recommended configurations"
                title="Popular Phone Farm Box Models"
                subtitle={`${getCatalogModels().length} main product photos — Samsung, OnePlus, Pixel, and universal Android builds.`}
              />
              <DeviceModelGrid models={RECOMMENDED_MODELS} />
              <p className="mt-6 flex flex-wrap gap-3 text-sm">
                <Link href="/products/phone-farm-box" className="text-[var(--accent)] font-semibold hover:underline">
                  View all {getCatalogModels().length} models →
                </Link>
                <span className="text-zinc-400">·</span>
                <Link href="/contact" className="text-zinc-600 hover:text-zinc-900">
                  Custom device list quote
                </Link>
              </p>
            </div>
            <div className="xl:sticky xl:top-24">
              <SectionHead
                eyebrow="Why PhoneFarm Fun"
                title="Factory Hardware vs. Alternatives"
              />
              <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
                <table className="compare-table text-sm">
                  <thead>
                    <tr>
                      <th>Capability</th>
                      <th className="bg-orange-50 text-[var(--accent)]">{SITE.name}</th>
                      <th>Typical alternatives</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WHY_CHOOSE.map((row) => (
                      <tr key={row.label}>
                        <td className="font-medium text-zinc-900">{row.label}</td>
                        <td className="bg-orange-50/50 text-zinc-800">{row.us}</td>
                        <td className="text-zinc-600">{row.them}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link href="/compare" className="inline-block mt-3 text-sm font-semibold text-[var(--accent)] hover:underline">
                Full 4-way comparison →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Applications + remote control — combined row */}
      <section className="section section-band--white">
        <div className="container-wide">
          <SectionHead
            eyebrow="Applications"
            title="Device Lab Deployment Scenarios"
            subtitle="QA, marketing, content, and e-commerce teams running real Android hardware at scale."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="rounded-2xl border border-zinc-200/90 bg-white p-4 md:p-5 h-full shadow-sm">
                <h3 className="font-display font-bold text-zinc-900 text-sm md:text-base mb-2">{uc.title}</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center rounded-2xl border border-zinc-200/90 bg-white p-5 md:p-8 shadow-sm">
            <div>
              <p className="eyebrow mb-2">Device lab control</p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-900 mb-3">Batch Control &amp; Remote Operation</h3>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-5">
                {SOFTWARE_CAPABILITIES.map((item) => (
                  <li key={item} className="flex gap-2 text-zinc-700 text-xs md:text-sm">
                    <span className="list-marker list-marker--check shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/services/remote-control-configuration" className="btn-primary text-sm py-2.5">
                Remote Setup Service
              </Link>
            </div>
            <div className="photo-stage photo-stage--wide ring-1 ring-zinc-200">
              <Image
                src={IMAGES.phoneFarmBox.detail}
                alt="Phone farm box hardware detail with USB routing"
                fill
                className="photo-fit--hero"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Factory + services — unified light band */}
      <section className="section section-band--muted">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-8 lg:gap-12 items-end mb-8 md:mb-10">
            <div>
              <p className="eyebrow">Guangzhou factory</p>
              <h2 className="section-title mb-3">Real Devices. Real Assembly. Real Delivery.</h2>
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-4 max-w-xl">
                Physical Android devices in factory-built chassis — burn-in tested, export-packed, optional remote ADB setup before shipment.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-700 mb-5">
                <span>✓ 20-node starter &amp; pro boxes</span>
                <span>✓ Motherboard clusters</span>
                <span>✓ Power &amp; USB modules</span>
                <span>✓ 40+ node custom racks</span>
              </div>
              <Link href="/about" className="text-[var(--accent)] font-semibold text-sm hover:underline">
                About our workshop →
              </Link>
            </div>
            <div className="factory-strip lg:max-w-none">
              {FACTORY_SHOWCASE.map((src, i) => (
                <div key={src} className="factory-strip-item">
                  <Image src={src} alt={`Factory production ${i + 1}`} fill className="object-cover" sizes="(max-width:1024px) 33vw, 200px" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 pt-8 border-t border-zinc-200">
            <div>
              <div className="flex items-end justify-between gap-4 mb-4">
                <h3 className="font-display text-lg md:text-xl font-bold text-zinc-900">Lab services</h3>
                <Link href="/services" className="text-xs font-semibold text-[var(--accent)] hover:underline shrink-0">
                  All services →
                </Link>
              </div>
              <div className="space-y-2">
                {featuredServices.map((svc) => (
                  <Link key={svc.slug} href={`/services/${svc.slug}`} className="band-link group">
                    <div className="band-link-body">
                      <p className="band-link-title group-hover:text-[var(--accent)] transition-colors">{svc.title}</p>
                      <p className="band-link-meta">{svc.description}</p>
                    </div>
                    {svc.priceUsd > 0 && (
                      <span className="band-link-price">From ${svc.priceUsd.toLocaleString()}</span>
                    )}
                    <span className="band-link-arrow" aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-end justify-between gap-4 mb-4">
                <h3 className="font-display text-lg md:text-xl font-bold text-zinc-900">Accessories &amp; modules</h3>
                <Link href="/products?category=Accessory" className="text-xs font-semibold text-[var(--accent)] hover:underline shrink-0">
                  All accessories →
                </Link>
              </div>
              <div className="space-y-2">
                {allProducts
                  .filter((p) => !FEATURED_SLUGS.includes(p.slug as (typeof FEATURED_SLUGS)[number]))
                  .slice(0, 4)
                  .map((p) => {
                    const meta = getProductMeta(p.slug);
                    return (
                      <Link key={p.id} href={`/products/${p.slug}`} className="band-link group">
                        <div className="band-link-thumb">
                          <Image
                            src={getProductCardImage(p.slug, p.imageCard)}
                            alt={p.name}
                            fill
                            className="object-contain object-center p-0.5"
                            sizes="80px"
                          />
                        </div>
                        <div className="band-link-body">
                          <p className="band-link-title group-hover:text-[var(--accent)] transition-colors">{p.name}</p>
                          <p className="band-link-meta">{meta.nodeCount} · {meta.leadTime}</p>
                        </div>
                        <span className="band-link-price">${p.priceUsd.toLocaleString()}</span>
                        <span className="band-link-arrow" aria-hidden>→</span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust — certifications, segments, cases, reviews */}
      <section className="section section-band--white">
        <div className="container-wide space-y-14 md:space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <SectionHead
              eyebrow="Factory trust"
              title="Built in Guangzhou, Shipped Worldwide"
              subtitle="Quality badges, B2B deployment segments, and representative lab projects — factory photos replace video walkthroughs for procurement review."
              center
            />
            <div className="mt-8">
              <CertBadgeStrip />
            </div>
          </div>

          <div>
            <SectionHead
              eyebrow="Who we build for"
              title="B2B Device Lab Segments"
              subtitle="Our chassis mark represents the hardware layer — QA labs, automation teams, and ops groups running real Android silicon."
              center
            />
            <div className="mt-8">
              <ClientLogoWall />
            </div>
          </div>

          <div>
            <SectionHead eyebrow="Case studies" title="Representative Deployments" subtitle="Anonymized B2B projects — hardware scope and outcomes." />
            <div className="mt-8">
              <CaseStudyCards />
            </div>
          </div>

          <div>
            <SectionHead eyebrow="Client feedback" title="What Lab Teams Say" center />
            <div className="mt-8">
              <TestimonialStrip />
            </div>
            <div className="mt-6 flex justify-center">
              <TrustSectionLinks />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + Guides — two columns */}
      <section className="section section-band--white">
        <div className="container-wide grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <SectionHead eyebrow="Support" title="Frequently Asked Questions" />
            <FAQAccordion items={previewFaq} large />
            <Link href="/faq" className="inline-block mt-4 text-sm font-semibold text-[var(--accent)] hover:underline">
              All {FAQ_ITEMS.length} FAQ items →
            </Link>
          </div>
          <div>
            <SectionHead eyebrow="Guides" title="Hardware Guides & Deployment Tips" />
            <div className="space-y-3">
              {BLOG_POSTS.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:shadow-sm transition-all group"
                >
                  <h3 className="font-display font-bold text-zinc-900 text-sm group-hover:text-[var(--accent)] transition-colors">{post.title}</h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{post.excerpt}</p>
                </Link>
              ))}
            </div>
            <Link href="/blog" className="inline-block mt-4 text-sm font-semibold text-[var(--accent)] hover:underline">
              All guides →
            </Link>
          </div>
        </div>
      </section>

      {/* Compact CTA — product image, not awkward full-bleed banner */}
      <section className="cta-band-light">
        <div className="container-wide cta-band-grid">
          <div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 mb-3">
              Ready to deploy real-device hardware?
            </h2>
            <p className="text-zinc-600 text-sm md:text-base mb-6 max-w-xl leading-relaxed">
              Order standard SKUs with USDT checkout, or send your node count and shipping country for a factory quote within 24 hours.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary-lg">Shop Phone Farm Boxes</Link>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-lg border-zinc-300 text-zinc-800 hover:bg-white">
                WhatsApp Sales
              </a>
            </div>
            <p className="text-xs text-zinc-500 mt-4">
              {CONTACT.telegram} · {CONTACT.whatsapp} · {CONTACT.email}
            </p>
          </div>
          <div className="cta-product-stack border-zinc-200/90">
            <Image
              src={IMAGES.phoneFarmBox.hero}
              alt="Configured phone farm box with Android devices"
              fill
              className="photo-fit--hero"
              sizes="340px"
            />
          </div>
        </div>
      </section>
    </>
  );
}
