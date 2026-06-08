import { IMAGES } from "@/lib/images";

/** Extra gallery images per SKU (project assets only; no external brands). */
export const PRODUCT_GALLERY: Record<string, string[]> = {
  "android-phone-farm": [
    IMAGES.androidFarm.detail,
    IMAGES.androidFarm.hero,
    IMAGES.workshop,
    IMAGES.usbHub.detail,
  ],
  "phone-farm-box": [
    IMAGES.phoneFarmBox.detail,
    IMAGES.phoneFarmBox.hero,
    IMAGES.remoteControl.hero,
    IMAGES.cooling.detail,
  ],
  "motherboard-box": [
    IMAGES.motherboardBox.detail,
    IMAGES.motherboardBox.hero,
    IMAGES.emptyBox.detail,
    IMAGES.network.hero,
  ],
  "iphone-phone-farm": [
    IMAGES.iphoneFarm.detail,
    IMAGES.iphoneFarm.hero,
    IMAGES.network.hero,
    IMAGES.realDevice.hero,
  ],
  "real-device-phone-farm": [
    IMAGES.realDevice.detail,
    IMAGES.realDevice.hero,
    IMAGES.phoneFarmBox.hero,
    IMAGES.power.hero,
  ],
  "empty-box-chassis": [
    IMAGES.emptyBox.detail,
    IMAGES.emptyBox.hero,
    IMAGES.phoneFarmBox.detail,
    IMAGES.power.detail,
  ],
  "usb-hub": [
    IMAGES.usbHub.detail,
    IMAGES.usbHub.hero,
    IMAGES.phoneFarmBox.card,
    IMAGES.motherboardBox.card,
  ],
  "power-supply-solution": [
    IMAGES.power.detail,
    IMAGES.power.hero,
    IMAGES.cooling.detail,
    IMAGES.emptyBox.detail,
  ],
  "cooling-solution": [
    IMAGES.cooling.detail,
    IMAGES.cooling.hero,
    IMAGES.power.detail,
    IMAGES.phoneFarmBox.card,
  ],
  "network-equipment": [
    IMAGES.network.detail,
    IMAGES.network.hero,
    IMAGES.customCabinet.hero,
    IMAGES.usbHub.hero,
  ],
  "custom-cabinet": [
    IMAGES.customCabinet.detail,
    IMAGES.customCabinet.hero,
    IMAGES.warehouse,
    IMAGES.motherboardBox.hero,
  ],
};

export function getProductGalleryImages(slug: string, fallback: string[]): string[] {
  const extras = PRODUCT_GALLERY[slug] ?? [];
  const merged = [...fallback, ...extras];
  return merged.filter((src, i) => merged.indexOf(src) === i).slice(0, 5);
}

/** Primary catalog slugs — larger cards on /products */
export const PRIMARY_CATALOG_SLUGS = [
  "android-phone-farm",
  "phone-farm-box",
  "motherboard-box",
  "custom-cabinet",
] as const;
