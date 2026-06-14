import { hasZhRoute, type Locale } from "./config";

/** Browser path for a locale (en keeps unprefixed URLs). */
export function localizedPath(path: string, locale: Locale): string {
  const base = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") {
    if (base === "/zh" || base.startsWith("/zh/")) {
      return base === "/zh" ? "/" : base.slice(3) || "/";
    }
    return base;
  }
  if (base === "/") return "/zh";
  if (base.startsWith("/zh")) return base;
  return `/zh${base}`;
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
}

/** Strip /zh prefix to get the English route key. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/zh") return "/";
  if (pathname.startsWith("/zh/")) return pathname.slice(3) || "/";
  return pathname;
}

/** hreflang alternates when both locales exist for this route. */
export function languageAlternates(path: string, siteUrl: string): Record<string, string> | undefined {
  const enPath = path.startsWith("/zh") ? stripLocalePrefix(path) : path;
  if (!hasZhRoute(enPath)) return undefined;
  const zhPath = localizedPath(enPath, "zh");
  return {
    en: `${siteUrl}${enPath === "/" ? "" : enPath}`,
    "zh-CN": `${siteUrl}${zhPath}`,
    "x-default": `${siteUrl}${enPath === "/" ? "" : enPath}`,
  };
}
