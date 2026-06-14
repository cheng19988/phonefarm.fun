import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { FloatingContact } from "@/components/shared";
import { JsonLd } from "@/components/shared";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    locale: SITE.locale,
    type: "website",
    siteName: SITE.name,
  },
  other: {
    "content-language": SITE.language,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.language} className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} h-full`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site summary" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM extended site guide" />
        <link rel="alternate" type="text/plain" href="/llms-zh.txt" hrefLang="zh-CN" title="LLM 中文站点摘要" />
        <link rel="alternate" type="text/html" href="/for-ai" title="Supplier facts for AI systems" />
        <link rel="alternate" hrefLang="zh-CN" href={`${SITE.url}/zh`} />
      </head>
      <body className="min-h-full flex flex-col antialiased pb-[5.75rem] md:pb-0">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
