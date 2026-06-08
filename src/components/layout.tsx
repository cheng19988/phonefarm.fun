import Link from "next/link";
import { CONTACT, NAV, SITE } from "@/lib/config";
import { ContactBar } from "./shared";
import { CartButton } from "./cart-button";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="hidden md:block bg-slate-50 border-b border-slate-200">
        <div className="container-wide py-2 flex justify-between items-center text-xs text-slate-500">
          <span>{SITE.location} · Real device hardware since {SITE.since}</span>
          <ContactBar compact />
        </div>
      </div>
      <div className="container-wide py-3 md:py-4 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
            PF
          </div>
          <div className="min-w-0 hidden xs:block sm:block">
            <div className="font-bold text-slate-900 leading-tight truncate">{SITE.name}</div>
            <div className="text-[10px] text-slate-500 leading-tight hidden sm:block truncate">{SITE.tagline}</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <CartButton />
          <Link href="/products" className="btn-primary text-sm py-2 px-3">
            Shop
          </Link>
          {session ? (
            <Link
              href={session.role === "admin" ? "/admin" : "/account/orders"}
              className="hidden sm:inline text-sm text-slate-600 hover:text-slate-900"
            >
              Account
            </Link>
          ) : (
            <Link href="/login" className="hidden sm:inline text-sm text-slate-600 hover:text-slate-900">
              Login
            </Link>
          )}
        </div>
      </div>
      <nav className="lg:hidden border-t border-slate-100">
        <div className="container-wide py-2 flex gap-1 overflow-x-auto text-sm scrollbar-none">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-full whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="container-wide py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="font-bold text-slate-900 text-lg mb-2">{SITE.name}</div>
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">
            Factory-built phone farm boxes, motherboard arrays, and rack hardware from Guangzhou.
          </p>
          <a href={`mailto:${CONTACT.email}`} className="text-sm text-orange-600 hover:text-orange-500 font-medium">
            {CONTACT.email}
          </a>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">Products</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/products/phone-farm-box" className="hover:text-orange-600">20-Node Pro Testing Box</Link></li>
            <li><Link href="/products/motherboard-box" className="hover:text-orange-600">Motherboard Cluster</Link></li>
            <li><Link href="/products/android-phone-farm" className="hover:text-orange-600">Starter Device Farm Box</Link></li>
            <li><Link href="/products/custom-cabinet" className="hover:text-orange-600">Custom Rack Solution</Link></li>
            <li><Link href="/products" className="hover:text-orange-600 font-medium">Full Catalog →</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">Services</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/services/phone-farm-setup" className="hover:text-orange-600">Device Lab Setup</Link></li>
            <li><Link href="/services/remote-control-configuration" className="hover:text-orange-600">Remote Control Setup</Link></li>
            <li><Link href="/services/custom-hardware-solution" className="hover:text-orange-600">Custom Engineering</Link></li>
            <li><Link href="/services" className="hover:text-orange-600 font-medium">All Services →</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wide">Company</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link href="/about" className="hover:text-orange-600">About</Link></li>
            <li><Link href="/blog" className="hover:text-orange-600">Blog</Link></li>
            <li><Link href="/faq" className="hover:text-orange-600">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-orange-600">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-orange-600">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-orange-600">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.name} · {SITE.location}
      </div>
    </footer>
  );
}
