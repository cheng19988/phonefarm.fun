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
  /** Unified light page header — text + photo panel (matches homepage) */
  banner?: boolean;
}) {
  if (banner) {
    return (
      <section className="page-hero-banner">
        <div className="page-hero-banner-pattern" aria-hidden />
        <div className="container-wide page-hero-banner-grid">
          <div className="max-w-xl">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl font-bold text-zinc-900 leading-tight tracking-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-zinc-600 text-base md:text-lg leading-relaxed mb-6 max-w-xl">{subtitle}</p>
            )}
            {children}
          </div>
          {image && (
            <div className="page-hero-banner-media">
              <Image
                src={image}
                alt={imageAlt ?? title}
                fill
                className="object-cover object-center"
                sizes="(max-width:1024px) 100vw, 560px"
                priority
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  const pad = compact ? "py-10 md:py-12" : large ? "py-14 md:py-16 lg:py-20" : "py-12 md:py-16";
  const titleSize = large
    ? "text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
    : "text-3xl sm:text-4xl lg:text-[2.75rem]";

  return (
    <section className="bg-gradient-to-b from-zinc-50 to-white border-b border-zinc-200">
      <div className={`container-wide ${pad}`}>
        <div className={`grid gap-8 lg:gap-12 items-center ${image ? "lg:grid-cols-[1fr_1.1fr]" : ""}`}>
          <div className={image ? "lg:py-2" : ""}>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h1 className={`${titleSize} font-display font-bold text-zinc-900 leading-[1.08] mb-4 tracking-tight`}>{title}</h1>
            {subtitle && <p className="text-base md:text-lg text-zinc-600 leading-relaxed max-w-2xl mb-6">{subtitle}</p>}
            {children}
          </div>
          {image && (
            <div className="relative rounded-2xl overflow-hidden bg-white border border-zinc-200/90 shadow-md aspect-[16/10] lg:min-h-[300px]">
              <Image src={image} alt={imageAlt ?? title} fill className="object-cover object-center" sizes="(max-width:1024px) 100vw, 58vw" priority />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 mb-5 flex flex-wrap gap-1">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-zinc-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--accent)] transition-colors">{item.label}</Link>
          ) : (
            <span className="text-zinc-800 font-medium truncate max-w-[200px] sm:max-w-none">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  center,
  className = "",
  large,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  center?: boolean;
  className?: string;
  large?: boolean;
}) {
  return (
    <div className={`section-head ${center ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`section-title ${large ? "!text-3xl md:!text-4xl lg:!text-5xl" : ""} ${center ? "mx-auto" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${center ? "mx-auto" : ""} ${large ? "md:text-lg lg:text-xl" : ""}`}>{subtitle}</p>
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
    <section className={`rounded-2xl p-8 md:p-10 border ${
      dark
        ? "bg-zinc-900 text-white border-zinc-800"
        : "bg-[var(--accent-soft)] border-orange-200/60"
    }`}>
      <h2 className={`section-title mb-3 ${dark ? "text-white" : ""}`}>{title}</h2>
      {description && (
        <p className={`mb-6 max-w-2xl text-sm md:text-base leading-relaxed ${dark ? "text-zinc-300" : "text-zinc-600"}`}>{description}</p>
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
      <p className="eyebrow mb-2">Procurement support</p>
      <h3 className="section-title text-2xl md:text-3xl mb-3">Need help choosing hardware?</h3>
      <p className="text-zinc-600 text-sm md:text-base mb-6 max-w-3xl leading-relaxed">
        Share your node count, target Android version, device model preference, and shipping country. Our Guangzhou team will recommend a starter box, pro chassis, motherboard cluster, or custom rack layout.
      </p>
      <div className="flex flex-wrap gap-3 md:gap-4">
        <Link href="/contact" className="btn-primary-lg">Request a Quote</Link>
        <Link href="/blog/how-to-choose-phone-farm-box" className="btn-secondary-lg">Buying Guide</Link>
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
      <div className="section-head mb-6 md:mb-8">
        <h2 className="section-title text-xl md:text-2xl">{title}</h2>
        {subtitle && <p className="section-subtitle mb-0 text-sm md:text-base">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

/* ── Data display ── */

export function PriceDisplay({ amount, size = "md" }: { amount: number; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizes = { sm: "text-xl", md: "text-2xl", lg: "text-3xl md:text-4xl", xl: "text-4xl md:text-5xl" };
  return <span className={`font-bold text-zinc-900 tracking-tight ${sizes[size]}`}>${amount.toLocaleString()}</span>;
}

export function MetaGrid({ items, large }: { items: { label: string; value: string }[]; large?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${large ? "md:gap-4" : ""}`}>
      {items.map((item) => (
        <div key={item.label} className={`rounded-xl border border-zinc-200 bg-zinc-50 ${large ? "p-4 md:p-5" : "p-3"}`}>
          <span className="text-zinc-500 block text-xs uppercase tracking-wide mb-1 font-semibold">{item.label}</span>
          <span className="text-zinc-900 font-bold text-sm md:text-base leading-snug">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export function SpecTable({ specs, large }: { specs: Record<string, string>; large?: boolean }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-zinc-500 md:hidden">Swipe horizontally to view full spec table →</p>
      <div className="overflow-x-auto -mx-1 rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <table className={`w-full min-w-[320px] ${large ? "text-base md:text-lg" : "text-sm"}`}>
          <tbody>
            {Object.entries(specs).map(([k, v], i) => (
              <tr key={k} className={`border-b border-zinc-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-zinc-50/80"}`}>
                <td className={`py-4 px-5 md:px-6 text-zinc-600 align-top font-semibold w-[38%] sm:w-[34%] ${large ? "md:w-[32%]" : ""}`}>{k}</td>
                <td className={`py-4 px-5 md:px-6 text-zinc-900 align-top leading-relaxed font-medium ${large ? "md:pr-10" : ""}`}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function IconList({ items, icon = "✓", large }: { items: string[]; icon?: string; large?: boolean }) {
  return (
    <ul className={`space-y-3 ${large ? "md:space-y-4" : ""}`}>
      {items.map((item) => (
        <li key={item} className={`flex gap-3 text-zinc-600 ${large ? "text-base md:text-lg" : "text-sm"}`}>
          <span className="list-marker list-marker--check shrink-0 mt-0.5">{icon}</span>
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
          <span className="step-badge h-12 w-12 text-lg">
            {i + 1}
          </span>
          <div>
            <h3 className="font-bold text-zinc-900 text-lg md:text-xl mb-2">{item.title}</h3>
            <p className="text-sm md:text-base text-zinc-600 leading-relaxed">{item.desc}</p>
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
          <span className="step-badge h-10 w-10 text-sm rounded-full">
            {i + 1}
          </span>
          <p className="text-sm md:text-base text-zinc-700 leading-relaxed font-medium pt-1">{step}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Forms ── */

export function FormLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-zinc-700 mb-1">
      {children}
      {required && <span className="text-orange-600 ml-0.5">*</span>}
    </label>
  );
}

export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-white border border-zinc-300 rounded-lg px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base ${props.className ?? ""}`}
    />
  );
}

export function FormTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full bg-white border border-zinc-300 rounded-lg px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-base ${props.className ?? ""}`}
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
    <div className="section bg-zinc-50 min-h-[60vh]">
      <div className="container-wide max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-900 mb-3">{title}</h1>
          {subtitle && <p className="text-zinc-600 text-base">{subtitle}</p>}
        </div>
        <div className="card p-6 md:p-8 lg:p-10">{children}</div>
        <p className="text-center text-sm text-zinc-500 mt-6">
          <Link href="/products" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">← Back to Shop</Link>
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

export function CartLoadingSkeleton() {
  return (
    <div className="section">
      <div className="container-wide max-w-4xl">
        <div className="h-9 bg-slate-200 rounded w-48 mb-8 animate-pulse" />
        <div className="space-y-5">
          {[1, 2].map((i) => (
            <div key={i} className="card p-5 md:p-6 animate-pulse">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-full sm:w-36 h-48 sm:h-36 bg-slate-100 rounded-xl" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-1/4" />
                  <div className="h-10 bg-slate-100 rounded w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card p-6 md:p-8 mt-10 animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="h-12 bg-slate-100 rounded w-full" />
        </div>
        <p className="text-sm text-slate-500 text-center mt-6">Loading your hardware cart...</p>
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
                : "border-zinc-200 text-zinc-700 hover:border-zinc-300 bg-white hover:bg-zinc-50"
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
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3 md:mb-4">Filter by deployment type</p>
      {pills}
    </div>
  );
}

export function TrustStrip({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-6 mt-6 border-t border-zinc-200">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 items-start text-sm text-zinc-600">
          <span className="list-marker list-marker--check shrink-0 mt-0.5" aria-hidden>✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
