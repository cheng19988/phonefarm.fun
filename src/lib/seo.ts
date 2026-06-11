import type { Metadata } from "next";
import { CONTACT, SITE } from "./config";

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
      locale: "en_US",
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
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/card_800x800/phonefarm.fun-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-card_800x800.webp`,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT.email,
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Chinese"],
    },
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  priceUsd: number;
  stock: number;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE.url}${product.image}`,
    url: `${SITE.url}/products/${product.slug}`,
    brand: { "@type": "Brand", name: SITE.name },
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/images/card_800x800/phonefarm.fun-product-box-0f5501e1584de9a625d220f62951bc6d-d04df-card_800x800.webp`,
      },
    },
    mainEntityOfPage: `${SITE.url}/blog/${article.slug}`,
  };
}
