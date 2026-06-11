"use client";

import { useState } from "react";
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
];

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="floating-contact-panel w-[min(100vw-2rem,18rem)] rounded-2xl border border-zinc-200/90 bg-white/98 backdrop-blur-md shadow-xl shadow-zinc-900/10 overflow-hidden"
          role="dialog"
          aria-label="Contact sales"
        >
          <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50/90">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sales · Guangzhou</p>
            <p className="text-sm font-semibold text-zinc-900 mt-0.5">Message us directly</p>
          </div>
          <div className="p-2 space-y-1">
            {CHANNELS.map((item) => (
              <a
                key={item.kind}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-zinc-50 transition-colors group"
                onClick={() => setOpen(false)}
              >
                <ContactIconChip kind={item.kind} size="sm" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wide">{item.title}</p>
                  <p className="text-sm font-semibold text-zinc-900 truncate group-hover:text-[var(--accent)] transition-colors">
                    {item.label}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`floating-contact-fab inline-flex items-center gap-2 rounded-full px-4 py-3 sm:px-5 sm:py-3.5 font-semibold text-sm text-white shadow-lg transition-all active:scale-[0.98] ${
          open
            ? "bg-zinc-800 hover:bg-zinc-900 shadow-zinc-900/25"
            : "bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 shadow-orange-600/35"
        }`}
        aria-expanded={open}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
      >
        {open ? (
          <>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
            Close
          </>
        ) : (
          <>
            <ContactIcon kind="whatsapp" size={20} className="text-white" />
            Contact Sales
          </>
        )}
      </button>
    </div>
  );
}
