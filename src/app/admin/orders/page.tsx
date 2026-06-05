import Link from "next/link";
import { prisma } from "@/lib/prisma";

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
            <p className="text-slate-400 mt-1">{o.user.email} · ${o.totalUsd}</p>
            <p className="text-slate-500">{o.items.map((i) => i.itemName).join(", ")}</p>
            {o.payment && (
              <p className="text-slate-500 mt-1">
                Payment: {o.payment.paymentStatus} / {o.payment.verificationStatus}
                {o.payment.txHash && ` · TX ${o.payment.txHash.slice(0, 12)}…`}
              </p>
            )}
            <form action={`/api/admin/orders/${o.id}`} method="POST" className="mt-3 flex gap-2">
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
