import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-server";
import { ProductCard } from "@/components/commerce";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Hardware Catalog",
  description:
    "Phone farm boxes, motherboard boxes, Android & iPhone farms, USB hubs, power, cooling, network equipment, and custom cabinets. Factory-direct from Guangzhou.",
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
        <h1 className="section-title">Phone Farm Hardware Catalog</h1>
        <p className="section-subtitle max-w-3xl">
          Reference pricing in USD for standard configurations. Final quotes depend on device model, quantity, and shipping region — use <Link href="/contact" className="text-cyan-400 hover:text-cyan-300">Contact</Link> for bulk or custom orders.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-10 text-sm">
          <div className="card p-4"><span className="text-cyan-400 font-medium">MOQ</span><p className="text-slate-400 mt-1">Single unit for most SKUs; bulk from 5+</p></div>
          <div className="card p-4"><span className="text-cyan-400 font-medium">Lead time</span><p className="text-slate-400 mt-1">3–5 business days in-stock</p></div>
          <div className="card p-4"><span className="text-cyan-400 font-medium">Shipping</span><p className="text-slate-400 mt-1">DHL/FedEx express or sea freight</p></div>
        </div>

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
