/** Canonical production origin — single source for sitemap, canonical, JSON-LD. */
export const CANONICAL_HOST = "www.phonefarm.fun";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return `https://${CANONICAL_HOST}`;
}
