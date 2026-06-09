"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT, SITE } from "@/lib/config";
import { CartButton } from "./cart-button";
import { SiteLogo } from "./site-logo";

const MAIN_NAV = [
  {
    label: "Products",
    href: "/products",
    children: [
      { href: "/products/phone-farm-box", label: "Phone Farm Box", desc: "20-node real-device chassis" },
      { href: "/products/motherboard-box", label: "Motherboard Box", desc: "Headless Android arrays" },
      { href: "/products/android-phone-farm", label: "Android Phone Farm", desc: "Starter QA SKU" },
      { href: "/products/iphone-phone-farm", label: "iPhone Phone Farm", desc: "iOS lab hardware" },
      { href: "/products/custom-cabinet", label: "Custom Rack", desc: "40+ node projects" },
      { href: "/products", label: "View all products →", desc: "Full hardware catalog" },
    ],
  },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function HeaderNav({ sessionEmail, isAdmin }: { sessionEmail?: string | null; isAdmin?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onHome = pathname === "/";
  const heroMode = onHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={heroMode ? "site-header site-header--hero" : "site-header site-header--solid"}>
      {/* Top contact strip */}
      <div
        className={`hidden lg:block border-b transition-colors ${
          heroMode ? "bg-black/40 border-white/10 backdrop-blur-sm" : "bg-zinc-950 border-white/5"
        }`}
      >
        <div className="container-wide py-2 flex justify-between items-center text-[11px] tracking-wide">
          <span className={heroMode ? "text-zinc-300" : "text-zinc-400"}>
            {SITE.location} · Est. {SITE.since} · Factory-direct Android device farm hardware
          </span>
          <div className={`flex items-center gap-5 ${heroMode ? "text-zinc-300" : "text-zinc-400"}`}>
            <a href={`tel:${CONTACT.phone}`} className="hover:text-white transition-colors">{CONTACT.phone}</a>
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">WhatsApp</a>
            <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">Telegram</a>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-orange-400">{CONTACT.email}</a>
          </div>
        </div>
      </div>

      <div className="container-wide h-[72px] md:h-[76px] flex items-center justify-between gap-6">
        <SiteLogo variant={heroMode ? "hero" : "default"} size="md" />

        <nav className="hidden xl:flex items-center gap-1">
          {MAIN_NAV.map((item) =>
            "children" in item ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  type="button"
                  className={`nav-link flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? heroMode
                        ? "text-white bg-white/15"
                        : "nav-link-active text-[var(--accent)] bg-orange-50"
                      : heroMode
                        ? "text-white/90 hover:text-white hover:bg-white/10"
                        : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  {item.label}
                  <svg viewBox="0 0 12 12" className="w-3 h-3 opacity-60" aria-hidden>
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </button>
                {productsOpen && (
                  <div className="absolute top-full left-0 pt-2 w-[320px] z-50">
                    <div className="bg-white rounded-xl border border-zinc-200 shadow-2xl p-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="block px-3 py-2.5 rounded-lg hover:bg-zinc-50 transition-colors"
                        >
                          <span className="font-semibold text-zinc-900 text-sm">{child.label}</span>
                          <span className="block text-xs text-zinc-500 mt-0.5 leading-relaxed">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? heroMode
                      ? "text-white bg-white/15"
                      : "nav-link-active text-[var(--accent)] bg-orange-50"
                    : heroMode
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <CartButton inverted={heroMode} />
          <Link
            href="/contact"
            className={`hidden md:inline-flex text-sm font-medium px-4 py-2.5 rounded-lg border transition-colors ${
              heroMode
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-zinc-300 text-zinc-800 hover:border-zinc-900 hover:bg-zinc-50"
            }`}
          >
            Get Quote
          </Link>
          <Link href="/products" className="btn-primary text-sm py-2.5 px-5 shadow-sm">
            Shop Now
          </Link>
          {sessionEmail ? (
            <Link
              href={isAdmin ? "/admin" : "/account/orders"}
              className={`hidden lg:inline text-sm font-medium px-2 ${heroMode ? "text-white/80 hover:text-white" : "text-zinc-600 hover:text-zinc-900"}`}
            >
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className={`hidden lg:inline text-sm font-medium px-2 ${heroMode ? "text-white/80 hover:text-white" : "text-zinc-600 hover:text-zinc-900"}`}
            >
              Login
            </Link>
          )}
          <button
            type="button"
            className={`xl:hidden p-2.5 rounded-lg border transition-colors ${
              heroMode ? "border-white/25 text-white hover:bg-white/10" : "border-zinc-200 text-zinc-700 hover:bg-zinc-50"
            }`}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-zinc-100 bg-white max-h-[70vh] overflow-y-auto shadow-lg">
          <div className="container-wide py-4 space-y-1">
            {MAIN_NAV.flatMap((item) =>
              "children" in item
                ? item.children.map((c) => (
                    <Link key={c.href + c.label} href={c.href} className="block px-3 py-2.5 text-sm text-zinc-800 hover:bg-zinc-50 rounded-lg">
                      {c.label}
                    </Link>
                  ))
                : [
                    <Link key={item.href} href={item.href} className="block px-3 py-2.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50 rounded-lg">
                      {item.label}
                    </Link>,
                  ],
            )}
          </div>
        </div>
      )}
    </header>
  );
}
