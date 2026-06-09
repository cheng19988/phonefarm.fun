"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CartButton({ inverted = false }: { inverted?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function refresh() {
      fetch("/api/cart")
        .then((r) => r.json())
        .then((d) => setCount(d.count ?? 0))
        .catch(() => setCount(0));
    }
    refresh();
    window.addEventListener("cart-updated", refresh);
    return () => window.removeEventListener("cart-updated", refresh);
  }, []);

  return (
    <Link
      href="/cart"
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-lg border transition-colors ${
        inverted
          ? "border-white/25 text-white hover:bg-white/10"
          : "border-zinc-200 text-zinc-700 hover:border-zinc-400"
      }`}
      aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M6 6h15l-1.5 9h-12z" strokeLinejoin="round" />
        <path d="M6 6L5 3H2" strokeLinecap="round" />
        <circle cx="9" cy="20" r="1" fill="currentColor" stroke="none" />
        <circle cx="18" cy="20" r="1" fill="currentColor" stroke="none" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
