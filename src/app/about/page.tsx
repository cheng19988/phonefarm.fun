import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { CertBadgeStrip, CaseStudyCards } from "@/components/trust-sections";
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

const FACTORY_GALLERY_EXTRA = IMAGES.factoryGallery.slice(0, 4);

export default function AboutPage() {
  return (
    <>
      <PageHero
        banner
        title="Guangzhou-Based Phone Farm Hardware Team"
        subtitle="We build phone farm boxes, motherboard arrays, and rack deployments for device labs, app testing teams, and automation workflows."
        eyebrow={`Since ${SITE.since} · ${SITE.location}`}
        image={IMAGES.banners.about}
        imageAlt="Phone farm hardware assembly workshop"
      />

      <section className="inner-page-section section-band--white">
        <div className="container-wide space-y-16 md:space-y-20">
          <div id="what-is-phone-farm" className="grid lg:grid-cols-2 gap-10 items-start scroll-mt-24">
            <div>
              <SectionHeader
                title="What Is a Phone Farm?"
                subtitle="A practical introduction for teams evaluating real-device hardware."
                large
              />
              <div className="prose-content text-base md:text-lg">
                <p>
                  A <strong>phone farm</strong> is a dedicated hardware setup that runs multiple real Android smartphones
                  in parallel — typically 20 devices per chassis — with centralized power, cooling, USB data paths, and network ports.
                </p>
                <p>
                  Phone farms are used by QA labs, app developers, marketing teams, and automation engineers who need
                  <strong> real silicon behavior</strong> that emulators and cloud phones cannot fully replicate: OEM-specific builds,
                  regional apps, payment SDKs, camera/sensor paths, and multi-account workflows.
                </p>
                <p>
                  PhoneFarm Fun builds the <strong>hardware layer</strong>: factory-assembled boxes, motherboard clusters, and custom racks
                  shipped from Guangzhou. Devices are mounted, ports are routed (USB · LAN · OTG), and units are burn-in tested before export.
                </p>
              </div>
            </div>
            <div className="photo-stage photo-stage--wide min-h-[280px] lg:min-h-[320px]">
              <Image
                src={IMAGES.phoneFarmBox.hero}
                alt="Configured phone farm box with Android devices"
                fill
                className="photo-fit--hero"
                sizes="50vw"
              />
            </div>
          </div>

          <div>
            <SectionHeader title="What We Build" subtitle="Factory-assembled hardware for real-device phone farm and QA lab deployment." large />
            <IconList items={BUILD_ITEMS} large />
          </div>

          <div>
            <SectionHeader title="Quality & Compliance" subtitle="Factory QC, export packaging, and compliance marks for international B2B buyers." large />
            <div className="mb-8">
              <CertBadgeStrip />
            </div>
            <p className="text-sm text-zinc-500 max-w-2xl">
              Units are burn-in tested before foam packing. Share your destination country on the contact form for freight and clearance guidance.
            </p>
          </div>

          <div>
            <SectionHeader title="Workshop & Assembly" subtitle="Photos from our Guangzhou facility — assembly, testing, packing, and rack configuration." large />
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              {WORKSHOP_PHOTOS.map((photo) => (
                <figure key={photo.label} className="card product-card-heavy overflow-hidden">
                  <div className="relative aspect-[16/10] lg:aspect-[3/2] bg-zinc-50">
                    <Image src={photo.src} alt={photo.label} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                  </div>
                  <figcaption className="p-5 md:p-6">
                    <h3 className="font-bold text-zinc-900 text-lg mb-2">{photo.label}</h3>
                    <p className="text-zinc-600 text-sm md:text-base leading-relaxed">{photo.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8">
              {FACTORY_GALLERY_EXTRA.map((src, i) => (
                <div key={src} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-200">
                  <Image src={src} alt={`Guangzhou factory floor ${i + 1}`} fill className="object-cover" sizes="200px" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Representative projects" subtitle="Anonymized B2B deployments using PhoneFarm Fun hardware." large />
            <CaseStudyCards />
          </div>

          <div className="catalog-section-band">
            <SectionHeader title="How We Work" subtitle="From requirement to remote setup — our standard hardware delivery path." large />
            <DeliveryTimeline steps={WORKFLOW.map((w) => `${w.title} — ${w.desc}`)} />
          </div>

          <div className="detail-section max-w-3xl">
            <p className="font-semibold text-zinc-900 mb-3">Contact the team</p>
            <p>
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Telegram {CONTACT.telegram}</a>
              {" · "}
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">WhatsApp {CONTACT.whatsapp}</a>
            </p>
            <p className="mt-2">
              <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">{CONTACT.email}</a>
              {" · "}{SITE.location}
            </p>
          </div>

          <ContactCTA title="Discuss Your Device Lab Requirements" />
        </div>
      </section>
    </>
  );
}
