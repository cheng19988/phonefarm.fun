import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { CONTACT, SITE } from "@/lib/config";
import { PageHero, SectionHeader, IconList } from "@/components/store";

export const metadata = buildMetadata({
  title: "About PhoneFarm Fun — Guangzhou Hardware Team",
  description:
    "Guangzhou-based team building phone farm boxes, motherboard arrays, and custom rack deployments for device labs and automation teams.",
  path: "/about",
});

const WORKSHOP_PHOTOS = [
  { src: IMAGES.company.workshop, label: "Assembly & wiring", caption: "Device mounting, USB routing, and power distribution in our Guangzhou workshop." },
  { src: IMAGES.company.warehouse, label: "Testing & packing", caption: "Burn-in checks and export packaging before shipment." },
  { src: IMAGES.workshop, label: "Rack configuration", caption: "Custom rack and cabinet layout for high-density phone farm deployments." },
] as const;

const BUILD_ITEMS = [
  "20-node phone farm boxes for real Android devices",
  "Motherboard arrays for headless QA at scale",
  "Power, cooling, and USB routing modules",
  "Custom rack and cabinet solutions (40+ nodes, quoted)",
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
        title="Guangzhou-Based Phone Farm Hardware Team"
        subtitle="We build phone farm boxes, motherboard arrays, and rack deployments for device labs, app testing teams, and automation workflows."
        eyebrow={`Since ${SITE.since} · ${SITE.location}`}
        image={IMAGES.company.workshop}
        imageAlt="Phone farm hardware assembly workshop"
        compact
      />

      <section className="section pt-10 md:pt-12">
        <div className="container-wide max-w-4xl space-y-16">
          <div>
            <SectionHeader title="What We Build" />
            <IconList items={BUILD_ITEMS} />
          </div>

          <div>
            <SectionHeader title="Workshop & Assembly" subtitle="Real photos from our Guangzhou facility — assembly, testing, packing, and rack configuration." />
            <div className="space-y-8">
              {WORKSHOP_PHOTOS.map((photo) => (
                <figure key={photo.label} className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image src={photo.src} alt={photo.label} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                  </div>
                  <figcaption>
                    <h3 className="font-bold text-slate-900 mb-2">{photo.label}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{photo.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="How We Work" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WORKFLOW.map((item) => (
                <div key={item.step} className="card p-5">
                  <span className="inline-flex w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm items-center justify-center mb-3">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 text-sm text-slate-600">
            <p className="font-medium text-slate-900 mb-2">Contact the team</p>
            <p>Phone: {CONTACT.phone} · WhatsApp: {CONTACT.whatsapp} · Telegram: {CONTACT.telegram}</p>
            <p className="mt-1">Email: {CONTACT.email} · {SITE.location}</p>
          </div>

          <ContactCTA title="Discuss Your Device Lab Requirements" />
        </div>
      </section>
    </>
  );
}
