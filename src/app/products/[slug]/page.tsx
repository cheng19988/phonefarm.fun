import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products-server";
import { BuyButtons, FAQAccordion, ProductCard } from "@/components/commerce";
import { ProductGallery } from "@/components/product-gallery";
import { ContactCTA, ContactBar, JsonLd, StockBadge } from "@/components/shared";
import { getProductGalleryImages, getProductCardImage, isAccessorySlug, ACCESSORY_PHOTO_CAPTION } from "@/data/product-images";
import { DeviceModelGridAll } from "@/components/device-model-grid";
import { getProductMeta, getProductEyebrow } from "@/data/product-meta";
import { getProductHighlight } from "@/data/product-highlights";
import { getProfessionalSpecs } from "@/data/product-specs";
import { isQuotePreferredProduct } from "@/lib/product-commerce";
import { buildMetadata, productJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { Breadcrumbs, SpecTable, IconList, MetaGrid, PriceDisplay, SectionHeader, DetailSection, TrustStrip } from "@/components/store";

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

const MODEL_GRID_SLUGS = new Set(["phone-farm-box", "android-phone-farm", "real-device-phone-farm"]);

const DEFAULT_CHASSIS = [
  "Factory-assembled steel chassis with labeled device trays",
  "Mounting hardware and internal cable routing channels",
  "Layout verified against your SKU configuration before packing",
];
const DEFAULT_POWER = [
  "Centralized PSU with protected power rails",
  "Active cooling path sized for continuous lab operation",
  "USB backplane and labeled data paths for stable ADB",
];
const DEFAULT_PACKING = [
  "Power and connectivity burn-in before export",
  "Foam-lined export packaging with slot-level QC notes",
  "Commercial invoice and freight handoff from Guangzhou",
];

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const meta = getProductMeta(slug);
  const quotePreferred = isQuotePreferredProduct(slug, meta.leadTime, meta.deploymentType);
  const related = await getRelatedProducts(slug, 3);

  const rawSpecs = parseJson<Record<string, string>>(product.specs, {});
  const specs = getProfessionalSpecs(slug, rawSpecs);
  const scenarios = parseJson<string[]>(product.scenarios, []);
  const accessories = parseJson<string[]>(product.accessories, []);
  const delivery = parseJson<string[]>(product.delivery, []);
  const maintenance = parseJson<string[]>(product.maintenance, []);
  const features = parseJson<string[]>(product.features, []);
  const faq = parseJson<{ q: string; a: string }[]>(product.faq, []);
  const faqItems = faq.map((f) => ({ question: f.q, answer: f.a }));

  const gallery = getProductGalleryImages(slug, [
    product.imageHero,
    product.imageDetail,
    product.imageCard,
  ]);

  const chassisItems =
    accessories.length >= 2 ? accessories.slice(0, 4) : features.length >= 2 ? features.slice(0, 4) : DEFAULT_CHASSIS;
  const powerItems =
    maintenance.length >= 2 ? maintenance.slice(0, 4) : features.length >= 2 ? features.slice(0, 4) : DEFAULT_POWER;
  const packingItems = delivery.length ? delivery.slice(0, 4) : DEFAULT_PACKING;
  const photoCaption =
    product.category === "Accessory" || isAccessorySlug(slug) ? ACCESSORY_PHOTO_CAPTION : undefined;

  return (
    <>
      <JsonLd data={[
        productJsonLd({ name: product.name, description: product.shortDesc, longDescription: product.description, slug: product.slug, priceUsd: product.priceUsd, stock: product.stock, image: product.imageHero }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${slug}` },
        ]),
        ...(faqItems.length > 0 ? [faqJsonLd(faqItems)] : []),
      ]} />

      <div className="bg-gradient-to-b from-zinc-50 to-white border-b border-zinc-200">
        <div className="container-wide pt-5 md:pt-7 pb-7 md:pb-9">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name },
          ]} />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12">
            <div className="lg:col-span-7 xl:col-span-8">
              <ProductGallery images={gallery} alt={product.name} caption={photoCaption} />
            </div>

            <div className="lg:col-span-5 xl:col-span-4">
              <div className="card product-card-heavy p-5 md:p-6 lg:sticky lg:top-28 shadow-md border-zinc-200/90">
                <p className="text-[var(--accent)] text-sm font-bold uppercase tracking-widest mb-3">
                  {getProductEyebrow(meta, product.category)}
                </p>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-zinc-900 mb-3 leading-tight tracking-tight">
                  {product.name}
                </h1>
                {getProductHighlight(slug) && (
                  <p className="text-sm text-zinc-600 mb-4 leading-relaxed border-l-2 border-orange-400 pl-3">
                    {getProductHighlight(slug)}
                  </p>
                )}
                <p className="text-base md:text-lg text-zinc-600 mb-6 leading-relaxed">{product.shortDesc}</p>
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-zinc-200">
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
                <div className="mt-8">
                  <BuyButtons slug={product.slug} stock={product.stock} quotePreferred={quotePreferred} />
                  <TrustStrip items={[
                    "Standard configuration",
                    "Pre-shipment testing",
                    "Packed before export",
                    "Custom rack quoted separately",
                  ]} />
                </div>
                <div className="mt-6 p-5 md:p-6 rounded-xl bg-zinc-50 border-2 border-zinc-200">
                  <p className="font-bold text-zinc-900 mb-2 text-base">Sales &amp; configuration</p>
                  <ContactBar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section pt-8 md:pt-10 pb-0">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 pb-10 md:pb-12">
            <div className="lg:col-span-8 space-y-8">
              <DetailSection title="Overview">
                <p className="text-zinc-600 text-base md:text-lg leading-relaxed">{product.description}</p>
                {features.length > 0 && (
                  <ul className="mt-5 grid sm:grid-cols-2 gap-2.5">
                    {features.map((item) => (
                      <li key={item} className="flex gap-2 text-sm md:text-base text-zinc-700 leading-relaxed">
                        <span className="text-[var(--accent)] shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-5 text-zinc-700 text-base leading-relaxed">
                  <span className="font-semibold text-zinc-900">Best for: </span>
                  {meta.useCase}
                </p>
              </DetailSection>

              <DetailSection
                title="Key Specifications"
                subtitle="Hardware parameters for procurement review. Configurable values confirmed before production."
              >
                <SpecTable specs={specs} large />
                <Link
                  href={`/products/${slug}/spec-sheet`}
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  Download spec sheet (PDF) →
                </Link>
              </DetailSection>

              <DetailSection
                title="Hardware Details"
                subtitle="Chassis layout, power and cooling, and pre-shipment verification — separate from the spec sheet above."
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-5 md:p-6">
                    <h3 className="font-bold text-zinc-900 text-lg mb-4">Chassis &amp; layout</h3>
                    <IconList items={chassisItems} large />
                  </div>
                  <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-5 md:p-6">
                    <h3 className="font-bold text-zinc-900 text-lg mb-4">Power, cooling &amp; cabling</h3>
                    <IconList items={powerItems} large />
                  </div>
                  <div className="rounded-xl border-2 border-zinc-200 bg-zinc-50 p-5 md:p-6 md:col-span-2">
                    <h3 className="font-bold text-zinc-900 text-lg mb-4">Pre-shipment check &amp; packing</h3>
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
                    <li key={s} className="rounded-xl border-2 border-zinc-200 bg-white p-5 md:p-6 text-base md:text-lg text-zinc-700 leading-relaxed font-medium">{s}</li>
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
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-5">What&apos;s Included</h3>
                <IconList items={accessories.length ? accessories : ["Factory-assembled hardware", "Power and USB cabling", "Setup documentation"]} icon="•" large />
              </section>
              <section className="detail-section bg-orange-50 border-orange-200">
                <h3 className="font-bold text-zinc-900 text-xl md:text-2xl mb-3">Need a custom layout?</h3>
                <p className="text-base md:text-lg text-zinc-600 mb-6 leading-relaxed">
                  Share node count, device models, shipping country, and remote setup requirements. We confirm configuration before production.
                </p>
                <Link href={`/contact?product=${slug}`} className="btn-primary-lg w-full text-center block">
                  Send Hardware Requirement
                </Link>
              </section>
            </div>
          </div>

          {MODEL_GRID_SLUGS.has(slug) && (
            <section className="pt-10 md:pt-12 border-t border-zinc-200">
              <SectionHeader
                title="Compatible Android Models"
                subtitle="Full factory catalog with RAM, storage, and port routing from product detail images. Share your target device list when ordering."
                large
              />
              <DeviceModelGridAll />
            </section>
          )}

          {related.length > 0 && (
            <section className="pt-10 md:pt-12 pb-8 border-t border-zinc-200">
              <SectionHeader title="Related Products" subtitle="Compatible hardware and accessories for your device lab." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                      imageCard={getProductCardImage(p.slug, p.imageCard)}
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
