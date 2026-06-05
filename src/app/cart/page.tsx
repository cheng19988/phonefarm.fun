import { buildMetadata } from "@/lib/seo";
import CartPageClient from "./cart-client";

export const metadata = buildMetadata({
  title: "Shopping Cart",
  description: "Review phone farm hardware and services before checkout.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartPageClient />;
}
