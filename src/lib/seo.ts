import type { Metadata } from "next";
import { AI_ENTITY } from "@/data/ai-entity";
import { CONTACT, SITE } from "./config";

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

type SEOInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

/** Naver Search Advisor HTML tag — homepage only; omit when env is unset. */
export function naverSiteVerificationMetadata(): Pick<Metadata, "other"> | Record<string, never> {
  const token = process.env.NAVER_SITE_VERIFICATION?.trim();
  if (!token) return {};
  return {
    other: {
      "naver-site-verification": token,
    },
  };
}

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  noIndex,
}: SEOInput): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image || `${SITE.url}/images/hero_1600x900/phonefarm.fun-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-hero_1600x900.webp`;

  return {
    title: `${title} | ${SITE.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: ogImage, width: 1600, height: 900, alt: title }],
      locale: SITE.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Manufacturer"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: ["PhoneFarm Fun phone farm manufacturer", "phonefarm.fun"],
    url: SITE.url,
    logo: `${SITE.url}/images/card_800x800/phonefarm.fun-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-card_800x800.webp`,
    description: AI_ENTITY.summary,
    foundingDate: String(SITE.since),
    knowsAbout: AI_ENTITY.knowsAbout,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressRegion: "Guangdong",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: CONTACT.email,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        telephone: CONTACT.whatsapp,
        contactType: "customer support",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { "@id": ORG_ID },
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  priceUsd: number;
  stock: number;
  image: string;
  longDescription?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription ?? product.description,
    image: `${SITE.url}${product.image}`,
    url: `${SITE.url}/products/${product.slug}`,
    brand: { "@type": "Brand", name: SITE.name },
    manufacturer: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceUsd,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE.name },
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function itemListJsonLd(
  products: { name: string; slug: string; priceUsd: number; imageCard: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "PhoneFarm Fun Hardware Catalog",
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/products/${product.slug}`,
      item: {
        "@type": "Product",
        name: product.name,
        url: `${SITE.url}/products/${product.slug}`,
        image: `${SITE.url}${product.imageCard}`,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: product.priceUsd,
        },
      },
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
  category?: string;
  keywords?: string[];
}) {
  const url = `${SITE.url}/blog/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    url,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: SITE.language,
    ...(article.category ? { articleSection: article.category } : {}),
    ...(article.keywords?.length ? { keywords: article.keywords.join(", ") } : {}),
  };
}

export function definedTermSetJsonLd(terms: { term: string; definition: string; slug: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Phone Farm Hardware Glossary",
    description: "Definitions for phone farm box, Android device farm, and supplier terminology by PhoneFarm Fun.",
    url: `${SITE.url}/glossary`,
    inLanguage: SITE.language,
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      url: `${SITE.url}/glossary#${t.slug}`,
    })),
  };
}

export function blogItemListJsonLd(posts: { title: string; slug: string; date: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Phone Farm Hardware Guides",
    url: `${SITE.url}/blog`,
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/blog/${post.slug}`,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        url: `${SITE.url}/blog/${post.slug}`,
        datePublished: post.date,
      },
    })),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Request a Phone Farm Hardware Quote",
    description:
      "Factory-direct B2B quote for phone farm boxes and custom racks from PhoneFarm Fun Guangzhou — email, WhatsApp, Telegram.",
    url: `${SITE.url}/contact`,
    inLanguage: SITE.language,
    mainEntity: { "@id": ORG_ID },
  };
}

export function serviceJsonLd(service: {
  title: string;
  description: string;
  slug: string;
  priceUsd: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${SITE.url}/services/${service.slug}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    areaServed: "Worldwide",
    ...(service.priceUsd > 0
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: service.priceUsd,
          },
        }
      : {}),
  };
}
