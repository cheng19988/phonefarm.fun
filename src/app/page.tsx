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

const FEATURED_SLUGS = ["phone-farm-box", "motherboard-box", "custom-cabinet"] as const;

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
  const previewFaq = FAQ_ITEMS.slice(0, 6);
  const featuredServices = SERVICES.filter((s) => s.priceUsd > 0).slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />
      <HomeHero />

      {/* What is a phone farm — intro for new visitors */}
      <section className="section bg-white border-b border-zinc-200">
        <div className="container-wide grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="eyebrow">New to phone farms?</p>
            <h2 className="section-title">What Is a Phone Farm?</h2>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-4">
              A <strong className="text-zinc-900">phone farm</strong> is a rack or box that runs many real Android phones together —
              connected by USB and network ports for QA testing, app compatibility checks, automation scripts, and multi-device workflows.
            </p>
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed mb-4">
              Unlike cloud phones or emulators, our hardware uses <strong className="text-zinc-900">physical devices</strong> in factory-built chassis.
              Each 20-node box provides power, cooling, and port routing (USB · LAN · OTG) so your lab can deploy, test, and scale reliably.
            </p>
            <ul className="space-y-2 text-sm text-zinc-700 mb-6">
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> QA teams running regression on real Android silicon</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Automation labs controlling 20+ devices via ADB</li>
              <li className="flex gap-2"><span className="text-[var(--accent)]">→</span> Agencies validating apps across Samsung, OnePlus, Pixel SKUs</li>
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
            <div className="photo-stage photo-stage--wide col-span-2">
              <Image src={IMAGES.productsHeroChassis} alt="Phone farm box chassis" fill className="photo-fit--hero" sizes="50vw" />
            </div>
            <div className="photo-stage photo-stage--card">
              <Image src={IMAGES.motherboardBox.hero} alt="Motherboard array" fill className="photo-fit" sizes="25vw" />
            </div>
            <div className="photo-stage photo-stage--card">
              <Image src={IMAGES.phoneFarmBox.hero} alt="Configured phone farm build" fill className="photo-fit" sizes="25vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Value proposition strip */}
      <section className="value-strip section-tight">
        <div className="container-wide grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          {VALUE_PROPS.map((item) => (
            <div key={item.title} className="value-strip-item">
              <h2 className="font-display font-bold text-zinc-900 text-base mb-1.5">{item.title}</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Track record — light band with context */}
      <section className="bg-zinc-100 border-y border-zinc-200 section-tight">
        <div className="container-wide">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Factory track record</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <p className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 tabular-nums">{s.value}</p>
                <p className="text-xs md:text-sm text-zinc-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core hardware SKUs */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHead
            eyebrow="Shop hardware"
            title="Phone Farm Boxes, Motherboard Arrays & Custom Racks"
            subtitle="Order standard 20-node chassis online — or send node count, device list, and shipping country for a factory quote."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {featured.map((p) => {
              const meta = getProductMeta(p!.slug);
              const cardImage = getProductCardImage(p!.slug, p!.imageCard);
              return (
                <Link key={p!.id} href={`/products/${p!.slug}`} className="featured-product group">
                  <div className="featured-product-image">
                    <Image
                      src={cardImage}
                      alt={p!.name}
                      fill
                      className="photo-fit group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 text-zinc-800 text-[10px] font-semibold px-2 py-1 rounded-md border border-zinc-200">
                      {meta.tier ?? p!.category}
                    </span>
                  </div>
                  <div className="featured-product-body p-5 md:p-6">
                    <h3 className="font-display text-lg font-bold text-zinc-900 mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                      {p!.name}
                    </h3>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-3 flex-1 line-clamp-2">{p!.shortDesc}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-auto">
                      <span className="text-base font-bold text-zinc-900">${p!.priceUsd.toLocaleString()}</span>
                      <span className="text-sm font-semibold text-[var(--accent)]">Details →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href="/products" className="btn-primary">Browse Full Catalog</Link>
          </div>
        </div>
      </section>

      {/* Recommended models + why choose — side by side on large screens */}
      <section className="section bg-[var(--surface)]">
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
                    </tr>
                  </thead>
                  <tbody>
                    {WHY_CHOOSE.map((row) => (
                      <tr key={row.label}>
                        <td className="font-medium text-zinc-900">{row.label}</td>
                        <td className="bg-orange-50/50 text-zinc-800">{row.us}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications + remote control — combined row */}
      <section className="section bg-white">
        <div className="container-wide">
          <SectionHead
            eyebrow="Applications"
            title="Device Lab Deployment Scenarios"
            subtitle="QA, marketing, content, and e-commerce teams running real Android hardware at scale."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 md:p-5 h-full">
                <h3 className="font-display font-bold text-zinc-900 text-sm md:text-base mb-2">{uc.title}</h3>
                <p className="text-xs md:text-sm text-zinc-600 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center rounded-2xl border border-zinc-200 bg-[var(--surface)] p-5 md:p-8">
            <div>
              <p className="eyebrow mb-2">Device lab control</p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-900 mb-3">Batch Control &amp; Remote Operation</h3>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 mb-5">
                {SOFTWARE_CAPABILITIES.map((item) => (
                  <li key={item} className="flex gap-2 text-zinc-700 text-xs md:text-sm">
                    <span className="text-[var(--accent)] font-bold shrink-0">✓</span>
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

      {/* Factory + services — dense two-column */}
      <section className="r-dark-band">
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">
            <div>
              <p className="eyebrow text-[var(--accent)]">Guangzhou factory</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Real Devices. Real Assembly. Real Delivery.
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-5">
                Physical Android devices in factory-built chassis — burn-in tested, export-packed, optional remote ADB setup before shipment.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-zinc-300 mb-5">
                <span>✓ 20-node starter &amp; pro boxes</span>
                <span>✓ Motherboard clusters</span>
                <span>✓ Power &amp; USB modules</span>
                <span>✓ 40+ node custom racks</span>
              </div>
              <Link href="/about" className="text-[var(--accent)] font-semibold text-sm hover:underline">
                About our workshop →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {FACTORY_SHOWCASE.map((src, i) => (
                <div key={src} className="factory-grid-item ring-1 ring-white/10">
                  <Image src={src} alt={`Factory ${i + 1}`} fill className="object-cover" sizes="15vw" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Lab services</p>
              <div className="space-y-2">
                {featuredServices.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[var(--accent)]/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-sm">{svc.title}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{svc.description}</p>
                    </div>
                    {svc.priceUsd > 0 && (
                      <span className="text-xs font-semibold text-[var(--accent)] shrink-0">From ${svc.priceUsd.toLocaleString()}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">Accessories &amp; modules</p>
              <div className="grid grid-cols-2 gap-3">
                {allProducts
                  .filter((p) => !FEATURED_SLUGS.includes(p.slug as (typeof FEATURED_SLUGS)[number]))
                  .slice(0, 4)
                  .map((p) => {
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
                        compact
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + Guides — two columns */}
      <section className="section bg-white">
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
      <section className="cta-band">
        <div className="container-wide cta-band-grid">
          <div>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
              Ready to deploy real-device hardware?
            </h2>
            <p className="text-zinc-400 text-sm md:text-base mb-6 max-w-xl leading-relaxed">
              Order standard SKUs with USDT checkout, or send your node count and shipping country for a factory quote within 24 hours.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary-lg">Shop Phone Farm Boxes</Link>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-lg">
                WhatsApp Sales
              </a>
            </div>
            <p className="text-xs text-zinc-500 mt-4">
              {CONTACT.email} · {CONTACT.phone} · {SITE.location}
            </p>
          </div>
          <div className="cta-product-stack">
            <Image
              src={IMAGES.productsHeroChassis}
              alt="20-node phone farm box chassis"
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
