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
    <section className="shop-hero shop-hero--clean -mt-[120px] pt-[120px]">
      <div className="shop-hero-bg-pattern" aria-hidden />

      <div className="container-wide shop-hero-grid">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow text-orange-400 mb-3">
            {SITE.location} · Factory-built since {SITE.since}
          </p>
          <h1 className="shop-hero-title text-3xl sm:text-4xl lg:text-5xl">
            Professional Phone Farm Boxes &amp; Motherboard Arrays
          </h1>
          <p className="shop-hero-lead text-base md:text-lg mt-4">
            Real Android device farm hardware for QA labs, automation teams, and scalable deployment —
            20-node chassis, motherboard clusters, and custom racks assembled in Guangzhou.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href="/products" className="btn-primary-lg shadow-lg shadow-orange-900/20">
              Start Shopping
            </Link>
            <Link href="/about#what-is-phone-farm" className="btn-ghost-light">
              What Is a Phone Farm?
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-full">
          <div className="product-stage product-stage--hero">
            <Image
              src={IMAGES.productsHeroChassis}
              alt="20-node phone farm box chassis with USB, LAN1, LAN2 and OTG ports"
              fill
              className="photo-fit--hero"
              priority
              sizes="(max-width:1024px) 100vw, 560px"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container-wide py-4">
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3">Ordering at a glance</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {ORDERING_FACTS.map((item) => (
              <div key={item.label} className="rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                <p className="font-semibold text-white text-sm">{item.value}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
