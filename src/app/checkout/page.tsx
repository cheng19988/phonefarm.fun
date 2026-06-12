import Link from "next/link";
import { getCart } from "@/lib/cart";
import { resolveCartItems } from "@/lib/cart-resolve";
import { getSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/config";
import { getPaymentSettings } from "@/lib/payment-settings";
import { formatUsdtAmount, usdToUsdt } from "@/lib/payment";
import { RfqFirstBanner } from "@/components/pricing-rfq";
import { CheckoutAccess } from "@/components/checkout-access";
import { CheckoutSteps, OrderHowItWorks } from "@/components/checkout-flow";
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
  const settings = await getPaymentSettings();
  const usdtDue = usdToUsdt(total, settings.minAmount);

  if (!session) {
    return <CheckoutAccess lines={purchasable} total={total} />;
  }

  return (
    <>
      <PageHero title="Checkout" subtitle={`Signed in as ${session.email}`} />
      <section className="section pt-10 md:pt-12">
        <div className="container-wide max-w-3xl">
          <CheckoutSteps active={3} />
          <RfqFirstBanner className="mb-8" />
          <div className="mb-8">
            <OrderHowItWorks compact />
          </div>
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
                  <span className="text-lg font-bold text-zinc-900">Order total (USD)</span>
                  <PriceDisplay amount={total} size="lg" />
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-dashed border-zinc-200">
                  <span className="text-base font-semibold text-zinc-800">USDT due at payment (TRC20)</span>
                  <span className="text-lg font-mono font-bold text-zinc-900">{formatUsdtAmount(usdtDue)} USDT</span>
                </div>
                {usdtDue !== Math.round(total * 100) / 100 && (
                  <p className="text-xs text-amber-800 mt-3">
                    Minimum checkout is {settings.minAmount} USDT — USDT due may differ from USD total on small orders.
                  </p>
                )}
              </div>

              <div className="card p-6 md:p-8 mb-8 bg-orange-50 border-orange-100">
                <h3 className="text-lg font-bold text-zinc-900 mb-3">Payment method</h3>
                <p className="text-base text-zinc-600 leading-relaxed">
                  Cart checkout is for <strong className="text-zinc-900">confirmed standard SKUs</strong> at reference price. Pay{" "}
                  <strong className="text-zinc-900">{formatUsdtAmount(usdtDue)} USDT</strong> on{" "}
                  <strong className="text-zinc-900">Tron TRC20</strong> after placing the order — final amount locked on the order page.
                </p>
                <p className="text-base text-zinc-600 mt-4 leading-relaxed">
                  Custom racks, bulk rollouts, or unconfirmed configs:{" "}
                  <a href="/contact" className="text-orange-600 font-medium hover:underline">request a factory quote</a> first.
                  Bank transfer (T/T), Wise, or PayPal via{" "}
                  <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 font-medium">{CONTACT.email}</a>.
                </p>
              </div>

              <form action="/api/checkout" method="POST">
                <button type="submit" className="btn-primary w-full py-3.5 text-base">Place Order (Standard SKU)</button>
              </form>
              <Link href="/cart" className="block text-center text-sm text-zinc-500 mt-5 hover:text-orange-600">← Back to cart</Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}
