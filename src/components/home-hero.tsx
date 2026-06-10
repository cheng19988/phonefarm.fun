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
            Professional Phone Farm Boxes &amp; Motherboard Arrays
          </h1>
          <p className="shop-hero-lead text-base md:text-lg mt-4 text-zinc-600">
            Real Android device farm hardware for QA labs, automation teams, and scalable deployment —
            20-node chassis, motherboard clusters, and custom racks assembled in Guangzhou.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/products" className="btn-primary-lg shadow-lg shadow-orange-900/15">
              Start Shopping
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
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3 font-semibold">Ordering at a glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {ORDERING_FACTS.map((item) => (
              <div key={item.label} className="rounded-xl bg-white px-3 py-2.5 md:px-4 md:py-3 border border-zinc-200/90 shadow-sm">
                <p className="font-semibold text-zinc-900 text-sm">{item.value}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
