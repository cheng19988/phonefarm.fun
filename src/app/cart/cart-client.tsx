"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ResolvedCartLine } from "@/lib/cart-resolve";
import { LoadingBlock, PriceDisplay } from "@/components/store";

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

  if (loading) return <LoadingBlock label="Loading your cart..." />;

  return (
    <div className="section">
      <div className="container-wide max-w-3xl">
        <h1 className="section-title">Shopping Cart</h1>
        {lines.length === 0 ? (
          <div className="card p-8 md:p-12 text-center">
            <p className="text-slate-600 mb-2">Your cart is empty.</p>
            <p className="text-sm text-slate-500 mb-6">Browse phone farm boxes, motherboard clusters, and accessories.</p>
            <Link href="/products" className="btn-primary">Shop Hardware</Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {lines.map((line) => (
                <div key={`${line.type}-${line.slug}`} className="card p-4 md:p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {line.image && (
                      <div className="relative w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-slate-50 border border-slate-200">
                        <Image src={line.image} alt={line.name} fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={line.type === "product" ? `/products/${line.slug}` : `/services/${line.slug}`}
                        className="font-semibold text-slate-900 hover:text-orange-600 line-clamp-2"
                      >
                        {line.name}
                      </Link>
                      <p className="text-sm text-slate-500 capitalize mt-1">{line.type}</p>
                      {!line.purchasable && (
                        <p className="text-xs text-amber-700 mt-2 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block">
                          Requires quote — remove to checkout other items
                        </p>
                      )}
                      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
                        <div className="flex items-center gap-2">
                          <button type="button" className="btn-outline px-3 py-1.5 text-sm min-w-[36px]" onClick={() => updateQty(line.type, line.slug, line.quantity - 1)} aria-label="Decrease quantity">−</button>
                          <span className="text-slate-900 w-8 text-center font-medium">{line.quantity}</span>
                          <button type="button" className="btn-outline px-3 py-1.5 text-sm min-w-[36px]" onClick={() => updateQty(line.type, line.slug, line.quantity + 1)} aria-label="Increase quantity">+</button>
                        </div>
                        <PriceDisplay amount={line.priceUsd * line.quantity} size="sm" />
                      </div>
                      <button type="button" onClick={() => remove(line.type, line.slug)} className="text-sm text-slate-500 hover:text-red-600 mt-3">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total (USD)</span>
                <PriceDisplay amount={total} size="md" />
              </div>
              <Link href="/checkout" className="btn-primary w-full text-center block py-3">Proceed to Checkout</Link>
              <Link href="/products" className="block text-center text-sm text-slate-500 hover:text-orange-600">Continue shopping</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
