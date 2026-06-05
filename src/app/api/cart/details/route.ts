import { NextResponse } from "next/server";
import { getCart } from "@/lib/cart";
import { resolveCartItems } from "@/lib/cart-resolve";

export async function GET() {
  const items = await getCart();
  const lines = await resolveCartItems(items);
  const total = lines.reduce((s, l) => s + l.priceUsd * l.quantity, 0);
  return NextResponse.json({ lines, total });
}
