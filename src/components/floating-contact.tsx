"use client";

import { CONTACT } from "@/lib/config";
import { ContactIcon, ContactIconChip } from "./contact-icons";

const CHANNELS = [
  {
    kind: "telegram" as const,
    title: "Telegram",
    label: CONTACT.telegram,
    href: CONTACT.telegramUrl,
    external: true,
  },
  {
    kind: "whatsapp" as const,
    title: "WhatsApp",
    label: CONTACT.whatsapp,
    href: CONTACT.whatsappUrl,
    external: true,
  },
  {
    kind: "email" as const,
    title: "Email",
    label: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    external: false,
  },
] as const;

function ChannelLink({
  item,
  compact,
}: {
  item: (typeof CHANNELS)[number];
  compact?: boolean;
}) {
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      className={`flex items-center gap-2.5 rounded-xl transition-colors group ${
        compact ? "flex-col text-center px-2 py-2.5 hover:bg-zinc-50" : "px-3 py-2.5 hover:bg-zinc-50"
      }`}
    >
      <ContactIconChip kind={item.kind} size="sm" />
      <div className={compact ? "min-w-0 w-full" : "min-w-0"}>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">{item.title}</p>
        <p
          className={`font-semibold text-zinc-900 group-hover:text-[var(--accent)] transition-colors ${
            compact ? "text-[11px] leading-tight truncate w-full" : "text-sm truncate"
          }`}
        >
          {item.label}
        </p>
      </div>
    </a>
  );
}

export function FloatingContact() {
  return (
    <>
      {/* Mobile — always-visible bottom bar */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/98 border-t border-zinc-200 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.12)]"
        aria-label="Contact sales"
      >
        <div className="grid grid-cols-3 divide-x divide-zinc-200/80">
          {CHANNELS.map((item) => (
            <ChannelLink key={item.kind} item={item} compact />
          ))}
        </div>
      </div>

      {/* Desktop — always-visible side panel */}
      <aside
        className="hidden md:block fixed bottom-6 right-6 z-50 w-[min(100vw-3rem,17.5rem)] rounded-2xl border border-zinc-200/90 bg-white/98 backdrop-blur-md shadow-xl shadow-zinc-900/10 overflow-hidden"
        aria-label="Contact sales"
      >
        <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/90">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Sales · Guangzhou</p>
          <p className="text-sm font-semibold text-zinc-900 mt-0.5">Contact us directly</p>
        </div>
        <div className="p-2 space-y-0.5">
          {CHANNELS.map((item) => (
            <ChannelLink key={item.kind} item={item} />
          ))}
        </div>
      </aside>
    </>
  );
}
