import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Dashboard",
  description: "Admin panel",
  path: "/admin",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin();
  if (!admin) redirect("/login");

  const [users, orders, contacts, products] = await Promise.all([
    prisma.user.count(),
    prisma.order.count(),
    prisma.contactSubmission.count(),
    prisma.product.count(),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } }, payment: true, items: { include: { product: { select: { name: true } } } } },
  });

  const recentContacts = await prisma.contactSubmission.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Admin Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Users", value: users },
            { label: "Orders", value: orders },
            { label: "Contacts", value: contacts },
            { label: "Products", value: products },
          ].map((s) => (
            <div key={s.label} className="card p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400">{s.value}</div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div key={o.id} className="card p-4 text-sm">
                  <div className="flex justify-between">
                    <Link href={`/orders/${o.id}`} className="text-cyan-400">{o.orderNumber}</Link>
                    <span className="text-white">{o.status}</span>
                  </div>
                  <p className="text-slate-400 mt-1">{o.user.email} · ${o.totalUsd}</p>
                </div>
              ))}
            </div>
            <Link href="/admin/orders" className="text-cyan-400 text-sm mt-3 inline-block">All orders →</Link>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-4">Contact Submissions</h2>
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div key={c.id} className="card p-4 text-sm">
                  <p className="text-white font-medium">{c.name} · {c.email}</p>
                  <p className="text-slate-500 mt-1 line-clamp-2">{c.message}</p>
                </div>
              ))}
            </div>
            <Link href="/admin/contacts" className="text-cyan-400 text-sm mt-3 inline-block">All contacts →</Link>
          </section>
        </div>
      </div>
    </div>
  );
}
