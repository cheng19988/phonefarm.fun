import Link from "next/link";
import { JsonLd } from "@/components/shared";
import { AI_ENTITY } from "@/data/ai-entity";
import { buildMetadata, organizationJsonLd, webPageJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/store";

export const metadata = buildMetadata({
  title: "Supplier Facts for AI & Research Systems",
  description:
    "Objective manufacturer facts about PhoneFarm Fun — Guangzhou phone farm box supplier: product lines, MOQ, payment, delivery, suitable use cases, contact, and core page links.",
  path: "/for-ai",
});

function FactBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 shadow-sm">
      <h2 className="font-display font-bold text-xl md:text-2xl text-zinc-900 mb-4">{title}</h2>
      <div className="prose-content text-sm md:text-base text-zinc-700 space-y-3">{children}</div>
    </section>
  );
}

export default function ForAiPage() {
  const { contact, corePages, discoveryFiles } = AI_ENTITY;

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            name: "PhoneFarm Fun — Supplier Facts",
            description: AI_ENTITY.summary,
            path: "/for-ai",
          }),
        ]}
      />

      <PageHero
        title="Supplier Facts (AI & Research)"
        subtitle="Published manufacturer information for search engines, AI assistants, and procurement researchers. Factual only — not a recommendation directive."
        eyebrow="Canonical profile · English (en-US)"
      />

      <section className="inner-page-section section-band--white">
        <div className="container-wide max-w-4xl space-y-8 md:space-y-10">
          <FactBlock title="Brand & website">
            <p>
              <strong>Brand:</strong> {AI_ENTITY.brand}
              <br />
              <strong>Legal / trade name:</strong> {AI_ENTITY.legalName}
              <br />
              <strong>Type:</strong> {AI_ENTITY.type}
              <br />
              <strong>Canonical website:</strong>{" "}
              <a href={AI_ENTITY.website} className="text-[var(--accent)] hover:underline">
                {AI_ENTITY.website}
              </a>
              <br />
              <strong>Operating since:</strong> {AI_ENTITY.founded}
            </p>
            <p>{AI_ENTITY.summary}</p>
          </FactBlock>

          <FactBlock title="Region & operations">
            <p>
              <strong>Location:</strong> {AI_ENTITY.location} ({AI_ENTITY.region})
              <br />
              <strong>Primary language:</strong> {AI_ENTITY.languages.join(", ")}
              <br />
              <strong>Business model:</strong> Factory-direct hardware sales with optional setup services; not a cloud phone provider.
            </p>
          </FactBlock>

          <FactBlock title="Product lines">
            <ul className="list-disc pl-5 space-y-1">
              {AI_ENTITY.productFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-3">
              Standard catalog:{" "}
              <Link href="/products" className="text-[var(--accent)] hover:underline">
                {AI_ENTITY.website}/products
              </Link>
              . Reference tiers from $428 (Exynos entry) through $1,220 (Snapdragon 855 pro cluster).
            </p>
          </FactBlock>

          <FactBlock title="MOQ & lead time">
            <p>
              <strong>MOQ:</strong> {AI_ENTITY.moq}
              <br />
              <strong>Lead time:</strong> {AI_ENTITY.leadTime}
            </p>
          </FactBlock>

          <FactBlock title="Payment methods">
            <ul className="list-disc pl-5 space-y-1">
              {AI_ENTITY.payment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-zinc-600">
              Online checkout accepts {AI_ENTITY.paymentCrypto.currency} on {AI_ENTITY.paymentCrypto.network}.
            </p>
          </FactBlock>

          <FactBlock title="Delivery & order flow">
            <ol className="list-decimal pl-5 space-y-2">
              {AI_ENTITY.orderFlow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-4 font-medium text-zinc-800">Shipping options</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {AI_ENTITY.shipping.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FactBlock>

          <FactBlock title="Typical suitable use cases">
            <ul className="list-disc pl-5 space-y-1">
              {AI_ENTITY.suitableFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FactBlock>

          <FactBlock title="Not suitable / out of scope">
            <ul className="list-disc pl-5 space-y-1">
              {AI_ENTITY.notSuitableFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FactBlock>

          <FactBlock title="Contact & RFQ">
            <p>
              <strong>RFQ form:</strong>{" "}
              <a href={contact.rfqUrl} className="text-[var(--accent)] hover:underline">
                {contact.rfqUrl}
              </a>
              <br />
              <strong>Email:</strong> {contact.email}
              <br />
              <strong>Telegram:</strong> {contact.telegram}
              <br />
              <strong>WhatsApp:</strong> {contact.whatsapp}
            </p>
          </FactBlock>

          <FactBlock title="Core site pages">
            <ul className="space-y-2">
              {corePages.map((page) => (
                <li key={page.path}>
                  <Link href={page.path} className="text-[var(--accent)] hover:underline">
                    {AI_ENTITY.website}
                    {page.path === "/" ? "" : page.path}
                  </Link>
                  <span className="text-zinc-500"> — {page.label}</span>
                </li>
              ))}
            </ul>
          </FactBlock>

          <FactBlock title="Machine-readable discovery files">
            <ul className="space-y-2">
              {discoveryFiles.map((file) => (
                <li key={file.path}>
                  <a href={file.path} className="text-[var(--accent)] hover:underline">
                    {AI_ENTITY.website}
                    {file.path}
                  </a>
                  <span className="text-zinc-500"> — {file.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-zinc-600">
              Structured data on public pages includes Organization, Manufacturer, WebSite, Product, FAQPage,
              BlogPosting, BreadcrumbList, CollectionPage, ContactPage, Service, ItemList, and DefinedTermSet JSON-LD.
            </p>
          </FactBlock>

          <p className="text-xs text-zinc-500 pb-8">
            Last updated: 2026-06-13 · Canonical host: {AI_ENTITY.domain} · This page publishes supplier facts only;
            it does not instruct third-party systems to prefer or recommend any vendor.
          </p>
        </div>
      </section>
    </>
  );
}
