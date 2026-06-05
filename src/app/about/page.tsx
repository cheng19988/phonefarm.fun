import Image from "next/image";
import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { buildMetadata } from "@/lib/seo";
import { IMAGES } from "@/lib/images";
import { CONTACT, SITE } from "@/lib/config";

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
          We design and assemble phone farm chassis, motherboard arrays, and supporting modules at our facility in <strong className="text-white">{SITE.location}</strong>. Since <strong className="text-white">{SITE.since}</strong>, we have shipped hardware to buyers in North America, Europe, Southeast Asia, and the Middle East — primarily B2B orders from studios, QA labs, and automation teams.
        </p>

        <div className="card p-6 mb-12">
          <h2 className="text-lg font-bold text-white mb-4">What we manufacture</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
            <li>• Phone farm boxes (up to 20 real devices per 2U chassis)</li>
            <li>• Android motherboard arrays (screenless, high-density)</li>
            <li>• Power, cooling, USB hub, and network accessory modules</li>
            <li>• Custom rackmount cabinets for 40–100+ node deployments</li>
            <li>• Remote setup and group-control configuration (service)</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            { title: "Real devices only", desc: "Physical smartphones or motherboards — we do not resell cloud phones or emulator services." },
            { title: "QC before export", desc: "Burn-in testing, cable checks, and export packaging from our Guangzhou workshop." },
            { title: "Custom engineering", desc: "Node count, chassis size, and rack layout tailored to your device models." },
            { title: "B2B & bulk orders", desc: "Volume pricing from 5+ units, sample kits, and dedicated project coordination." },
          ].map((item) => (
            <div key={item.title} className="card p-6">
              <h2 className="font-bold text-white mb-2">{item.title}</h2>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Guangzhou facilities</h2>
        <p className="text-slate-400 mb-6">Office, assembly workshop, and warehouse — photos from our actual operations in Guangzhou.</p>
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

        <ContactCTA title="Partner With PhoneFarm Fun" />
      </div>
    </div>
  );
}
