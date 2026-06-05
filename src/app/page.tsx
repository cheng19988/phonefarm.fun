import { getPublishedProducts } from "@/lib/products-server";
import Image from "next/image";
import Link from "next/link";
import { ProductCard, FAQAccordion } from "@/components/commerce";
import { DeploymentKitForm } from "@/components/deployment-kit-form";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { FAQ_ITEMS } from "@/data/faq";
import { BLOG_POSTS } from "@/data/blog";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Real Device Phone Farm Hardware from Guangzhou",
  description: SITE.description,
  path: "/",
});

export default async function HomePage() {
  const products = await getPublishedProducts({
    take: 8,
    orderBy: "priceUsd",
    order: "asc",
  });

  const previewFaq = FAQ_ITEMS.slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd(previewFaq)} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <Image src={IMAGES.homeHero} alt="Phone farm box hardware from Guangzhou" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
        <div className="container-wide relative py-20">
          <p className="text-cyan-400 font-medium mb-3">{SITE.location} · Manufacturing since {SITE.since}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-3xl leading-tight mb-6">
            Phone Farm Boxes &amp; Device Arrays — Built in Guangzhou
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            {SITE.intro}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary text-lg px-8 py-3">View Product Catalog</Link>
            <Link href="/contact" className="btn-secondary text-lg px-8 py-3">Get Custom Quote</Link>
          </div>
        </div>
      </section>

      {/* Value Props — Factory Direct */}
      <section className="section bg-slate-900/50">
        <div className="container-wide grid md:grid-cols-3 gap-8">
          {[
            { title: "Factory-Direct", desc: "Work with the Guangzhou team that assembles and tests each chassis — phone farm boxes, motherboard arrays, and supporting modules without reseller markup." },
            { title: "QC Before Shipment", desc: "Burn-in testing, cable routing checks, and packaging for export. Typical lead time 3–5 business days for in-stock configurations." },
            { title: "Built to Your Scale", desc: "From a single 20-node box to rackmount cabinets and custom node counts — we engineer around your device models and workflow." },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h2 className="text-xl font-bold text-white mb-3">{item.title}</h2>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Phone Farm Box + Motherboard Arrays */}
      <section className="section">
        <div className="container-wide grid lg:grid-cols-2 gap-12">
          <div className="card overflow-hidden">
            <div className="relative aspect-video">
              <Image src={IMAGES.phoneFarmBox.hero} alt="Phone Farm Box" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-3">Phone Farm Box</h2>
              <p className="text-slate-400 mb-4">
                Industrial 20-node chassis housing real smartphones with centralized power supply, multi-fan cooling, and USB hub integration. The core hardware for professional phone farm operations.
              </p>
              <Link href="/products/phone-farm-box" className="btn-primary">View Phone Farm Box →</Link>
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="relative aspect-video">
              <Image src={IMAGES.motherboardBox.hero} alt="Motherboard Arrays" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-3">Motherboard Arrays</h2>
              <p className="text-slate-400 mb-4">
                High-density Android motherboard boxes — screenless nodes with centralized PSU and cooling. Lower per-node cost for large-scale automation without sacrificing stability.
              </p>
              <Link href="/products/motherboard-box" className="btn-primary">View Motherboard Box →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section bg-slate-900/50">
        <div className="container-wide">
          <h2 className="section-title">Recommended Phone Farm Hardware</h2>
          <p className="section-subtitle">Factory-configured phone farm boxes, motherboard arrays, USB hubs, power, cooling, and network equipment.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} slug={p.slug} name={p.name} shortDesc={p.shortDesc} priceUsd={p.priceUsd} stock={p.stock} imageCard={p.imageCard} category={p.category} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn-outline">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* Real Device vs Cloud */}
      <section className="section">
        <div className="container-wide max-w-4xl">
          <h2 className="section-title text-center">Real Device vs Cloud Phone vs Emulator</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { title: "Real Device Phone Farm", desc: "Physical smartphones with genuine hardware fingerprints, sensors, and carrier profiles. Highest platform trust for multi-account and ad verification workflows.", highlight: true },
              { title: "Cloud Phone", desc: "Virtualized instances on shared servers. Convenient for light testing but detectable by platforms and limited sensor accuracy." },
              { title: "Emulator", desc: "Software simulation on PC. Easily flagged by apps. Not suitable for account-sensitive operations at scale." },
            ].map((item) => (
              <div key={item.title} className={`card p-6 ${item.highlight ? "border-cyan-700" : ""}`}>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-slate-400 text-sm">
            PhoneFarm Fun builds real-device hardware only — <Link href="/faq" className="text-cyan-400">read our FAQ</Link> for detailed comparisons.
          </p>
        </div>
      </section>

      {/* Remote Control / Software */}
      <section className="section bg-slate-900/50">
        <div className="container-wide grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image src={IMAGES.remoteControl.hero} alt="Remote control and group control system" fill className="object-cover" />
          </div>
          <div>
            <h2 className="section-title">Remote Control &amp; Group Control System</h2>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Control dozens of real Android devices from a single screen. Mirror devices, group by client or project, push apps in bulk, and monitor performance in real time — with full group control system configuration support.
            </p>
            <ul className="space-y-2 text-slate-400 mb-6">
              <li>✓ Batch device control &amp; ADB automation</li>
              <li>✓ Bulk APK management</li>
              <li>✓ Real-time visual monitoring dashboard</li>
              <li>✓ Group control system configuration service</li>
            </ul>
            <Link href="/contact?service=remote-control-configuration" className="btn-primary">Remote Control Setup →</Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section">
        <div className="container-wide">
          <h2 className="section-title">Typical Use Cases</h2>
          <p className="section-subtitle">Hardware for teams that need many real devices running in parallel — not cloud VMs or emulators.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "App QA & Compatibility", desc: "Run builds across device models and Android versions on physical hardware." },
              { title: "Social & Content Ops", desc: "Manage multiple accounts from one controlled device cluster with stable USB links." },
              { title: "E-commerce Operations", desc: "Parallel store management and listing workflows on dedicated device racks." },
              { title: "Automation R&D", desc: "Long-running ADB scripts, sensor tests, and fleet monitoring in a cooled enclosure." },
            ].map((item) => (
              <div key={item.title} className="card p-6">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="btn-primary text-lg px-8 py-3">Design Your Custom Phone Farm Solution</Link>
          </div>
        </div>
      </section>

      {/* B2B Bulk */}
      <section className="section bg-slate-900/50">
        <div className="container-wide grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-title">B2B Bulk Procurement &amp; Custom Solutions</h2>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Enterprise clients and agencies can order bulk phone farm boxes, custom rackmount cabinets, and tailored hardware configurations. We provide dedicated project management, sample evaluation kits, and overseas delivery from Guangzhou.
            </p>
            <ul className="space-y-2 text-slate-400 mb-6">
              <li>✓ Bulk pricing from 5+ units</li>
              <li>✓ Custom chassis and node count engineering</li>
              <li>✓ Enterprise rack deployment &amp; remote ops support</li>
              <li>✓ Sample units for evaluation before bulk order</li>
            </ul>
            <Link href="/contact" className="btn-primary">Request B2B Quote →</Link>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image src={IMAGES.customCabinet.hero} alt="Enterprise custom cabinet deployment" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Factory Gallery */}
      <section className="section">
        <div className="container-wide">
          <h2 className="section-title">Guangzhou Factory &amp; Facilities</h2>
          <p className="section-subtitle">Office, assembly workshop, and warehouse in Guangzhou — <Link href="/about" className="text-cyan-400 hover:text-cyan-300">see more on About</Link>.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { src: IMAGES.company.office, label: "Office" },
              { src: IMAGES.company.frontdesk, label: "Front Desk" },
              { src: IMAGES.company.meeting, label: "Meeting Room" },
              { src: IMAGES.company.workshop, label: "Production Workshop" },
              { src: IMAGES.company.warehouse, label: "Warehouse" },
            ].map((img) => (
              <div key={img.label} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <Image src={img.src} alt={img.label} fill className="object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3">
                  <span className="text-white text-sm font-medium">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust highlights */}
      <section className="section bg-slate-900/50">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "20", label: "Nodes per standard box" },
            { num: "3–5 days", label: "Typical in-stock lead time" },
            { num: "12 mo", label: "Hardware warranty" },
            { num: String(SITE.since), label: "Manufacturing in Guangzhou" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{s.num}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section">
        <div className="container-wide max-w-3xl">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <FAQAccordion items={previewFaq} />
          <div className="text-center mt-8">
            <Link href="/faq" className="btn-outline">View All FAQ →</Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section bg-slate-900/50">
        <div className="container-wide">
          <h2 className="section-title">Guides &amp; Resources</h2>
          <p className="section-subtitle">Practical guides on phone farm boxes, hardware selection, setup, and deployment best practices.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 hover:border-cyan-800 transition-colors group">
                <span className="text-xs text-cyan-400">{post.category}</span>
                <h3 className="font-bold text-white mt-2 group-hover:text-cyan-400 transition-colors">{post.title}</h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="btn-outline">All Guides →</Link>
          </div>
        </div>
      </section>

      {/* Deployment Kit */}
      <section className="section bg-slate-900/50">
        <div className="container-wide max-w-3xl">
          <DeploymentKitForm />
        </div>
      </section>
    </>
  );
}
