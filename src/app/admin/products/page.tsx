import { AdminProductRow } from "@/components/admin-product-row";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const allProducts = await prisma.product.findMany({ orderBy: { name: "asc" } });

  return (
    <>
      <h1 className="section-title">Products</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Stock</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((p) => (
              <AdminProductRow key={p.id} id={p.id} name={p.name} priceUsd={p.priceUsd} stock={p.stock} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
