import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact PhoneFarm Fun — Get a Quote",
  description:
    "Contact our Guangzhou sales team via phone, WhatsApp, Telegram, or email. Custom quotes for phone farm boxes and enterprise deployments.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
