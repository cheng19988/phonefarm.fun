import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { BLOG_POSTS } from "@/data/blog";
import { PRODUCT_SEEDS } from "@/data/products";
import { SERVICES } from "@/data/services";

/** Paths that must never appear in the public sitemap. */
const SITEMAP_EXCLUDED_PREFIXES = [
  "/admin",
  "/account",
  "/api",
  "/cart",
  "/checkout",
  "/login",
  "/register",
  "/orders",
];

function isPublicSitemapUrl(url: string): boolean {
  if (!url.startsWith(SITE.url)) return false;
  const path = url.slice(SITE.url.length) || "/";
  if (path.includes("localhost") || path.includes("vercel.app")) return false;
  return !SITEMAP_EXCLUDED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/products", "/services", "/about", "/faq", "/glossary", "/phone-farm-manufacturer", "/contact", "/for-ai", "/blog", "/privacy", "/terms", "/shipping", "/warranty", "/compare"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const productPages = PRODUCT_SEEDS.map((p) => ({
    url: `${SITE.url}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const servicePages = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const specSheets = PRODUCT_SEEDS.map((p) => ({
    url: `${SITE.url}/products/${p.slug}/spec-sheet`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticPages, ...productPages, ...servicePages, ...blogPages, ...specSheets].filter((entry) =>
    isPublicSitemapUrl(entry.url),
  );
}
