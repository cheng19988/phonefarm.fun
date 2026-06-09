import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { CONTACT, SITE } from "@/lib/config";
import { PageHero, SectionHeader, IconList, DeliveryTimeline } from "@/components/store";

export const metadata = buildMetadata({
  title: "About PhoneFarm Fun — Guangzhou Hardware Team",
  description:
    "Guangzhou-based team building phone farm boxes, motherboard arrays, and custom rack deployments for device labs and automation teams.",
  path: "/about",
});

const WORKSHOP_PHOTOS = [
  { src: IMAGES.company.workshop, label: "Assembly & wiring", caption: "Device mounting, USB routing, and power distribution in our Guangzhou workshop." },
  { src: IMAGES.company.warehouse, label: "Testing & packing", caption: "Burn-in checks and export packaging before international shipment." },
  { src: IMAGES.workshop, label: "Rack configuration", caption: "Custom rack and cabinet layout for high-density phone farm deployments." },
  { src: IMAGES.company.meeting, label: "Configuration review", caption: "Requirement confirmation before chassis assembly and production." },
] as const;

const BUILD_ITEMS = [
  "20-node phone farm boxes for real Android devices",
  "Motherboard arrays for headless QA at scale",
  "Power, cooling, and USB routing modules",
  "Custom rack and cabinet solutions (40+ nodes, quoted per project)",
];

const WORKFLOW = [
  { step: "1", title: "Confirm requirements", desc: "Node count, device models, shipping country, and remote setup needs." },
  { step: "2", title: "Prepare hardware", desc: "Chassis, PSU, cooling, and cabling sized for your deployment." },
  { step: "3", title: "Assemble & test", desc: "Power, cooling, cabling, and basic operation checks before packing." },
  { step: "4", title: "Pack & ship", desc: "Export packaging from Guangzhou via express or sea freight." },
  { step: "5", title: "Remote setup support", desc: "Optional ADB and workstation configuration after delivery." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        banner
        title="Guangzhou-Based Phone Farm Hardware Team"
        subtitle="We build phone farm boxes, motherboard arrays, and rack deployments for device labs, app testing teams, and automation workflows."
        eyebrow={`Since ${SITE.since} · ${SITE.location}`}
        image={IMAGES.company.workshop}
        imageAlt="Phone farm hardware assembly workshop"
      />

      <section className="inner-page-section">
        <div className="container-wide space-y-16 md:space-y-20">
          <div>
            <SectionHeader title="What We Build" subtitle="Factory-assembled hardware for real-device phone farm and QA lab deployment." large />
            <IconList items={BUILD_ITEMS} large />
          </div>

          <div>
            <SectionHeader title="Workshop & Assembly" subtitle="Photos from our Guangzhou facility — assembly, testing, packing, and rack configuration." large />
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              {WORKSHOP_PHOTOS.map((photo) => (
                <figure key={photo.label} className="card product-card-heavy overflow-hidden">
                  <div className="relative aspect-[16/10] lg:aspect-[3/2] bg-slate-50">
                    <Image src={photo.src} alt={photo.label} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                  </div>
                  <figcaption className="p-5 md:p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{photo.label}</h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">{photo.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="catalog-section-band">
            <SectionHeader title="How We Work" subtitle="From requirement to remote setup — our standard hardware delivery path." large />
            <DeliveryTimeline steps={WORKFLOW.map((w) => `${w.title} — ${w.desc}`)} />
          </div>

          <div className="detail-section max-w-3xl">
            <p className="font-semibold text-slate-900 mb-3">Contact the team</p>
            <p>Phone: {CONTACT.phone} · WhatsApp: {CONTACT.whatsapp} · Telegram: {CONTACT.telegram}</p>
            <p className="mt-2">Email: {CONTACT.email} · {SITE.location}</p>
          </div>

          <ContactCTA title="Discuss Your Device Lab Requirements" />
        </div>
      </section>
    </>
  );
}
