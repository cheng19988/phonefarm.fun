"use client";

import { useState } from "react";

type Props = {
  type: "product" | "service";
  slug: string;
  className?: string;
  label?: string;
  disabled?: boolean;
};

export function AddToCartButton({ type, slug, className = "btn-secondary text-sm py-2", label = "Add to Cart", disabled = false }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleClick() {
    if (disabled) return;
    setStatus("loading");
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, slug, quantity: 1 }),
    });
    if (res.ok) {
      window.dispatchEvent(new CustomEvent("cart-updated"));
    }
    setStatus("done");
    setTimeout(() => setStatus("idle"), 1500);
  }

  return (
    <button type="button" onClick={handleClick} disabled={disabled || status === "loading"} className={className}>
      {status === "done" ? "Added ✓" : status === "loading" ? "Adding..." : label}
    </button>
  );
}
