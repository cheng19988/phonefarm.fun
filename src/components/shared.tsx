import { CONTACT, SITE } from "@/lib/config";
import Link from "next/link";
import { ContactIcon, ContactIconChip, ContactLinkLabel } from "./contact-icons";

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
      <a href={`tel:${CONTACT.phone}`} className="font-medium text-zinc-700 hover:text-orange-700 transition-colors">
        <ContactLinkLabel kind="phone">{CONTACT.phone}</ContactLinkLabel>
      </a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-700 hover:text-[#128C7E] transition-colors">
        <ContactLinkLabel kind="whatsapp">WhatsApp</ContactLinkLabel>
      </a>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-700 hover:text-[#229ED9] transition-colors">
        <ContactLinkLabel kind="telegram">Telegram</ContactLinkLabel>
      </a>
      <a href={`mailto:${CONTACT.email}`} className="font-medium text-zinc-700 hover:text-orange-700 transition-colors">
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
              WhatsApp Sales
            </a>
            <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
              <ContactIcon kind="email" size={18} className="text-orange-700" />
              Send Inquiry
            </Link>
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            {CONTACT.email} · {CONTACT.phone}
          </p>
        </div>
      </div>
    </section>
  );
}

export function MobileContactBar() {
  const items = [
    { kind: "phone" as const, label: "Call", href: `tel:${CONTACT.phone}` },
    { kind: "whatsapp" as const, label: "WhatsApp", href: CONTACT.whatsappUrl, external: true },
    { kind: "telegram" as const, label: "Telegram", href: CONTACT.telegramUrl, external: true },
    { kind: "email" as const, label: "Email", href: `mailto:${CONTACT.email}` },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/98 border-t border-zinc-200 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
      <div className="grid grid-cols-4 divide-x divide-zinc-200/80">
        {items.map((item) => (
          <a
            key={item.kind}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-1.5 py-3 active:scale-[0.98] transition-transform"
          >
            <ContactIconChip kind={item.kind} size="sm" />
            <span className="text-[11px] font-semibold text-zinc-800">{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="badge-red">Out of Stock</span>;
  if (stock <= 5) return <span className="badge-yellow">Low Stock ({stock})</span>;
  return <span className="badge-green">In Stock ({stock})</span>;
}
