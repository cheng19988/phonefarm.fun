import realImageManifest from "@/lib/real-images-manifest.json";
import realGalleryMap from "@/lib/real-gallery-map.json";

const REAL_BASE = "/images/real";

const existingReal = new Set(realImageManifest as string[]);
const galleryBySlug = realGalleryMap as Record<string, string[]>;

function sortFilenames(names: string[]): string[] {
  return [...names].sort((a, b) => {
    const na = a.match(/(\d+)/)?.[1];
    const nb = b.match(/(\d+)/)?.[1];
    if (na && nb) return Number(na) - Number(nb);
    return a.localeCompare(b);
  });
}

function realPathsForSlug(slug: string): string[] {
  const names = sortFilenames(galleryBySlug[slug] ?? []);
  return names
    .filter((name) => existingReal.has(name))
    .map((name) => `${REAL_BASE}/${name}`);
}

/** Gallery uses this SKU's own real assets first — no cross-SKU stock images. */
export function getProductGalleryImages(slug: string, fallback: string[]): string[] {
  const real = realPathsForSlug(slug);
  const own = [...real, ...fallback.filter(Boolean)];
  const unique = own.filter((src, i) => own.indexOf(src) === i);
  return unique.slice(0, 12);
}

export function getProductCardImage(slug: string, fallback: string): string {
  const cardName = `${slug}-card.webp`;
  if (existingReal.has(cardName)) return `${REAL_BASE}/${cardName}`;
  const real = realPathsForSlug(slug);
  if (real.length > 0) return real[0];
  return fallback;
}

/** Primary catalog slugs — larger cards on /products */
export const PRIMARY_CATALOG_SLUGS = [
  "android-phone-farm",
  "phone-farm-box",
  "real-device-phone-farm",
  "motherboard-box",
  "custom-cabinet",
] as const;

export const ACCESSORY_SLUGS = new Set([
  "empty-box-chassis",
  "usb-hub",
  "power-supply-solution",
  "cooling-solution",
  "network-equipment",
]);

export const ACCESSORY_PHOTO_CAPTION =
  "Reference photo — shows compatible chassis routing / install context. Request a dedicated module photo before ordering if required.";

export function isAccessorySlug(slug: string): boolean {
  return ACCESSORY_SLUGS.has(slug);
}

export function getGalleryFallbackReport(): { slug: string; usesReal: boolean; imageCount: number }[] {
  return Object.keys(galleryBySlug).map((slug) => {
    const real = realPathsForSlug(slug);
    return { slug, usesReal: real.length > 0, imageCount: real.length };
  });
}
