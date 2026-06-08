import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-server";
import { ProductCard } from "@/components/commerce";
import { JsonLd } from "@/components/shared";
import { getProductMeta } from "@/data/product-meta";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { PageHero, FilterPills, BuyingGuideBlock, SectionHeader } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Phone Farm Hardware Catalog",
  description:
    "Browse factory-built phone farm boxes, motherboard arrays, rack solutions, and accessories. Reference USD pricing, MOQ, and lead times for B2B buyers.",
  path: "/products",
});

const DEPLOYMENT_FILTERS = [
  { label: "All Products", value: "" },
  { label: "Starter Deployment", value: "Starter Deployment" },
  { label: "Standard Deployment", value: "Standard Deployment" },
  { label: "High-Density Deployment", value: "High-Density Deployment" },
  { label: "Custom Deployment", value: "Custom Deployment" },
  { label: "Accessory", value: "Accessory" },
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
    category: params.category || undefined,
    orderBy,
    order,
  });

  const sortQuery = (sort: string) => {
    const q = new URLSearchParams();
    if (params.category) q.set("category", params.category);
    q.set("sort", sort);
    return `/products?${q.toString()}`;
  };

  return (
    <>
      <JsonLd data={itemListJsonLd(products.map((p) => ({
        name: p.name,
        slug: p.slug,
        priceUsd: p.priceUsd,
        imageCard: p.imageCard,
      })))} />

      <PageHero
        title="Phone Farm Hardware Catalog"
        subtitle="Phone farm boxes, motherboard arrays, rack solutions, and accessories for real-device deployment."
        eyebrow="Factory-built · Guangzhou"
        image={IMAGES.phoneFarmBox.hero}
        imageAlt="Phone farm hardware catalog"
        compact
      />

      <section className="section pt-10 md:pt-12">
        <div className="container-wide">
          <SectionHeader
            title="Choose by deployment size"
            subtitle="Filter by deployment type or browse the full catalog."
          />

          <div className="mb-8">
            <FilterPills items={DEPLOYMENT_FILTERS} active={params.category ?? ""} baseHref="/products" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm">
            <p className="text-slate-500">{products.length} SKU{products.length !== 1 ? "s" : ""}</p>
            <div className="flex gap-4">
              <span className="text-slate-500">Sort:</span>
              <Link href={sortQuery("price-asc")} className="text-slate-600 hover:text-orange-600">Price Low</Link>
              <Link href={sortQuery("price-desc")} className="text-slate-600 hover:text-orange-600">Price High</Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
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
                  moq={meta.moq}
                  leadTime={meta.leadTime}
                />
              );
            })}
          </div>

          <BuyingGuideBlock />
        </div>
      </section>
    </>
  );
}
