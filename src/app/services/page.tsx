import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Device Lab Setup & Hardware Services",
  description:
    "Device lab assembly, remote workstation setup, multi-device lab management, custom hardware engineering, maintenance, and international shipping from Guangzhou.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Device Lab Services</h1>
        <p className="section-subtitle max-w-3xl">
          Hardware assembly, lab configuration, and export logistics from our Guangzhou workshop. Fixed-price services can be added to cart; rack and enterprise projects require a quote.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc) => (
            <article key={svc.slug} className="card overflow-hidden group flex flex-col">
              <div className="relative aspect-video">
                <Image src={svc.image} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{svc.title}</h2>
                <p className="text-slate-600 text-sm mb-3 flex-1">{svc.description}</p>
                <p className="text-xs text-slate-500 mb-3">
                  {svc.priceUsd > 0 ? `$${svc.priceUsd} · ${svc.timeline}` : `Quote required · ${svc.timeline}`}
                </p>
                <Link href={`/services/${svc.slug}`} className="text-orange-600 text-sm hover:text-orange-500">
                  View Details →
                </Link>
                {svc.priceUsd <= 0 && (
                  <Link href={`/contact?service=${svc.slug}`} className="btn-outline text-sm text-center mt-3">
                    Request Quote
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16">
          <ContactCTA title="Need a Custom Deployment Plan?" />
        </div>
      </div>
    </div>
  );
}
