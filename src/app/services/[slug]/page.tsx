import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceBuyButtons, FAQAccordion } from "@/components/commerce";
import { ContactBar, JsonLd } from "@/components/shared";
import { getService, SERVICES } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { Breadcrumbs, PriceDisplay, SectionHeader, IconList } from "@/components/store";

type Props = { params: Promise<{ slug: string }> };

const DELIVERY_STEPS = [
  "Confirm requirement — scope, node count, and timeline",
  "Prepare hardware — parts, chassis, and accessory modules",
  "Assemble — mounting, power, USB, and cable routing",
  "Test — burn-in and basic operation verification",
  "Pack & ship — export packaging from Guangzhou",
  "Remote setup support — optional workstation configuration",
];

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
        data={[
          serviceJsonLd({
            title: service.title,
            description: service.description,
            slug: service.slug,
            priceUsd: service.priceUsd,
          }),
          breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${slug}` },
        ]),
        ]}
      />
      <div className="section pt-10 md:pt-14">
        <div className="container-wide">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]} />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] lg:aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-lg">
                <Image src={service.image} alt={service.title} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 58vw" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="card p-6 md:p-8 lg:p-10 lg:sticky lg:top-24">
                <p className="text-orange-600 text-sm font-semibold uppercase tracking-wide mb-2">
                  {quoteOnly ? "Quote-based service" : "Fixed-price service"}
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 mb-4 leading-tight">{service.title}</h1>
                <p className="text-base md:text-lg text-zinc-600 mb-4 leading-relaxed">{service.description}</p>
                <p className="text-sm md:text-base text-zinc-500 mb-6">Timeline: {service.timeline}</p>
                {quoteOnly ? (
                  <p className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8">Custom quote required</p>
                ) : (
                  <div className="mb-8"><PriceDisplay amount={service.priceUsd} size="xl" /></div>
                )}
                <ServiceBuyButtons slug={service.slug} priceUsd={service.priceUsd} />
                <div className="mt-6 p-4 md:p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm">
                  <p className="font-semibold text-zinc-900 mb-2">Sales contact</p>
                  <ContactBar />
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <section>
              <SectionHeader title="Deliverables" />
              <ul className="grid sm:grid-cols-1 gap-4">
                {service.deliverables.map((d) => (
                  <li key={d} className="card p-5 text-sm md:text-base text-zinc-600 leading-relaxed">{d}</li>
                ))}
              </ul>
            </section>
            <section>
              <SectionHeader title="Delivery process" />
              <IconList items={DELIVERY_STEPS} large />
            </section>
          </div>

          {service.faq.length > 0 && (
            <section className="mb-16 max-w-4xl">
              <SectionHeader title="Service FAQ" />
              <FAQAccordion items={service.faq.map((f) => ({ question: f.q, answer: f.a }))} />
            </section>
          )}

          <Link href="/services" className="btn-outline px-8 py-3">← All Services</Link>
        </div>
      </div>
    </>
  );
}
