import Link from "next/link";

const DISCLAIMER =
  "Reference price (USD). Final quote confirmed before payment — written proforma, burn-in QC, and freight terms from Guangzhou sales.";

export function ReferencePriceDisplay({
  amount,
  size = "md",
  compact,
}: {
  amount: number;
  size?: "sm" | "md" | "lg" | "xl";
  compact?: boolean;
}) {
  const sizes = { sm: "text-xl", md: "text-2xl", lg: "text-3xl md:text-4xl", xl: "text-4xl md:text-5xl" };
  return (
    <div>
      <p className="text-[10px] sm:text-xs uppercase tracking-wide text-zinc-500 font-semibold mb-0.5">
        Reference price (USD)
      </p>
      <span className={`font-bold text-zinc-900 tracking-tight ${sizes[size]}`}>${amount.toLocaleString()}</span>
      {!compact && (
        <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed max-w-md">{DISCLAIMER}</p>
      )}
    </div>
  );
}

export function ReferencePriceInline({ amount }: { amount: number }) {
  return (
    <span className="text-zinc-900">
      <span className="text-zinc-500 font-normal text-sm">Ref. </span>${amount.toLocaleString()}
    </span>
  );
}

export function RfqFirstBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-orange-200 bg-orange-50/80 px-4 py-3 text-sm text-zinc-700 leading-relaxed ${className}`}>
      <strong className="text-zinc-900">RFQ-first factory sales.</strong> Request a written quote with BOM, Samsung/device tier,
      node count, and shipping country before payment. Standard in-stock SKUs may use cart checkout at the reference price after
      configuration is confirmed.
    </div>
  );
}

export function FactoryQuoteDifferentiators() {
  const items = [
    { title: "Written BOM & proforma", desc: "Node count, device tier, PSU/cooling spec, and export terms on quote." },
    { title: "Burn-in QC", desc: "Pre-shipment power, USB, and slot checks — photos on request." },
    { title: "Guangzhou export", desc: "DHL/FedEx express or sea freight with commercial invoice." },
    { title: "12-month assembly warranty", desc: "DOA 7 days · RMA per /warranty · optional remote ADB setup." },
  ];
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.title} className="text-sm text-zinc-700 leading-relaxed">
          <strong className="text-zinc-900">{item.title}</strong> — {item.desc}
        </li>
      ))}
    </ul>
  );
}

export function PrivacyConsentField() {
  return (
    <div className="flex items-start gap-3 pt-2">
      <input
        type="checkbox"
        id="privacyConsent"
        name="privacyConsent"
        value="yes"
        required
        className="mt-1 h-4 w-4 rounded border-zinc-300 text-[var(--accent)] focus:ring-[var(--accent)]"
      />
      <label htmlFor="privacyConsent" className="text-sm text-zinc-700 leading-relaxed">
        I agree to the processing of my inquiry data per the{" "}
        <Link href="/privacy" className="text-[var(--accent)] hover:underline" target="_blank">
          Privacy Policy
        </Link>
        . <span className="text-red-600">*</span>
      </label>
    </div>
  );
}
