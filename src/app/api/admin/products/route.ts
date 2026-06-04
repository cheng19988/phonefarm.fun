import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId, priceUsd, stock } = await req.json();
  if (!productId) return NextResponse.json({ error: "productId required" }, { status: 400 });

  const product = await prisma.product.update({
    where: { id: productId },
    data: {
      ...(priceUsd !== undefined ? { priceUsd: Number(priceUsd) } : {}),
      ...(stock !== undefined ? { stock: Number(stock) } : {}),
    },
  });

  return NextResponse.json(product);
}
