import type { ReactNode } from "react";

type IconKind = "phone" | "whatsapp" | "telegram" | "email";

const ICON_PATHS: Record<IconKind, ReactNode> = {
  phone: (
    <path
      d="M6.5 3.5h3l1.2 3.2a1 1 0 0 1-.24 1.02l-1.3 1.3a12 12 0 0 0 5.52 5.52l1.3-1.3a1 1 0 0 1 1.02-.24l3.2 1.2v3a1 1 0 0 1-1 1A13 13 0 0 1 3.5 7.5a1 1 0 0 1 1-1Z"
      fill="currentColor"
    />
  ),
  whatsapp: (
    <path
      d="M12 2a10 10 0 0 0-8.74 14.92L2 22l5.24-1.18A10 10 0 1 0 12 2Zm0 2a8 8 0 0 1 6.32 12.84l-.3.48-1.98 4.46-4.58-1.2-.47-.03a8 8 0 0 1-1.2-15.55h1.2Zm-2.2 3.4c-.12 0-.42.04-.64.2-.22.17-.86.84-.86 2.04 0 1.2.88 2.36.99 2.52.12.17 1.68 2.68 4.14 3.65.58.2 1.03.32 1.38.41.58.15 1.1.13 1.52.08.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.36.1-.48.1-.1.24-.26.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4Z"
      fill="currentColor"
    />
  ),
  telegram: (
    <path
      d="M21.5 3.5 2.8 10.8c-.9.36-.88 1.62.04 1.94l4.7 1.56 1.8 5.56c.28.86 1.38 1.06 1.94.38l2.56-2.96 4.72 3.48c.72.53 1.74.12 1.92-.72L22.5 4.8c.2-.86-.66-1.58-1-1.3ZM8.6 12.4l9.8-6.1-7.4 7.46-.28 3.06-1.36-4.2 7.9-7.5-8.66 5.28Z"
      fill="currentColor"
    />
  ),
  email: (
    <path
      d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.1.9 5.9 4.72 5.9-4.72H6.1Zm13.4 1.62-5.74 4.6a1.5 1.5 0 0 1-1.92 0l-5.74-4.6v8.88c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5V8.02Z"
      fill="currentColor"
    />
  ),
};

export const CONTACT_ICON_TONE: Record<IconKind, string> = {
  phone: "text-orange-600",
  whatsapp: "text-[#128C7E]",
  telegram: "text-[#229ED9]",
  email: "text-orange-700",
};

export const CONTACT_ICON_CHIP: Record<IconKind, string> = {
  phone: "bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-lg shadow-orange-500/40",
  whatsapp: "bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg shadow-emerald-500/40",
  telegram: "bg-gradient-to-br from-[#37AEE2] to-[#229ED9] text-white shadow-lg shadow-sky-500/40",
  email: "bg-gradient-to-br from-zinc-600 to-zinc-900 text-white shadow-lg shadow-zinc-500/35",
};

export function ContactIcon({
  kind,
  size = 18,
  className = "",
}: {
  kind: IconKind;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      {ICON_PATHS[kind]}
    </svg>
  );
}

export function ContactIconChip({
  kind,
  size = "md",
}: {
  kind: IconKind;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const spec = {
    sm: { dim: "h-9 w-9", icon: 18, radius: "rounded-xl" },
    md: { dim: "h-11 w-11", icon: 22, radius: "rounded-xl" },
    lg: { dim: "h-14 w-14", icon: 28, radius: "rounded-2xl" },
    xl: { dim: "h-16 w-16", icon: 32, radius: "rounded-2xl" },
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center ${spec.dim} ${spec.radius} ${CONTACT_ICON_CHIP[kind]} ring-1 ring-white/25`}
    >
      <ContactIcon kind={kind} size={spec.icon} />
    </span>
  );
}

export function ContactLinkLabel({
  kind,
  children,
  className = "",
}: {
  kind: IconKind;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <ContactIcon kind={kind} size={14} className={CONTACT_ICON_TONE[kind]} />
      {children}
    </span>
  );
}
