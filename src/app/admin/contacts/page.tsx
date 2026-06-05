import { prisma } from "@/lib/prisma";

export default async function AdminContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <h1 className="section-title">Contact Submissions</h1>
      <div className="space-y-3">
        {contacts.map((c) => (
          <div key={c.id} className="card p-4 text-sm">
            <p className="text-white font-medium">{c.name} · {c.email}</p>
            <p className="text-slate-400">{c.country} · {c.productInterest} · Qty: {c.deviceQuantity}</p>
            <p className="text-slate-500 mt-1">{c.message}</p>
            <p className="text-xs text-slate-600 mt-2">{c.createdAt.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </>
  );
}
