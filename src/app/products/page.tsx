import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-server";
import { ProductCard } from "@/components/commerce";
import { JsonLd } from "@/components/shared";
import { PRIMARY_CATALOG_SLUGS } from "@/data/product-images";
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

  const primarySet = new Set<string>(PRIMARY_CATALOG_SLUGS);
  const showPrimarySection = !params.category;
  const primaryProducts = showPrimarySection
    ? PRIMARY_CATALOG_SLUGS.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean)
    : [];
  const otherProducts = showPrimarySection
    ? products.filter((p) => !primarySet.has(p.slug))
    : products;

  return (
    <>
      <JsonLd data={itemListJsonLd(products.map((p) => ({
        name: p.name,
        slug: p.slug,
        priceUsd: p.priceUsd,
        imageCard: p.imageCard,
      })))} />

      <PageHero
        large
        title="Phone Farm Hardware Catalog"
        subtitle="Phone farm boxes, motherboard arrays, rack solutions, and lab accessories — factory-built in Guangzhou with reference USD pricing, MOQ, and lead times."
        eyebrow="Factory-built · Guangzhou"
        image={IMAGES.customCabinet.hero}
        imageAlt="Phone farm rack and hardware catalog"
      />

      <section className="section pt-12 md:pt-16">
        <div className="container-wide">
          <SectionHeader
            title="Choose by deployment size"
            subtitle="Filter by deployment type or browse the full hardware catalog."
          />

          <div className="mb-10">
            <FilterPills items={DEPLOYMENT_FILTERS} active={params.category ?? ""} baseHref="/products" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 text-sm md:text-base">
            <p className="text-slate-500 font-medium">{products.length} SKU{products.length !== 1 ? "s" : ""}</p>
            <div className="flex gap-4">
              <span className="text-slate-500">Sort:</span>
              <Link href={sortQuery("price-asc")} className="text-slate-600 hover:text-orange-600 font-medium">Price Low</Link>
              <Link href={sortQuery("price-desc")} className="text-slate-600 hover:text-orange-600 font-medium">Price High</Link>
            </div>
          </div>

          {primaryProducts.length > 0 && (
            <div className="mb-14 md:mb-16">
              <div className="home-section-header mb-8 md:mb-10">
                <div className="relative">
                  <p className="text-orange-400 text-sm font-semibold uppercase tracking-wide mb-2">Core hardware</p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">Primary Phone Farm SKUs</h2>
                  <p className="text-slate-300 text-base md:text-lg max-w-2xl">Starter boxes, Pro chassis, motherboard clusters, and custom rack solutions.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {primaryProducts.map((p) => {
                  const meta = getProductMeta(p!.slug);
                  return (
                    <ProductCard
                      key={p!.id}
                      slug={p!.slug}
                      name={p!.name}
                      shortDesc={p!.shortDesc}
                      priceUsd={p!.priceUsd}
                      stock={p!.stock}
                      imageCard={p!.imageCard}
                      category={p!.category}
                      tier={meta.tier}
                      nodeCount={meta.nodeCount}
                      deploymentType={meta.deploymentType}
                      moq={meta.moq}
                      leadTime={meta.leadTime}
                      featured
                    />
                  );
                })}
              </div>
            </div>
          )}

          {otherProducts.length > 0 && (
            <>
              {showPrimarySection && (
                <SectionHeader
                  title="Accessories & additional SKUs"
                  subtitle="Power, cooling, USB, network modules, and expansion chassis."
                />
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-14">
                {otherProducts.map((p) => {
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
                      deploymentType={meta.deploymentType}
                      moq={meta.moq}
                      leadTime={meta.leadTime}
                      featured={!showPrimarySection}
                    />
                  );
                })}
              </div>
            </>
          )}

          <BuyingGuideBlock />
        </div>
      </section>
    </>
  );
}
