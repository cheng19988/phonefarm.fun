"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CartButton() {
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
    <Link href="/cart" className="relative text-slate-300 hover:text-white text-sm">
      Cart
      {count > 0 && (
        <span className="absolute -top-2 -right-4 min-w-[18px] h-[18px] px-1 rounded-full bg-cyan-600 text-white text-[10px] flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
