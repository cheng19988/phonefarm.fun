import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceBuyButtons, FAQAccordion } from "@/components/commerce";
import { ContactBar, JsonLd } from "@/components/shared";
import { getService, SERVICES } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${slug}`,
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ])}
      />
      <div className="section">
        <div className="container-wide max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
              <Image src={service.image} alt={service.title} fill className="object-cover" priority />
            </div>
            <div>
              <p className="text-cyan-400 text-sm mb-2">{service.priceUsd > 0 ? "Fixed-price service" : "Quote-based service"}</p>
              <h1 className="text-3xl font-bold text-white mb-4">{service.title}</h1>
              <p className="text-slate-300 mb-4">{service.description}</p>
              <p className="text-slate-400 text-sm mb-2">Timeline: {service.timeline}</p>
              {service.priceUsd > 0 ? (
                <p className="text-3xl font-bold text-white mb-6">${service.priceUsd.toLocaleString()}</p>
              ) : (
                <p className="text-xl text-cyan-400 mb-6">Custom quote required</p>
              )}
              <ServiceBuyButtons slug={service.slug} priceUsd={service.priceUsd} />
              <div className="mt-6 p-4 rounded-lg bg-slate-900/80 border border-slate-800">
                <p className="font-medium text-white mb-2 text-sm">Sales contact</p>
                <ContactBar />
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Deliverables</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.deliverables.map((d) => (
                <li key={d} className="card p-4 text-sm text-slate-300">{d}</li>
              ))}
            </ul>
          </section>

          {service.faq.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Service FAQ</h2>
              <FAQAccordion items={service.faq.map((f) => ({ question: f.q, answer: f.a }))} />
            </section>
          )}

          <Link href="/services" className="btn-outline">← All Services</Link>
        </div>
      </div>
    </>
  );
}
