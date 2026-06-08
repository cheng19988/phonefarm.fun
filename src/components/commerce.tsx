"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/config";
import { AddToCartButton } from "./add-to-cart-button";
import { StockBadge } from "./shared";

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
  moq?: number;
  leadTime?: string;
  large?: boolean;
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
  useCase,
  moq = 1,
  leadTime,
  large = false,
}: ProductCardProps) {
  return (
    <article className="card group flex flex-col h-full">
      <Link href={`/products/${slug}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <Image
          src={imageCard}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes={large ? "(max-width:768px) 100vw, 25vw" : "(max-width:768px) 100vw, 33vw"}
        />
        <span className="absolute top-3 left-3 text-xs bg-white/90 text-slate-700 px-2 py-1 rounded border border-slate-200">
          {tier ?? category}
        </span>
      </Link>
      <div className={`flex flex-col flex-1 ${large ? "p-5" : "p-4"}`}>
        <Link href={`/products/${slug}`}>
          <h3 className={`font-semibold text-slate-900 group-hover:text-orange-600 transition-colors mb-1 line-clamp-2 ${large ? "text-lg" : ""}`}>
            {name}
          </h3>
        </Link>
        {nodeCount && (
          <p className="text-xs text-slate-500 mb-1">
            {nodeCount}
            {useCase ? ` · ${useCase}` : ""}
          </p>
        )}
        <p className={`text-slate-600 mb-3 line-clamp-2 flex-1 ${large ? "text-sm" : "text-sm"}`}>{shortDesc}</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-slate-500 mb-3">
          <span>MOQ: {moq}</span>
          {leadTime && <span>Lead: {leadTime}</span>}
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className={`font-bold text-slate-900 ${large ? "text-2xl" : "text-xl"}`}>
            ${priceUsd.toLocaleString()}
          </span>
          <StockBadge stock={stock} />
        </div>
        <div className="grid grid-cols-2 gap-2">
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

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="card p-4 group">
          <summary className="font-medium text-slate-900 cursor-pointer list-none flex justify-between items-center">
            {item.question}
            <span className="text-orange-600 group-open:rotate-45 transition-transform text-xl">+</span>
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
    <div className="flex flex-wrap gap-3 items-center">
      <AddToCartButton
        type="product"
        slug={slug}
        disabled={disabled}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        label={disabled ? "Out of Stock" : "Add to Cart"}
      />
      <Link href={`/contact?product=${slug}`} className="btn-outline">Get Quote</Link>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">WhatsApp</a>
    </div>
  );
}

export function ServiceBuyButtons({ slug, priceUsd }: { slug: string; priceUsd: number }) {
  if (priceUsd <= 0) {
    return (
      <Link href={`/contact?service=${slug}`} className="btn-primary">Request Quote</Link>
    );
  }
  return (
    <div className="flex flex-wrap gap-3">
      <AddToCartButton type="service" slug={slug} className="btn-primary" />
      <Link href={`/contact?service=${slug}`} className="btn-outline">Get Quote</Link>
    </div>
  );
}
