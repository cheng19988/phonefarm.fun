import { getFeaturedProducts } from "@/lib/products-server";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, FAQAccordion } from "@/components/commerce";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { BLOG_POSTS } from "@/data/blog";
import { SERVICES } from "@/data/services";
import { getProductMeta } from "@/data/product-meta";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Real Android Device Farm Hardware for Testing Teams",
  description: SITE.description,
  path: "/",
});

export default async function HomePage() {
  const products = await getFeaturedProducts();
  const previewFaq = FAQ_ITEMS.slice(0, 4);
  const featuredServices = SERVICES.filter((s) => s.priceUsd > 0).slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image src={IMAGES.homeHero} alt="Android device farm hardware from Guangzhou" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
        <div className="container-wide relative py-20">
          <p className="text-cyan-400 font-medium mb-3">{SITE.location} · Hardware assembly since {SITE.since}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight mb-6">
            Real Android Device Farm Hardware for Testing &amp; Automation Teams
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8">{SITE.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary text-lg px-8 py-3">Shop Phone Farm Boxes</Link>
            <Link href="/contact" className="btn-secondary text-lg px-8 py-3">Request Custom Quote</Link>
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide">
          <h2 className="section-title">Featured Hardware SKUs</h2>
          <p className="section-subtitle mb-8">Factory-built boxes and clusters with reference USD pricing. Add to cart or request a quote for bulk orders.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => {
              const meta = getProductMeta(p.slug);
              return (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  shortDesc={p.shortDesc}
                  priceUsd={p.priceUsd}
                  stock={p.stock}
                  imageCard={p.imageCard}
                  category={p.category}
                  tier={meta.tier}
                  nodeCount={meta.nodeCount}
                  useCase={meta.useCase}
                  moq={meta.moq}
                  leadTime={meta.leadTime}
                />
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn-outline">Full Catalog →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="section-title">How to Choose Your Phone Farm Box</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "20-node starter box",
                desc: "Best for small QA teams validating hardware before scaling. Lower entry cost, same real-device chassis design.",
                href: "/products/android-phone-farm",
                cta: "View Starter Box",
              },
              {
                title: "20-node / 40-node pro deployment",
                desc: "Pro boxes and turnkey bundles for continuous app testing, device labs, and remote automation workflows.",
                href: "/products/phone-farm-box",
                cta: "View Pro Box",
              },
              {
                title: "Custom rack / cabinet solution",
                desc: "40+ node rack projects with engineered power, cooling, and cable management for high-density labs.",
                href: "/products/custom-cabinet",
                cta: "Request Custom Quote",
              },
            ].map((item) => (
              <div key={item.title} className="card p-6 flex flex-col">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm flex-1 mb-4">{item.desc}</p>
                <Link href={item.href} className="btn-outline text-sm text-center">{item.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide">
          <h2 className="section-title">Factory Hardware Capabilities</h2>
          <p className="section-subtitle mb-8">What our Guangzhou workshop handles for each shipment — no reseller markup, no cloud phone reselling.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Motherboard cluster assembly", desc: "Screenless Android nodes mounted, wired, and tested in high-density layouts." },
              { title: "Power distribution", desc: "Centralized PSU rails sized for continuous multi-device operation." },
              { title: "Cooling layout", desc: "Ducted fan paths tested under load before export." },
              { title: "Cable management", desc: "Labeled USB routes and tray spacing for stable ADB links." },
              { title: "Pre-shipment testing", desc: "Connectivity burn-in and slot-level QC checklist per unit." },
              { title: "Custom rack configuration", desc: "Engineered layouts for 40+ node labs on quote." },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title text-center">Real Device vs Cloud vs Emulator</h2>
          <p className="text-center text-slate-400 text-sm mb-2">
            PhoneFarm Fun builds physical hardware only — for teams that need genuine Android devices in a managed lab environment.
          </p>
          <p className="text-center">
            <Link href="/faq" className="text-cyan-400 text-sm">Compare options in FAQ →</Link>
          </p>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide">
          <h2 className="section-title">Setup & Lab Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredServices.map((svc) => (
              <Link key={svc.slug} href={`/services/${svc.slug}`} className="card p-6 hover:border-cyan-800 transition-colors">
                <h3 className="font-bold text-white mb-2">{svc.title}</h3>
                <p className="text-sm text-slate-400 mb-3 line-clamp-2">{svc.description}</p>
                <span className="text-cyan-400 text-sm">${svc.priceUsd} · {svc.timeline}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="btn-outline">All Services →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="section-title">Guangzhou Workshop</h2>
          <p className="section-subtitle"><Link href="/about" className="text-cyan-400">About our hardware team →</Link></p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { src: IMAGES.company.office, label: "Office" },
              { src: IMAGES.company.workshop, label: "Workshop" },
              { src: IMAGES.company.warehouse, label: "Warehouse" },
              { src: IMAGES.company.meeting, label: "Meeting" },
              { src: IMAGES.company.frontdesk, label: "Front Desk" },
            ].map((img) => (
              <div key={img.label} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={img.src} alt={img.label} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title text-center">FAQ</h2>
          <FAQAccordion items={previewFaq} />
          <div className="text-center mt-6">
            <Link href="/faq" className="btn-outline">All FAQ →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <h2 className="section-title">Hardware Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 hover:border-cyan-800 transition-colors">
                <h3 className="font-bold text-white">{post.title}</h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to order hardware?</h2>
          <p className="text-slate-400 mb-6">Browse SKUs, add to cart, or send your node count and shipping country for a custom quote.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-primary">Shop Phone Farm Boxes</Link>
            <Link href="/contact" className="btn-secondary">Request Custom Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
