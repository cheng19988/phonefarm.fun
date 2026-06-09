import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const SHOWCASE = [
  {
    src: IMAGES.phoneFarmBox.hero,
    label: "Phone Farm Box",
    desc: "20-node real-device chassis",
    href: "/products/phone-farm-box",
  },
  {
    src: IMAGES.motherboardBox.hero,
    label: "Motherboard Array",
    desc: "High-density headless clusters",
    href: "/products/motherboard-box",
  },
  {
    src: IMAGES.customCabinet.hero,
    label: "Custom Rack",
    desc: "40+ node lab projects",
    href: "/products/custom-cabinet",
  },
] as const;

export function ProductsCatalogHero() {
  return (
    <section className="catalog-hero catalog-hero--showcase">
      <div className="catalog-hero-bg-pattern" aria-hidden />
      <div className="container-wide relative z-10 py-10 md:py-12 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="eyebrow text-orange-400 mb-3">Factory-built · Guangzhou</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
              Phone Farm Hardware Catalog
            </h1>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-xl mb-6">
              Phone farm boxes, motherboard arrays, rack solutions, and lab accessories — reference USD pricing, MOQ from 1 unit, and export lead times for B2B buyers.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {["Starter · Standard · High-density", "Samsung · OnePlus · Pixel SKUs", "USDT checkout"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-white/10 text-zinc-200 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {SHOWCASE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="catalog-hero-product group"
              >
                <div className="catalog-hero-product-image">
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-contain p-2 md:p-3 group-hover:scale-[1.03] transition-transform duration-300"
                    sizes="(max-width:1024px) 33vw, 180px"
                    priority
                  />
                </div>
                <div className="catalog-hero-product-caption">
                  <p className="font-semibold text-white text-[10px] md:text-xs leading-tight">{item.label}</p>
                  <p className="text-zinc-400 text-[9px] md:text-[10px] mt-0.5 hidden sm:block">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
