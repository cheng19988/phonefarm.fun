import { HeaderNav } from "./header-nav";
import { ContactLinkLabel } from "./contact-icons";
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
    <footer className="bg-[var(--ink)] text-zinc-300 border-t border-zinc-800 mt-auto">
      <div className="container-wide py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <SiteLogo variant="inverse" size="sm" href="/" className="mb-4" />
          <p className="text-zinc-400 text-sm mb-4 leading-relaxed max-w-xs">
            Factory-built phone farm boxes, motherboard arrays, and rack hardware from Guangzhou — real Android devices for QA and automation labs.
          </p>
          <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--accent)] hover:underline font-medium">
            {CONTACT.email}
          </a>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Products</h3>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li><Link href="/products/android-phone-farm" className="hover:text-[var(--accent)]">Android Phone Farm (Starter)</Link></li>
            <li><Link href="/products/phone-farm-box" className="hover:text-[var(--accent)]">Phone Farm Box Pro</Link></li>
            <li><Link href="/products/real-device-phone-farm" className="hover:text-[var(--accent)]">Turnkey Lab Bundle</Link></li>
            <li><Link href="/products/motherboard-box" className="hover:text-[var(--accent)]">Motherboard Cluster</Link></li>
            <li><Link href="/products/iphone-phone-farm" className="hover:text-[var(--accent)]">Multi-Device Lab Rack</Link></li>
            <li><Link href="/products/custom-cabinet" className="hover:text-[var(--accent)]">Custom Rack Solution</Link></li>
            <li><Link href="/products" className="hover:text-[var(--accent)] font-medium">Full Catalog →</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Resources</h3>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li><Link href="/services" className="hover:text-[var(--accent)]">Services</Link></li>
            <li><Link href="/blog" className="hover:text-[var(--accent)]">Guides &amp; Blog</Link></li>
            <li><Link href="/faq" className="hover:text-[var(--accent)]">FAQ</Link></li>
            <li><Link href="/glossary" className="hover:text-[var(--accent)]">Glossary</Link></li>
            <li><Link href="/phone-farm-manufacturer" className="hover:text-[var(--accent)]">Manufacturer</Link></li>
            <li><Link href="/compare" className="hover:text-[var(--accent)]">Hardware Comparison</Link></li>
            <li><Link href="/about" className="hover:text-[var(--accent)]">About Factory</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--accent)]">Contact Sales</Link></li>
            <li><Link href="/shipping" className="hover:text-[var(--accent)]">Shipping &amp; Freight</Link></li>
            <li><Link href="/warranty" className="hover:text-[var(--accent)]">Warranty &amp; Returns</Link></li>
            <li><Link href="/terms" className="hover:text-[var(--accent)]">Terms of Use</Link></li>
            <li><Link href="/privacy" className="hover:text-[var(--accent)]">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact</h3>
          <ul className="space-y-2.5 text-sm text-zinc-400">
            <li>
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <ContactLinkLabel kind="telegram">{CONTACT.telegram}</ContactLinkLabel>
              </a>
            </li>
            <li>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <ContactLinkLabel kind="whatsapp">{CONTACT.whatsapp}</ContactLinkLabel>
              </a>
            </li>
            <li>
              <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
                <ContactLinkLabel kind="email">{CONTACT.email}</ContactLinkLabel>
              </a>
            </li>
          </ul>
          <p className="text-xs text-zinc-500 mt-4">{SITE.location}</p>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-5 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {SITE.name} · {SITE.location}
      </div>
    </footer>
  );
}
