import Image from "next/image";
import Link from "next/link";
import {
  CASE_STUDIES,
  CERTIFICATIONS,
  CLIENT_SEGMENTS,
  TESTIMONIALS,
} from "@/data/trust-content";
import { SiteLogo } from "./site-logo";

export function CertBadgeStrip({ compact }: { compact?: boolean }) {
  return (
    <div className={compact ? "flex flex-wrap justify-center gap-6 md:gap-10" : "grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"}>
      {CERTIFICATIONS.map((cert) => (
        <div key={cert.id} className="flex flex-col items-center text-center gap-2">
          <div className={`relative ${compact ? "h-16 w-16 md:h-20 md:w-20" : "h-20 w-20 md:h-24 md:w-24"}`}>
            <Image src={cert.image} alt={cert.title} fill className="object-contain" sizes="96px" />
          </div>
          <div>
            <p className="font-bold text-zinc-900 text-sm">{cert.title}</p>
            <p className="text-xs text-zinc-500">{cert.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ClientLogoWall() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
      {CLIENT_SEGMENTS.map((seg) => (
        <div
          key={seg.tag}
          className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-5 shadow-sm"
        >
          <SiteLogo variant="default" size="sm" showWordmark={false} href="" className="opacity-90" />
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600">{seg.tag}</p>
            <p className="text-xs text-zinc-600 mt-1 leading-snug">{seg.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CaseStudyCards() {
  return (
    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
      {CASE_STUDIES.map((item) => (
        <article key={item.title} className="card product-card-heavy p-6 md:p-7 h-full flex flex-col">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">{item.industry}</p>
          <h3 className="font-display font-bold text-zinc-900 text-lg mb-3 leading-snug">{item.title}</h3>
          <p className="text-sm text-zinc-600 leading-relaxed flex-1">{item.summary}</p>
          <p className="text-sm text-zinc-800 mt-4 font-medium">{item.outcome}</p>
          <p className="text-xs text-zinc-500 mt-3 pt-3 border-t border-zinc-200">{item.hardware}</p>
        </article>
      ))}
    </div>
  );
}

export function TestimonialStrip() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {TESTIMONIALS.map((t) => (
        <blockquote key={t.quote.slice(0, 40)} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:p-7">
          <p className="text-sm md:text-base text-zinc-700 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
          <footer className="mt-4 text-sm">
            <p className="font-semibold text-zinc-900">{t.role}</p>
            <p className="text-zinc-500">{t.region}</p>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}

export function TrustSectionLinks() {
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      <Link href="/shipping" className="text-[var(--accent)] font-semibold hover:underline">Shipping estimates →</Link>
      <Link href="/warranty" className="text-[var(--accent)] font-semibold hover:underline">Warranty &amp; returns →</Link>
      <Link href="/compare" className="text-[var(--accent)] font-semibold hover:underline">Full comparison →</Link>
    </div>
  );
}
