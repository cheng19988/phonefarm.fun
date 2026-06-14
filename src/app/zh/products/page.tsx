import Link from "next/link";
import { getPublishedProducts } from "@/lib/products-server";
import { ProductCard } from "@/components/commerce";
import { JsonLd } from "@/components/shared";
import { getProductCardImage } from "@/data/product-images";
import { getProductMeta } from "@/data/product-meta";
import { buildMetadata, collectionPageJsonLd, itemListJsonLd } from "@/lib/seo";
import { ZH } from "@/messages/zh";
import { PageHero } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: ZH.products.metaTitle,
  description: ZH.products.metaDescription,
  path: "/zh/products",
  locale: "zh",
});

export default async function ZhProductsPage() {
  const products = await getPublishedProducts({ orderBy: "name", order: "asc" });

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            name: ZH.products.h1,
            description: ZH.products.metaDescription,
            path: "/zh/products",
            itemList: itemListJsonLd(
              products.slice(0, 20).map((p) => ({
                name: p.name,
                slug: p.slug,
                priceUsd: p.priceUsd,
                imageCard: getProductCardImage(p.slug, p.imageCard),
              })),
            ),
          }),
        ]}
      />
      <PageHero
        banner
        title={ZH.products.h1}
        subtitle={ZH.products.subtitle}
        eyebrow="PhoneFarm Fun · 手机农场硬件"
        image={IMAGES.banners.products}
        imageAlt="手机农场设备与 Android 设备农场产品目录"
      />
      <section className="section section-band--white">
        <div className="container-wide">
          <p className="text-sm text-zinc-500 mb-8 max-w-3xl">
            产品名称与 SKU 规格保持英文以便与工厂 BOM 一致。如需中文选型说明，请{" "}
            <Link href="/zh/contact" className="text-[var(--accent)] font-semibold hover:underline">
              提交询价
            </Link>
            。
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => {
              const meta = getProductMeta(p.slug);
              return (
                <ProductCard
                  key={p.slug}
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
                />
              );
            })}
          </div>
          <Link href="/products" className="inline-block mt-10 text-sm font-semibold text-[var(--accent)] hover:underline">
            {ZH.products.viewEnCatalog}
          </Link>
        </div>
      </section>
    </>
  );
}
