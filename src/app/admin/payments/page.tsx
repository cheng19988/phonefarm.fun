import { prisma } from "@/lib/prisma";
import { getPaymentSettings } from "@/lib/payment-settings";
import { PAYMENT } from "@/lib/config";
import { isAutoPaymentVerificationEnabled } from "@/lib/payment";
import { PAYMENT_STATUS_LABELS, type PaymentStatus } from "@/lib/payment-status";
import Link from "next/link";

function statusBadgeClass(status: string) {
  const map: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-200 border-amber-500/40",
    paid: "bg-green-500/20 text-green-200 border-green-500/40",
    underpaid: "bg-orange-500/20 text-orange-200 border-orange-500/40",
    overpaid: "bg-sky-500/20 text-sky-200 border-sky-500/40",
    expired: "bg-red-500/20 text-red-200 border-red-500/40",
    manual_review: "bg-violet-500/20 text-violet-200 border-violet-500/40",
  };
  return map[status] ?? "bg-slate-500/20 text-slate-200 border-slate-500/40";
}

export default async function AdminPaymentsPage() {
  const settings = await getPaymentSettings();
  const autoVerify = isAutoPaymentVerificationEnabled();

  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      order: {
        select: {
          id: true,
          orderNumber: true,
          totalUsd: true,
          status: true,
          user: { select: { email: true } },
        },
      },
    },
  });

  const counts = payments.reduce(
    (acc, p) => {
      acc[p.paymentStatus] = (acc[p.paymentStatus] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <h1 className="section-title">USDT Payments</h1>

      <div className="card p-5 mb-8 border-cyan-500/30 bg-slate-900/50">
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-white">Verification mode:</strong>{" "}
          {autoVerify
            ? "Automatic TRC20 check via TronGrid (TRON_API_KEY set)."
            : "Manual confirmation only — TRON_API_KEY is not set; buyers must submit TXID and staff confirm payment."}
        </p>
      </div>

      <h2 className="text-lg font-bold text-white mb-3">Recent payments</h2>
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        {Object.entries(PAYMENT_STATUS_LABELS).map(([key, label]) => (
          <span key={key} className={`px-2 py-1 rounded border ${statusBadgeClass(key)}`}>
            {label}: {counts[key] ?? 0}
          </span>
        ))}
      </div>

      <div className="space-y-3 mb-12">
        {payments.length === 0 ? (
          <p className="text-slate-500 text-sm">No payments yet.</p>
        ) : (
          payments.map((p) => (
            <div key={p.id} className="card p-4 text-sm space-y-2">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <Link href={`/orders/${p.order.id}`} className="text-cyan-400 font-medium">
                    {p.order.orderNumber}
                  </Link>
                  <span className="text-slate-500 ml-2">{p.order.user.email}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded border ${statusBadgeClass(p.paymentStatus)}`}>
                  {PAYMENT_STATUS_LABELS[p.paymentStatus as PaymentStatus] ?? p.paymentStatus}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-slate-400 text-xs">
                <p>Order USD: ${p.order.totalUsd}</p>
                <p>USDT due: {p.expectedAmount.toFixed(2)}</p>
                <p>Received: {p.receivedAmount != null ? p.receivedAmount.toFixed(2) : "—"}</p>
                <p>Expires: {p.expiresAt.toISOString().slice(0, 16).replace("T", " ")} UTC</p>
              </div>
              <p className="text-slate-500 text-xs font-mono break-all">
                Address: {p.paymentAddress}
              </p>
              {p.txHash && (
                <p className="text-slate-500 text-xs font-mono break-all">TX: {p.txHash}</p>
              )}
              {p.submittedTxHash && p.submittedTxHash !== p.txHash && (
                <p className="text-slate-500 text-xs font-mono break-all">Submitted TX: {p.submittedTxHash}</p>
              )}
              {p.failureReason && (
                <p className="text-amber-300/90 text-xs">Note: {p.failureReason.replace(/_/g, " ")}</p>
              )}
              <form action={`/api/admin/payments/${p.id}`} method="POST" className="flex flex-wrap gap-2 pt-1">
                <button type="submit" name="action" value="mark_paid" className="btn-outline text-xs py-1 px-2">
                  Mark paid (manual)
                </button>
                <button type="submit" name="action" value="manual_review" className="btn-outline text-xs py-1 px-2">
                  Manual review
                </button>
                <button type="submit" name="action" value="reset_pending" className="btn-outline text-xs py-1 px-2">
                  Reset pending
                </button>
                <button type="submit" name="action" value="mark_expired" className="btn-outline text-xs py-1 px-2">
                  Mark expired
                </button>
              </form>
            </div>
          ))
        )}
      </div>

      <h2 className="text-lg font-bold text-white mb-3">Wallet settings</h2>
      <p className="text-slate-400 mb-6 text-sm">
        TronGrid API key is set via server environment variable <code className="text-cyan-400">TRON_API_KEY</code> — never exposed to the browser.
      </p>
      <form action="/api/admin/payments" method="POST" className="card p-6 max-w-xl space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">TRC20 Receive Address</label>
          <input name="trc20Address" defaultValue={settings.trc20Address} required className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white font-mono text-sm" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">USDT Contract</label>
          <input name="usdtContract" defaultValue={settings.usdtContract} required className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white font-mono text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Min Amount (USDT)</label>
            <input name="minAmount" type="number" step="0.01" defaultValue={settings.minAmount} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Expiry (minutes)</label>
            <input name="expiryMinutes" type="number" defaultValue={settings.expiryMinutes} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" />
          </div>
        </div>
        <p className="text-xs text-slate-500">Default from config: {PAYMENT.address.slice(0, 8)}… · tolerance ±{0.01} USDT</p>
        <button type="submit" className="btn-primary">Save Settings</button>
      </form>
    </>
  );
}
