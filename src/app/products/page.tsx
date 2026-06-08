import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-server";
import { ProductCard } from "@/components/commerce";
import { JsonLd } from "@/components/shared";
import { getProductMeta } from "@/data/product-meta";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Android Device Farm Hardware Catalog",
  description:
    "Browse factory-built Android device farm boxes, motherboard clusters, lab accessories, and custom rack solutions. Reference USD pricing, MOQ, and lead times for B2B buyers.",
  path: "/products",
});

const DEPLOYMENT_SIZES = [
  {
    title: "Starter deployment",
    desc: "20-node starter box for small QA teams and first device labs.",
    category: "Starter Deployment",
  },
  {
    title: "Standard team deployment",
    desc: "Pro boxes and turnkey bundles for continuous app testing.",
    category: "Standard Deployment",
  },
  {
    title: "High-density deployment",
    desc: "Motherboard clusters and dense rack layouts for scaled QA.",
    category: "High-Density Deployment",
  },
  {
    title: "Custom hardware solution",
    desc: "40+ node rack and cabinet projects scoped to your lab.",
    category: "Custom Deployment",
  },
];

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
    <>
      <JsonLd data={itemListJsonLd(products.map((p) => ({
        name: p.name,
        slug: p.slug,
        priceUsd: p.priceUsd,
        imageCard: p.imageCard,
      })))} />

      <div className="section">
        <div className="container-wide">
          <h1 className="section-title">Device Farm Hardware Catalog</h1>
          <p className="section-subtitle max-w-3xl">
            Reference USD pricing for standard SKUs. Final quotes depend on device model, quantity, and shipping region — use{" "}
            <Link href="/contact" className="text-orange-600 hover:text-orange-500">Contact</Link> for bulk or custom rack orders.
          </p>

          <div className="mb-12">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Choose by deployment size</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DEPLOYMENT_SIZES.map((item) => (
                <Link
                  key={item.category}
                  href={`/products?category=${encodeURIComponent(item.category)}`}
                  className={`card p-4 hover:border-orange-300 transition-colors ${params.category === item.category ? "border-orange-500" : ""}`}
                >
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-600">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10 text-sm">
            <div className="card p-4"><span className="text-orange-600 font-medium">MOQ</span><p className="text-slate-600 mt-1">1 unit for most SKUs; volume pricing from 5+</p></div>
            <div className="card p-4"><span className="text-orange-600 font-medium">Lead time</span><p className="text-slate-600 mt-1">3–5 business days in-stock; custom racks quoted</p></div>
            <div className="card p-4"><span className="text-orange-600 font-medium">Shipping</span><p className="text-slate-600 mt-1">DHL/FedEx express or sea freight from Guangzhou</p></div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/products" className={`px-3 py-1 rounded-full text-sm border ${!params.category ? "border-orange-500 text-orange-600 bg-orange-50" : "border-slate-300 text-slate-600 hover:border-slate-400"}`}>
              All
            </Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className={`px-3 py-1 rounded-full text-sm border ${params.category === cat ? "border-orange-500 text-orange-600 bg-orange-50" : "border-slate-300 text-slate-600 hover:border-slate-400"}`}>
                {cat}
              </Link>
            ))}
          </div>

          <div className="flex gap-3 mb-8 text-sm">
            <span className="text-slate-500">Sort:</span>
            <Link href={`/products?${params.category ? `category=${encodeURIComponent(params.category)}&` : ""}sort=price-asc`} className="text-slate-600 hover:text-orange-600">Price Low</Link>
            <Link href={`/products?${params.category ? `category=${encodeURIComponent(params.category)}&` : ""}sort=price-desc`} className="text-slate-600 hover:text-orange-600">Price High</Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => {
              const meta = getProductMeta(p.slug);
              return (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  shortDesc={p.shortDesc}
                  priceUsd={p.priceUsd}
                  stock={p.stock}
                  imageCard={p.imageCard}
                  category={p.category}
                  tier={meta.tier}
                  nodeCount={meta.nodeCount}
                  useCase={meta.useCase}
                  moq={meta.moq}
                  leadTime={meta.leadTime}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
