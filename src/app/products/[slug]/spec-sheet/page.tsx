import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products-server";
import { getProductMeta } from "@/data/product-meta";
import { getProfessionalSpecs } from "@/data/product-specs";
import { SITE, CONTACT } from "@/lib/config";
import { PrintSpecButton } from "@/components/print-spec-button";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

function parseJson<T>(s: string, fallback: T): T {
  try {
    return JSON.parse(s);
  } catch {
    return fallback;
  }
}

export default async function ProductSpecSheetPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const meta = getProductMeta(slug);
  const rawSpecs = parseJson<Record<string, string>>(product.specs, {});
  const specs = getProfessionalSpecs(slug, rawSpecs);
  const features = parseJson<string[]>(product.features, []);

  return (
    <div className="spec-sheet min-h-screen bg-white text-zinc-900">
      <style>{`
        @media print {
          .spec-sheet-toolbar { display: none !important; }
          .spec-sheet { padding: 0; }
        }
      `}</style>

      <div className="spec-sheet-toolbar border-b border-zinc-200 bg-zinc-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <Link href={`/products/${slug}`} className="text-sm text-[var(--accent)] font-medium hover:underline">
          ← Back to product
        </Link>
        <PrintSpecButton />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <header className="border-b-2 border-zinc-900 pb-6 mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-2">{SITE.name}</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-zinc-600">{product.shortDesc}</p>
          <p className="text-sm text-zinc-500 mt-4">
            Reference price: ${product.priceUsd.toLocaleString()} USD · MOQ {meta.moq} · Lead time: {meta.leadTime}
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Overview</h2>
          <p className="text-sm leading-relaxed text-zinc-700">{product.description}</p>
        </section>

        {features.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Key features</h2>
            <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3 uppercase tracking-wide">Technical specifications</h2>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {Object.entries(specs).map(([key, value]) => (
                <tr key={key} className="border-b border-zinc-200">
                  <td className="py-2 pr-4 font-medium text-zinc-900 w-[40%]">{key}</td>
                  <td className="py-2 text-zinc-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mb-8 grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-bold mb-1">Node capacity</p>
            <p className="text-zinc-700">{meta.nodeCount}</p>
          </div>
          <div>
            <p className="font-bold mb-1">Deployment type</p>
            <p className="text-zinc-700">{meta.deploymentType}</p>
          </div>
          <div>
            <p className="font-bold mb-1">Typical use</p>
            <p className="text-zinc-700">{meta.useCase}</p>
          </div>
          <div>
            <p className="font-bold mb-1">Factory location</p>
            <p className="text-zinc-700">{SITE.location}</p>
          </div>
        </section>

        <footer className="border-t border-zinc-200 pt-6 text-xs text-zinc-500 leading-relaxed">
          <p>Generated from {SITE.url}/products/{slug} · {new Date().toISOString().slice(0, 10)}</p>
          <p className="mt-2">
            Sales: {CONTACT.telegram} · {CONTACT.whatsapp} · {CONTACT.email}
          </p>
          <p className="mt-2">Configurable values confirmed before production. Import duties and freight quoted separately.</p>
        </footer>
      </div>
    </div>
  );
}
