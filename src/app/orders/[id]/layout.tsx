import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Order Payment",
  description: "Complete your PhoneFarm Fun hardware order payment.",
  path: "/orders",
  noIndex: true,
});

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
