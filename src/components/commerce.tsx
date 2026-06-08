"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/config";
import { AddToCartButton } from "./add-to-cart-button";
import { StockBadge } from "./shared";
import { PriceDisplay } from "./store";

type ProductCardProps = {
  slug: string;
  name: string;
  shortDesc: string;
  priceUsd: number;
  stock: number;
  imageCard: string;
  category: string;
  tier?: string;
  nodeCount?: string;
  useCase?: string;
  deploymentType?: string;
  moq?: number;
  leadTime?: string;
  compact?: boolean;
  featured?: boolean;
};

export function ProductCard({
  slug,
  name,
  shortDesc,
  priceUsd,
  stock,
  imageCard,
  category,
  tier,
  nodeCount,
  deploymentType,
  moq = 1,
  leadTime,
  compact = false,
  featured = false,
}: ProductCardProps) {
  return (
    <article
      className={`card group flex flex-col h-full hover:border-orange-200 transition-colors ${
        featured ? "shadow-md hover:shadow-xl" : ""
      }`}
    >
      <Link
        href={`/products/${slug}`}
        className={`block relative overflow-hidden bg-slate-50 ${
          featured ? "aspect-[4/5]" : "aspect-[4/5] sm:aspect-[4/5]"
        }`}
      >
        <Image
          src={imageCard}
          alt={name}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
            featured ? "object-center" : ""
          }`}
          sizes={featured ? "(max-width:768px) 100vw, 22vw" : "(max-width:768px) 100vw, 25vw"}
        />
        <span
          className={`absolute top-3 left-3 bg-white/95 text-slate-700 px-2 py-1 rounded border border-slate-200 font-medium ${
            featured ? "text-xs sm:text-sm px-2.5 py-1" : "text-xs"
          }`}
        >
          {tier ?? category}
        </span>
      </Link>
      <div className={`flex flex-col flex-1 ${compact ? "p-3" : featured ? "p-5 md:p-6" : "p-4 md:p-5"}`}>
        <Link href={`/products/${slug}`}>
          <h3
            className={`font-semibold text-slate-900 group-hover:text-orange-600 transition-colors mb-1 line-clamp-2 leading-snug ${
              featured ? "text-lg md:text-xl" : "text-base md:text-lg"
            }`}
          >
            {name}
          </h3>
        </Link>
        {!compact && (
          <p className={`text-slate-600 mb-3 line-clamp-2 flex-1 ${featured ? "text-sm md:text-base" : "text-sm"}`}>
            {shortDesc}
          </p>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs md:text-sm text-slate-500 mb-3">
          {nodeCount && <span>{nodeCount}</span>}
          {deploymentType && <span>· {deploymentType}</span>}
          <span>MOQ {moq}</span>
          {leadTime && <span>· {leadTime}</span>}
        </div>
        <div className="flex items-center justify-between mb-3 gap-2">
          <PriceDisplay amount={priceUsd} size={compact ? "sm" : "md"} />
          <StockBadge stock={stock} />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <AddToCartButton
            type="product"
            slug={slug}
            disabled={stock <= 0}
            className="btn-primary text-center text-sm py-2.5 w-full disabled:opacity-50"
            label={stock <= 0 ? "Out of Stock" : "Add to Cart"}
          />
          <Link href={`/products/${slug}`} className="btn-outline text-center text-sm py-2.5">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServiceCard({
  slug,
  title,
  description,
  image,
  priceUsd,
  timeline,
  quoteOnly,
}: {
  slug: string;
  title: string;
  description: string;
  image: string;
  priceUsd: number;
  timeline: string;
  quoteOnly?: boolean;
}) {
  return (
    <article className="card overflow-hidden flex flex-col h-full hover:border-orange-200 transition-colors group">
      <Link href={`/services/${slug}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-50">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:768px) 100vw, 33vw" />
        {quoteOnly && (
          <span className="absolute top-3 left-3 text-xs bg-slate-900 text-white px-2 py-1 rounded font-medium">Quote Required</span>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/services/${slug}`}>
          <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2">{title}</h3>
        </Link>
        <p className="text-sm text-slate-600 mb-3 line-clamp-2 flex-1">{description}</p>
        <p className="text-sm font-medium text-orange-600 mb-4">
          {quoteOnly ? "Custom quote — contact sales" : `$${priceUsd.toLocaleString()}`} · {timeline}
        </p>
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Link href={`/services/${slug}`} className="btn-outline text-center text-sm py-2">View Details</Link>
          <Link href={`/contact?service=${slug}`} className="btn-primary text-center text-sm py-2">
            {quoteOnly ? "Get Quote" : "Request Quote"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="card p-4 md:p-5 group">
          <summary className="font-medium text-slate-900 cursor-pointer list-none flex justify-between items-start gap-4">
            <span>{item.question}</span>
            <span className="text-orange-600 group-open:rotate-45 transition-transform text-xl shrink-0 leading-none">+</span>
          </summary>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function BuyButtons({ slug, stock = 0 }: { slug: string; stock?: number }) {
  const disabled = stock <= 0;
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3">
      <AddToCartButton
        type="product"
        slug={slug}
        disabled={disabled}
        className="btn-primary text-base px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none text-center justify-center"
        label={disabled ? "Out of Stock" : "Add to Cart"}
      />
      <Link href={`/contact?product=${slug}`} className="btn-outline text-base px-6 py-3 text-center">Request Quote</Link>
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-sm px-4 py-3 text-center sm:ml-auto"
      >
        WhatsApp
      </a>
    </div>
  );
}

export function ServiceBuyButtons({ slug, priceUsd }: { slug: string; priceUsd: number }) {
  if (priceUsd <= 0) {
    return (
      <div className="flex flex-wrap gap-3">
        <Link href={`/contact?service=${slug}`} className="btn-primary">Request Quote</Link>
        <Link href={`/services/${slug}`} className="btn-outline">View Details</Link>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-3">
      <AddToCartButton type="service" slug={slug} className="btn-primary" />
      <Link href={`/contact?service=${slug}`} className="btn-outline">Request Quote</Link>
    </div>
  );
}
