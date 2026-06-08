import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/store";

export const metadata = buildMetadata({
  title: "My Orders",
  description: "View your phone farm hardware orders and payment status.",
  path: "/account/orders",
  noIndex: true,
});

export const dynamic = "force-dynamic";

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Waiting for Payment": "text-amber-700 bg-amber-50",
    Paid: "text-green-700 bg-green-50",
    Expired: "text-red-700 bg-red-50",
  };
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${styles[status] ?? "text-slate-600 bg-slate-100"}`}>
      {status}
    </span>
  );
}

export default async function AccountOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    include: { items: { include: { product: { select: { name: true } } } }, payment: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHero title="My Orders" subtitle={`Signed in as ${session.email}`} compact />
      <section className="section pt-8">
        <div className="container-wide max-w-3xl">
          <div className="flex justify-end mb-6">
            <LogoutButton />
          </div>
          {orders.length === 0 ? (
            <div className="card p-8 md:p-12 text-center">
              <p className="text-slate-600 mb-2">No orders yet.</p>
              <p className="text-sm text-slate-500 mb-6">Browse phone farm boxes and add hardware to your cart.</p>
              <Link href="/products" className="btn-primary">Shop Hardware</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="card p-5 md:p-6 block hover:border-orange-200 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900">{order.orderNumber}</p>
                      <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                        {order.items.map((i) => i.itemName).join(", ")}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-start sm:items-end gap-2 shrink-0">
                      <p className="text-slate-900 font-bold">${order.totalUsd}</p>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
