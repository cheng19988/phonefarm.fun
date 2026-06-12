import { CANONICAL_HOST, getSiteUrl } from "@/lib/site-url";

export const SITE = {
  name: "PhoneFarm Fun",
  domain: CANONICAL_HOST,
  /** Canonical public URL — must match live redirect target (www). Override via NEXT_PUBLIC_SITE_URL. */
  url: getSiteUrl(),
  /** Primary site language — all public pages are English */
  language: "en",
  locale: "en_US",
  tagline: "Guangzhou Factory-Direct Android Device Farm Hardware",
  intro:
    "PhoneFarm Fun is a Guangzhou factory building Android phone farm boxes, motherboard clusters, and custom rack hardware with burn-in QC and worldwide export — sold direct to QA teams, automation labs, and B2B buyers.",
  location: "Guangzhou, China",
  since: 2017,
  description:
    "Guangzhou factory-direct phone farm box manufacturer since 2017 — 20-node Android device farm chassis, motherboard clusters, rack solutions, and lab accessories with burn-in QC and worldwide export.",
} as const;

const SALES_EMAIL = "qiuxui646@gmail.com";
const SALES_EMAIL_SUBJECT = "PhoneFarm Fun Inquiry";

export const CONTACT = {
  telegram: "@huicheng1998",
  telegramUrl: "https://t.me/huicheng1998",
  whatsapp: "+85262155642",
  whatsappUrl: "https://wa.me/85262155642",
  email: SALES_EMAIL,
  /** Opens Gmail compose — reliable when OS has no default mail client */
  emailUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SALES_EMAIL)}&su=${encodeURIComponent(SALES_EMAIL_SUBJECT)}`,
  emailMailto: `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(SALES_EMAIL_SUBJECT)}`,
} as const;

export const PAYMENT = {
  network: "Tron TRC20",
  currency: "USDT",
  address: "TH42KshQyz15iWk5svAwS475RM8oYQjwjW",
  contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  minAmount: 10,
  expiryMinutes: 30,
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Guides" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
