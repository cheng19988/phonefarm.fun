import { ContactForm } from "@/components/contact-form";
import { FactoryQuoteDifferentiators } from "@/components/pricing-rfq";
import { CONTACT } from "@/lib/config";
import { IMAGES } from "@/lib/images";
import { PageHero } from "@/components/store";
import { buildMetadata } from "@/lib/seo";
import { ZH } from "@/messages/zh";

export const metadata = buildMetadata({
  title: ZH.contact.metaTitle,
  description: ZH.contact.metaDescription,
  path: "/zh/contact",
  locale: "zh",
});

type Props = { searchParams: Promise<{ product?: string; service?: string; sent?: string; error?: string }> };

export default async function ZhContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultProduct = params.product || params.service || "";
  const sent = params.sent === "1";

  return (
    <>
      <PageHero
        banner
        title={ZH.contact.h1}
        subtitle={ZH.contact.subtitle}
        eyebrow={ZH.contact.eyebrow}
        image={IMAGES.banners.contact}
        imageAlt="手机农场硬件询价"
      />
      <section className="inner-page-section section-band--white">
        <div className="container-wide">
          {params.error === "missing" && (
            <p className="mb-6 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg p-4">
              请填写所有必填项并同意隐私政策。
            </p>
          )}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-sm text-zinc-600 mb-4">{ZH.contact.formNote}</p>
              <ContactForm defaultProduct={defaultProduct} sent={sent} />
            </div>
            <div className="lg:col-span-5 space-y-6 lg:space-y-8">
              <div className="detail-section">
                <h2 className="section-title text-xl md:text-2xl mb-5">直接联系</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="eyebrow !mb-1 !text-zinc-500">邮箱</dt>
                    <dd>
                      <a href={CONTACT.emailUrl} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
                        {CONTACT.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow !mb-1 !text-zinc-500">Telegram</dt>
                    <dd>
                      <a href={CONTACT.telegramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] hover:underline">
                        {CONTACT.telegram}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow !mb-1 !text-zinc-500">WhatsApp</dt>
                    <dd>
                      <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] hover:underline">
                        {CONTACT.whatsapp}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="detail-section">
                <h2 className="section-title text-xl md:text-2xl mb-4">{ZH.contact.checklistTitle}</h2>
                <ul className="space-y-2 text-sm text-zinc-600 list-disc pl-5">
                  {ZH.contact.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <FactoryQuoteDifferentiators />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
