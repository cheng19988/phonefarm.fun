const card = (name: string) => `/images/card_800x800/${name}-card_800x800.webp`;
const hero = (name: string) => `/images/hero_1600x900/${name}-hero_1600x900.webp`;
const detail = (name: string) => `/images/detail_1200x900/${name}-detail_1200x900.webp`;

export const IMAGES = {
  homeHero: hero("phonefarm.fun-product-box-0f5501e1584de9a625d220f62951bc6d-d04df"),
  phoneFarmBox: {
    card: card("phonefarm.fun-product-box-2025-10-25-11-27-img-0551-a9b35"),
    hero: hero("phonefarm.fun-product-box-2025-10-25-11-27-img-0551-a9b35"),
    detail: detail("phonefarm.fun-product-box-2025-10-25-11-27-img-0551-a9b35"),
  },
  motherboardBox: {
    card: card("phonefarm.fun-components-electronicscomponentslayout-64e0d"),
    hero: hero("phonefarm.fun-components-electronicscomponentslayout-64e0d"),
    detail: detail("phonefarm.fun-components-electronicscomponentslayout-64e0d"),
  },
  androidFarm: {
    card: card("phonefarm.fun-product-box-2025-10-25-11-28-img-0553-47327"),
    hero: hero("phonefarm.fun-product-box-2025-10-25-11-28-img-0553-47327"),
    detail: detail("phonefarm.fun-product-box-2025-10-25-11-28-img-0553-47327"),
  },
  iphoneFarm: {
    card: card("phonefarm.fun-product-box-2025-10-25-11-37-img-0566-ee21b"),
    hero: hero("phonefarm.fun-product-box-2025-10-25-11-37-img-0566-ee21b"),
    detail: detail("phonefarm.fun-product-box-2025-10-25-11-37-img-0566-ee21b"),
  },
  realDevice: {
    card: card("phonefarm.fun-product-box-0f5501e1584de9a625d220f62951bc6d-d04df"),
    hero: hero("phonefarm.fun-product-box-0f5501e1584de9a625d220f62951bc6d-d04df"),
    detail: detail("phonefarm.fun-product-box-0f5501e1584de9a625d220f62951bc6d-d04df"),
  },
  emptyBox: {
    card: card("phonefarm.fun-components-electronicsassembly-detail-f936c"),
    hero: hero("phonefarm.fun-components-electronicsassembly-detail-f936c"),
    detail: detail("phonefarm.fun-components-electronicsassembly-detail-f936c"),
  },
  usbHub: {
    card: card("phonefarm.fun-components-electronicscomponentsassembly-19059"),
    hero: hero("phonefarm.fun-components-electronicscomponentsassembly-19059"),
    detail: detail("phonefarm.fun-components-electronicscomponentsassembly-19059"),
  },
  power: {
    card: card("phonefarm.fun-components-electronicsassemblylabworkbench-9e7df"),
    hero: hero("phonefarm.fun-components-electronicsassemblylabworkbench-9e7df"),
    detail: detail("phonefarm.fun-components-electronicsassemblylabworkbench-9e7df"),
  },
  cooling: {
    card: card("phonefarm.fun-components-electronics-workbenchdetail-6f814"),
    hero: hero("phonefarm.fun-components-electronics-workbenchdetail-6f814"),
    detail: detail("phonefarm.fun-components-electronics-workbenchdetail-6f814"),
  },
  network: {
    card: card("phonefarm.fun-rack-cabinet-moderntechserverdeviceshowcase-89e28"),
    hero: hero("phonefarm.fun-rack-cabinet-moderntechserverdeviceshowcase-89e28"),
    detail: detail("phonefarm.fun-rack-cabinet-moderntechserverdeviceshowcase-89e28"),
  },
  customCabinet: {
    card: card("phonefarm.fun-rack-cabinet-moderntechlab-datarack-2fb2e"),
    hero: hero("phonefarm.fun-rack-cabinet-moderntechlab-datarack-2fb2e"),
    detail: detail("phonefarm.fun-rack-cabinet-moderntechlab-datarack-2fb2e"),
  },
  remoteControl: {
    card: card("phonefarm.fun-service-scenes-moderndevicemanagementcontrol-ae6b9"),
    hero: hero("phonefarm.fun-service-scenes-moderndevicemanagementcontrol-ae6b9"),
    detail: detail("phonefarm.fun-service-scenes-moderndevicemanagementcontrol-ae6b9"),
  },
  serviceScene: hero("phonefarm.fun-service-scenes-moderntechoffice-devicecontrol-2663b"),
  factory: hero("phonefarm.fun-rack-cabinet-modernlab-serverworkbench-a0099"),
  workshop: hero("phonefarm.fun-components-electronicsassemblylab-19f44"),
  office: hero("phonefarm.fun-service-scenes-moderntechofficeworkspace-23aa6"),
  meeting: hero("phonefarm.fun-service-scenes-modernoffice-lab-28010"),
  warehouse: hero("phonefarm.fun-rack-cabinet-industrial-server-8317a"),
  /** Real company photos from D:\\网站搭建素材库\\公司照片1-3 */
  company: {
    office: "/images/company/office.png",
    frontdesk: "/images/company/frontdesk.png",
    meeting: "/images/company/meeting.png",
    workshop: "/images/company/workshop.png",
    warehouse: "/images/company/warehouse.png",
  },
} as const;

/** Asset library source path */
export const ASSET_LIBRARY = "D:\\网站搭建素材库" as const;
export const ASSET_SITE_FOLDER = `${ASSET_LIBRARY}\\02_six_website_ready\\phonefarm.fun_main_factory_site` as const;
