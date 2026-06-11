import Link from "next/link";
import { ContactCTA } from "@/components/shared";
import { WARRANTY_POINTS } from "@/data/trust-content";
import { CONTACT, SITE } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Warranty, Returns & RMA Policy",
  description: `12-month manufacturing warranty, DOA handling, and return policy for ${SITE.name} phone farm hardware.`,
  path: "/warranty",
});

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        banner
        title="Warranty & Returns"
        subtitle="Manufacturing warranty, DOA support, and RMA process for factory-built phone farm hardware."
        eyebrow="B2B hardware support"
        image={IMAGES.banners.faq}
        imageAlt="Phone farm hardware quality support"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide max-w-4xl space-y-10 md:space-y-12">
          <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-3xl">
            {SITE.name} stands behind factory assembly quality. All chassis SKUs undergo burn-in testing before export.
            This page summarizes warranty coverage, returns, and how to open an RMA — aligned with our standard B2B hardware terms.
          </p>

          <div className="space-y-5">
            {WARRANTY_POINTS.map((item, i) => (
              <div key={item.title} className="card p-5 md:p-6 flex gap-4">
                <span className="step-badge h-10 w-10 text-sm rounded-lg shrink-0">{i + 1}</span>
                <div>
                  <h2 className="font-bold text-zinc-900 text-lg mb-2">{item.title}</h2>
                  <p className="text-zinc-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 md:p-6">
            <h2 className="font-bold text-zinc-900 text-lg mb-3">Open a support case</h2>
            <p className="text-zinc-600 text-sm leading-relaxed mb-4">
              Email{" "}
              <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">{CONTACT.email}</a>
              {" "}or message us on{" "}
              <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Telegram</a>
              {" "}/{" "}
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">WhatsApp</a>
              {" "}with your order reference, shipping country, and photos of the issue.
            </p>
            <Link href="/contact" className="btn-primary text-sm py-2.5 px-5 inline-block">Contact support</Link>
          </div>

          <p className="text-sm text-zinc-500">
            See also: <Link href="/shipping" className="text-[var(--accent)] hover:underline">Shipping policy</Link>
            {" · "}
            <Link href="/terms" className="text-[var(--accent)] hover:underline">Terms of use</Link>
          </p>

          <ContactCTA title="Questions About Coverage?" />
        </div>
      </section>
    </>
  );
}
