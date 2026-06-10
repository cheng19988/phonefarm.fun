import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const SHOWCASE = [
  {
    src: IMAGES.productsHeroChassis,
    label: "Phone Farm Box",
    desc: "20-node chassis · USB · LAN · OTG",
    href: "/products/phone-farm-box",
    main: true,
  },
  {
    src: IMAGES.motherboardBox.hero,
    label: "Motherboard Array",
    desc: "Headless cluster",
    href: "/products/motherboard-box",
    main: false,
  },
  {
    src: IMAGES.phoneFarmBox.hero,
    label: "Configured Build",
    desc: "Model-specific ports",
    href: "/products/phone-farm-box",
    main: false,
  },
] as const;

export function ProductsCatalogHero() {
  const main = SHOWCASE[0];
  const secondary = SHOWCASE.slice(1);

  return (
    <section className="page-hero-banner">
      <div className="page-hero-banner-pattern" aria-hidden />
      <div className="container-wide page-hero-banner-grid">
        <div className="max-w-xl">
          <p className="eyebrow mb-3">Factory-built · Guangzhou</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl font-bold text-zinc-900 leading-tight tracking-tight mb-4">
            Phone Farm Hardware Catalog
          </h1>
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-xl mb-5">
            Complete range: phone farm boxes, motherboard arrays, rack solutions, and 20+ Android model configurations with reference USD pricing.
          </p>
          <div className="flex flex-wrap gap-2 text-xs mb-5">
            {["20-node box", "Motherboard cluster", "Custom 40+ rack", "USDT checkout"].map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-md bg-white text-zinc-700 border border-zinc-200 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
          <Link href="/about#what-is-phone-farm" className="text-[var(--accent)] hover:text-[var(--accent-hover)] text-sm font-semibold">
            What is a phone farm? →
          </Link>
        </div>

        <div className="grid grid-cols-[1.15fr_0.85fr] gap-3">
          <Link href={main.href} className="page-hero-banner-media catalog-hero-stage--main catalog-hero-stage--product row-span-2 group !min-h-[240px] lg:!min-h-[300px]">
            <Image
              src={main.src}
              alt={main.label}
              fill
              className="object-contain object-center p-1 group-hover:scale-[1.01] transition-transform duration-300"
              sizes="480px"
              priority
            />
            <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-zinc-700 bg-white/95 backdrop-blur px-2.5 py-1.5 rounded-lg shadow-sm border border-zinc-200/80">
              {main.label} — {main.desc}
            </span>
          </Link>
          {secondary.map((item) => (
            <Link key={item.label} href={item.href} className="page-hero-banner-media catalog-hero-stage--side group !min-h-[110px] lg:!min-h-[140px]">
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="photo-fit group-hover:scale-[1.02] transition-transform duration-300"
                sizes="220px"
              />
              <span className="absolute bottom-2 left-2 right-2 text-[10px] font-semibold text-zinc-600 bg-white/95 px-2 py-1 rounded-md truncate border border-zinc-200/80">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
