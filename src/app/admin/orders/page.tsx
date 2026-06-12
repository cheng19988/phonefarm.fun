import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PAYMENT_STATUS_LABELS, type PaymentStatus } from "@/lib/payment-status";

function paymentBadge(status: string) {
  const map: Record<string, string> = {
    pending: "text-amber-400",
    paid: "text-green-400",
    underpaid: "text-orange-400",
    overpaid: "text-sky-400",
    expired: "text-red-400",
    manual_review: "text-violet-400",
  };
  return map[status] ?? "text-slate-400";
}

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true } },
      payment: true,
      items: true,
    },
  });

  return (
    <>
      <h1 className="section-title">Orders</h1>
      <div className="space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="card p-4 text-sm">
            <div className="flex flex-wrap justify-between gap-2">
              <Link href={`/orders/${o.id}`} className="text-cyan-400 font-medium">{o.orderNumber}</Link>
              <span className="text-white">{o.status}</span>
            </div>
            <p className="text-slate-400 mt-1">{o.user.email} · ${o.totalUsd} USD</p>
            <p className="text-slate-500">{o.items.map((i) => i.itemName).join(", ")}</p>
            {o.payment && (
              <div className="text-slate-500 mt-2 space-y-1">
                <p>
                  USDT: due {o.payment.expectedAmount.toFixed(2)} · received{" "}
                  {o.payment.receivedAmount != null ? o.payment.receivedAmount.toFixed(2) : "—"} ·{" "}
                  <span className={paymentBadge(o.payment.paymentStatus)}>
                    {PAYMENT_STATUS_LABELS[o.payment.paymentStatus as PaymentStatus] ?? o.payment.paymentStatus}
                  </span>
                </p>
                {o.payment.txHash && <p className="font-mono text-xs break-all">TX: {o.payment.txHash}</p>}
              </div>
            )}
            <form action={`/api/admin/orders/${o.id}`} method="POST" className="mt-3 flex gap-2 flex-wrap">
              {["Paid", "Confirmed", "Shipped", "Cancelled"].map((s) => (
                <button key={s} type="submit" name="status" value={s} className="btn-outline text-xs py-1 px-2">{s}</button>
              ))}
            </form>
          </div>
        ))}
      </div>
    </>
  );
}
