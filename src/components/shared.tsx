import { CONTACT, SITE } from "@/lib/config";
import { CtaBlock } from "./store";

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
      <a href={`tel:${CONTACT.phone}`} className="text-slate-600 hover:text-orange-600 transition-colors">
        📞 {CONTACT.phone}
      </a>
      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-green-600 transition-colors">
        WhatsApp
      </a>
      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors">
        Telegram
      </a>
      <a href={`mailto:${CONTACT.email}`} className="text-slate-600 hover:text-orange-600 transition-colors">
        {CONTACT.email}
      </a>
    </div>
  );
}

export function ContactCTA({ title = "Talk to Our Sales Team" }: { title?: string }) {
  return (
    <CtaBlock
      title={title}
      description={`Factory-direct support from ${SITE.location}. Get pricing, custom quotes, and deployment guidance within 24 hours.`}
      primaryHref={CONTACT.whatsappUrl}
      primaryLabel="WhatsApp Sales"
      secondaryHref="/contact"
      secondaryLabel="Send Inquiry"
      dark
    />
  );
}

export function MobileContactBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 border-t border-slate-200 backdrop-blur-sm">
      <div className="grid grid-cols-4 divide-x divide-slate-200">
        <a href={`tel:${CONTACT.phone}`} className="flex flex-col items-center py-3 text-xs text-slate-600 hover:text-orange-600">
          <span className="text-base mb-0.5">📞</span> Call
        </a>
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-3 text-xs text-slate-600 hover:text-green-600">
          <span className="text-base mb-0.5">💬</span> WhatsApp
        </a>
        <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center py-3 text-xs text-slate-600 hover:text-blue-600">
          <span className="text-base mb-0.5">✈️</span> Telegram
        </a>
        <a href={`mailto:${CONTACT.email}`} className="flex flex-col items-center py-3 text-xs text-slate-600 hover:text-orange-600">
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
