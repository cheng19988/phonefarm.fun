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
  const isCatalog = featured && !compact;

  return (
    <article
      className={`card group flex flex-col h-full hover:border-orange-200 transition-all duration-200 ${
        isCatalog ? "product-card-heavy" : featured ? "shadow-md hover:shadow-xl" : ""
      }`}
    >
      <Link
        href={`/products/${slug}`}
        className={`block relative overflow-hidden bg-slate-100 ${
          isCatalog ? "aspect-[4/3] lg:aspect-[3/2]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={imageCard}
          alt={name}
          fill
          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
          sizes={isCatalog ? "(max-width:768px) 100vw, 33vw" : "(max-width:768px) 100vw, 25vw"}
        />
        <span
          className={`absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 font-semibold shadow-sm ${
            isCatalog ? "text-sm" : "text-xs"
          }`}
        >
          {tier ?? category}
        </span>
      </Link>
      <div className={`flex flex-col flex-1 ${compact ? "p-3" : isCatalog ? "p-6 md:p-7 lg:p-8" : featured ? "p-5 md:p-6" : "p-4 md:p-5"}`}>
        <Link href={`/products/${slug}`}>
          <h3
            className={`font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-2 leading-snug ${
              isCatalog ? "text-xl md:text-2xl" : featured ? "text-lg md:text-xl" : "text-base md:text-lg"
            }`}
          >
            {name}
          </h3>
        </Link>
        {!compact && (
          <div className={`grid grid-cols-2 gap-2 mb-4 ${isCatalog ? "gap-3" : ""}`}>
            {nodeCount && (
              <div className={`rounded-lg border border-slate-200 bg-slate-50 ${isCatalog ? "px-3 py-2.5" : "px-2.5 py-1.5"}`}>
                <span className="text-[10px] md:text-xs uppercase tracking-wide text-slate-500 font-semibold block">Nodes</span>
                <span className={`font-bold text-slate-800 ${isCatalog ? "text-sm md:text-base" : "text-xs md:text-sm"}`}>{nodeCount}</span>
              </div>
            )}
            {deploymentType && (
              <div className={`rounded-lg border border-slate-200 bg-slate-50 ${isCatalog ? "px-3 py-2.5" : "px-2.5 py-1.5"}`}>
                <span className="text-[10px] md:text-xs uppercase tracking-wide text-slate-500 font-semibold block">Deployment</span>
                <span className={`font-bold text-slate-800 line-clamp-1 ${isCatalog ? "text-sm md:text-base" : "text-xs md:text-sm"}`}>{deploymentType}</span>
              </div>
            )}
            <div className={`rounded-lg border border-slate-200 bg-slate-50 ${isCatalog ? "px-3 py-2.5" : "px-2.5 py-1.5"}`}>
              <span className="text-[10px] md:text-xs uppercase tracking-wide text-slate-500 font-semibold block">MOQ</span>
              <span className={`font-bold text-slate-800 ${isCatalog ? "text-sm md:text-base" : "text-xs md:text-sm"}`}>{moq} unit{moq !== 1 ? "s" : ""}</span>
            </div>
            {leadTime && (
              <div className={`rounded-lg border border-slate-200 bg-slate-50 ${isCatalog ? "px-3 py-2.5" : "px-2.5 py-1.5"}`}>
                <span className="text-[10px] md:text-xs uppercase tracking-wide text-slate-500 font-semibold block">Lead time</span>
                <span className={`font-bold text-slate-800 ${isCatalog ? "text-sm md:text-base" : "text-xs md:text-sm"}`}>{leadTime}</span>
              </div>
            )}
          </div>
        )}
        {!compact && !isCatalog && (
          <p className={`text-slate-600 mb-3 line-clamp-2 flex-1 ${featured ? "text-sm md:text-base" : "text-sm"}`}>
            {shortDesc}
          </p>
        )}
        {!compact && isCatalog && (
          <p className="text-slate-600 mb-4 line-clamp-2 text-base leading-relaxed">{shortDesc}</p>
        )}
        <div className="flex items-end justify-between mb-4 md:mb-5 gap-3 border-t-2 border-slate-100 pt-4 md:pt-5">
          <PriceDisplay amount={priceUsd} size={isCatalog ? "lg" : compact ? "sm" : "md"} />
          <StockBadge stock={stock} />
        </div>
        <div className={`grid grid-cols-2 gap-2 md:gap-3 mt-auto ${isCatalog ? "md:grid-cols-2" : ""}`}>
          <AddToCartButton
            type="product"
            slug={slug}
            disabled={stock <= 0}
            className={`btn-primary text-center w-full disabled:opacity-50 ${
              isCatalog ? "btn-primary-lg !py-3 !text-base" : "text-sm py-2.5"
            }`}
            label={stock <= 0 ? "Out of Stock" : "Add to Cart"}
          />
          <Link
            href={`/products/${slug}`}
            className={`btn-outline text-center ${isCatalog ? "btn-outline-lg !py-3 !text-base" : "text-sm py-2.5"}`}
          >
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
  large,
}: {
  slug: string;
  title: string;
  description: string;
  image: string;
  priceUsd: number;
  timeline: string;
  quoteOnly?: boolean;
  large?: boolean;
}) {
  return (
    <article className={`card overflow-hidden flex flex-col h-full hover:border-orange-200 transition-all group ${large ? "product-card-heavy" : ""}`}>
      <Link href={`/services/${slug}`} className={`block relative overflow-hidden bg-slate-100 ${large ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" sizes={large ? "(max-width:768px) 100vw, 40vw" : "(max-width:768px) 100vw, 33vw"} />
        {quoteOnly && (
          <span className="absolute top-3 left-3 text-xs md:text-sm bg-slate-900 text-white px-3 py-1.5 rounded-lg font-semibold">Quote Required</span>
        )}
      </Link>
      <div className={`flex flex-col flex-1 ${large ? "p-6 md:p-7" : "p-5"}`}>
        <Link href={`/services/${slug}`}>
          <h3 className={`font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2 ${large ? "text-xl md:text-2xl" : ""}`}>{title}</h3>
        </Link>
        <p className={`text-slate-600 mb-4 line-clamp-3 flex-1 ${large ? "text-base md:text-lg leading-relaxed" : "text-sm"}`}>{description}</p>
        <p className={`font-semibold text-orange-600 mb-5 ${large ? "text-base" : "text-sm"}`}>
          {quoteOnly ? "Custom quote — contact sales" : `$${priceUsd.toLocaleString()}`} · {timeline}
        </p>
        <div className="grid grid-cols-2 gap-2 md:gap-3 mt-auto">
          <Link href={`/services/${slug}`} className={`btn-outline text-center ${large ? "btn-outline-lg !py-3" : "text-sm py-2"}`}>View Details</Link>
          <Link href={`/contact?service=${slug}`} className={`btn-primary text-center ${large ? "btn-primary-lg !py-3" : "text-sm py-2"}`}>
            {quoteOnly ? "Get Quote" : "Request Quote"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FAQAccordion({ items, large }: { items: { question: string; answer: string }[]; large?: boolean }) {
  return (
    <div className={`space-y-3 ${large ? "md:space-y-4" : ""}`}>
      {items.map((item, i) => (
        <details key={i} className={`card group ${large ? "p-5 md:p-6 lg:p-7" : "p-4 md:p-5"}`}>
          <summary className={`font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-start gap-4 ${large ? "text-base md:text-lg" : ""}`}>
            <span>{item.question}</span>
            <span className="text-orange-600 group-open:rotate-45 transition-transform text-xl shrink-0 leading-none">+</span>
          </summary>
          <p className={`mt-3 text-slate-600 leading-relaxed ${large ? "text-base md:text-lg" : "text-sm"}`}>{item.answer}</p>
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
        className="btn-primary-lg disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none text-center justify-center"
        label={disabled ? "Out of Stock" : "Add to Cart"}
      />
      <Link href={`/contact?product=${slug}`} className="btn-outline-lg text-center flex-1 sm:flex-none">Request Quote</Link>
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-base px-5 py-3.5 text-center sm:ml-auto"
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
