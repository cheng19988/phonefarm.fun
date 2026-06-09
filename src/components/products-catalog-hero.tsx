import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const QUICK_LINKS = [
  { href: "/products/phone-farm-box", label: "Phone Farm Box" },
  { href: "/products/motherboard-box", label: "Motherboard Array" },
  { href: "/products/custom-cabinet", label: "Custom Rack" },
] as const;

export function ProductsCatalogHero() {
  return (
    <section className="catalog-hero catalog-hero--showcase">
      <div className="catalog-hero-bg-pattern" aria-hidden />
      <div className="container-wide relative z-10 py-8 md:py-10 lg:py-12">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-10 items-center">
          <div>
            <p className="eyebrow text-orange-400 mb-3">Factory-built · Guangzhou</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
              Phone Farm Hardware Catalog
            </h1>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-xl mb-5">
              20-node phone farm boxes, motherboard arrays, rack solutions, and lab accessories — reference USD pricing, MOQ from 1 unit, export lead times.
            </p>
            <div className="flex flex-wrap gap-2 text-xs mb-5">
              {["20 nodes per chassis", "USB · LAN · OTG", "USDT checkout"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-white/10 text-zinc-200 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {QUICK_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-orange-400 hover:text-orange-300 font-medium">
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>

          {/* Transparent product cutout on gray stage — no black background */}
          <div className="catalog-hero-stage">
            <Image
              src={IMAGES.productsHeroChassis}
              alt="20-node phone farm box chassis with USB, LAN1, LAN2 and OTG ports"
              fill
              className="object-contain p-4 md:p-6 lg:p-8 drop-shadow-2xl"
              sizes="(max-width:1024px) 100vw, 620px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
