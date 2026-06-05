import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { Pool } from "pg";
import type { Product } from "@/generated/prisma/client";
import { PRODUCT_SEEDS } from "@/data/products";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

function seedToProduct(seed: (typeof PRODUCT_SEEDS)[number]): Product {
  return {
    id: `seed-${seed.slug}`,
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    shortDesc: seed.shortDesc,
    description: seed.description,
    features: JSON.stringify(seed.features),
    specs: JSON.stringify(seed.specs),
    scenarios: JSON.stringify(seed.scenarios),
    accessories: JSON.stringify(seed.accessories),
    delivery: JSON.stringify(seed.delivery),
    maintenance: JSON.stringify(seed.maintenance),
    faq: JSON.stringify(seed.faq),
    priceUsd: seed.priceUsd,
    stock: seed.stock,
    imageCard: seed.imageCard,
    imageHero: seed.imageHero,
    imageDetail: seed.imageDetail,
    published: true,
    createdAt: new Date("2017-01-01"),
    updatedAt: new Date("2017-01-01"),
  };
}

/** Load products from DB; fall back to static catalog if DB is unavailable at build/runtime. */
export async function getPublishedProducts(options?: {
  take?: number;
  orderBy?: "priceUsd" | "name";
  order?: "asc" | "desc";
  category?: string;
}): Promise<Product[]> {
  const orderField = options?.orderBy ?? "name";
  const orderDir = options?.order ?? "asc";

  try {
    const rows = await prisma.product.findMany({
      where: {
        published: true,
        ...(options?.category ? { category: options.category } : {}),
      },
      orderBy: { [orderField]: orderDir },
      ...(options?.take ? { take: options.take } : {}),
    });
    if (rows.length > 0) return rows;
  } catch (error) {
    console.warn("[getPublishedProducts] DB unavailable, using static catalog:", error);
  }

  let items = PRODUCT_SEEDS.map(seedToProduct);
  if (options?.category) {
    items = items.filter((p) => p.category === options.category);
  }
  items.sort((a, b) => {
    const av = orderField === "priceUsd" ? a.priceUsd : a.name;
    const bv = orderField === "priceUsd" ? b.priceUsd : b.name;
    if (av < bv) return orderDir === "asc" ? -1 : 1;
    if (av > bv) return orderDir === "asc" ? 1 : -1;
    return 0;
  });
  if (options?.take) items = items.slice(0, options.take);
  return items;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const row = await prisma.product.findUnique({ where: { slug } });
    if (row) return row;
  } catch (error) {
    console.warn("[getProductBySlug] DB unavailable, using static catalog:", error);
  }
  const seed = PRODUCT_SEEDS.find((p) => p.slug === slug);
  return seed ? seedToProduct(seed) : null;
}

export async function getRelatedProducts(slug: string, limit = 3): Promise<Product[]> {
  const { RELATED_BY_SLUG } = await import("@/data/product-meta");
  const relatedSlugs = RELATED_BY_SLUG[slug] ?? [];
  const results: Product[] = [];
  for (const s of relatedSlugs.slice(0, limit)) {
    const p = await getProductBySlug(s);
    if (p) results.push(p);
  }
  return results;
}

export const FEATURED_PRODUCT_SLUGS = [
  "android-phone-farm",
  "phone-farm-box",
  "real-device-phone-farm",
  "motherboard-box",
  "iphone-phone-farm",
  "custom-cabinet",
];

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getPublishedProducts();
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  return FEATURED_PRODUCT_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean) as Product[];
}
