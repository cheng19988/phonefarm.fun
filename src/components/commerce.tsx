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
}: ProductCardProps) {
  return (
    <article className="card group flex flex-col">
      <Link href={`/products/${slug}`} className="block relative aspect-square overflow-hidden rounded-t-xl bg-slate-900">
        <Image src={imageCard} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:768px) 100vw, 25vw" />
        <span className="absolute top-3 left-3 text-xs bg-slate-950/80 text-cyan-400 px-2 py-1 rounded">{tier ?? category}</span>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1 line-clamp-2">{name}</h3>
        </Link>
        {nodeCount && (
          <p className="text-xs text-cyan-400/90 mb-1">{nodeCount}{useCase ? ` · ${useCase}` : ""}</p>
        )}
        <p className="text-sm text-slate-400 mb-3 line-clamp-2 flex-1">{shortDesc}</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-slate-500 mb-3">
          <span>MOQ: {moq}</span>
          {leadTime && <span>Lead: {leadTime}</span>}
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-white">${priceUsd.toLocaleString()}</span>
          <StockBadge stock={stock} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <AddToCartButton
            type="product"
            slug={slug}
            disabled={stock <= 0}
            className="btn-primary text-center text-sm py-2 w-full disabled:opacity-50"
            label={stock <= 0 ? "Out of Stock" : "Add to Cart"}
          />
          <Link href={`/contact?product=${slug}`} className="btn-outline text-center text-sm py-2">Get Quote</Link>
        </div>
        <Link href={`/products/${slug}`} className="text-center text-xs text-slate-500 hover:text-cyan-400 mt-2">View specs →</Link>
      </div>
    </article>
  );
}

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details key={i} className="card p-4 group">
          <summary className="font-medium text-white cursor-pointer list-none flex justify-between items-center">
            {item.question}
            <span className="text-cyan-400 group-open:rotate-45 transition-transform text-xl">+</span>
          </summary>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">{item.answer}</p>
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
