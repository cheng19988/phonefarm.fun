import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

const QUICK_SPECS = [
  { value: "From 1 unit", label: "MOQ" },
  { value: "3–7 business days", label: "Standard lead time" },
  { value: "USDT · TRC20", label: "Checkout" },
  { value: "DHL · FedEx · Sea", label: "Export freight" },
] as const;

export function HomeHero() {
  return (
    <>
      <section className="shop-hero -mt-[120px] pt-[120px]">
        <div className="shop-hero-bg" aria-hidden>
          <Image
            src={IMAGES.homeHeroBg}
            alt=""
            fill
            className="object-cover object-[center_30%]"
            priority
            sizes="100vw"
          />
          <div className="shop-hero-overlay" />
        </div>

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
              <Link href="/products" className="btn-primary-lg">
                Start Shopping
              </Link>
              <Link href="/contact" className="btn-ghost-light">
                Request Custom Quote
              </Link>
            </div>
          </div>

          <div className="relative z-10">
            <div className="product-stage product-stage--hero max-w-[460px]">
              <Image
                src={IMAGES.homeHeroProduct}
                alt="20-node phone farm box with USB LAN OTG ports"
                fill
                className="object-contain p-6 md:p-8"
                priority
                sizes="(max-width:1024px) 90vw, 460px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick specs — fills gap below hero with useful info */}
      <section className="spec-bar">
        <div className="container-wide grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          {QUICK_SPECS.map((item) => (
            <div key={item.label} className="spec-bar-item">
              <span className="spec-bar-value">{item.value}</span>
              <span className="spec-bar-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
