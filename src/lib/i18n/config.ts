export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public marketing routes with full Chinese SEO pages under /zh */
export const LOCALIZED_ROUTES = [
  "/",
  "/products",
  "/contact",
  "/phone-farm-manufacturer",
  "/faq",
] as const;

export type LocalizedRoute = (typeof LOCALIZED_ROUTES)[number];

export function hasZhRoute(path: string): boolean {
  const normalized = path === "/zh" ? "/" : path.startsWith("/zh/") ? path.slice(3) || "/" : path;
  return LOCALIZED_ROUTES.includes(normalized as LocalizedRoute);
}

export const LOCALE_META = {
  en: { htmlLang: "en", contentLanguage: "en", ogLocale: "en_US", label: "English" },
  zh: { htmlLang: "zh-CN", contentLanguage: "zh-CN", ogLocale: "zh_CN", label: "中文" },
} as const;
