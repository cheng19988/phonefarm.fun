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
        large
        title="Guangzhou-Based Phone Farm Hardware Team"
        subtitle="We build phone farm boxes, motherboard arrays, and rack deployments for device labs, app testing teams, and automation workflows."
        eyebrow={`Since ${SITE.since} · ${SITE.location}`}
        image={IMAGES.company.workshop}
        imageAlt="Phone farm hardware assembly workshop"
      />

      <section className="section pt-12 md:pt-16">
        <div className="container-wide space-y-16 md:space-y-20">
          <div className="max-w-4xl">
            <SectionHeader title="What We Build" subtitle="Factory-assembled hardware for real-device phone farm and QA lab deployment." />
            <IconList items={BUILD_ITEMS} large />
          </div>

          <div>
            <SectionHeader title="Workshop & Assembly" subtitle="Photos from our Guangzhou facility — assembly, testing, packing, and rack configuration." />
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              {WORKSHOP_PHOTOS.map((photo) => (
                <figure key={photo.label} className="card overflow-hidden">
                  <div className="relative aspect-[16/10] bg-slate-50">
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

          <div>
            <SectionHeader title="How We Work" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
              {WORKFLOW.map((item) => (
                <div key={item.step} className="card p-5 md:p-6">
                  <span className="inline-flex w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm items-center justify-center mb-4">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 md:p-8 text-base text-slate-600 max-w-3xl">
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
