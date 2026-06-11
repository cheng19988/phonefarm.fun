import Link from "next/link";
import { getCart } from "@/lib/cart";
import { resolveCartItems } from "@/lib/cart-resolve";
import { getSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/config";
import { CheckoutAccess } from "@/components/checkout-access";
import { PageHero, PriceDisplay } from "@/components/store";

export const metadata = buildMetadata({
  title: "Checkout",
  description: "Confirm your phone farm hardware order.",
  path: "/checkout",
  noIndex: true,
});

export default async function CheckoutPage() {
  const session = await getSession();
  const lines = await resolveCartItems(await getCart());
  const purchasable = lines.filter((l) => l.purchasable);
  const total = purchasable.reduce((s, l) => s + l.priceUsd * l.quantity, 0);

  if (!session) {
    return <CheckoutAccess lines={purchasable} total={total} />;
  }

  return (
    <>
      <PageHero title="Checkout" subtitle={`Signed in as ${session.email}`} />
      <section className="section pt-10 md:pt-12">
        <div className="container-wide max-w-3xl">
          {purchasable.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-zinc-600 text-lg mb-6">No purchasable items in cart.</p>
              <Link href="/products" className="btn-primary px-8 py-3">Browse Products</Link>
            </div>
          ) : (
            <>
              <div className="card p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold text-zinc-900 mb-5">Order summary</h2>
                <div className="space-y-4 mb-6">
                  {purchasable.map((line) => (
                    <div key={`${line.type}-${line.slug}`} className="flex justify-between text-base gap-4 py-2 border-b border-zinc-100 last:border-0">
                      <span className="text-zinc-700">{line.name} × {line.quantity}</span>
                      <span className="text-zinc-900 font-semibold shrink-0">${(line.priceUsd * line.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-5 border-t border-zinc-200">
                  <span className="text-lg font-bold text-zinc-900">Total (USD reference)</span>
                  <PriceDisplay amount={total} size="lg" />
                </div>
              </div>

              <div className="card p-6 md:p-8 mb-8 bg-orange-50 border-orange-100">
                <h3 className="text-lg font-bold text-zinc-900 mb-3">Payment method</h3>
                <p className="text-base text-zinc-600 leading-relaxed">
                  After placing your order, pay the exact USD amount in <strong className="text-zinc-900">USDT (TRC20)</strong> on the order page. This site does not accept credit cards or automatic PayPal checkout.
                </p>
                <p className="text-base text-zinc-600 mt-4 leading-relaxed">
                  For bank transfer (T/T), Wise, or PayPal invoice, contact{" "}
                  <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 font-medium">{CONTACT.email}</a> before checkout.
                </p>
              </div>

              <form action="/api/checkout" method="POST">
                <button type="submit" className="btn-primary w-full py-3.5 text-base">Place Order</button>
              </form>
              <Link href="/cart" className="block text-center text-sm text-zinc-500 mt-5 hover:text-orange-600">← Back to cart</Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}
