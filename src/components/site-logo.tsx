import Link from "next/link";
import { SITE } from "@/lib/config";

type LogoVariant = "hero" | "default" | "inverse";
type LogoSize = "sm" | "md" | "lg";

const SIZES = {
  sm: { mark: 36, gap: 10, title: "text-base", sub: "text-[9px]" },
  md: { mark: 42, gap: 12, title: "text-lg", sub: "text-[10px]" },
  lg: { mark: 48, gap: 14, title: "text-xl", sub: "text-[11px]" },
} as const;

function LogoMark({ size, variant }: { size: number; variant: LogoVariant }) {
  const isLight = variant === "hero" || variant === "inverse";
  const frame = isLight ? "#ffffff" : "#18181b";
  const slots = isLight ? "rgba(255,255,255,0.92)" : "#fafafa";
  const slotStroke = isLight ? "rgba(255,255,255,0.35)" : "#e4e4e7";
  const accent = "#ea580c";
  const port = isLight ? "#fb923c" : "#c2410c";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <rect x="2" y="4" width="44" height="40" rx="6" fill={frame} />
      <rect x="2" y="4" width="44" height="40" rx="6" stroke={isLight ? "rgba(255,255,255,0.2)" : "#27272a"} strokeWidth="1" />
      {/* 2×3 phone slots */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <rect
            key={i}
            x={8 + col * 11}
            y={10 + row * 11}
            width="8"
            height="8"
            rx="1.5"
            fill={slots}
            stroke={slotStroke}
            strokeWidth="0.75"
          />
        );
      })}
      {/* USB / data rail accent */}
      <rect x="8" y="36" width="32" height="3" rx="1.5" fill={accent} opacity={0.9} />
      <circle cx="38" cy="37.5" r="2" fill={port} />
    </svg>
  );
}

export function SiteLogo({
  variant = "default",
  size = "md",
  showWordmark = true,
  href = "/",
  className = "",
}: {
  variant?: LogoVariant;
  size?: LogoSize;
  showWordmark?: boolean;
  href?: string;
  className?: string;
}) {
  const s = SIZES[size];
  const isLight = variant === "hero" || variant === "inverse";

  const titleClass =
    variant === "hero"
      ? "text-white"
      : variant === "inverse"
        ? "text-white"
        : "text-zinc-900";

  const subClass =
    variant === "hero"
      ? "text-white/55"
      : variant === "inverse"
        ? "text-zinc-400"
        : "text-zinc-500";

  const content = (
    <>
      <LogoMark size={s.mark} variant={variant} />
      {showWordmark && (
        <div className="min-w-0">
          <div className={`brand-name font-display font-bold ${s.title} leading-none tracking-tight ${titleClass}`}>
            {SITE.name}
          </div>
          <div className={`brand-sub ${s.sub} uppercase tracking-[0.18em] mt-1 ${subClass}`}>
            Device farm hardware
          </div>
        </div>
      )}
    </>
  );

  const gap = showWordmark ? s.gap : 0;

  if (href) {
    return (
      <Link
        href={href}
        className={`site-logo group flex items-center shrink-0 min-w-0 transition-opacity hover:opacity-90 ${className}`}
        style={{ gap }}
        aria-label={`${SITE.name} home`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={`site-logo flex items-center shrink-0 min-w-0 ${className}`} style={{ gap }}>
      {content}
    </div>
  );
}
