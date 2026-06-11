import { CONTACT, SITE } from "@/lib/config";
import Link from "next/link";
import { ContactIcon, ContactLinkLabel } from "./contact-icons";

export { FloatingContact } from "./floating-contact";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ContactBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${compact ? "text-xs" : "text-sm"}`}>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-700 hover:text-[#229ED9] transition-colors">
        <ContactLinkLabel kind="telegram">{CONTACT.telegram}</ContactLinkLabel>
      </a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-700 hover:text-[#128C7E] transition-colors">
        <ContactLinkLabel kind="whatsapp">{CONTACT.whatsapp}</ContactLinkLabel>
      </a>
      <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-700 hover:text-orange-700 transition-colors">
        <ContactLinkLabel kind="email">{CONTACT.email}</ContactLinkLabel>
      </a>
    </div>
  );
}

export function ContactCTA({ title = "Talk to Our Sales Team" }: { title?: string }) {
  return (
    <section className="page-cta-band rounded-2xl border border-zinc-200 overflow-hidden">
      <div className="page-cta-inner !py-8 md:!py-10">
        <div className="max-w-3xl">
          <p className="eyebrow mb-2">Factory sales · {SITE.location}</p>
          <h2 className="section-title mb-3">{title}</h2>
          <p className="text-zinc-600 text-sm md:text-base mb-6 leading-relaxed max-w-2xl">
            Share node count, device models, and shipping country. Our Guangzhou team responds with pricing and configuration guidance within 24 hours.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              <ContactIcon kind="whatsapp" size={18} className="text-white" />
              WhatsApp {CONTACT.whatsapp}
            </a>
            <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
              <ContactIcon kind="telegram" size={18} className="text-[#229ED9]" />
              Telegram
            </a>
            <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
              <ContactIcon kind="email" size={18} className="text-orange-700" />
              Email
            </Link>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            {CONTACT.telegram} · {CONTACT.email}
          </p>
        </div>
      </div>
    </section>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="badge-red">Out of Stock</span>;
  if (stock <= 5) return <span className="badge-yellow">Low Stock ({stock})</span>;
  return <span className="badge-green">In Stock ({stock})</span>;
}
