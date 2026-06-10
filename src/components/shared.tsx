import { CONTACT, SITE } from "@/lib/config";
import Link from "next/link";

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
    <div className={`flex flex-wrap items-center gap-3 ${compact ? "text-xs" : "text-sm"}`}>
      <a href={`tel:${CONTACT.phone}`} className="text-zinc-600 hover:text-[var(--accent)] transition-colors">
        📞 {CONTACT.phone}
      </a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-emerald-600 transition-colors">
        WhatsApp
      </a>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-sky-600 transition-colors">
        Telegram
      </a>
      <a href={`mailto:${CONTACT.email}`} className="text-zinc-600 hover:text-[var(--accent)] transition-colors">
        {CONTACT.email}
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
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              WhatsApp Sales
            </a>
            <Link href="/contact" className="btn-secondary">
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
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 border-t border-zinc-200 backdrop-blur-sm">
      <div className="grid grid-cols-4 divide-x divide-zinc-200">
        <a href={`tel:${CONTACT.phone}`} className="flex flex-col items-center py-3 text-xs text-zinc-600 hover:text-[var(--accent)]">
          <span className="text-base mb-0.5">📞</span> Call
        </a>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-3 text-xs text-zinc-600 hover:text-emerald-600">
          <span className="text-base mb-0.5">💬</span> WhatsApp
        </a>
        <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-3 text-xs text-zinc-600 hover:text-sky-600">
          <span className="text-base mb-0.5">✈️</span> Telegram
        </a>
        <a href={`mailto:${CONTACT.email}`} className="flex flex-col items-center py-3 text-xs text-zinc-600 hover:text-[var(--accent)]">
          <span className="text-base mb-0.5">✉️</span> Email
        </a>
      </div>
    </div>
  );
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <span className="badge-red">Out of Stock</span>;
  if (stock <= 5) return <span className="badge-yellow">Low Stock ({stock})</span>;
  return <span className="badge-green">In Stock ({stock})</span>;
}
