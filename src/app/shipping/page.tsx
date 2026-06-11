import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { SHIPPING_ESTIMATES, SHIPPING_METHODS } from "@/data/trust-content";
import { CONTACT, SITE } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Shipping Policy & Freight Estimates",
  description: `International shipping for phone farm hardware from Guangzhou — express, air, and sea freight with reference USD estimates.`,
  path: "/shipping",
});

export default function ShippingPage() {
  return (
    <>
      <PageHero
        banner
        title="Shipping & Freight Estimates"
        subtitle="Express courier, air freight, and sea freight from Guangzhou — reference costs for standard 20-node boxes."
        eyebrow="Global export · DHL · FedEx · UPS"
        image={IMAGES.company.warehouse}
        imageAlt="Export packing at Guangzhou facility"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide max-w-4xl space-y-12 md:space-y-14 prose-content">
          <div>
            <h2 className="section-title text-2xl">Overview</h2>
            <p className="text-zinc-600 leading-relaxed">
              {SITE.name} ships factory-built phone farm hardware worldwide from Guangzhou, China. We hand off to international
              carriers with commercial invoice and export documentation. Final freight is confirmed on your quote or order —
              the table below shows typical reference ranges for a standard 20-node chassis (not including import duties or taxes).
            </p>
          </div>

          <div>
            <h2 className="section-title text-2xl mb-6">Shipping methods</h2>
            <div className="space-y-4 not-prose">
              {SHIPPING_METHODS.map((m) => (
                <div key={m.name} className="card p-5 md:p-6">
                  <h3 className="font-bold text-zinc-900 text-lg mb-1">{m.name}</h3>
                  <p className="text-sm text-orange-700 font-medium mb-2">{m.transit}</p>
                  <p className="text-sm text-zinc-600 mb-1"><strong>Best for:</strong> {m.bestFor}</p>
                  <p className="text-sm text-zinc-500">{m.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-title text-2xl mb-2">Reference freight estimates (USD)</h2>
            <p className="text-sm text-zinc-500 mb-6">Per standard 20-node box · confirmed on quote · duties/taxes may apply at destination</p>
            <div className="overflow-x-auto rounded-xl border border-zinc-200 not-prose">
              <table className="compare-table text-sm w-full">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Express courier</th>
                    <th>Air freight</th>
                    <th>Sea freight</th>
                  </tr>
                </thead>
                <tbody>
                  {SHIPPING_ESTIMATES.map((row) => (
                    <tr key={row.region}>
                      <td className="font-medium text-zinc-900">{row.region}</td>
                      <td>{row.express}</td>
                      <td>{row.air}</td>
                      <td>{row.sea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="section-title text-2xl">Receiving &amp; inspection</h2>
            <ul className="list-disc list-inside text-zinc-600 space-y-2">
              <li>Inspect outer packaging on delivery. Note visible damage before signing if your carrier allows.</li>
              <li>Report transit damage or dead-on-arrival units within 7 days with photos — see our <Link href="/warranty" className="text-[var(--accent)] hover:underline">warranty policy</Link>.</li>
              <li>Tracking numbers are shared once the shipment leaves our Guangzhou facility.</li>
              <li>Incorrect address, refused delivery, or customs holds caused by incomplete buyer documents may incur extra fees.</li>
            </ul>
          </div>

          <div className="rounded-xl bg-orange-50 border border-orange-100 p-5 md:p-6 not-prose">
            <p className="font-semibold text-zinc-900 mb-2">Need an exact quote?</p>
            <p className="text-sm text-zinc-600 mb-4">
              Share shipping country, SKU, and quantity on the contact form — we confirm freight before you pay.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary text-sm py-2.5 px-5">Request freight quote</Link>
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2.5 px-5">
                Telegram sales
              </a>
            </div>
          </div>

          <ContactCTA title="Plan Your Shipment" />
        </div>
      </section>
    </>
  );
}
