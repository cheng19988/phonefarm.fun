import Link from "next/link";
import type { ResolvedCartLine } from "@/lib/cart-resolve";
import { PageHero, PriceDisplay } from "@/components/store";

export function CheckoutAccess({
  lines,
  total,
}: {
  lines: ResolvedCartLine[];
  total: number;
}) {
  return (
    <>
      <PageHero
        title="Sign in to continue checkout"
        subtitle="We keep order history and payment confirmation inside your account."
        compact
      />
      <section className="section pt-10 md:pt-12">
        <div className="container-wide max-w-3xl space-y-8">
          {lines.length > 0 ? (
            <div className="card p-6 md:p-8">
              <h2 className="text-xl font-bold text-zinc-900 mb-5">Order summary</h2>
              <div className="space-y-4 mb-6">
                {lines.map((line) => (
                  <div
                    key={`${line.type}-${line.slug}`}
                    className="flex justify-between text-base gap-4 py-2 border-b border-zinc-100 last:border-0"
                  >
                    <span className="text-zinc-700">
                      {line.name} × {line.quantity}
                    </span>
                    <span className="text-zinc-900 font-semibold shrink-0">
                      ${(line.priceUsd * line.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-5 border-t border-zinc-200">
                <span className="text-lg font-bold text-zinc-900">Total (USD reference)</span>
                <PriceDisplay amount={total} size="lg" />
              </div>
            </div>
          ) : (
            <div className="card p-6 md:p-8 text-center">
              <p className="text-zinc-600 text-base mb-2">Your cart is empty or has no purchasable items.</p>
              <Link href="/products" className="text-orange-600 font-medium hover:text-orange-500">
                Browse products →
              </Link>
            </div>
          )}

          <div className="card p-6 md:p-8 space-y-4">
            <Link href="/login?redirect=/checkout" className="btn-primary w-full text-center block py-3.5 text-base min-h-[44px] leading-[44px]">
              Login to Continue
            </Link>
            <Link href="/cart" className="btn-outline w-full text-center block py-3.5 text-base min-h-[44px] leading-[44px]">
              Back to Cart
            </Link>
            <p className="text-center text-sm text-zinc-500 pt-2">
              Need a custom rack or mixed SKU quote?{" "}
              <Link href="/contact" className="text-orange-600 font-medium hover:text-orange-500">
                Request Custom Quote
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
