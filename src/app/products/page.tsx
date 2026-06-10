import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-server";
import { ProductCard } from "@/components/commerce";
import { JsonLd } from "@/components/shared";
import { PRIMARY_CATALOG_SLUGS, getProductCardImage } from "@/data/product-images";
import { getProductMeta } from "@/data/product-meta";
import { buildMetadata, itemListJsonLd } from "@/lib/seo";
import { ProductsCatalogHero } from "@/components/products-catalog-hero";
import { FilterPills, BuyingGuideBlock, SectionHeader } from "@/components/store";
import { DeviceModelGridAll } from "@/components/device-model-grid";

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

      <ProductsCatalogHero />

      <div className="section-band--soft border-b border-zinc-200">
        <div className="container-wide py-6 md:py-8">
          <p className="eyebrow !text-zinc-500 !tracking-widest mb-4">Catalog at a glance</p>
          <div className="trust-stat-grid">
            {[
              { label: "Deployment types", value: "Starter · Standard · High-Density · Custom" },
              { label: "MOQ", value: "From 1 unit" },
              { label: "Lead time", value: "3–7 business days" },
              { label: "Origin", value: "Factory built in Guangzhou" },
            ].map((stat) => (
              <div key={stat.label} className="trust-stat-card">
                <p className="trust-stat-value leading-snug">{stat.value}</p>
                <p className="trust-stat-label uppercase tracking-wide font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="inner-page-section section-band--white pb-0">
        <div className="container-wide">
          <SectionHeader
            title="Choose by deployment size"
            subtitle="Filter by deployment type or browse the full hardware catalog."
            large
          />

          <div className="mb-10 md:mb-12">
            <FilterPills items={DEPLOYMENT_FILTERS} active={params.category ?? ""} baseHref="/products" bar />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 md:mb-12 text-sm md:text-base pb-6 border-b border-zinc-200">
            <p className="text-zinc-600 font-semibold text-base md:text-lg">{products.length} SKU{products.length !== 1 ? "s" : ""} in catalog</p>
            <div className="flex gap-4">
              <span className="text-zinc-500">Sort:</span>
              <Link href={sortQuery("price-asc")} className="text-zinc-700 hover:text-[var(--accent)] font-semibold">Price Low</Link>
              <Link href={sortQuery("price-desc")} className="text-zinc-700 hover:text-[var(--accent)] font-semibold">Price High</Link>
            </div>
          </div>

          {primaryProducts.length > 0 && (
            <div className="mb-16 md:mb-20 lg:mb-24">
              <div className="catalog-section-band catalog-section-band-accent mb-10 md:mb-12">
                <p className="eyebrow mb-2">Core hardware</p>
                <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-3">Primary Phone Farm SKUs</h2>
                <p className="section-subtitle mb-0 md:text-lg lg:text-xl">Starter, Pro, turnkey bundle, motherboard clusters, and custom rack solutions — built for B2B procurement.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                      imageCard={getProductCardImage(p!.slug, p!.imageCard)}
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
                  title="Additional SKUs & accessories"
                  subtitle="Mixed-device racks, expansion chassis, USB, power, cooling, and network modules."
                  large
                />
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16 md:mb-20">
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
                      imageCard={getProductCardImage(p.slug, p.imageCard)}
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

          <section className="mb-16 md:mb-20">
            <SectionHeader
              title="Android Model Configurations"
              subtitle="Product images show real box builds with model-specific USB/LAN/OTG routing — Galaxy, Note, OnePlus, Pixel, and more."
              large
            />
            <DeviceModelGridAll />
          </section>

          <BuyingGuideBlock />
        </div>
      </section>
    </>
  );
}
