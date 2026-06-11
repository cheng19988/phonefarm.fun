import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, SITE } from "@/lib/config";

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
        <p>
          All prices are listed in USD. Online checkout accepts USDT (TRC20) payment at the amount shown on your order page, within the stated time window. Orders expire if payment is not received in time. Bank transfer (T/T), Wise, and PayPal are available by manual invoice — contact{" "}
          <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">{CONTACT.email}</a>. Credit card and automated PayPal checkout are not available on this website.
        </p>
        <h2 id="shipping">Shipping</h2>
        <p>
          International shipping is available worldwide. See our dedicated{" "}
          <Link href="/shipping" className="text-[var(--accent)] hover:underline">shipping &amp; freight estimates</Link>{" "}
          page for methods, reference USD costs, and receiving instructions.
        </p>
        <h2 id="warranty">Warranty</h2>
        <p>
          Hardware carries a 12-month warranty against manufacturing defects. Full DOA, returns, and RMA details are on our{" "}
          <Link href="/warranty" className="text-[var(--accent)] hover:underline">warranty policy</Link> page.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">{CONTACT.email}</a>
        </p>
      </div>
    </div>
  );
}
