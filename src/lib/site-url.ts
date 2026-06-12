/** Canonical production origin — single source for sitemap, canonical, JSON-LD. */
export const CANONICAL_HOST = "www.phonefarm.fun";

export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

function isProductionRuntime(): boolean {
  return process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
}

/** Normalize any configured origin to the single canonical https://www host in production. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const fallback = fromEnv || CANONICAL_ORIGIN;

  if (!isProductionRuntime()) return fallback;

  try {
    const parsed = new URL(fallback.startsWith("http") ? fallback : `https://${fallback}`);
    parsed.protocol = "https:";
    parsed.hostname = CANONICAL_HOST;
    parsed.port = "";
    return parsed.origin;
  } catch {
    return CANONICAL_ORIGIN;
  }
}
