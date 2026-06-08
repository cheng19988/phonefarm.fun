import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceBuyButtons, FAQAccordion } from "@/components/commerce";
import { ContactBar, JsonLd } from "@/components/shared";
import { getService, SERVICES } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Breadcrumbs, PriceDisplay, SectionHeader } from "@/components/store";

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

  const quoteOnly = service.priceUsd <= 0;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ])}
      />
      <div className="section pt-8 md:pt-10">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]} />

          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
              <Image src={service.image} alt={service.title} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div>
              <p className="text-orange-600 text-sm font-medium mb-2">
                {quoteOnly ? "Quote-based service" : "Fixed-price service"}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{service.title}</h1>
              <p className="text-slate-600 mb-4 leading-relaxed">{service.description}</p>
              <p className="text-sm text-slate-500 mb-4">Timeline: {service.timeline}</p>
              {quoteOnly ? (
                <p className="text-xl font-bold text-slate-900 mb-6">Custom quote required</p>
              ) : (
                <div className="mb-6"><PriceDisplay amount={service.priceUsd} size="lg" /></div>
              )}
              <ServiceBuyButtons slug={service.slug} priceUsd={service.priceUsd} />
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm">
                <p className="font-medium text-slate-900 mb-2">Sales contact</p>
                <ContactBar />
              </div>
            </div>
          </div>

          <section className="mb-12">
            <SectionHeader title="Deliverables" />
            <ul className="grid sm:grid-cols-2 gap-3">
              {service.deliverables.map((d) => (
                <li key={d} className="card p-4 text-sm text-slate-600">{d}</li>
              ))}
            </ul>
          </section>

          {service.faq.length > 0 && (
            <section className="mb-12">
              <SectionHeader title="Service FAQ" />
              <FAQAccordion items={service.faq.map((f) => ({ question: f.q, answer: f.a }))} />
            </section>
          )}

          <Link href="/services" className="btn-outline">← All Services</Link>
        </div>
      </div>
    </>
  );
}
