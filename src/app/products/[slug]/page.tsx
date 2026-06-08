import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products-server";
import { BuyButtons, FAQAccordion, ProductCard } from "@/components/commerce";
import { ContactCTA, ContactBar, JsonLd, StockBadge } from "@/components/shared";
import { getProductMeta } from "@/data/product-meta";
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
  const specs = parseJson<Record<string, string>>(product.specs, {});
  const scenarios = parseJson<string[]>(product.scenarios, []);
  const accessories = parseJson<string[]>(product.accessories, []);
  const delivery = parseJson<string[]>(product.delivery, []);
  const faq = parseJson<{ q: string; a: string }[]>(product.faq, []);
  const faqItems = faq.map((f) => ({ question: f.q, answer: f.a }));

  const gallery = [product.imageDetail, product.imageHero, product.imageCard].filter(
    (v, i, a) => a.indexOf(v) === i
  );

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

      <div className="section pt-8 md:pt-10">
        <div className="container-wide">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name },
          ]} />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 mb-3">
                <Image src={product.imageDetail} alt={product.name} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {gallery.slice(0, 4).map((src) => (
                    <div key={src} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                      <Image src={src} alt="" fill className="object-cover" sizes="120px" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="text-orange-600 text-sm font-medium mb-2">{meta.tier} · {product.category}</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 leading-tight">{product.name}</h1>
              <p className="text-slate-600 mb-6 leading-relaxed">{product.shortDesc}</p>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <PriceDisplay amount={product.priceUsd} size="lg" />
                <StockBadge stock={product.stock} />
              </div>
              <MetaGrid items={[
                { label: "Nodes", value: meta.nodeCount },
                { label: "MOQ", value: `${meta.moq} unit` },
                { label: "Lead time", value: meta.leadTime },
              ]} />
              <div className="mt-6">
                <BuyButtons slug={product.slug} stock={product.stock} />
              </div>
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <p className="font-medium text-slate-900 mb-2">Sales contact</p>
                <ContactBar />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <SectionHeader title="Overview" />
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </section>

              {features.length > 0 && (
                <section>
                  <SectionHeader title="Key Features" />
                  <IconList items={features} />
                </section>
              )}

              <section>
                <SectionHeader title="Key Specifications" />
                <SpecTable specs={specs} />
              </section>

              <section>
                <SectionHeader title="Use Cases" subtitle="Built for phone farm deployment, app testing, device labs, and Android hardware automation workflows." />
                <ul className="grid sm:grid-cols-2 gap-3">
                  {scenarios.map((s) => (
                    <li key={s} className="card p-4 text-sm text-slate-600">{s}</li>
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

            <div className="space-y-6">
              <section className="card p-6">
                <h3 className="font-bold text-slate-900 mb-3">What&apos;s Included</h3>
                <IconList items={accessories} icon="•" />
              </section>
              <section className="card p-6">
                <h3 className="font-bold text-slate-900 mb-3">Pre-Shipment &amp; Delivery</h3>
                <IconList items={delivery} icon="•" />
              </section>
              <div className="card p-6 bg-orange-50 border-orange-100">
                <h3 className="font-bold text-slate-900 mb-2">Need a custom layout?</h3>
                <p className="text-sm text-slate-600 mb-4">Share node count, device models, and rack requirements for a tailored quote.</p>
                <Link href={`/contact?product=${slug}`} className="btn-primary text-sm w-full text-center block">Request Custom Quote</Link>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-16 pt-12 border-t border-slate-200">
              <SectionHeader title="Related Products" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      moq={rMeta.moq}
                      leadTime={rMeta.leadTime}
                      compact
                    />
                  );
                })}
              </div>
            </section>
          )}

          <div className="mt-16">
            <ContactCTA title={`Quote for ${product.name}`} />
          </div>
        </div>
      </div>
    </>
  );
}
