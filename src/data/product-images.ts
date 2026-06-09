import realImageManifest from "@/lib/real-images-manifest.json";

const REAL_BASE = "/images/real";

/** Real-photo filenames per SKU — used when files exist under public/images/real/ */
export const REAL_GALLERY_BY_SLUG: Record<string, string[]> = {
  "android-phone-farm": ["phone-farm-box-32-front.webp", "phone-farm-box-32-inside.webp"],
  "phone-farm-box": ["phone-farm-box-32-front.webp", "phone-farm-box-32-inside.webp", "phone-farm-box-32-testing.webp"],
  "motherboard-box": ["motherboard-box-front.webp", "motherboard-box-inside.webp", "motherboard-box-cables.webp"],
  "iphone-phone-farm": ["iphone-farm-box-front.webp", "iphone-farm-box-inside.webp"],
  "real-device-phone-farm": ["phone-array-12-front.webp"],
  "empty-box-chassis": ["motherboard-box-inside.webp"],
  "usb-hub": ["otg-lan-router-setup.webp"],
  "power-supply-solution": ["export-packing-box.webp"],
  "cooling-solution": ["workshop-testing-bench.webp"],
  "network-equipment": ["otg-lan-router-setup.webp"],
  "custom-cabinet": ["workshop-assembly-table.webp", "export-packing-box.webp"],
};

const existingReal = new Set(realImageManifest as string[]);

function realPathsForSlug(slug: string): string[] {
  const names = REAL_GALLERY_BY_SLUG[slug] ?? [];
  return names
    .filter((name) => existingReal.has(name))
    .map((name) => `${REAL_BASE}/${name}`);
}

/** Gallery uses this SKU's own assets only — no cross-SKU stock images. */
export function getProductGalleryImages(slug: string, fallback: string[]): string[] {
  const real = realPathsForSlug(slug);
  const own = [...real, ...fallback.filter(Boolean)];
  const unique = own.filter((src, i) => own.indexOf(src) === i);
  return unique.slice(0, 5);
}

/** Primary catalog slugs — larger cards on /products */
export const PRIMARY_CATALOG_SLUGS = [
  "android-phone-farm",
  "phone-farm-box",
  "motherboard-box",
  "custom-cabinet",
] as const;

export function getGalleryFallbackReport(): { slug: string; usesReal: boolean; imageCount: number }[] {
  return Object.keys(REAL_GALLERY_BY_SLUG).map((slug) => {
    const real = realPathsForSlug(slug);
    return { slug, usesReal: real.length > 0, imageCount: real.length };
  });
}
