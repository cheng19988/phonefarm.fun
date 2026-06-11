import Link from "next/link";
import { SITE } from "@/lib/config";

type LogoVariant = "hero" | "default" | "inverse";
type LogoSize = "sm" | "md" | "lg";

const SIZES = {
  sm: { mark: 36, gap: 10, title: "text-base", sub: "text-[9px]" },
  md: { mark: 44, gap: 12, title: "text-lg", sub: "text-[10px]" },
  lg: { mark: 48, gap: 14, title: "text-xl", sub: "text-[11px]" },
} as const;

/** Unified phone-farm chassis mark — one body, inset device bay, integrated port row */
function LogoMark({ size, variant }: { size: number; variant: LogoVariant }) {
  const isInverse = variant === "hero" || variant === "inverse";
  const uid = `logo-${variant}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0 drop-shadow-sm"
    >
      <defs>
        <linearGradient id={`${uid}-chassis`} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor={isInverse ? "#ffffff" : "#3f3f46"} />
          <stop offset="1" stopColor={isInverse ? "#e4e4e7" : "#18181b"} />
        </linearGradient>
        <linearGradient id={`${uid}-accent`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fb923c" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(36 10) rotate(90) scale(22)">
          <stop stopColor="#f97316" stopOpacity={isInverse ? 0.12 : 0.28} />
          <stop offset="1" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft brand glow */}
      <circle cx="36" cy="12" r="14" fill={`url(#${uid}-glow)`} />

      {/* Chassis shell */}
      <rect x="4" y="5" width="40" height="38" rx="8" fill={`url(#${uid}-chassis)`} />
      <rect
        x="4"
        y="5"
        width="40"
        height="38"
        rx="8"
        stroke={isInverse ? "rgba(255,255,255,0.35)" : "#09090b"}
        strokeWidth="1"
      />

      {/* Inset device bay — single tray, not floating squares */}
      <rect
        x="9"
        y="10"
        width="30"
        height="22"
        rx="4"
        fill={isInverse ? "#f4f4f5" : "#27272a"}
        stroke={isInverse ? "#d4d4d8" : "#52525b"}
        strokeWidth="0.75"
      />

      {/* 2×3 device slots — one active node highlighted */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const active = i === 4;
        const x = 11.5 + col * 9;
        const y = 12.5 + row * 9;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="7"
            height="7"
            rx="1.75"
            fill={active ? `url(#${uid}-accent)` : isInverse ? "#ffffff" : "#fafafa"}
            stroke={active ? "#ea580c" : isInverse ? "#e4e4e7" : "#d4d4d8"}
            strokeWidth={active ? 0 : 0.6}
          />
        );
      })}

      {/* Integrated port strip — USB · LAN · OTG */}
      <rect
        x="9"
        y="35"
        width="30"
        height="4"
        rx="2"
        fill={isInverse ? "#e4e4e7" : "#09090b"}
        opacity={isInverse ? 0.9 : 0.55}
      />
      {[14, 24, 34].map((cx, idx) => (
        <circle
          key={cx}
          cx={cx}
          cy="37"
          r={idx === 1 ? 1.6 : 1.25}
          fill={idx === 1 ? "#f97316" : isInverse ? "#a1a1aa" : "#71717a"}
        />
      ))}
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

  const titleClass = isLight ? "text-white" : "text-zinc-900";
  const subClass = isLight ? "text-zinc-400" : "text-zinc-500";

  const content = (
    <>
      <LogoMark size={s.mark} variant={variant} />
      {showWordmark && (
        <div className="min-w-0">
          <div className={`brand-name font-display font-bold ${s.title} leading-none tracking-tight ${titleClass}`}>
            PhoneFarm{" "}
            <span className={isLight ? "text-orange-400" : "text-[var(--accent)]"}>Fun</span>
          </div>
          <div className={`brand-sub ${s.sub} uppercase tracking-[0.2em] mt-1.5 font-semibold ${subClass}`}>
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
        className={`site-logo group flex items-center shrink-0 min-w-0 transition-opacity hover:opacity-95 ${className}`}
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
