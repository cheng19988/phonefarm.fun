import type { Metadata } from "next";
import { LOCALE_META } from "@/lib/i18n/config";

export const metadata: Metadata = {
  other: {
    "content-language": LOCALE_META.zh.contentLanguage,
  },
};

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return <div lang="zh-CN">{children}</div>;
}
