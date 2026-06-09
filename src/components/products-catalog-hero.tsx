import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const SHOWCASE = [
  {
    src: IMAGES.productsHeroChassis,
    label: "Phone Farm Box",
    desc: "20-node chassis · USB · LAN · OTG",
    href: "/products/phone-farm-box",
    featured: true,
  },
  {
    src: IMAGES.motherboardBox.hero,
    label: "Motherboard Array",
    desc: "Headless Android cluster",
    href: "/products/motherboard-box",
    featured: false,
  },
  {
    src: IMAGES.phoneFarmBox.hero,
    label: "Configured Build",
    desc: "Model-specific routing",
    href: "/products/phone-farm-box",
    featured: false,
  },
] as const;

export function ProductsCatalogHero() {
  const [main, ...secondary] = SHOWCASE;

  return (
    <section className="catalog-hero catalog-hero--showcase">
      <div className="catalog-hero-bg-pattern" aria-hidden />
      <div className="container-wide relative z-10 py-8 md:py-10 lg:py-12">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-10 items-center">
          <div>
            <p className="eyebrow text-orange-400 mb-3">Factory-built · Guangzhou</p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
              Phone Farm Hardware Catalog
            </h1>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-xl mb-5">
              Complete range: 20-node phone farm boxes, motherboard arrays, rack solutions, power/USB modules, and 20+ Android model configurations.
            </p>
            <div className="flex flex-wrap gap-2 text-xs mb-5">
              {["Phone farm box", "Motherboard cluster", "Custom 40+ rack", "USDT checkout"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-white/10 text-zinc-200 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            <Link href="/about#what-is-phone-farm" className="text-orange-400 hover:text-orange-300 text-sm font-semibold">
              What is a phone farm? →
            </Link>
          </div>

          <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
            <Link href={main.href} className="catalog-hero-stage row-span-2 min-h-[220px] lg:min-h-[280px] group">
              <Image
                src={main.src}
                alt={main.label}
                fill
                className="object-contain p-4 md:p-6 group-hover:scale-[1.02] transition-transform"
                sizes="420px"
                priority
              />
              <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-zinc-700 bg-white/80 backdrop-blur px-2 py-1 rounded-md">
                {main.label} — {main.desc}
              </span>
            </Link>
            {secondary.map((item) => (
              <Link key={item.label} href={item.href} className="catalog-hero-stage min-h-[100px] group">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-contain p-2 md:p-3 group-hover:scale-[1.02] transition-transform"
                  sizes="200px"
                />
                <span className="absolute bottom-2 left-2 right-2 text-[10px] font-semibold text-zinc-600 bg-white/85 px-1.5 py-0.5 rounded truncate">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
