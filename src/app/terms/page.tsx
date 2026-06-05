import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name} website and product purchases.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-3xl prose-content">
        <h1 className="section-title">Terms of Use</h1>
        <p>Last updated: June 2026</p>
        <h2>Products &amp; Orders</h2>
        <p>All products are real-device phone farm hardware manufactured by PhoneFarm Fun in Guangzhou, China. Prices are listed in USD. Orders are subject to stock availability.</p>
        <h2>Payment</h2>
        <p>Online orders must be paid within the time window shown on your order page. Orders expire if payment is not received in time. Payment is confirmed after verification on our end.</p>
        <h2>Shipping</h2>
        <p>International shipping is available worldwide. Delivery times vary by method (express 3–7 days, sea freight 15–30 days). Import duties and taxes are the buyer&apos;s responsibility.</p>
        <h2>Warranty</h2>
        <p>Hardware carries a 12-month warranty against manufacturing defects. Misuse, unauthorized modifications, and normal wear are excluded.</p>
        <h2>Contact</h2>
        <p>Questions about these terms: sales@phonefarm.fun</p>
      </div>
    </div>
  );
}
