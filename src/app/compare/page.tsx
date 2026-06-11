import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { COMPARISON_ROWS } from "@/data/trust-content";
import { SITE } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Phone Farm Hardware Comparison",
  description: `Compare ${SITE.name} factory hardware vs cloud phones, desk DIY setups, and reseller listings for B2B device labs.`,
  path: "/compare",
});

export default function ComparePage() {
  return (
    <>
      <PageHero
        banner
        title="Hardware Comparison Guide"
        subtitle="How factory-built phone farm boxes compare to cloud phones, desk DIY setups, and third-party reseller listings."
        eyebrow="Procurement reference"
        image={IMAGES.phoneFarmBox.hero}
        imageAlt="Phone farm box hardware comparison"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide max-w-6xl space-y-10">
          <p className="text-zinc-600 max-w-3xl leading-relaxed">
            Use this table when evaluating options for a real-device Android lab. {SITE.name} focuses on physical chassis,
            burn-in QC, and export support — not cloud subscriptions or software lock-in.
          </p>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm">
            <table className="compare-table text-sm min-w-[720px]">
              <thead>
                <tr>
                  <th className="w-[18%]">Capability</th>
                  <th className="bg-orange-50 text-[var(--accent)] w-[22%]">{SITE.name}</th>
                  <th className="w-[20%]">Cloud phones</th>
                  <th className="w-[20%]">Desk DIY</th>
                  <th className="w-[20%]">Reseller listings</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td className="font-medium text-zinc-900">{row.feature}</td>
                    <td className="bg-orange-50/40 text-zinc-800 font-medium">{row.us}</td>
                    <td className="text-zinc-600">{row.cloud}</td>
                    <td className="text-zinc-600">{row.diy}</td>
                    <td className="text-zinc-600">{row.reseller}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary">Browse hardware catalog</Link>
            <Link href="/contact" className="btn-secondary">Request sizing quote</Link>
          </div>

          <ContactCTA title="Not Sure Which Path Fits?" />
        </div>
      </section>
    </>
  );
}
