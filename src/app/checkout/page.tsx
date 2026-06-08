import Link from "next/link";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/cart";
import { resolveCartItems } from "@/lib/cart-resolve";
import { getSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
import { PageHero, PriceDisplay } from "@/components/store";

export const metadata = buildMetadata({
  title: "Checkout",
  description: "Confirm your phone farm hardware order.",
  path: "/checkout",
  noIndex: true,
});

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/checkout");

  const lines = await resolveCartItems(await getCart());
  const purchasable = lines.filter((l) => l.purchasable);
  const total = purchasable.reduce((s, l) => s + l.priceUsd * l.quantity, 0);

  return (
    <>
      <PageHero title="Checkout" subtitle={`Signed in as ${session.email}`} compact />
      <section className="section pt-8">
        <div className="container-wide max-w-2xl">
          {purchasable.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-slate-600 mb-4">No purchasable items in cart.</p>
              <Link href="/products" className="btn-primary">Browse Products</Link>
            </div>
          ) : (
            <>
              <div className="card p-6 mb-6">
                <h2 className="font-bold text-slate-900 mb-4">Order summary</h2>
                <div className="space-y-3 mb-4">
                  {purchasable.map((line) => (
                    <div key={`${line.type}-${line.slug}`} className="flex justify-between text-sm gap-4">
                      <span className="text-slate-700">{line.name} × {line.quantity}</span>
                      <span className="text-slate-900 font-medium shrink-0">${(line.priceUsd * line.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Total (USD reference)</span>
                  <PriceDisplay amount={total} size="md" />
                </div>
              </div>

              <div className="card p-6 mb-6 bg-orange-50 border-orange-100">
                <h3 className="font-bold text-slate-900 mb-2">Payment method</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  After placing your order, pay the exact USD amount in <strong className="text-slate-900">USDT (TRC20)</strong> on the order page. This site does not accept credit cards or automatic PayPal checkout.
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  For bank transfer (T/T), Wise, or PayPal invoice, contact{" "}
                  <a href="mailto:sales@phonefarm.fun" className="text-orange-600">sales@phonefarm.fun</a> before checkout.
                </p>
              </div>

              <form action="/api/checkout" method="POST">
                <button type="submit" className="btn-primary w-full py-3 text-base">Place Order</button>
              </form>
              <Link href="/cart" className="block text-center text-sm text-slate-500 mt-4 hover:text-orange-600">← Back to cart</Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}
