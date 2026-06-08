"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ResolvedCartLine } from "@/lib/cart-resolve";

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
    return () => {
      cancelled = true;
    };
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

  if (loading) return <div className="section container-wide text-slate-500">Loading cart...</div>;

  return (
    <div className="section">
      <div className="container-wide max-w-3xl">
        <h1 className="section-title">Shopping Cart</h1>
        {lines.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-slate-600 mb-4">Your cart is empty.</p>
            <Link href="/products" className="btn-primary">Browse Hardware</Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {lines.map((line) => (
                <div key={`${line.type}-${line.slug}`} className="card p-4 flex gap-4 items-center">
                  {line.image && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                      <Image src={line.image} alt={line.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={line.type === "product" ? `/products/${line.slug}` : `/services/${line.slug}`}
                      className="font-medium text-slate-900 hover:text-orange-600"
                    >
                      {line.name}
                    </Link>
                    <p className="text-sm text-slate-500 capitalize">{line.type}</p>
                    {!line.purchasable && (
                      <p className="text-xs text-amber-700 mt-1">Requires quote — remove to checkout other items</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="btn-outline px-2 py-1 text-sm" onClick={() => updateQty(line.type, line.slug, line.quantity - 1)}>−</button>
                    <span className="text-slate-900 w-6 text-center">{line.quantity}</span>
                    <button type="button" className="btn-outline px-2 py-1 text-sm" onClick={() => updateQty(line.type, line.slug, line.quantity + 1)}>+</button>
                  </div>
                  <div className="text-slate-900 font-medium">${(line.priceUsd * line.quantity).toLocaleString()}</div>
                  <button type="button" onClick={() => remove(line.type, line.slug)} className="text-slate-500 hover:text-red-400 text-sm">Remove</button>
                </div>
              ))}
            </div>
            <div className="card p-6 flex justify-between items-center">
              <span className="text-lg font-bold text-slate-900">Total: ${total.toLocaleString()}</span>
              <Link href="/checkout" className="btn-primary">Proceed to Checkout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
