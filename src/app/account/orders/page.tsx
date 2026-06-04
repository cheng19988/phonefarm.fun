import Link from "next/link";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "My Orders",
  description: "View your phone farm hardware orders and payment status.",
  path: "/account/orders",
  noIndex: true,
});

export default async function AccountOrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.id },
    include: { items: { include: { product: { select: { name: true } } } }, payment: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section">
      <div className="container-wide max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="section-title mb-0">My Orders</h1>
          <LogoutButton />
        </div>
        {orders.length === 0 ? (
          <div className="card p-8 text-center text-slate-400">
            <p>No orders yet.</p>
            <Link href="/products" className="btn-primary mt-4 inline-flex">Browse Products</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order.id} href={`/orders/${order.id}`} className="card p-6 block hover:border-cyan-800 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-white">{order.orderNumber}</p>
                    <p className="text-sm text-slate-400 mt-1">
                      {order.items.map((i) => i.product.name).join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">${order.totalUsd}</p>
                    <p className="text-sm text-cyan-400">{order.status}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
