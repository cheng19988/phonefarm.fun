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
import { Breadcrumbs, SpecTable, IconList, MetaGrid, PriceDisplay, SectionHeader, DetailSection } from "@/components/store";

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

const DEFAULT_CHASSIS = ["Factory-assembled chassis", "Device tray layout per SKU", "Mounting hardware included"];
const DEFAULT_POWER = ["Centralized power distribution", "Active cooling layout", "Managed USB routing"];
const DEFAULT_PACKING = ["Power and connectivity burn-in", "Export packaging with foam inserts"];

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

  const chassisItems = features.length >= 3 ? features.slice(0, 3) : DEFAULT_CHASSIS;
  const powerItems = features.length >= 5 ? features.slice(3, 6) : features.length > 3 ? features.slice(3) : DEFAULT_POWER;
  const packingItems = delivery.length ? delivery : DEFAULT_PACKING;

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

      <div className="bg-gradient-to-b from-slate-100 to-white border-b border-slate-200">
        <div className="container-wide pt-8 md:pt-10 lg:pt-12 pb-12 md:pb-16 lg:pb-20">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name },
          ]} />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-7">
              <ProductGallery images={gallery} alt={product.name} />
            </div>

            <div className="lg:col-span-5">
              <div className="card product-card-heavy p-6 md:p-8 lg:p-10 xl:p-12 lg:sticky lg:top-28">
                <p className="text-orange-600 text-sm font-bold uppercase tracking-widest mb-3">
                  {meta.tier} · {product.category}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold text-slate-900 mb-5 leading-tight tracking-tight">
                  {product.name}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">{product.shortDesc}</p>
                <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b-2 border-slate-200">
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
                    className="btn-outline-lg w-full text-center block"
                  >
                    Request Custom Quote
                  </Link>
                </div>
                <div className="mt-6 p-5 md:p-6 rounded-xl bg-slate-50 border-2 border-slate-200">
                  <p className="font-bold text-slate-900 mb-2 text-base">Sales &amp; configuration</p>
                  <ContactBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section pt-12 md:pt-16 lg:pt-20 pb-0">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 pb-16 md:pb-20 lg:pb-24">
            <div className="lg:col-span-8 space-y-10 md:space-y-12">
              <DetailSection title="Overview">
                <p className="text-slate-600 text-base md:text-lg lg:text-xl leading-relaxed">{product.description}</p>
                {features.length > 0 && (
                  <ul className="mt-8 grid sm:grid-cols-2 gap-3 md:gap-4">
                    {features.map((f) => (
                      <li key={f} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm md:text-base text-slate-700">
                        <span className="text-orange-600 font-bold shrink-0">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </DetailSection>

              <DetailSection
                title="Key Specifications"
                subtitle="Hardware parameters for procurement review. Configurable values confirmed before production."
              >
                <SpecTable specs={specs} large />
              </DetailSection>

              <DetailSection
                title="Hardware Details"
                subtitle="Chassis layout, power and cooling, and pre-shipment verification — separate from the spec sheet above."
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5 md:p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Chassis &amp; layout</h3>
                    <IconList items={chassisItems} large />
                  </div>
                  <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5 md:p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Power, cooling &amp; cabling</h3>
                    <IconList items={powerItems} large />
                  </div>
                  <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-5 md:p-6 md:col-span-2">
                    <h3 className="font-bold text-slate-900 text-lg mb-4">Pre-shipment check &amp; packing</h3>
                    <IconList items={packingItems} icon="•" large />
                  </div>
                </div>
              </DetailSection>

              <DetailSection
                title="Use Cases"
                subtitle="Commercial deployment scenarios for phone farm hardware and device lab operations."
              >
                <ul className="grid sm:grid-cols-2 gap-4 md:gap-5">
                  {scenarios.map((s) => (
                    <li key={s} className="rounded-xl border-2 border-slate-200 bg-white p-5 md:p-6 text-base md:text-lg text-slate-700 leading-relaxed font-medium">{s}</li>
                  ))}
                </ul>
              </DetailSection>

              {faqItems.length > 0 && (
                <DetailSection title="Product FAQ">
                  <FAQAccordion items={faqItems} large />
                </DetailSection>
              )}
            </div>

            <div className="lg:col-span-4 space-y-6 lg:space-y-8">
              <section className="detail-section lg:sticky lg:top-28">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5">What&apos;s Included</h3>
                <IconList items={accessories.length ? accessories : ["Factory-assembled hardware", "Power and USB cabling", "Setup documentation"]} icon="•" large />
              </section>
              <section className="detail-section bg-orange-50 border-orange-200">
                <h3 className="font-bold text-slate-900 text-xl md:text-2xl mb-3">Need a custom layout?</h3>
                <p className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed">
                  Share node count, device models, shipping country, and remote setup requirements. We confirm configuration before production.
                </p>
                <Link href={`/contact?product=${slug}`} className="btn-primary-lg w-full text-center block">
                  Send Hardware Requirement
                </Link>
              </section>
            </div>
          </div>

          {related.length > 0 && (
            <section className="pt-14 md:pt-16 lg:pt-20 pb-10 border-t-2 border-slate-200">
              <SectionHeader title="Related Products" subtitle="Compatible hardware and accessories for your device lab." large />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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

          <div className="pb-10 md:pb-12">
            <ContactCTA title={`Quote for ${product.name}`} />
          </div>
        </div>
      </div>
    </>
  );
}
