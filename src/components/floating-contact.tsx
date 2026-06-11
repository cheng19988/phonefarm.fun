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

function ChannelIconLink({
  item,
  size,
}: {
  item: (typeof CHANNELS)[number];
  size: "lg" | "xl";
}) {
  return (
    <a
      href={item.href}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
      aria-label={`${item.title}: ${item.label}`}
      title={item.title}
      className="floating-contact-btn group inline-flex flex-col items-center gap-1.5"
    >
      <span className="transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
        <ContactIconChip kind={item.kind} size={size} />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 group-hover:text-zinc-800 transition-colors">
        {item.title}
      </span>
    </a>
  );
}

export function FloatingContact() {
  return (
    <>
      {/* Mobile — larger icon dock */}
      <div className="floating-contact-mobile md:hidden" role="navigation" aria-label="Contact sales">
        <div className="flex items-end justify-center gap-8 sm:gap-10 px-6 pt-3 pb-4">
          {CHANNELS.map((item) => (
            <ChannelIconLink key={item.kind} item={item} size="lg" />
          ))}
        </div>
      </div>

      {/* Desktop — vertical dock */}
      <aside className="floating-contact-dock hidden md:flex" aria-label="Contact sales">
        <p className="floating-contact-dock-label">Sales</p>
        <div className="flex flex-col gap-4">
          {CHANNELS.map((item) => (
            <ChannelIconLink key={item.kind} item={item} size="xl" />
          ))}
        </div>
      </aside>
    </>
  );
}
