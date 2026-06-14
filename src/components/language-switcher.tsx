"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localizedPath, stripLocalePrefix } from "@/lib/i18n/paths";
import { hasZhRoute } from "@/lib/i18n/config";
import { LOCALE_META } from "@/lib/i18n/config";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const routeKey = stripLocalePrefix(pathname);
  const canSwitch = hasZhRoute(routeKey);

  const enHref = localizedPath(routeKey, "en");
  const zhHref = canSwitch ? localizedPath(routeKey, "zh") : "/zh";

  return (
    <div className="flex items-center gap-1 text-xs font-semibold shrink-0">
      <Link
        href={enHref}
        className={`px-2 py-1 rounded-md transition-colors ${locale === "en" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"}`}
        hrefLang="en"
      >
        {LOCALE_META.en.label}
      </Link>
      <Link
        href={zhHref}
        className={`px-2 py-1 rounded-md transition-colors ${locale === "zh" ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"}`}
        hrefLang="zh-CN"
      >
        {LOCALE_META.zh.label}
      </Link>
    </div>
  );
}
