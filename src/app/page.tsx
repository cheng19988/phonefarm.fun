import { getPublishedProducts } from "@/lib/products-server";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, FAQAccordion } from "@/components/commerce";
import { DeploymentKitForm } from "@/components/deployment-kit-form";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { BLOG_POSTS } from "@/data/blog";
import { SERVICES } from "@/data/services";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Real Device Phone Farm Hardware from Guangzhou",
  description: SITE.description,
  path: "/",
});

export default async function HomePage() {
  const products = await getPublishedProducts({
    take: 6,
    orderBy: "priceUsd",
    order: "asc",
  });

  const previewFaq = FAQ_ITEMS.slice(0, 4);
  const featuredServices = SERVICES.filter((s) => s.priceUsd > 0).slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image src={IMAGES.homeHero} alt="Phone farm box hardware from Guangzhou" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
        <div className="container-wide relative py-20">
          <p className="text-cyan-400 font-medium mb-3">{SITE.location} · Manufacturing since {SITE.since}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-3xl leading-tight mb-6">
            Phone Farm Boxes &amp; Device Arrays — Built in Guangzhou
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">{SITE.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary text-lg px-8 py-3">Browse Hardware</Link>
            <Link href="/contact" className="btn-secondary text-lg px-8 py-3">Talk to Sales</Link>
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide grid md:grid-cols-3 gap-8">
          {[
            { title: "Factory-Direct", desc: "Buy from the Guangzhou team that assembles and QC-tests each chassis — no reseller markup." },
            { title: "QC Before Shipment", desc: "Burn-in testing and export packaging. In-stock units typically ship in 3–5 business days." },
            { title: "Global Shipping", desc: "Export packaging from Guangzhou with express courier or sea freight to North America, Europe, and Southeast Asia." },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h2 className="text-xl font-bold text-white mb-3">{item.title}</h2>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid lg:grid-cols-2 gap-12">
          <div className="card overflow-hidden">
            <div className="relative aspect-video">
              <Image src={IMAGES.phoneFarmBox.hero} alt="Phone Farm Box" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-3">Phone Farm Box</h2>
              <p className="text-slate-400 mb-4">20-node chassis with centralized power, cooling, and USB hub — from ${products.find((p) => p.slug === "phone-farm-box")?.priceUsd ?? 699}.</p>
              <Link href="/products/phone-farm-box" className="btn-primary">View &amp; Buy →</Link>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="relative aspect-video">
              <Image src={IMAGES.motherboardBox.hero} alt="Motherboard Arrays" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-3">Motherboard Arrays</h2>
              <p className="text-slate-400 mb-4">High-density screenless Android nodes for lower per-device cost at scale.</p>
              <Link href="/products/motherboard-box" className="btn-primary">View &amp; Buy →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide">
          <h2 className="section-title">Hardware Catalog</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} slug={p.slug} name={p.name} shortDesc={p.shortDesc} priceUsd={p.priceUsd} stock={p.stock} imageCard={p.imageCard} category={p.category} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn-outline">Full Catalog →</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title text-center">Real Device vs Cloud vs Emulator</h2>
          <p className="text-center text-slate-400 text-sm mb-6">
            PhoneFarm Fun builds physical hardware only. <Link href="/faq" className="text-cyan-400">Compare in FAQ →</Link>
          </p>
        </div>
      </section>

      <section className="section bg-slate-900/50">
        <div className="container-wide">
          <h2 className="section-title">Deployment Services</h2>
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
          <h2 className="section-title">Guangzhou Facilities</h2>
          <p className="section-subtitle"><Link href="/about" className="text-cyan-400">About our factory →</Link></p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "20", label: "Nodes per standard box" },
              { num: "3–5 days", label: "In-stock lead time" },
              { num: "12 mo", label: "Hardware warranty" },
              { num: String(SITE.since), label: "In Guangzhou" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-cyan-400">{s.num}</div>
                <div className="text-slate-400 text-sm">{s.label}</div>
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
          <h2 className="section-title">Guides</h2>
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
        <div className="container-wide max-w-3xl">
          <DeploymentKitForm />
        </div>
      </section>
    </>
  );
}
