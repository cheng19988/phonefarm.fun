import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-server";
import { ProductCard } from "@/components/commerce";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Products & Hardware Shop",
  description:
    "Shop phone farm boxes, motherboard boxes, Android & iPhone farms, USB hubs, power, cooling, network equipment, and custom cabinets. Factory-direct from Guangzhou.",
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; category?: string }>;
}) {
  const params = await searchParams;
  const orderBy =
    params.sort === "price-desc" || params.sort === "price-asc" ? "priceUsd" : "name";
  const order = params.sort === "price-desc" ? "desc" : "asc";

  const products = await getPublishedProducts({
    category: params.category,
    orderBy,
    order,
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Phone Farm Products</h1>
        <p className="section-subtitle">
          Factory-direct real device phone farm hardware — prices shown in USD. In-stock units ship within 3–5 business days.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          <Link href="/products" className={`px-3 py-1 rounded-full text-sm border ${!params.category ? "border-cyan-600 text-cyan-400" : "border-slate-700 text-slate-400"}`}>
            All
          </Link>
          {categories.map((cat) => (
            <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className={`px-3 py-1 rounded-full text-sm border ${params.category === cat ? "border-cyan-600 text-cyan-400" : "border-slate-700 text-slate-400"}`}>
              {cat}
            </Link>
          ))}
        </div>

        <div className="flex gap-3 mb-8 text-sm">
          <span className="text-slate-500">Sort:</span>
          <Link href="/products?sort=price-asc" className="text-slate-400 hover:text-white">Price Low</Link>
          <Link href="/products?sort=price-desc" className="text-slate-400 hover:text-white">Price High</Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} slug={p.slug} name={p.name} shortDesc={p.shortDesc} priceUsd={p.priceUsd} stock={p.stock} imageCard={p.imageCard} category={p.category} />
          ))}
        </div>
      </div>
    </div>
  );
}
