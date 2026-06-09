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
import { DeviceModelGrid, DeviceModelGridAll } from "@/components/device-model-grid";
import { DEVICE_MODELS } from "@/data/device-models";
import {
  TRUST_STATS,
  USE_CASES,
  SOFTWARE_CAPABILITIES,
  VALUE_PROPS,
  WHY_CHOOSE,
} from "@/data/use-cases";
import { SITE, CONTACT } from "@/lib/config";

const FEATURED_SLUGS = ["phone-farm-box", "motherboard-box", "custom-cabinet"] as const;

/** Pick 8 distinct flagship models for the homepage spotlight grid */
const RECOMMENDED_MODELS = (() => {
  const seen = new Set<string>();
  const picked = [];
  for (const m of DEVICE_MODELS) {
    const key = `${m.brand}:${m.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    picked.push(m);
    if (picked.length >= 8) break;
  }
  return picked;
})();

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Professional Phone Farm Boxes & Motherboard Arrays",
    description: SITE.description,
    path: "/",
  }),
  ...naverSiteVerificationMetadata(),
};

const FACTORY_SHOWCASE = [
  IMAGES.factoryGallery[2],
  IMAGES.factoryGallery[3],
  IMAGES.company.workshop,
  IMAGES.factoryGallery[5],
  IMAGES.company.warehouse,
  IMAGES.factoryGallery[7],
  IMAGES.phoneFarmBox.detail,
  IMAGES.motherboardBox.detail,
] as const;

export default async function HomePage() {
  const allProducts = await getPublishedProducts();
  const bySlug = new Map(allProducts.map((p) => [p.slug, p]));
  const featured = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
  const previewFaq = FAQ_ITEMS.slice(0, 8);
  const featuredServices = SERVICES.filter((s) => s.priceUsd > 0).slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />
      <HomeHero />

      {/* Value proposition strip */}
      <section className="value-strip">
        <div className="container-wide grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          {VALUE_PROPS.map((item) => (
            <div key={item.title} className="value-strip-item">
              <h2 className="font-display font-bold text-zinc-900 text-lg mb-2">{item.title}</h2>
              <p className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust stats */}
      <section className="bg-[var(--ink)] border-y border-white/5">
        <div className="container-wide py-12 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tabular-nums">{s.value}</p>
                <p className="text-sm md:text-base text-zinc-400 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core hardware SKUs */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mb-14 md:mb-16">
            <p className="eyebrow">Shop hardware</p>
            <h2 className="section-title">Phone Farm Boxes, Motherboard Arrays &amp; Custom Racks</h2>
            <p className="section-subtitle mb-0">
              Order standard 20-node chassis and high-density motherboard clusters online — or send your node count, device model list, and shipping country for a factory engineering quote.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                      className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-zinc-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-zinc-200">
                      {meta.tier ?? p!.category}
                    </span>
                  </div>
                  <div className="featured-product-body">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-zinc-900 mb-2 group-hover:text-[var(--accent)] transition-colors">
                      {p!.name}
                    </h3>
                    <p className="text-zinc-600 leading-relaxed mb-4 flex-1 text-sm md:text-base">{p!.shortDesc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-auto">
                      <span className="text-lg font-bold text-zinc-900">${p!.priceUsd.toLocaleString()}</span>
                      <span className="text-sm font-semibold text-[var(--accent)]">View details →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-14">
            <Link href="/products" className="btn-primary px-10 py-3.5">
              Browse Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended configurations — 8 models */}
      <section className="section bg-[var(--surface)]">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-14">
            <div className="max-w-3xl">
              <p className="eyebrow">Recommended configurations</p>
              <h2 className="section-title mb-3">Popular Phone Farm Box Models</h2>
              <p className="section-subtitle mb-0">
                Factory-staged product photos with RAM, storage, and port routing pulled from our catalog filenames — Samsung Galaxy, OnePlus, Pixel, and universal Android SKUs.
              </p>
            </div>
            <p className="text-sm text-zinc-500 shrink-0">
              {DEVICE_MODELS.length} configurations in catalog
            </p>
          </div>
          <DeviceModelGrid models={RECOMMENDED_MODELS} />
          <p className="text-center mt-10 text-sm text-zinc-600">
            Need a model not listed?{" "}
            <Link href="/contact" className="text-[var(--accent)] font-semibold hover:underline">
              Send your device list for a custom quote
            </Link>
          </p>
        </div>
      </section>

      {/* Why choose us — comparison table */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">Why PhoneFarm Fun</p>
            <h2 className="section-title">Factory Hardware vs. Reseller &amp; DIY Setups</h2>
            <p className="section-subtitle mb-0">
              Real Android devices in engineered chassis — assembled, burn-in tested, and export-packed from Guangzhou. Not cloud phones, not desk clutter, not opaque reseller markup.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="w-[28%]">Capability</th>
                  <th className="w-[36%] bg-orange-50 text-[var(--accent)]">{SITE.name}</th>
                  <th className="w-[36%]">Typical alternatives</th>
                </tr>
              </thead>
              <tbody>
                {WHY_CHOOSE.map((row) => (
                  <tr key={row.label}>
                    <td className="font-medium text-zinc-900">{row.label}</td>
                    <td className="bg-orange-50/50 text-zinc-800">{row.us}</td>
                    <td className="text-zinc-500">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Full model catalog */}
      <section className="section bg-[var(--surface)]" id="model-catalog">
        <div className="container-wide">
          <div className="max-w-3xl mb-12 md:mb-14">
            <p className="eyebrow">Full compatibility list</p>
            <h2 className="section-title">All Supported Device Models</h2>
            <p className="section-subtitle mb-0">
              Every configuration below maps to a real product detail image in our factory catalog. USB, LAN, and OTG port layouts vary by model — confirm your list with sales before ordering.
            </p>
          </div>
          <DeviceModelGridAll />
          <div className="mt-12 text-center">
            <Link href="/products/phone-farm-box" className="btn-outline">
              Phone Farm Box product page →
            </Link>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section bg-white">
        <div className="container-wide">
          <p className="eyebrow">Applications</p>
          <h2 className="section-title">Multi-Scenario Device Lab Deployment</h2>
          <p className="section-subtitle">
            How QA engineers, marketing teams, content studios, and e-commerce operators deploy real-device hardware at scale.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="card-premium p-6 md:p-8 h-full border-zinc-200">
                <h3 className="font-display font-bold text-zinc-900 text-lg mb-3">{uc.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Device lab control — single section */}
      <section className="section bg-[var(--surface)]">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow">Device lab control</p>
              <h2 className="section-title">Batch Control &amp; Remote Operation</h2>
              <p className="section-subtitle mb-8">
                Hardware ships ADB-ready. Optional setup configures grouping, APK deployment, and operator mirroring on your control workstation — vendor-neutral, no proprietary lock-in.
              </p>
              <ul className="space-y-3 mb-8">
                {SOFTWARE_CAPABILITIES.map((item) => (
                  <li key={item} className="flex gap-3 text-zinc-700 text-sm md:text-base">
                    <span className="text-[var(--accent)] font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/services/remote-control-configuration" className="btn-primary">
                  Remote Setup Service
                </Link>
                <Link href="/services" className="btn-outline">
                  All Services
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-zinc-200/80">
              <Image
                src={IMAGES.remoteControl.hero}
                alt="Device lab batch control workstation with multiple Android screens"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Factory credibility */}
      <section className="r-dark-band">
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
            <div>
              <p className="eyebrow text-[var(--accent)]">Guangzhou factory</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Real Devices. Real Assembly. Real Delivery.
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Unlike cloud phones or emulators, our hardware runs physical Android devices in factory-built chassis — with burn-in testing, export packing, and optional remote ADB setup before shipment.
              </p>
              <ul className="space-y-3 text-zinc-300 text-sm md:text-base">
                <li className="flex gap-3"><span className="text-[var(--accent)]">—</span> 20-node starter and pro testing boxes</li>
                <li className="flex gap-3"><span className="text-[var(--accent)]">—</span> High-density motherboard clusters for headless arrays</li>
                <li className="flex gap-3"><span className="text-[var(--accent)]">—</span> Power, cooling, and USB routing modules</li>
                <li className="flex gap-3"><span className="text-[var(--accent)]">—</span> Custom rack cabinets for 40+ node labs</li>
              </ul>
              <Link href="/about" className="inline-block mt-8 text-[var(--accent)] font-semibold hover:underline">
                About our workshop →
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10">
              <Image
                src={IMAGES.workshop}
                alt="Phone farm hardware assembly line in Guangzhou workshop"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {FACTORY_SHOWCASE.map((src, i) => (
              <div key={src} className="factory-grid-item ring-1 ring-white/10">
                <Image src={src} alt={`Factory production ${i + 1}`} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab services */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="eyebrow">Lab services</p>
              <h2 className="section-title">Deployment &amp; Engineering Support</h2>
              <p className="section-subtitle">
                Optional post-delivery services for ADB paths, device grouping, bulk APK deployment, and remote workstation configuration — scoped after hardware arrives at your lab.
              </p>
              <div className="space-y-4">
                {featuredServices.map((svc) => (
                  <Link
                    key={svc.slug}
                    href={`/services/${svc.slug}`}
                    className="block p-5 rounded-xl bg-[var(--surface)] border border-zinc-200 hover:border-[var(--accent)]/40 transition-colors"
                  >
                    <h3 className="font-display font-bold text-zinc-900">{svc.title}</h3>
                    <p className="text-sm text-zinc-600 mt-1 line-clamp-2">{svc.description}</p>
                    {svc.priceUsd > 0 && (
                      <p className="text-sm font-semibold text-[var(--accent)] mt-2">From ${svc.priceUsd.toLocaleString()}</p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { src: IMAGES.company.office, label: "Office" },
                { src: IMAGES.company.workshop, label: "Workshop" },
                { src: IMAGES.company.warehouse, label: "Warehouse" },
                { src: IMAGES.company.meeting, label: "Meeting" },
              ].map((img) => (
                <figure key={img.label} className="factory-grid-item ring-1 ring-zinc-200">
                  <Image src={img.src} alt={img.label} fill className="object-cover" sizes="25vw" />
                  <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-xs font-medium text-white">
                    {img.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More hardware SKUs */}
      <section className="section bg-[var(--surface)]">
        <div className="container-wide">
          <p className="eyebrow">Accessories &amp; components</p>
          <h2 className="section-title">Power, Cooling, USB &amp; Network Modules</h2>
          <p className="section-subtitle">
            Expand existing chassis with replacement modules, hub upgrades, and rack accessories — all from the same Guangzhou supply chain.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
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
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-wide max-w-3xl">
          <p className="eyebrow text-center">Support</p>
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <p className="section-subtitle text-center mx-auto">
            Shipping, payment, device compatibility, MOQ, and remote setup — answers for B2B buyers evaluating phone farm hardware.
          </p>
          <FAQAccordion items={previewFaq} large />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn-outline">All {FAQ_ITEMS.length} FAQ items →</Link>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="section bg-[var(--surface)]">
        <div className="container-wide">
          <p className="eyebrow">Guides</p>
          <h2 className="section-title">Hardware Guides &amp; Deployment Tips</h2>
          <p className="section-subtitle">
            Technical articles on ADB setup, rack planning, model selection, and export logistics — written for engineering and procurement teams.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {BLOG_POSTS.slice(0, 6).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card-premium p-6 md:p-8 group h-full flex flex-col">
                <time className="text-xs text-zinc-400 uppercase tracking-wide">{post.date}</time>
                <h3 className="font-display font-bold text-zinc-900 text-lg mt-2 group-hover:text-[var(--accent)] transition-colors">{post.title}</h3>
                <p className="text-sm text-zinc-600 mt-3 line-clamp-3 leading-relaxed flex-1">{post.excerpt}</p>
                <span className="text-sm font-semibold text-[var(--accent)] mt-4">Read guide →</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="btn-outline">All guides →</Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden min-h-[420px] flex items-center">
        <Image src={IMAGES.banners.home} alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[var(--ink)]/85" />
        <div className="container-wide relative z-10 py-20 text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            Ready to deploy real-device hardware?
          </h2>
          <p className="text-zinc-300 text-lg mb-10 leading-relaxed">
            Order standard SKUs online with USDT checkout, or send your node count, device model list, and shipping country for a factory quote within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-primary-lg">Shop Phone Farm Boxes</Link>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-lg">
              WhatsApp Sales
            </a>
          </div>
          <p className="text-sm text-zinc-500 mt-8">
            {CONTACT.email} · {CONTACT.phone} · {SITE.location}
          </p>
        </div>
      </section>
    </>
  );
}
