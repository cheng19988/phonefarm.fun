import realImageManifest from "@/lib/real-images-manifest.json";
import realGalleryMap from "@/lib/real-gallery-map.json";

const REAL_BASE = "/images/real";

const existingReal = new Set(realImageManifest as string[]);
const galleryBySlug = realGalleryMap as Record<string, string[]>;

function realPathsForSlug(slug: string): string[] {
  const names = galleryBySlug[slug] ?? [];
  return names
    .filter((name) => existingReal.has(name))
    .map((name) => `${REAL_BASE}/${name}`);
}

/** Gallery uses this SKU's own real assets first — no cross-SKU stock images. */
export function getProductGalleryImages(slug: string, fallback: string[]): string[] {
  const real = realPathsForSlug(slug);
  const own = [...real, ...fallback.filter(Boolean)];
  const unique = own.filter((src, i) => own.indexOf(src) === i);
  return unique.slice(0, 8);
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
  "motherboard-box",
  "custom-cabinet",
] as const;

export function getGalleryFallbackReport(): { slug: string; usesReal: boolean; imageCount: number }[] {
  return Object.keys(galleryBySlug).map((slug) => {
    const real = realPathsForSlug(slug);
    return { slug, usesReal: real.length > 0, imageCount: real.length };
  });
}
