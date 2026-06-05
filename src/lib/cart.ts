import { cookies } from "next/headers";

export type CartItem = {
  type: "product" | "service";
  slug: string;
  quantity: number;
};

const CART_COOKIE = "pf_cart";

export async function getCart(): Promise<CartItem[]> {
  const jar = await cookies();
  const raw = jar.get(CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function setCart(items: CartItem[]) {
  const jar = await cookies();
  jar.set(CART_COOKIE, JSON.stringify(items), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  });
}

export async function getCartCount(): Promise<number> {
  const items = await getCart();
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function mergeCartItem(items: CartItem[], item: CartItem): CartItem[] {
  const idx = items.findIndex((i) => i.type === item.type && i.slug === item.slug);
  if (idx === -1) return [...items, item];
  const next = [...items];
  next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
  return next;
}

export function removeCartItem(items: CartItem[], type: string, slug: string): CartItem[] {
  return items.filter((i) => !(i.type === type && i.slug === slug));
}

export function updateCartQuantity(items: CartItem[], type: string, slug: string, quantity: number): CartItem[] {
  if (quantity <= 0) return removeCartItem(items, type, slug);
  return items.map((i) => (i.type === type && i.slug === slug ? { ...i, quantity } : i));
}
