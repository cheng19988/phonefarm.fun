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
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
      <div className={`container-wide ${compact ? "py-10 md:py-12" : "py-12 md:py-16"}`}>
        <div className={`grid gap-8 items-center ${image ? "lg:grid-cols-2 lg:gap-12" : ""}`}>
          <div>
            {eyebrow && <p className="text-sm font-semibold text-orange-600 mb-2">{eyebrow}</p>}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold text-slate-900 leading-tight mb-4">{title}</h1>
            {subtitle && <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-6">{subtitle}</p>}
            {children}
          </div>
          {image && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
              <Image src={image} alt={imageAlt ?? title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" priority />
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
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""} ${className}`}>
      <h2 className={`text-2xl md:text-3xl font-bold text-slate-900 mb-2 ${center ? "mx-auto" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`text-slate-600 text-base md:text-lg max-w-3xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>
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
    <div className="card p-6 md:p-8 bg-slate-50 border-orange-100">
      <h3 className="font-bold text-slate-900 text-lg mb-2">Need help choosing hardware?</h3>
      <p className="text-slate-600 text-sm mb-4 max-w-2xl">
        Share your node count, target Android version, device model preference, and shipping country. Our Guangzhou team will recommend a starter box, pro chassis, motherboard cluster, or custom rack layout.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/contact" className="btn-primary text-sm">Request a Quote</Link>
        <Link href="/blog/how-to-choose-phone-farm-box" className="btn-outline text-sm">Buying Guide</Link>
      </div>
    </div>
  );
}

/* ── Data display ── */

export function PriceDisplay({ amount, size = "md" }: { amount: number; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-xl", md: "text-2xl", lg: "text-3xl" };
  return <span className={`font-bold text-slate-900 ${sizes[size]}`}>${amount.toLocaleString()}</span>;
}

export function MetaGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item) => (
        <div key={item.label} className="card p-3 text-sm">
          <span className="text-slate-500 block text-xs mb-0.5">{item.label}</span>
          <span className="text-slate-900 font-medium">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export function SpecTable({ specs }: { specs: Record<string, string> }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm min-w-[280px]">
        <tbody>
          {Object.entries(specs).map(([k, v]) => (
            <tr key={k} className="border-b border-slate-200">
              <td className="py-3 pr-4 text-slate-600 align-top w-[38%] sm:w-1/3">{k}</td>
              <td className="py-3 text-slate-900 align-top">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function IconList({ items, icon = "✓" }: { items: string[]; icon?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-slate-600">
          <span className="text-orange-600 shrink-0">{icon}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
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
      className={`w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 ${props.className ?? ""}`}
    />
  );
}

export function FormTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 ${props.className ?? ""}`}
    />
  );
}

export function FormSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 ${props.className ?? ""}`}
    />
  );
}

/* ── Auth shell ── */

export function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="section bg-slate-50 min-h-[60vh]">
      <div className="container-wide max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{title}</h1>
          {subtitle && <p className="text-slate-600 text-sm">{subtitle}</p>}
        </div>
        <div className="card p-6 md:p-8">{children}</div>
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
}: {
  items: { label: string; value: string }[];
  active: string;
  baseHref: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const isActive = active === item.value;
        const href = item.value ? `${baseHref}?category=${encodeURIComponent(item.value)}` : baseHref;
        return (
          <Link
            key={item.value || "all"}
            href={href}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              isActive
                ? "border-orange-500 text-orange-600 bg-orange-50"
                : "border-slate-300 text-slate-600 hover:border-slate-400 bg-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
