import { HeaderNav } from "./header-nav";
import Link from "next/link";
import { CONTACT, SITE } from "@/lib/config";
import { getSession } from "@/lib/auth";
import { SiteLogo } from "./site-logo";

export async function Header() {
  const session = await getSession();
  return <HeaderNav sessionEmail={session?.email} isAdmin={session?.role === "admin"} />;
}

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-slate-300 border-t border-white/5 mt-auto">
      <div className="container-wide py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <SiteLogo variant="inverse" size="sm" href="/" className="mb-4" />
          <p className="text-slate-400 text-sm mb-4 leading-relaxed max-w-xs">
            Factory-built phone farm boxes, motherboard arrays, and rack hardware from Guangzhou — real Android devices for QA and automation labs.
          </p>
          <a href={`mailto:${CONTACT.email}`} className="text-sm text-[var(--accent)] hover:underline font-medium">
            {CONTACT.email}
          </a>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Products</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/products/phone-farm-box" className="hover:text-[var(--accent)]">Phone Farm Box</Link></li>
            <li><Link href="/products/motherboard-box" className="hover:text-[var(--accent)]">Motherboard Cluster</Link></li>
            <li><Link href="/products/android-phone-farm" className="hover:text-[var(--accent)]">Android Phone Farm</Link></li>
            <li><Link href="/products/iphone-phone-farm" className="hover:text-[var(--accent)]">iPhone Phone Farm</Link></li>
            <li><Link href="/products/custom-cabinet" className="hover:text-[var(--accent)]">Custom Rack Solution</Link></li>
            <li><Link href="/products" className="hover:text-[var(--accent)] font-medium">Full Catalog →</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Resources</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/services" className="hover:text-[var(--accent)]">Services</Link></li>
            <li><Link href="/blog" className="hover:text-[var(--accent)]">Guides &amp; Blog</Link></li>
            <li><Link href="/faq" className="hover:text-[var(--accent)]">FAQ</Link></li>
            <li><Link href="/about" className="hover:text-[var(--accent)]">About Factory</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--accent)]">Contact Sales</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><a href={`tel:${CONTACT.phone}`} className="hover:text-white">{CONTACT.phone}</a></li>
            <li><a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">WhatsApp</a></li>
            <li><a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">Telegram</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-[var(--accent)]">{CONTACT.email}</a></li>
          </ul>
          <p className="text-xs text-slate-500 mt-4">{SITE.location}</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.name} · {SITE.location}
      </div>
    </footer>
  );
}
