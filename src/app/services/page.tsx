import { ServiceCard } from "@/components/commerce";
import { ContactCTA } from "@/components/shared";
import { SERVICES } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { PageHero, SectionHeader, CapabilityStrip, DeliveryTimeline } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Device Farm Setup & Hardware Support",
  description:
    "Assembly, remote workstation setup, custom hardware engineering, deployment support, and maintenance for phone farm labs from Guangzhou.",
  path: "/services",
});

const FACTORY_CAPABILITIES = [
  { title: "Assembly", desc: "Chassis mount, device trays, PSU routing, and USB cabling in our Guangzhou workshop." },
  { title: "Burn-in Testing", desc: "Power, thermal, and connectivity checks before any cluster leaves the factory." },
  { title: "Export Packing", desc: "Foam-lined crates and pallet-ready packaging for international freight." },
  { title: "Remote Setup", desc: "Optional ADB paths, grouping, and workstation configuration after delivery." },
];

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
    title: "Custom Build",
    desc: "Bespoke chassis design, rack integration, and enterprise deployment engineering.",
    slugs: ["custom-hardware-solution", "enterprise-deployment"],
  },
  {
    title: "Deployment Support",
    desc: "Large-scale lab provisioning, international shipping, and export logistics.",
    slugs: ["bulk-device-deployment", "overseas-delivery"],
  },
  {
    title: "Maintenance",
    desc: "Ongoing hardware support, replacement parts, and periodic health checks.",
    slugs: ["maintenance-support"],
  },
] as const;

const DELIVERY_FLOW = [
  "Confirm requirement — node count, device models, shipping country",
  "Prepare hardware — chassis, PSU, cooling, and cabling sized for deployment",
  "Assemble & test — power, cooling, cabling, and basic operation checks",
  "Pack & ship — export packaging from Guangzhou",
  "Remote setup support — optional ADB and workstation configuration",
];

export default function ServicesPage() {
  const bySlug = new Map(SERVICES.map((s) => [s.slug, s]));

  return (
    <>
      <PageHero
        banner
        title="Device Farm Setup & Hardware Support"
        subtitle="Assembly, cabling, burn-in testing, export packing, and remote configuration — factory delivery support for phone farm hardware."
        eyebrow="Guangzhou workshop · Factory delivery"
        image={IMAGES.banners.services}
        imageAlt="Phone farm hardware assembly services"
      />

      <section className="inner-page-section section-band--white">
        <div className="container-wide space-y-16 md:space-y-20 lg:space-y-24">
          <div>
            <SectionHeader
              title="Factory delivery capabilities"
              subtitle="What we build, test, pack, and support — not generic consulting, but hardware handoff from our workshop."
              large
            />
            <CapabilityStrip items={FACTORY_CAPABILITIES} />
          </div>

          <div className="catalog-section-band">
            <SectionHeader title="Hardware delivery workflow" subtitle="From requirement confirmation to remote setup — how we support your deployment." large />
            <DeliveryTimeline steps={DELIVERY_FLOW} />
          </div>

          {SERVICE_GROUPS.map((group, idx) => {
            const items = group.slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
            if (items.length === 0) return null;
            return (
              <div key={group.title} className="service-group-band">
                <div className="flex items-start gap-4 md:gap-5 mb-8 md:mb-10 pb-6 border-b-2 border-slate-200">
                  <span className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-lg">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">{group.title}</h2>
                    <p className="text-slate-600 text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">{group.desc}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
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
                      large
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
