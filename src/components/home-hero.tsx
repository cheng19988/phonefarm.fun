import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export function HomeHero() {
  return (
    <section className="shop-hero -mt-[120px] pt-[120px]">
      <div className="shop-hero-bg" aria-hidden>
        <Image
          src={IMAGES.homeHeroBg}
          alt=""
          fill
          className="object-cover object-center scale-105"
          priority
          sizes="100vw"
        />
        <div className="shop-hero-overlay" />
      </div>

      <div className="container-wide shop-hero-grid">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow text-orange-400 mb-4">
            {SITE.location} · Factory-built since {SITE.since}
          </p>
          <h1 className="shop-hero-title">
            Professional Phone Farm Boxes &amp; Motherboard Arrays
          </h1>
          <p className="shop-hero-lead">
            Real Android device farm hardware for QA labs, automation teams, and scalable deployment.
            20-node chassis, high-density motherboard clusters, and custom rack solutions — assembled and tested in Guangzhou.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/products" className="btn-primary-lg">
              Start Shopping
            </Link>
            <Link href="/contact" className="btn-ghost-light">
              Request Custom Quote
            </Link>
          </div>
          <p className="text-sm text-zinc-400 mt-6">
            Reference USD pricing · USDT checkout · MOQ from 1 unit · Export worldwide
          </p>
        </div>

        <div className="relative z-10">
          <div className="product-stage product-stage--hero">
            <Image
              src={IMAGES.homeHeroProduct}
              alt="20-node phone farm box with USB LAN OTG ports and black circuit board routing"
              fill
              className="object-contain p-8 md:p-12"
              priority
              sizes="(max-width:1024px) 90vw, 520px"
            />
          </div>
          <p className="text-center text-xs text-zinc-400 mt-4 max-w-sm mx-auto lg:ml-auto lg:mr-0">
            Factory product photo — Samsung, OnePlus, Pixel, and custom Android model lists.
          </p>
        </div>
      </div>
    </section>
  );
}
