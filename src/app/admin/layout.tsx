import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/payments", label: "USDT Settings" },
  { href: "/admin/contacts", label: "Contacts" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?redirect=/admin");

  return (
    <div className="section">
      <div className="container-wide">
        <div className="flex flex-wrap gap-3 mb-8 border-b border-slate-800 pb-4">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-cyan-400">
              {l.label}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
