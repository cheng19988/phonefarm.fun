import { getProductMeta } from "@/data/product-meta";

/** Product detail meta description — B2B buy intent + MOQ/lead time without changing visible page copy. */
export function buildProductPageDescription(name: string, shortDesc: string, slug: string): string {
  const meta = getProductMeta(slug);
  return `${shortDesc} Buy ${name} factory-direct — MOQ ${meta.moq}, lead time ${meta.leadTime}. Android phone farm hardware & phone farm equipment from Guangzhou with export shipping.`;
}
