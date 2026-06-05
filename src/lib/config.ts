export const SITE = {
  name: "PhoneFarm Fun",
  domain: "phonefarm.fun",
  url: "https://phonefarm.fun",
  tagline: "Android Device Farm Hardware for QA & Automation",
  intro:
    "Factory-built Android phone farm boxes, motherboard clusters, and real-device lab hardware for QA testing, app compatibility, remote operation, and scalable deployment.",
  location: "Guangzhou, China",
  since: 2017,
  description:
    "PhoneFarm Fun supplies factory-built Android device farm hardware from Guangzhou — starter and pro testing boxes, motherboard clusters, rack solutions, and lab accessories for mobile QA and automation teams.",
} as const;

export const CONTACT = {
  phone: "13059502618",
  telegram: "@huicheng1998",
  telegramUrl: "https://t.me/huicheng1998",
  whatsapp: "+852 6215 5642",
  whatsappUrl: "https://wa.me/85262155642",
  /** Public-facing sales address shown on the website */
  email: "sales@phonefarm.fun",
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
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Guides" },
  { href: "/contact", label: "Contact" },
] as const;
