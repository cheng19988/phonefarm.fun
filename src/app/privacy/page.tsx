import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/config";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE.name}. How we collect, use, and protect your personal information.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container-wide max-w-3xl prose-content">
        <h1 className="section-title">Privacy Policy</h1>
        <p>Last updated: June 2026</p>
        <h2>Information We Collect</h2>
        <p>When you contact us or place an order, we collect your name, email, phone number, country, and inquiry details. Payment information is limited to USDT transaction hashes — we do not store credit card data.</p>
        <h2>How We Use Information</h2>
        <p>We use your information to process orders, provide customer support, and improve our products and services. We do not sell your personal data to third parties.</p>
        <h2>Data Security</h2>
        <p>We implement industry-standard security measures to protect your data. Order and payment records are stored securely in our database.</p>
        <h2>Contact</h2>
        <p>For privacy inquiries, email qiuxui646@gmail.com.</p>
      </div>
    </div>
  );
}
