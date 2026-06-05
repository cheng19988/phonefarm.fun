import Link from "next/link";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/cart";
import { resolveCartItems } from "@/lib/cart-resolve";
import { getSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";

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
    <div className="section">
      <div className="container-wide max-w-2xl">
        <h1 className="section-title">Checkout</h1>
        <p className="text-slate-400 mb-6">Signed in as {session.email}</p>

        {purchasable.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-slate-400 mb-4">No purchasable items in cart.</p>
            <Link href="/products" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <>
            <div className="card p-6 mb-6 space-y-3">
              {purchasable.map((line) => (
                <div key={`${line.type}-${line.slug}`} className="flex justify-between text-sm">
                  <span className="text-slate-300">{line.name} × {line.quantity}</span>
                  <span className="text-white">${(line.priceUsd * line.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-white pt-3 border-t border-slate-800">
                <span>Total (USD reference)</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-slate-500">Payment will be collected in USDT (TRC20) on the next step.</p>
            </div>
            <form action="/api/checkout" method="POST">
              <button type="submit" className="btn-primary w-full">Place Order &amp; Pay with USDT</button>
            </form>
            <Link href="/cart" className="block text-center text-sm text-slate-400 mt-4 hover:text-white">← Back to cart</Link>
          </>
        )}
      </div>
    </div>
  );
}
