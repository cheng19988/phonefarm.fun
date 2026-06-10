/** Real factory & product photography — primary visual source */
const r = (file: string) => `/images/real/${file}`;
const factory = (file: string) => `/images/factory/${file}`;

/** Inner-page heroes & CTAs — factory/real photos only (no slide decks) */
export const BANNERS = {
  home: factory("factory-01.webp"),
  products: r("phone-farm-box-1.webp"),
  services: factory("factory-02.webp"),
  about: "/images/company/workshop.webp",
  contact: "/images/company/frontdesk.webp",
  faq: factory("factory-04.webp"),
  blog: r("motherboard-box-real-1.webp"),
} as const;

export const FACTORY_GALLERY = Array.from({ length: 12 }, (_, i) =>
  factory(`factory-${String(i + 1).padStart(2, "0")}.webp`),
);

export const IMAGES = {
  /** Homepage hero — dense product rack photo (better crop than wide factory floor) */
  homeHeroBg: r("phone-farm-box-3.webp"),
  /** Staged product shot for hero foreground */
  homeHeroProduct: r("phone-farm-box-1.webp"),
  /** Bottom CTA — motherboard cluster, reads well at wide aspect */
  /** Bottom CTA — motherboard cluster, reads well at wide aspect */
  homeCtaBg: r("motherboard-box-real-1.webp"),
  /** Hero chassis — transparent PNG; white page bg shows through */
  productsHeroChassis: "/images/brand/products-hero-chassis.webp",

  phoneFarmBox: {
    card: r("phone-farm-box-card.webp"),
    hero: r("phone-farm-box-1.webp"),
    detail: r("phone-farm-box-2.webp"),
  },
  motherboardBox: {
    card: r("motherboard-box-real-1.webp"),
    hero: r("motherboard-box-real-1.webp"),
    detail: r("motherboard-box-real-2.webp"),
  },
  androidFarm: {
    card: r("phone-farm-box-3.webp"),
    hero: r("phone-farm-box-1.webp"),
    detail: r("phone-farm-box-2.webp"),
  },
  iphoneFarm: {
    card: r("phone-farm-box-5.webp"),
    hero: r("phone-farm-box-6.webp"),
    detail: r("phone-farm-box-7.webp"),
  },
  realDevice: {
    card: r("phone-farm-box-8.webp"),
    hero: r("phone-farm-box-9.webp"),
    detail: r("phone-farm-box-10.webp"),
  },
  emptyBox: {
    card: r("phone-farm-box-12.webp"),
    hero: r("phone-farm-box-13.webp"),
    detail: r("phone-farm-box-14.webp"),
  },
  usbHub: {
    card: r("phone-farm-box-10.webp"),
    hero: r("phone-farm-box-11.webp"),
    detail: r("phone-farm-box-14.webp"),
  },
  power: {
    card: r("phone-farm-box-16.webp"),
    hero: r("phone-farm-box-17.webp"),
    detail: r("phone-farm-box-18.webp"),
  },
  cooling: {
    card: r("phone-farm-box-19.webp"),
    hero: r("phone-farm-box-20.webp"),
    detail: r("phone-farm-box-21.webp"),
  },
  network: {
    card: r("phone-farm-box-22.webp"),
    hero: r("phone-farm-box-23.webp"),
    detail: r("phone-farm-box-24.webp"),
  },
  customCabinet: {
    card: r("phone-farm-box-25.webp"),
    hero: r("phone-farm-box-26.webp"),
    detail: r("phone-farm-box-24.webp"),
  },
  remoteControl: {
    card: "/images/company/meeting.webp",
    hero: "/images/company/meeting.webp",
    detail: r("phone-farm-box-15.webp"),
  },
  serviceScene: factory("factory-02.webp"),
  factoryScene: factory("factory-01.webp"),
  workshop: "/images/company/workshop.webp",
  office: "/images/company/office.webp",
  meeting: "/images/company/meeting.webp",
  warehouse: "/images/company/warehouse.webp",

  company: {
    office: "/images/company/office.webp",
    frontdesk: "/images/company/frontdesk.webp",
    meeting: "/images/company/meeting.webp",
    workshop: "/images/company/workshop.webp",
    warehouse: "/images/company/warehouse.webp",
  },

  banners: BANNERS,
  factoryGallery: FACTORY_GALLERY,
} as const;

export const ASSET_LIBRARY = "D:\\网站搭建素材库" as const;
