"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ResolvedCartLine } from "@/lib/cart-resolve";
import { CartLoadingSkeleton, PriceDisplay } from "@/components/store";
import { CheckoutSteps, OrderHowItWorks } from "@/components/checkout-flow";

export default function CartPageClient() {
  const [lines, setLines] = useState<ResolvedCartLine[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    fetch("/api/cart/details")
      .then((res) => res.json())
      .then((data) => {
        setLines(data.lines ?? []);
        setLoading(false);
      })
      .catch(() => {
        setLines([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/cart/details")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setLines(data.lines ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLines([]);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  async function updateQty(type: string, slug: string, quantity: number) {
    await fetch("/api/cart", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, slug, quantity }),
    });
    refresh();
  }

  async function remove(type: string, slug: string) {
    await fetch(`/api/cart?type=${type}&slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
    refresh();
  }

  const total = lines.reduce((s, l) => s + l.priceUsd * l.quantity, 0);

  if (loading) return <CartLoadingSkeleton />;

  return (
    <div className="section pt-8 md:pt-10">
      <div className="container-wide max-w-5xl">
        <CheckoutSteps active={1} />
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] gap-8 items-start">
          <div>
            {lines.length === 0 ? (
              <div className="card p-10 md:p-14 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-3">Your cart is empty</h2>
                <p className="text-base text-zinc-500 mb-8 max-w-md mx-auto">
                  Browse phone farm boxes or request a custom quote.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                  <Link href="/products" className="btn-primary px-10 py-3.5 text-base min-h-[44px] flex items-center justify-center">
                    Shop Products
                  </Link>
                  <Link href="/contact" className="btn-outline px-10 py-3.5 text-base min-h-[44px] flex items-center justify-center">
                    Request Quote
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-5 mb-6">
                  {lines.map((line) => (
                    <div key={`${line.type}-${line.slug}`} className="card p-5 md:p-6">
                      <div className="flex flex-col sm:flex-row gap-5">
                        {line.image && (
                          <div className="relative w-full sm:w-36 md:w-44 h-48 sm:h-36 md:h-44 rounded-xl overflow-hidden shrink-0 bg-zinc-50 border border-zinc-200">
                            <Image src={line.image} alt={line.name} fill className="object-cover" sizes="176px" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={line.type === "product" ? `/products/${line.slug}` : `/services/${line.slug}`}
                            className="font-semibold text-lg text-zinc-900 hover:text-orange-600 line-clamp-2"
                          >
                            {line.name}
                          </Link>
                          <p className="text-sm text-zinc-500 capitalize mt-1">{line.type}</p>
                          {!line.purchasable && (
                            <p className="text-sm text-amber-800 mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 inline-block">
                              Requires quote — remove to checkout other items
                            </p>
                          )}
                          <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
                            <div className="flex items-center gap-3">
                              <button type="button" className="btn-outline px-4 py-2 text-base min-w-[44px] min-h-[44px]" onClick={() => updateQty(line.type, line.slug, line.quantity - 1)} aria-label="Decrease quantity">−</button>
                              <span className="text-zinc-900 w-10 text-center font-semibold text-lg">{line.quantity}</span>
                              <button type="button" className="btn-outline px-4 py-2 text-base min-w-[44px] min-h-[44px]" onClick={() => updateQty(line.type, line.slug, line.quantity + 1)} aria-label="Increase quantity">+</button>
                            </div>
                            <PriceDisplay amount={line.priceUsd * line.quantity} size="md" />
                          </div>
                          <button type="button" onClick={() => remove(line.type, line.slug)} className="text-sm text-zinc-500 hover:text-red-600 mt-4">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card p-6 md:p-8 space-y-5 lg:hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-zinc-900">Total (USD)</span>
                    <PriceDisplay amount={total} size="lg" />
                  </div>
                  <Link href="/checkout" className="btn-primary w-full text-center block py-3.5 text-base min-h-[44px] leading-[44px]">
                    Proceed to Checkout
                  </Link>
                </div>
              </>
            )}
          </div>
          <aside className="space-y-5 lg:sticky lg:top-24">
            <OrderHowItWorks />
            {lines.length > 0 && (
              <div className="card p-6 md:p-8 space-y-5 hidden lg:block">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-zinc-900">Total (USD)</span>
                  <PriceDisplay amount={total} size="lg" />
                </div>
                <p className="text-xs text-zinc-500">Reference USD price. USDT amount shown on next step.</p>
                <Link href="/checkout" className="btn-primary w-full text-center block py-3.5 text-base min-h-[44px] leading-[44px]">
                  Proceed to Checkout
                </Link>
                <Link href="/products" className="block text-center text-sm font-medium text-orange-600 hover:text-orange-500">
                  Continue Shopping
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
