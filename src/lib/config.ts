export const SITE = {
  name: "PhoneFarm Fun",
  domain: "phonefarm.fun",
  url: "https://phonefarm.fun",
  tagline: "Real Device Phone Farm Hardware from Guangzhou",
  intro:
    "PhoneFarm Fun is a Guangzhou-based real-device phone farm hardware brand focused on phone farm boxes, motherboard boxes, remote control setup, and custom deployment support for creators, marketing teams, testing teams, and enterprise clients.",
  location: "Guangzhou, China",
  since: 2017,
  description:
    "PhoneFarm Fun — Guangzhou real-device phone farm hardware. Phone farm boxes, motherboard boxes, Android & iPhone farms, USB hubs, power, cooling, network equipment, remote control setup, and bulk deployment since 2017.",
} as const;

export const CONTACT = {
  phone: "13059502618",
  telegram: "@huicheng1998",
  telegramUrl: "https://t.me/huicheng1998",
  whatsapp: "+852 6215 5642",
  whatsappUrl: "https://wa.me/85262155642",
  email: "qiuxui646@gmail.com",
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
