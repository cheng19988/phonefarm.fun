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
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

const RECOMMENDED_SLUGS = [
  "android-phone-farm",
  "phone-farm-box",
  "motherboard-box",
  "custom-cabinet",
] as const;

const HARDWARE_SHOWCASE = [
  {
    src: IMAGES.phoneFarmBox.hero,
    caption: "20-node phone farm box — real Android devices in a factory chassis",
  },
  {
    src: IMAGES.motherboardBox.hero,
    caption: "Motherboard array cluster for headless Android QA at scale",
  },
  {
    src: IMAGES.power.hero,
    caption: "Power distribution and cooling modules sized for continuous operation",
  },
  {
    src: IMAGES.remoteControl.hero,
    caption: "Remote operation setup for device lab management and automation",
  },
] as const;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Professional Phone Farm Boxes & Motherboard Arrays",
    description: SITE.description,
    path: "/",
  }),
  ...naverSiteVerificationMetadata(),
};

export default async function HomePage() {
  const allProducts = await getPublishedProducts();
  const bySlug = new Map(allProducts.map((p) => [p.slug, p]));
  const recommendedProducts = RECOMMENDED_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
  const previewFaq = FAQ_ITEMS.slice(0, 4);
  const featuredServices = SERVICES.filter((s) => s.priceUsd > 0).slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      <HomeHero />

      {/* Recommended products — storefront grid */}
      <section className="section bg-white pt-12 md:pt-16">
        <div className="container-wide">
          <div className="home-section-header">
            <div className="relative">
              <p className="text-orange-400 text-sm font-semibold uppercase tracking-wide mb-2">Shop hardware</p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white mb-3 leading-tight">
                Recommended Phone Farm Hardware
              </h2>
              <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed">
                Factory-configured phone farm boxes, motherboard clusters, and rack cabinets — ready to order or customize for your lab size.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7">
            {recommendedProducts.map((p) => {
              const meta = getProductMeta(p!.slug);
              return (
                <ProductCard
                  key={p!.id}
                  slug={p!.slug}
                  name={p!.name}
                  shortDesc={p!.shortDesc}
                  priceUsd={p!.priceUsd}
                  stock={p!.stock}
                  imageCard={p!.imageCard}
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
          <div className="text-center mt-12">
            <Link href="/products" className="btn-primary px-10 py-3 text-base">
              Browse Full Catalog →
            </Link>
          </div>
        </div>
      </section>

      {/* Hardware showcase banner */}
      <section className="section bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
            <div>
              <h2 className="section-title">What We Ship</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Each order includes assembled chassis hardware — phone farm boxes, motherboard arrays, power and cooling modules, and cabling — ready for your QA or automation workflow.
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2"><span className="text-orange-600">•</span> 20-node starter and pro testing boxes</li>
                <li className="flex gap-2"><span className="text-orange-600">•</span> High-density motherboard clusters for headless Android</li>
                <li className="flex gap-2"><span className="text-orange-600">•</span> Power, cooling, and USB routing accessories</li>
                <li className="flex gap-2"><span className="text-orange-600">•</span> Custom rack cabinets for 40+ node labs</li>
              </ul>
              <Link href="/about" className="inline-block mt-6 text-sm font-medium text-orange-600 hover:text-orange-500">
                About our workshop →
              </Link>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-50">
              <Image
                src={IMAGES.workshop}
                alt="Phone farm hardware assembly workshop"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {HARDWARE_SHOWCASE.map((item) => (
              <figure key={item.caption} className="group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 mb-2">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width:768px) 50vw, 25vw"
                  />
                </div>
                <figcaption className="text-xs md:text-sm text-slate-600 leading-snug">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Setup services — simplified light cards */}
      <section className="section bg-slate-50">
        <div className="container-wide">
          <h2 className="section-title">Setup &amp; Lab Services</h2>
          <p className="section-subtitle">Optional add-on services for deployment, configuration, and remote operation support.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="card p-6 hover:border-orange-200 transition-colors"
              >
                <h3 className="font-bold text-slate-900 mb-2">{svc.title}</h3>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{svc.description}</p>
                <span className="text-orange-600 text-sm font-medium">${svc.priceUsd} · {svc.timeline}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="btn-outline">All Services →</Link>
          </div>
        </div>
      </section>

      {/* Workshop photos */}
      <section className="section bg-white">
        <div className="container-wide">
          <h2 className="section-title">Guangzhou Workshop</h2>
          <p className="section-subtitle mb-8">
            <Link href="/about" className="text-orange-600 hover:text-orange-500">About our hardware team →</Link>
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {[
              { src: IMAGES.company.office, label: "Office" },
              { src: IMAGES.company.workshop, label: "Workshop" },
              { src: IMAGES.company.warehouse, label: "Warehouse" },
              { src: IMAGES.company.meeting, label: "Meeting" },
              { src: IMAGES.company.frontdesk, label: "Front Desk" },
            ].map((img) => (
              <div key={img.label} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
                <Image src={img.src} alt={img.label} fill className="object-cover" sizes="(max-width:768px) 50vw, 20vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-slate-50">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title text-center">FAQ</h2>
          <FAQAccordion items={previewFaq} />
          <div className="text-center mt-6">
            <Link href="/faq" className="btn-outline">All FAQ →</Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section bg-white">
        <div className="container-wide">
          <h2 className="section-title">Hardware Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card p-6 hover:border-orange-200 transition-colors"
              >
                <h3 className="font-bold text-slate-900">{post.title}</h3>
                <p className="text-sm text-slate-600 mt-2 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Single bottom CTA */}
      <section className="section bg-slate-900">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to order hardware?</h2>
          <p className="text-slate-300 mb-6">
            Browse SKUs, add to cart, or send your node count and shipping country for a custom quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-primary">Shop Phone Farm Boxes</Link>
            <Link href="/contact" className="btn-secondary">Request Custom Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
