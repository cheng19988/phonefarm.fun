import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/* ── Layout primitives ── */

export function PageHero({
  title,
  subtitle,
  eyebrow,
  image,
  imageAlt,
  children,
  compact,
  large,
  banner,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  compact?: boolean;
  large?: boolean;
  /** Full-bleed catalog banner — image background, thick section */
  banner?: boolean;
}) {
  if (banner) {
    return (
      <section className="catalog-hero">
        {image ? (
          <Image src={image} alt={imageAlt ?? title} fill className="object-cover object-center" sizes="100vw" priority />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" aria-hidden />
        )}
        <div className="catalog-hero-overlay" aria-hidden />
        <div className="container-wide relative z-10 w-full py-16 md:py-20 lg:py-24">
          {eyebrow && (
            <p className="text-sm font-semibold text-orange-400 mb-4 uppercase tracking-widest">{eyebrow}</p>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.75rem] font-bold text-white leading-[1.05] mb-5 md:mb-6 tracking-tight max-w-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl lg:text-2xl text-slate-200 leading-relaxed max-w-3xl mb-8">{subtitle}</p>
          )}
          {children}
        </div>
      </section>
    );
  }

  const pad = compact ? "py-12 md:py-14" : large ? "py-16 md:py-24 lg:py-28" : "py-14 md:py-20 lg:py-24";
  const titleSize = large
    ? "text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
    : "text-3xl sm:text-4xl lg:text-[2.75rem]";

  return (
    <section className="bg-gradient-to-b from-slate-100 to-white border-b border-slate-200">
      <div className={`container-wide ${pad}`}>
        <div className={`grid gap-10 lg:gap-16 items-center ${image ? "lg:grid-cols-[1fr_1.15fr]" : ""}`}>
          <div className={image ? "lg:py-4" : ""}>
            {eyebrow && <p className="text-sm font-semibold text-orange-600 mb-3 uppercase tracking-wide">{eyebrow}</p>}
            <h1 className={`${titleSize} font-bold text-slate-900 leading-[1.08] mb-5 tracking-tight`}>{title}</h1>
            {subtitle && <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl mb-8">{subtitle}</p>}
            {children}
          </div>
          {image && (
            <div className={`relative rounded-2xl lg:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl ${large ? "aspect-[16/10] lg:min-h-[400px] xl:min-h-[460px]" : "aspect-[4/3] lg:min-h-[320px]"}`}>
              <Image src={image} alt={imageAlt ?? title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 58vw" priority />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-6 flex flex-wrap gap-1">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-slate-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-orange-600 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-slate-700 font-medium truncate max-w-[200px] sm:max-w-none">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function SectionHeader({
  title,
  subtitle,
  center,
  className = "",
  large,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  large?: boolean;
}) {
  return (
    <div className={`mb-10 md:mb-12 lg:mb-14 ${center ? "text-center" : ""} ${className}`}>
      <h2 className={`font-bold text-slate-900 mb-3 tracking-tight ${large ? "text-3xl md:text-4xl lg:text-5xl" : "text-2xl md:text-3xl lg:text-4xl"} ${center ? "mx-auto" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`text-slate-600 max-w-3xl leading-relaxed ${large ? "text-lg md:text-xl lg:text-2xl" : "text-base md:text-lg lg:text-xl"} ${center ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
    </div>
  );
}

export function CtaBlock({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  dark,
}: {
  title: string;
  description?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  dark?: boolean;
}) {
  return (
    <section className={`rounded-2xl p-8 md:p-10 ${dark ? "bg-slate-900 text-white" : "bg-orange-50 border border-orange-100"}`}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      {description && (
        <p className={`mb-6 max-w-2xl ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
      )}
      <div className="flex flex-wrap gap-3">
        {primaryHref.startsWith("http") ? (
          <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="btn-primary">{primaryLabel}</a>
        ) : (
          <Link href={primaryHref} className="btn-primary">{primaryLabel}</Link>
        )}
        {secondaryHref && secondaryLabel && (
          <Link href={secondaryHref} className={dark ? "btn-secondary" : "btn-outline"}>{secondaryLabel}</Link>
        )}
      </div>
    </section>
  );
}

export function BuyingGuideBlock() {
  return (
    <div className="catalog-section-band catalog-section-band-accent mb-8 md:mb-12">
      <h3 className="font-bold text-slate-900 text-xl md:text-2xl mb-3">Need help choosing hardware?</h3>
      <p className="text-slate-600 text-base md:text-lg mb-6 max-w-3xl leading-relaxed">
        Share your node count, target Android version, device model preference, and shipping country. Our Guangzhou team will recommend a starter box, pro chassis, motherboard cluster, or custom rack layout.
      </p>
      <div className="flex flex-wrap gap-3 md:gap-4">
        <Link href="/contact" className="btn-primary-lg">Request a Quote</Link>
        <Link href="/blog/how-to-choose-phone-farm-box" className="btn-outline-lg">Buying Guide</Link>
      </div>
    </div>
  );
}

export function DetailSection({
  title,
  subtitle,
  children,
  id,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="detail-section scroll-mt-28">
      <SectionHeader title={title} subtitle={subtitle} large />
      {children}
    </section>
  );
}

/* ── Data display ── */

export function PriceDisplay({ amount, size = "md" }: { amount: number; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizes = { sm: "text-xl", md: "text-2xl", lg: "text-3xl md:text-4xl", xl: "text-4xl md:text-5xl" };
  return <span className={`font-bold text-slate-900 tracking-tight ${sizes[size]}`}>${amount.toLocaleString()}</span>;
}

export function MetaGrid({ items, large }: { items: { label: string; value: string }[]; large?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${large ? "md:gap-4" : ""}`}>
      {items.map((item) => (
        <div key={item.label} className={`rounded-xl border border-slate-200 bg-slate-50 ${large ? "p-4 md:p-5" : "p-3"}`}>
          <span className="text-slate-500 block text-xs uppercase tracking-wide mb-1 font-semibold">{item.label}</span>
          <span className="text-slate-900 font-bold text-sm md:text-base leading-snug">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export function SpecTable({ specs, large }: { specs: Record<string, string>; large?: boolean }) {
  return (
    <div className="overflow-x-auto -mx-1 rounded-2xl border-2 border-slate-200 bg-white shadow-sm">
      <table className={`w-full min-w-[320px] ${large ? "text-base md:text-lg" : "text-sm"}`}>
        <tbody>
          {Object.entries(specs).map(([k, v], i) => (
            <tr key={k} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/80"}`}>
              <td className={`py-4 px-5 md:px-6 text-slate-600 align-top font-semibold w-[38%] sm:w-[34%] ${large ? "md:w-[32%]" : ""}`}>{k}</td>
              <td className={`py-4 px-5 md:px-6 text-slate-900 align-top leading-relaxed font-medium ${large ? "md:pr-10" : ""}`}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function IconList({ items, icon = "✓", large }: { items: string[]; icon?: string; large?: boolean }) {
  return (
    <ul className={`space-y-3 ${large ? "md:space-y-4" : ""}`}>
      {items.map((item) => (
        <li key={item} className={`flex gap-3 text-slate-600 ${large ? "text-base md:text-lg" : "text-sm"}`}>
          <span className="text-orange-600 shrink-0 font-bold">{icon}</span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CapabilityStrip({
  items,
}: {
  items: { title: string; desc: string }[];
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
      {items.map((item, i) => (
        <div key={item.title} className="capability-card">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white font-bold text-lg shadow-md">
            {i + 1}
          </span>
          <div>
            <h3 className="font-bold text-slate-900 text-lg md:text-xl mb-2">{item.title}</h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DeliveryTimeline({ steps }: { steps: string[] }) {
  return (
    <ol className="grid md:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-5">
      {steps.map((step, i) => (
        <li key={step} className="delivery-step flex-col h-full">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm">
            {i + 1}
          </span>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium pt-1">{step}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Forms ── */

export function FormLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {children}
      {required && <span className="text-orange-600 ml-0.5">*</span>}
    </label>
  );
}

export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base ${props.className ?? ""}`}
    />
  );
}

export function FormTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base ${props.className ?? ""}`}
    />
  );
}

export function FormSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base ${props.className ?? ""}`}
    />
  );
}

/* ── Auth shell ── */

export function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="section bg-slate-50 min-h-[60vh]">
      <div className="container-wide max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{title}</h1>
          {subtitle && <p className="text-slate-600 text-base">{subtitle}</p>}
        </div>
        <div className="card p-6 md:p-8 lg:p-10">{children}</div>
        <p className="text-center text-sm text-slate-500 mt-6">
          <Link href="/products" className="text-orange-600 hover:text-orange-500">← Back to Shop</Link>
        </p>
      </div>
    </div>
  );
}

export function LoadingBlock({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="section">
      <div className="container-wide max-w-3xl">
        <div className="card p-8 animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-2/3" />
          <p className="text-sm text-slate-500 pt-2">{label}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Category pills ── */

export function FilterPills({
  items,
  active,
  baseHref,
  bar,
}: {
  items: { label: string; value: string }[];
  active: string;
  baseHref: string;
  /** Wrap in catalog filter bar styling */
  bar?: boolean;
}) {
  const pills = (
    <div className="flex flex-wrap gap-2 md:gap-2.5">
      {items.map((item) => {
        const isActive = active === item.value;
        const href = item.value ? `${baseHref}?category=${encodeURIComponent(item.value)}` : baseHref;
        return (
          <Link
            key={item.value || "all"}
            href={href}
            className={`px-4 py-2.5 md:px-5 md:py-3 rounded-lg text-sm md:text-base font-semibold border-2 transition-all ${
              isActive
                ? "border-orange-500 text-orange-700 bg-orange-50 shadow-sm"
                : "border-slate-200 text-slate-700 hover:border-slate-300 bg-white hover:bg-slate-50"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );

  if (!bar) return pills;

  return (
    <div className="catalog-filter-bar">
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 md:mb-4">Filter by deployment type</p>
      {pills}
    </div>
  );
}

export function TrustStrip({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-6 mt-6 border-t border-slate-200">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 items-start text-sm text-slate-600">
          <span className="text-emerald-600 font-bold shrink-0 mt-0.5" aria-hidden>✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
