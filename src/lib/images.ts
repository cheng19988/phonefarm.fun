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
  /** Products catalog hero — transparent chassis cutout */
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
    card: r("phone-farm-box-card.webp"),
    hero: r("phone-farm-box-3.webp"),
    detail: r("phone-farm-box-4.webp"),
  },
  iphoneFarm: {
    card: r("phone-farm-box-5.webp"),
    hero: r("phone-farm-box-6.webp"),
    detail: r("phone-farm-box-7.webp"),
  },
  realDevice: {
    card: r("phone-farm-box-card.webp"),
    hero: r("phone-farm-box-8.webp"),
    detail: r("phone-farm-box-9.webp"),
  },
  emptyBox: {
    card: r("motherboard-box-real-3.webp"),
    hero: r("motherboard-box-real-3.webp"),
    detail: r("motherboard-box-real-4.webp"),
  },
  usbHub: {
    card: r("phone-farm-box-10.webp"),
    hero: factory("factory-05.webp"),
    detail: r("phone-farm-box-11.webp"),
  },
  power: {
    card: factory("factory-06.webp"),
    hero: factory("factory-06.webp"),
    detail: factory("factory-07.webp"),
  },
  cooling: {
    card: factory("factory-08.webp"),
    hero: factory("factory-08.webp"),
    detail: factory("factory-09.webp"),
  },
  network: {
    card: r("motherboard-box-real-5.webp"),
    hero: factory("factory-10.webp"),
    detail: r("motherboard-box-real-6.webp"),
  },
  customCabinet: {
    card: factory("factory-11.webp"),
    hero: factory("factory-11.webp"),
    detail: factory("factory-12.webp"),
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
