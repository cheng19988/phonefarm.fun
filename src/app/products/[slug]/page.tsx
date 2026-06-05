import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products-server";
import { BuyButtons, FAQAccordion, ProductCard } from "@/components/commerce";
import { ContactCTA, ContactBar, JsonLd, StockBadge } from "@/components/shared";
import { getProductMeta } from "@/data/product-meta";
import { buildMetadata, productJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

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

      <div className="section">
        <div className="container-wide">
          {/* Hero */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900">
              <Image src={product.imageDetail} alt={product.name} fill className="object-cover" priority />
            </div>
            <div>
              <p className="text-cyan-400 text-sm mb-2">{meta.tier} · {product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{product.name}</h1>
              <p className="text-slate-300 mb-6">{product.shortDesc}</p>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-white">${product.priceUsd.toLocaleString()}</span>
                <StockBadge stock={product.stock} />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-sm">
                <div className="card p-3"><span className="text-slate-500 block text-xs">Nodes</span><span className="text-white">{meta.nodeCount}</span></div>
                <div className="card p-3"><span className="text-slate-500 block text-xs">MOQ</span><span className="text-white">{meta.moq} unit</span></div>
                <div className="card p-3"><span className="text-slate-500 block text-xs">Lead time</span><span className="text-white">{meta.leadTime}</span></div>
              </div>
              <BuyButtons slug={product.slug} stock={product.stock} />
              <div className="mt-6 p-4 rounded-lg bg-slate-900/80 border border-slate-800 text-sm">
                <p className="font-medium text-white mb-2">Sales contact</p>
                <ContactBar />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-slate-300 leading-relaxed">{product.description}</p>
              </section>

              {features.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex gap-2 text-slate-300"><span className="text-cyan-400">✓</span>{f}</li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Key Specifications</h2>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(specs).map(([k, v]) => (
                      <tr key={k} className="border-b border-slate-800">
                        <td className="py-3 text-slate-400 pr-4 w-1/3">{k}</td>
                        <td className="py-3 text-white">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Built for Real-Device Workflows</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {scenarios.map((s) => (
                    <li key={s} className="card p-4 text-sm text-slate-300">{s}</li>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm mt-4">
                  Designed for app QA testing, Android compatibility checks, device lab setup, and long-running automation tasks within your platform policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">FAQ</h2>
                <FAQAccordion items={faqItems} />
              </section>

              <section className="card p-6">
                <h2 className="text-lg font-bold text-white mb-2">Customer feedback</h2>
                <p className="text-slate-400 text-sm">
                  Build photos and reference deployments are available on request — contact{" "}
                  <a href="mailto:sales@phonefarm.fun" className="text-cyan-400">sales@phonefarm.fun</a> or WhatsApp for recent shipment examples from our Guangzhou workshop.
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section className="card p-6">
                <h3 className="font-bold text-white mb-3">What&apos;s Included</h3>
                <ul className="space-y-1 text-sm text-slate-400">
                  {accessories.map((a) => <li key={a}>• {a}</li>)}
                </ul>
              </section>
              <section className="card p-6">
                <h3 className="font-bold text-white mb-3">Pre-Shipment & Delivery</h3>
                <ul className="space-y-1 text-sm text-slate-400">
                  {delivery.map((d) => <li key={d}>• {d}</li>)}
                </ul>
              </section>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">Related Products</h2>
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
                      useCase={rMeta.useCase}
                      moq={rMeta.moq}
                      leadTime={rMeta.leadTime}
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
