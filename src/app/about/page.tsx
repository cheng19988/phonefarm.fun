import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "About PhoneFarm Fun — Guangzhou Manufacturer",
  description:
    "PhoneFarm Fun is a Guangzhou-based real-device phone farm hardware brand. Factory-direct boxes, custom solutions, and global delivery since 2017.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">About PhoneFarm Fun</h1>
        <p className="text-xl text-slate-300 mb-4 leading-relaxed">{SITE.intro}</p>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Based in <strong className="text-white">{SITE.location}</strong>, we specialize in high-density mobile device racks, motherboard chassis, USB hub modules, power and cooling systems, and network equipment. Since <strong className="text-white">{SITE.since}</strong>, we have served creator studios, marketing teams, QA labs, and enterprise clients across North America, Europe, and Southeast Asia.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "Real Device Environment", desc: "Every product uses physical smartphones or motherboards — not cloud phones or emulators." },
            { title: "Stable Deployment", desc: "Centralized power, active cooling, and QC burn-in testing ensure 24/7 uptime." },
            { title: "Custom Production", desc: "Bespoke chassis, node counts, and rack integrations engineered for your workflow." },
            { title: "Enterprise & B2B", desc: "Bulk pricing, dedicated account management, and custom deployment for large orders." },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h2 className="font-bold text-white mb-2">{item.title}</h2>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Our Guangzhou Facilities</h2>
        <p className="text-slate-400 mb-6">Office, front desk, meeting rooms, production workshop, and warehouse — real factory capacity ready for global delivery.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { src: IMAGES.company.office, label: "Office" },
            { src: IMAGES.company.frontdesk, label: "Front Desk" },
            { src: IMAGES.company.meeting, label: "Meeting Room" },
            { src: IMAGES.company.workshop, label: "Production Workshop" },
            { src: IMAGES.company.warehouse, label: "Warehouse & Shipping" },
            { src: IMAGES.serviceScene, label: "Control Systems Lab" },
          ].map((img) => (
            <div key={img.label} className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={img.src} alt={img.label} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent flex items-end p-3">
                <span className="text-white text-sm">{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        <ContactCTA title="Partner With PhoneFarm Fun" />
      </div>
    </div>
  );
}
