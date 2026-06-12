import Link from "next/link";

const STEPS = [
  { n: 1, title: "Cart", desc: "Review SKU & quantity" },
  { n: 2, title: "Account", desc: "Login or register" },
  { n: 3, title: "Place order", desc: "Confirm total" },
  { n: 4, title: "Pay USDT", desc: "TRC20 within 30 min" },
  { n: 5, title: "Shipment", desc: "Factory prepares export" },
] as const;

export function CheckoutSteps({ active }: { active: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="mb-8 md:mb-10">
      <ol className="flex flex-wrap gap-2 md:gap-0 md:grid md:grid-cols-5 md:divide-x md:divide-zinc-200 rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
        {STEPS.map((step) => {
          const isActive = step.n === active;
          const isDone = step.n < active;
          return (
            <li
              key={step.n}
              className={`flex-1 min-w-[46%] md:min-w-0 px-3 py-3 md:px-4 md:py-4 ${isActive ? "bg-orange-50" : isDone ? "bg-zinc-50/80" : "bg-white"}`}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : isDone
                        ? "bg-zinc-800 text-white"
                        : "bg-zinc-200 text-zinc-600"
                  }`}
                >
                  {step.n}
                </span>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${isActive ? "text-zinc-900" : "text-zinc-700"}`}>{step.title}</p>
                  <p className="text-xs text-zinc-500 leading-snug mt-0.5 hidden sm:block">{step.desc}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      {active === 4 && (
        <p className="text-xs text-zinc-500 mt-3 leading-relaxed">
          Pay the <strong className="text-zinc-700">exact USDT amount</strong> on Tron TRC20. Card/PayPal not supported online —{" "}
          <Link href="/contact" className="text-[var(--accent)] hover:underline">contact sales</Link> for bank transfer invoice.
        </p>
      )}
    </div>
  );
}

export function OrderHowItWorks({ compact }: { compact?: boolean }) {
  return (
    <div className={`rounded-xl border border-zinc-200 bg-zinc-50/90 ${compact ? "p-4 md:p-5" : "p-5 md:p-6"}`}>
      <h3 className="font-display font-bold text-zinc-900 text-base mb-3">How factory checkout works</h3>
      <ol className="space-y-2.5 text-sm text-zinc-600 list-decimal list-inside leading-relaxed">
        <li>Add in-stock SKUs to cart (custom racks → <Link href="/contact" className="text-[var(--accent)] hover:underline">request quote</Link> instead).</li>
        <li>Login or register — order history stays in your account.</li>
        <li>Place order → you receive a <strong className="text-zinc-800">USDT (TRC20)</strong> payment page with wallet address.</li>
        <li>Send exact USDT within <strong className="text-zinc-800">30 minutes</strong>; paste TXID to speed up verification.</li>
        <li>After payment confirmed, Guangzhou team confirms lead time and export freight.</li>
      </ol>
    </div>
  );
}
