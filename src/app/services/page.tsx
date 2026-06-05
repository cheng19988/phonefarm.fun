import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Services & Solutions",
  description:
    "Phone farm setup, remote control configuration, group control, bulk deployment, custom hardware, enterprise solutions, maintenance, samples, and overseas delivery.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Phone Farm Services</h1>
        <p className="section-subtitle max-w-3xl">
          Hardware assembly, software configuration, and logistics from our Guangzhou team. Each service starts with a scoping call — no fixed packages required.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc) => (
            <article key={svc.slug} className="card overflow-hidden group">
              <div className="relative aspect-video">
                <Image src={svc.image} alt={svc.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{svc.title}</h2>
                <p className="text-slate-400 text-sm mb-4">{svc.description}</p>
                <Link href={`/contact?service=${svc.slug}`} className="text-cyan-400 text-sm hover:text-cyan-300">
                  Request This Service →
                </Link>
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
