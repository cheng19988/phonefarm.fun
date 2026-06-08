import { ServiceCard } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { SERVICES } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero, SectionHeader } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Device Farm Setup & Hardware Support",
  description:
    "Assembly, remote workstation setup, custom hardware engineering, deployment support, and maintenance for phone farm labs from Guangzhou.",
  path: "/services",
});

const SERVICE_GROUPS = [
  {
    title: "Setup & Assembly",
    desc: "Mount devices, route power and USB, run burn-in, and hand off a ready-to-test cluster.",
    slugs: ["phone-farm-setup", "sample-solution"],
  },
  {
    title: "Remote Operation",
    desc: "Configure ADB paths, device grouping, and control workstations for remote lab operation.",
    slugs: ["remote-control-configuration", "group-control-system-configuration"],
  },
  {
    title: "Hardware Customization",
    desc: "Bespoke chassis design, rack integration, and enterprise deployment engineering.",
    slugs: ["custom-hardware-solution", "enterprise-deployment"],
  },
  {
    title: "Deployment Support",
    desc: "Large-scale lab provisioning, international shipping, and export logistics.",
    slugs: ["bulk-device-deployment", "overseas-delivery"],
  },
  {
    title: "Maintenance & Replacement",
    desc: "Ongoing hardware support, replacement parts, and periodic health checks.",
    slugs: ["maintenance-support"],
  },
] as const;

export default function ServicesPage() {
  const bySlug = new Map(SERVICES.map((s) => [s.slug, s]));

  return (
    <>
      <PageHero
        title="Device Farm Setup & Hardware Support"
        subtitle="Assembly, cabling, remote control configuration, testing, and delivery support for phone farm boxes and device labs."
        eyebrow="Guangzhou workshop services"
        image={IMAGES.workshop}
        imageAlt="Phone farm hardware assembly services"
        compact
      />

      <section className="section pt-10 md:pt-12">
        <div className="container-wide space-y-16">
          {SERVICE_GROUPS.map((group) => {
            const items = group.slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
            if (items.length === 0) return null;
            return (
              <div key={group.title}>
                <SectionHeader title={group.title} subtitle={group.desc} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((svc) => (
                    <ServiceCard
                      key={svc!.slug}
                      slug={svc!.slug}
                      title={svc!.title}
                      description={svc!.description}
                      image={svc!.image}
                      priceUsd={svc!.priceUsd}
                      timeline={svc!.timeline}
                      quoteOnly={svc!.priceUsd <= 0}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          <ContactCTA title="Need a Custom Deployment Plan?" />
        </div>
      </section>
    </>
  );
}
