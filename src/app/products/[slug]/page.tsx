import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products-server";
import { BuyButtons, FAQAccordion, ProductCard } from "@/components/commerce";
import { ProductGallery } from "@/components/product-gallery";
import { ContactCTA, ContactBar, JsonLd, StockBadge } from "@/components/shared";
import { getProductGalleryImages } from "@/data/product-images";
import { getProductMeta } from "@/data/product-meta";
import { getProfessionalSpecs } from "@/data/product-specs";
import { buildMetadata, productJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { Breadcrumbs, SpecTable, IconList, MetaGrid, PriceDisplay, SectionHeader } from "@/components/store";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.name,
    description: product.shortDesc,
    path: `/products/${slug}`,
    image: product.imageHero,
  });
}

function parseJson<T>(s: string, fallback: T): T {
  try { return JSON.parse(s); } catch { return fallback; }
}


export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const meta = getProductMeta(slug);
  const related = await getRelatedProducts(slug, 3);

  const features = parseJson<string[]>(product.features, []);
  const rawSpecs = parseJson<Record<string, string>>(product.specs, {});
  const specs = getProfessionalSpecs(slug, rawSpecs);
  const scenarios = parseJson<string[]>(product.scenarios, []);
  const accessories = parseJson<string[]>(product.accessories, []);
  const delivery = parseJson<string[]>(product.delivery, []);
  const faq = parseJson<{ q: string; a: string }[]>(product.faq, []);
  const faqItems = faq.map((f) => ({ question: f.q, answer: f.a }));

  const gallery = getProductGalleryImages(slug, [
    product.imageDetail,
    product.imageHero,
    product.imageCard,
  ]);

  return (
    <>
      <JsonLd data={[
        productJsonLd({ name: product.name, description: product.shortDesc, slug: product.slug, priceUsd: product.priceUsd, stock: product.stock, image: product.imageHero }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${slug}` },
        ]),
        ...(faqItems.length > 0 ? [faqJsonLd(faqItems)] : []),
      ]} />

      <div className="section pt-10 md:pt-14 pb-0">
        <div className="container-wide">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name },
          ]} />

          {/* Product hero — large image + purchase panel */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <ProductGallery images={gallery} alt={product.name} />
            </div>

            <div className="lg:col-span-5">
              <div className="card p-6 md:p-8 lg:p-10 lg:sticky lg:top-24">
                <p className="text-orange-600 text-sm font-semibold uppercase tracking-wide mb-2">
                  {meta.tier} · {product.category}
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight tracking-tight">
                  {product.name}
                </h1>
                <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">{product.shortDesc}</p>
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                  <PriceDisplay amount={product.priceUsd} size="xl" />
                  <StockBadge stock={product.stock} />
                </div>
                <MetaGrid large items={[
                  { label: "Node capacity", value: meta.nodeCount },
                  { label: "MOQ", value: `${meta.moq} unit` },
                  { label: "Lead time", value: meta.leadTime },
                  { label: "Deployment", value: meta.deploymentType },
                  { label: "Typical use", value: meta.useCase },
                ]} />
                <div className="mt-8 space-y-3">
                  <BuyButtons slug={product.slug} stock={product.stock} />
                  <Link
                    href={`/contact?product=${slug}`}
                    className="btn-outline w-full text-center block py-3 text-base"
                  >
                    Request Custom Quote
                  </Link>
                </div>
                <div className="mt-6 p-4 md:p-5 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                  <p className="font-semibold text-slate-900 mb-2">Sales &amp; configuration</p>
                  <ContactBar />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 pb-16 md:pb-20">
            <div className="lg:col-span-8 space-y-14 md:space-y-16">
              <section>
                <SectionHeader title="Overview" />
                <p className="text-slate-600 text-base md:text-lg leading-relaxed">{product.description}</p>
              </section>

              <section>
                <SectionHeader title="Key Specifications" subtitle="Hardware parameters for procurement review. Exact values confirmed before production when marked configurable." />
                <SpecTable specs={specs} large />
              </section>

              {features.length > 0 && (
                <section>
                  <SectionHeader title="Hardware Highlights" />
                  <IconList items={features} large />
                </section>
              )}

              <section>
                <SectionHeader title="Hardware Details" subtitle="Chassis layout, power and cooling design, cabling, and pre-shipment verification." />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="card p-5 md:p-6">
                    <h3 className="font-bold text-slate-900 mb-3">Chassis &amp; motherboard layout</h3>
                    <IconList items={features.slice(0, 3).length ? features.slice(0, 3) : ["Factory-assembled chassis", "Device tray layout per SKU", "Mounting hardware included"]} />
                  </div>
                  <div className="card p-5 md:p-6">
                    <h3 className="font-bold text-slate-900 mb-3">Power, cooling &amp; cabling</h3>
                    <IconList items={features.slice(2, 5).length ? features.slice(2, 5) : ["Centralized power distribution", "Active cooling layout", "Managed USB routing"]} />
                  </div>
                  <div className="card p-5 md:p-6 md:col-span-2">
                    <h3 className="font-bold text-slate-900 mb-3">Pre-shipment check &amp; packing</h3>
                    <IconList items={delivery.length ? delivery : ["Power and connectivity burn-in", "Export packaging with foam inserts"]} icon="•" />
                  </div>
                </div>
              </section>

              <section>
                <SectionHeader title="Use Cases" subtitle="Commercial deployment scenarios for phone farm hardware and device lab operations." />
                <ul className="grid sm:grid-cols-2 gap-4">
                  {scenarios.map((s) => (
                    <li key={s} className="card p-5 text-sm md:text-base text-slate-600 leading-relaxed">{s}</li>
                  ))}
                </ul>
              </section>

              {faqItems.length > 0 && (
                <section>
                  <SectionHeader title="Product FAQ" />
                  <FAQAccordion items={faqItems} />
                </section>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <section className="card p-6 md:p-8">
                <h3 className="font-bold text-slate-900 text-lg mb-4">What&apos;s Included</h3>
                <IconList items={accessories} icon="•" large />
              </section>
              <section className="card p-6 md:p-8 bg-orange-50 border-orange-100">
                <h3 className="font-bold text-slate-900 text-lg mb-3">Need a custom layout?</h3>
                <p className="text-sm md:text-base text-slate-600 mb-5 leading-relaxed">
                  Share node count, device models, shipping country, and remote setup requirements. We confirm configuration before production.
                </p>
                <Link href={`/contact?product=${slug}`} className="btn-primary w-full text-center block py-3">
                  Send Hardware Requirement
                </Link>
              </section>
            </div>
          </div>

          {related.length > 0 && (
            <section className="pt-12 md:pt-16 pb-8 border-t border-slate-200">
              <SectionHeader title="Related Products" subtitle="Compatible hardware and accessories for your device lab." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {related.map((p) => {
                  const rMeta = getProductMeta(p.slug);
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
                      tier={rMeta.tier}
                      nodeCount={rMeta.nodeCount}
                      deploymentType={rMeta.deploymentType}
                      moq={rMeta.moq}
                      leadTime={rMeta.leadTime}
                      featured
                    />
                  );
                })}
              </div>
            </section>
          )}

          <div className="pb-8">
            <ContactCTA title={`Quote for ${product.name}`} />
          </div>
        </div>
      </div>
    </>
  );
}
