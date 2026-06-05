import Image from "next/image";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { CONTACT, SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "About PhoneFarm Fun — Guangzhou Hardware Team",
  description:
    "Guangzhou-based team focused on Android device farm hardware — phone farm boxes, motherboard clusters, and custom rack deployments for QA and automation labs.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <h1 className="section-title">About PhoneFarm Fun</h1>
        <p className="text-xl text-slate-300 mb-4 leading-relaxed">
          We are a Guangzhou-based hardware team focused on Android device farm chassis, motherboard clusters, and lab accessories for mobile QA and automation workflows.
        </p>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Since <strong className="text-white">{SITE.since}</strong>, we have assembled and shipped real-device testing hardware to B2B buyers — QA labs, mobile engineering teams, and automation integrators who need factory-built boxes rather than ad-hoc desk setups.
        </p>

        <div className="card p-6 mb-12">
          <h2 className="text-lg font-bold text-white mb-4">What we build</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
            <li>• 20-node starter and pro Android testing boxes</li>
            <li>• Android motherboard clusters for headless QA</li>
            <li>• iOS device racks for compatibility testing</li>
            <li>• Power, cooling, USB, and network accessory modules</li>
            <li>• Custom rack and cabinet layouts (40+ nodes, quoted)</li>
            <li>• Pre-shipment configuration and remote setup support</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "Real devices only", desc: "Physical smartphones and motherboards — we build hardware, not cloud phone or emulator services." },
            { title: "QC before export", desc: "Burn-in testing, cable checks, and export packaging from our Guangzhou workshop." },
            { title: "Custom engineering", desc: "Node count, tray spacing, and rack layout tailored to your device models and lab floor plan." },
            { title: "B2B orders", desc: "Volume pricing from 5+ units, sample kits, and project coordination for rack deployments." },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h2 className="font-bold text-white mb-2">{item.title}</h2>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Guangzhou workshop</h2>
        <p className="text-slate-400 mb-6">Assembly, testing, and shipping from our facility in Guangzhou.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { src: IMAGES.company.office, label: "Office" },
            { src: IMAGES.company.frontdesk, label: "Front Desk" },
            { src: IMAGES.company.meeting, label: "Meeting Room" },
            { src: IMAGES.company.workshop, label: "Assembly Workshop" },
            { src: IMAGES.company.warehouse, label: "Warehouse & Shipping" },
          ].map((img) => (
            <div key={img.label} className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={img.src} alt={img.label} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent flex items-end p-3">
                <span className="text-white text-sm">{img.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 mb-12 text-sm text-slate-400">
          <p className="text-white font-medium mb-2">Contact the team</p>
          <p>Phone: {CONTACT.phone} · WhatsApp: {CONTACT.whatsapp} · Telegram: {CONTACT.telegram}</p>
          <p className="mt-1">Email: {CONTACT.email} · Location: {SITE.location}</p>
        </div>

        <ContactCTA title="Discuss Your Device Lab Requirements" />
      </div>
    </div>
  );
}
