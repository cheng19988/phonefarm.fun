"use client";

import { CONTACT } from "@/lib/config";
import { ContactIconChip } from "./contact-icons";

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

function ChannelIconLink({ item, size = "sm" }: { item: (typeof CHANNELS)[number]; size?: "sm" | "md" }) {
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      aria-label={`${item.title}: ${item.label}`}
      title={item.title}
      className="inline-flex items-center justify-center rounded-xl transition-transform hover:scale-105 active:scale-95"
    >
      <ContactIconChip kind={item.kind} size={size} />
    </a>
  );
}

export function FloatingContact() {
  return (
    <>
      {/* Mobile — icon bar only */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/98 border-t border-zinc-200 backdrop-blur-md shadow-[0_-6px_20px_-10px_rgba(0,0,0,0.12)]"
        role="navigation"
        aria-label="Contact sales"
      >
        <div className="flex items-center justify-center gap-5 py-3">
          {CHANNELS.map((item) => (
            <ChannelIconLink key={item.kind} item={item} />
          ))}
        </div>
      </div>

      {/* Desktop — stacked icons only */}
      <aside
        className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col gap-2.5 p-2 rounded-2xl border border-zinc-200/90 bg-white/95 backdrop-blur-md shadow-lg shadow-zinc-900/10"
        aria-label="Contact sales"
      >
        {CHANNELS.map((item) => (
          <ChannelIconLink key={item.kind} item={item} size="md" />
        ))}
      </aside>
    </>
  );
}
