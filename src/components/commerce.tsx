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
};

export function ProductCard({ slug, name, shortDesc, priceUsd, stock, imageCard, category }: ProductCardProps) {
  return (
    <article className="card group flex flex-col">
      <Link href={`/products/${slug}`} className="block relative aspect-square overflow-hidden rounded-t-xl bg-slate-900">
        <Image src={imageCard} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width:768px) 100vw, 25vw" />
        <span className="absolute top-3 left-3 text-xs bg-slate-950/80 text-cyan-400 px-2 py-1 rounded">{category}</span>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">{name}</h3>
        </Link>
        <p className="text-sm text-slate-400 mb-3 line-clamp-2 flex-1">{shortDesc}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-white">${priceUsd.toLocaleString()}</span>
          <StockBadge stock={stock} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <AddToCartButton type="product" slug={slug} className="btn-primary text-center text-sm py-2 w-full" label="Add to Cart" />
          <Link href={`/products/${slug}`} className="btn-secondary text-center text-sm py-2">Details</Link>
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
    <div className="flex flex-wrap gap-3">
      <form action="/api/orders" method="POST">
        <input type="hidden" name="productSlug" value={slug} />
        <input type="hidden" name="action" value="buy" />
        <button type="submit" disabled={disabled} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
          Buy Now
        </button>
      </form>
      <AddToCartButton type="product" slug={slug} />
      <Link href={`/contact?product=${slug}`} className="btn-outline">Get Quote</Link>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp</a>
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
      <form action="/api/orders" method="POST">
        <input type="hidden" name="serviceSlug" value={slug} />
        <input type="hidden" name="action" value="buy" />
        <button type="submit" className="btn-primary">Buy Service</button>
      </form>
      <AddToCartButton type="service" slug={slug} />
      <Link href={`/contact?service=${slug}`} className="btn-outline">Get Quote</Link>
    </div>
  );
}
