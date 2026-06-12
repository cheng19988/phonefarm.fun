import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

const ORDERING_FACTS = [
  { value: "From 1 unit", label: "MOQ" },
  { value: "3–7 business days", label: "Standard lead time" },
  { value: "USDT · TRC20", label: "Checkout" },
  { value: "DHL · FedEx · Sea", label: "Export freight" },
] as const;

export function HomeHero() {
  return (
    <section className="shop-hero shop-hero--light">
      <div className="shop-hero-bg-pattern" aria-hidden />

      <div className="container-wide shop-hero-grid">
        <div className="relative z-10 max-w-xl lg:py-4">
          <p className="eyebrow text-[var(--accent)] mb-3">
            {SITE.location} · Factory-built since {SITE.since}
          </p>
          <h1 className="shop-hero-title text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl text-zinc-900">
            Factory-Direct Phone Farm Boxes &amp; Motherboard Arrays
          </h1>
          <p className="shop-hero-lead text-base md:text-lg mt-4 text-zinc-600">
            Guangzhou phone farm box manufacturer — real Android device farm hardware for B2B QA labs and automation teams.
            20-node chassis, motherboard clusters, and rackmount racks with export shipping and optional remote setup.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/products" className="btn-primary-lg shadow-lg shadow-orange-900/15">
              Start Shopping
            </Link>
            <Link href="/contact" className="btn-outline">
              Get Factory Quote
            </Link>
            <Link href="#phone-farm-intro" className="btn-outline">
              What Is a Phone Farm?
            </Link>
          </div>
        </div>

        <div className="relative z-10 hero-product-showcase">
          <div className="hero-product-showcase-frame">
            <Image
              src={IMAGES.productsHeroChassis}
              alt="20-node phone farm box chassis with USB, LAN1, LAN2 and OTG ports"
              fill
              className="object-contain object-center"
              priority
              sizes="(max-width:1024px) 100vw, 760px"
            />
          </div>
          <p className="hero-product-caption">20-node chassis · USB · LAN1 · LAN2 · OTG</p>
        </div>
      </div>

      <div className="relative z-10 border-t border-zinc-200/80 bg-zinc-50/90">
        <div className="container-wide py-4 md:py-5">
          <p className="eyebrow !text-zinc-500 !tracking-widest mb-3">Ordering at a glance</p>
          <div className="trust-stat-grid">
            {ORDERING_FACTS.map((item) => (
              <div key={item.label} className="trust-stat-card">
                <p className="trust-stat-value">{item.value}</p>
                <p className="trust-stat-label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
