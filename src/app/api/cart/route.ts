import { NextRequest, NextResponse } from "next/server";
import {
  getCart,
  mergeCartItem,
  removeCartItem,
  setCart,
  updateCartQuantity,
  type CartItem,
} from "@/lib/cart";

export async function GET() {
  const items = await getCart();
  return NextResponse.json({ items, count: items.reduce((s, i) => s + i.quantity, 0) });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<CartItem>;
  const type = body.type === "service" ? "service" : "product";
  const slug = String(body.slug || "");
  const quantity = Math.max(1, Number(body.quantity) || 1);
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const items = mergeCartItem(await getCart(), { type, slug, quantity });
  await setCart(items);
  return NextResponse.json({ items, count: items.reduce((s, i) => s + i.quantity, 0) });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const type = body.type === "service" ? "service" : "product";
  const slug = String(body.slug || "");
  const quantity = Number(body.quantity);
  if (!slug || Number.isNaN(quantity)) {
    return NextResponse.json({ error: "slug and quantity required" }, { status: 400 });
  }
  const items = updateCartQuantity(await getCart(), type, slug, quantity);
  await setCart(items);
  return NextResponse.json({ items });
}

export async function DELETE(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") === "service" ? "service" : "product";
  const slug = req.nextUrl.searchParams.get("slug") || "";
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const items = removeCartItem(await getCart(), type, slug);
  await setCart(items);
  return NextResponse.json({ items });
}
