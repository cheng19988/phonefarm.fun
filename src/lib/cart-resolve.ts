import { getProductBySlug } from "./products-server";
import { getService } from "@/data/services";
import type { CartItem } from "./cart";

export type ResolvedCartLine = {
  type: "product" | "service";
  slug: string;
  name: string;
  priceUsd: number;
  stock: number;
  quantity: number;
  image?: string;
  purchasable: boolean;
};

export async function resolveCartItems(items: CartItem[]): Promise<ResolvedCartLine[]> {
  const lines: ResolvedCartLine[] = [];
  for (const item of items) {
    if (item.type === "product") {
      const product = await getProductBySlug(item.slug);
      if (!product) continue;
      lines.push({
        type: "product",
        slug: item.slug,
        name: product.name,
        priceUsd: product.priceUsd,
        stock: product.stock,
        quantity: item.quantity,
        image: product.imageCard,
        purchasable: product.priceUsd > 0 && product.stock > 0,
      });
    } else {
      const service = getService(item.slug);
      if (!service) continue;
      lines.push({
        type: "service",
        slug: item.slug,
        name: service.title,
        priceUsd: service.priceUsd,
        stock: 999,
        quantity: item.quantity,
        image: service.image,
        purchasable: service.priceUsd > 0,
      });
    }
  }
  return lines;
}
