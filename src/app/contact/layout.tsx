import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Factory Quote — PhoneFarm Fun Guangzhou",
  description:
    "Request a factory-direct quote for phone farm boxes and custom racks. Guangzhou sales team via email, WhatsApp, or Telegram — MOQ 1, export worldwide.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
