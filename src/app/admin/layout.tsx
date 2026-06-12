import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin",
  description: "PhoneFarm Fun admin.",
  path: "/admin",
  noIndex: true,
});

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/payments", label: "USDT Payments" },
  { href: "/admin/contacts", label: "Contacts" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  if (!admin) redirect("/login?redirect=/admin");

  return (
    <div className="section">
      <div className="container-wide">
        <div className="flex flex-wrap gap-3 mb-8 border-b border-slate-200 pb-4">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-600 hover:text-orange-600">
              {l.label}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
