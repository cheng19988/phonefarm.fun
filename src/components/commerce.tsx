"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/config";
import { isQuotePreferredProduct } from "@/lib/product-commerce";
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
  const quotePreferred = isQuotePreferredProduct(slug, leadTime, deploymentType);
  const outOfStock = stock <= 0;

  const commerceLine1 = [nodeCount, deploymentType].filter(Boolean).join(" · ");
  const commerceLine2 = [
    `MOQ ${moq} unit${moq !== 1 ? "s" : ""}`,
    leadTime ? `Lead time ${leadTime}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const ctaMinH = "min-h-[44px]";

  return (
    <article
      className={`card group flex flex-col h-full hover:border-orange-200 transition-all duration-200 ${
        isCatalog ? "product-card-heavy" : featured ? "shadow-md hover:shadow-xl" : ""
      }`}
    >
      <Link
        href={`/products/${slug}`}
        className={`block relative overflow-hidden bg-slate-100 ${
          isCatalog ? "aspect-[4/3] lg:aspect-[3/2]" : "aspect-[4/3]"
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
              isCatalog ? "text-xl md:text-2xl lg:text-[1.65rem]" : featured ? "text-lg md:text-xl" : "text-base md:text-lg"
            }`}
          >
            {name}
          </h3>
        </Link>

        {!compact && (
          <>
            {(commerceLine1 || commerceLine2) && (
              <div className={`mb-4 space-y-1.5 ${isCatalog ? "text-base" : "text-sm"}`}>
                {commerceLine1 && (
                  <p className="text-slate-700 font-medium leading-snug">{commerceLine1}</p>
                )}
                {commerceLine2 && (
                  <p className="text-slate-500 leading-snug">{commerceLine2}</p>
                )}
              </div>
            )}
            {isCatalog && (
              <p className="text-slate-600 mb-4 line-clamp-2 text-base leading-relaxed">{shortDesc}</p>
            )}
            {!isCatalog && (
              <p className={`text-slate-600 mb-3 line-clamp-2 flex-1 ${featured ? "text-sm md:text-base" : "text-sm"}`}>
                {shortDesc}
              </p>
            )}
          </>
        )}

        <div className="flex flex-wrap items-end justify-between gap-3 mb-4 md:mb-5 border-t-2 border-slate-100 pt-4 md:pt-5 mt-auto">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">Reference price</p>
            <PriceDisplay amount={priceUsd} size={isCatalog ? "xl" : compact ? "sm" : "lg"} />
          </div>
          <StockBadge stock={stock} />
        </div>

        <div className={`grid grid-cols-2 gap-2 md:gap-3 ${ctaMinH}`}>
          {quotePreferred ? (
            <>
              <Link
                href={`/contact?product=${slug}`}
                className={`btn-primary text-center w-full ${ctaMinH} flex items-center justify-center ${
                  isCatalog ? "btn-primary-lg !py-3 !text-base" : "text-sm md:text-base py-2.5"
                }`}
              >
                Request Quote
              </Link>
              <Link
                href={`/products/${slug}`}
                className={`btn-outline text-center flex items-center justify-center ${ctaMinH} ${
                  isCatalog ? "btn-outline-lg !py-3 !text-base" : "text-sm md:text-base py-2.5"
                }`}
              >
                View Details
              </Link>
            </>
          ) : (
            <>
              <AddToCartButton
                type="product"
                slug={slug}
                disabled={outOfStock}
                className={`btn-primary text-center w-full disabled:opacity-50 flex items-center justify-center ${ctaMinH} ${
                  isCatalog ? "btn-primary-lg !py-3 !text-base" : "text-sm md:text-base py-2.5"
                }`}
                label={outOfStock ? "Out of Stock" : "Add to Cart"}
              />
              <Link
                href={`/products/${slug}`}
                className={`btn-outline text-center flex items-center justify-center ${ctaMinH} ${
                  isCatalog ? "btn-outline-lg !py-3 !text-base" : "text-sm md:text-base py-2.5"
                }`}
              >
                View Details
              </Link>
            </>
          )}
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
          <Link href={`/services/${slug}`} className={`btn-outline text-center min-h-[44px] flex items-center justify-center ${large ? "btn-outline-lg !py-3" : "text-sm py-2"}`}>View Details</Link>
          <Link href={`/contact?service=${slug}`} className={`btn-primary text-center min-h-[44px] flex items-center justify-center ${large ? "btn-primary-lg !py-3" : "text-sm py-2"}`}>
            {quoteOnly ? "Get Quote" : "Request Quote"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FAQAccordion({ items, large }: { items: { question: string; answer: string }[]; large?: boolean }) {
  return (
    <div className={`space-y-3 ${large ? "md:space-y-3" : ""}`}>
      {items.map((item, i) => (
        <details
          key={i}
          className={`group rounded-xl border-2 border-slate-200 bg-white overflow-hidden transition-colors hover:border-slate-300 open:border-orange-200 open:shadow-md ${
            large ? "open:shadow-lg" : ""
          }`}
        >
          <summary
            className={`font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-start gap-4 px-5 py-4 md:px-6 md:py-5 bg-slate-50/80 group-open:bg-orange-50/50 group-open:border-b group-open:border-slate-200 ${
              large ? "text-base md:text-lg" : "text-sm md:text-base"
            }`}
          >
            <span className="leading-snug">{item.question}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-orange-600 group-open:rotate-45 transition-transform text-lg leading-none shadow-sm">
              +
            </span>
          </summary>
          <p className={`px-5 py-4 md:px-6 md:py-5 text-slate-600 leading-relaxed ${large ? "text-base md:text-lg" : "text-sm"}`}>
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function BuyButtons({
  slug,
  stock = 0,
  quotePreferred = false,
}: {
  slug: string;
  stock?: number;
  quotePreferred?: boolean;
}) {
  const disabled = stock <= 0;

  if (quotePreferred) {
    return (
      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Link href={`/contact?product=${slug}`} className="btn-primary-lg flex-1 sm:flex-none text-center justify-center min-h-[44px] flex items-center">
          Request Quote
        </Link>
        <Link href={`/products/${slug}`} className="btn-outline-lg text-center flex-1 sm:flex-none min-h-[44px] flex items-center justify-center">
          View Details
        </Link>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-base px-5 py-3.5 text-center sm:ml-auto min-h-[44px] flex items-center justify-center"
        >
          WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AddToCartButton
        type="product"
        slug={slug}
        disabled={disabled}
        className="btn-primary-lg w-full disabled:opacity-50 disabled:cursor-not-allowed text-center justify-center min-h-[48px]"
        label={disabled ? "Out of Stock" : "Add to Cart"}
      />
      <Link href={`/contact?product=${slug}`} className="btn-outline-lg w-full text-center block min-h-[48px] leading-[48px]">
        Request Quote
      </Link>
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center text-sm font-medium text-slate-500 hover:text-green-700 py-2 transition-colors"
      >
        WhatsApp sales →
      </a>
    </div>
  );
}

export function ServiceBuyButtons({ slug, priceUsd }: { slug: string; priceUsd: number }) {
  if (priceUsd <= 0) {
    return (
      <div className="flex flex-wrap gap-3">
        <Link href={`/contact?service=${slug}`} className="btn-primary min-h-[44px] flex items-center">Request Quote</Link>
        <Link href={`/services/${slug}`} className="btn-outline min-h-[44px] flex items-center">View Details</Link>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-3">
      <AddToCartButton type="service" slug={slug} className="btn-primary min-h-[44px]" />
      <Link href={`/contact?service=${slug}`} className="btn-outline min-h-[44px] flex items-center">Request Quote</Link>
    </div>
  );
}
