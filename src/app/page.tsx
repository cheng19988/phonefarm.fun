import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/products-server";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, FAQAccordion } from "@/components/commerce";
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

const VALUE_PROPS = [
  {
    icon: "🏭",
    title: "Factory-Direct Hardware",
    desc: "Phone farm boxes, motherboard arrays, power and cooling modules assembled for real-device deployment.",
  },
  {
    icon: "✓",
    title: "Tested Before Shipment",
    desc: "Power, cooling, cabling, and basic operation checks before packing.",
  },
  {
    icon: "⚙",
    title: "Built for Your Setup",
    desc: "Support for 20-node boxes, motherboard clusters, rack cabinets, and custom deployment requests.",
  },
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

      {/* Hero — product-forward, light background */}
      <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 overflow-hidden">
        <div className="container-wide py-10 md:py-14 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-sm font-semibold text-orange-600 mb-3">
                {SITE.location} · Hardware assembly since {SITE.since}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-tight mb-4">
                Professional Phone Farm Boxes &amp; Motherboard Arrays
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
                Factory-built real-device hardware for phone farm setups, app testing labs, remote operation, and scalable device deployment.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products/phone-farm-box" className="btn-primary text-base px-6 py-3">
                  Shop Phone Farm Box
                </Link>
                <Link href="/contact" className="btn-secondary text-base px-6 py-3">
                  Request Custom Quote
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-lg">
                <Image
                  src={IMAGES.phoneFarmBox.hero}
                  alt="20-node phone farm box with real Android devices"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-white relative">
                <Image
                  src={IMAGES.androidFarm.card}
                  alt="Android device farm starter box"
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>
              <div className="hidden md:block absolute -top-3 -right-3 w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-white relative">
                <Image
                  src={IMAGES.motherboardBox.card}
                  alt="Motherboard array cluster"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three value props */}
      <section className="bg-white border-b border-slate-200 py-10 md:py-12">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {VALUE_PROPS.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-12 h-12 shrink-0 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-xl text-orange-600">
                  {item.icon}
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 mb-1">{item.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended products — immediately after hero */}
      <section className="section bg-slate-50">
        <div className="container-wide">
          <h2 className="section-title">Recommended Phone Farm Hardware</h2>
          <p className="section-subtitle">
            Choose factory-configured phone farm boxes, motherboard clusters, and accessories for your deployment size.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  moq={meta.moq}
                  leadTime={meta.leadTime}
                />
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn-outline px-8">
              Full Catalog →
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
