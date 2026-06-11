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
