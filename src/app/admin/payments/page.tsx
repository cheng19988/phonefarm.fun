import { prisma } from "@/lib/prisma";
import { getPaymentSettings } from "@/lib/payment-settings";
import { PAYMENT } from "@/lib/config";

export default async function AdminPaymentsPage() {
  const settings = await getPaymentSettings();

  return (
    <>
      <h1 className="section-title">USDT Payment Settings</h1>
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
        <p className="text-xs text-slate-500">Default from config: {PAYMENT.address.slice(0, 8)}…</p>
        <button type="submit" className="btn-primary">Save Settings</button>
      </form>
    </>
  );
}
