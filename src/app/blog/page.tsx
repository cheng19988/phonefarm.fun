import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/store";
import { IMAGES } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Phone Farm Hardware Guides",
  description:
    "Practical guides on phone farm boxes, motherboard arrays, power and cooling, custom rack deployment, and remote control setup.",
  path: "/blog",
});

const BLOG_IMAGES: Record<string, string> = {
  "how-to-choose-phone-farm-box": IMAGES.phoneFarmBox.hero,
  "real-device-vs-cloud-phone": IMAGES.androidFarm.hero,
  "phone-farm-setup-guide-2026": IMAGES.workshop,
  "motherboard-box-vs-phone-box": IMAGES.motherboardBox.hero,
  "bulk-apk-installation-guide": IMAGES.remoteControl.hero,
  "enterprise-phone-farm-deployment": IMAGES.customCabinet.hero,
};

function readingTime(content: string) {
  const words = content.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        banner
        title="Phone Farm Hardware Guides"
        subtitle="Choosing phone farm boxes, motherboard clusters, power and cooling, rack deployment, and remote operation workflows."
        eyebrow="Procurement & deployment guides"
        image={IMAGES.motherboardBox.hero}
        imageAlt="Phone farm hardware guides"
      />
      <section className="inner-page-section">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card product-card-heavy overflow-hidden hover:border-orange-200 transition-all group flex flex-col md:min-h-[280px]"
              >
                <div className="relative aspect-[16/10] md:aspect-[2/1] bg-slate-50 overflow-hidden">
                  <Image
                    src={BLOG_IMAGES[post.slug] ?? IMAGES.phoneFarmBox.card}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width:768px) 100vw, 40vw"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-500 mb-3">
                    <span className="text-orange-600 font-semibold">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{readingTime(post.content)} min read</span>
                  </div>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug mb-3">
                    {post.title}
                  </h2>
                  <p className="text-sm md:text-base text-slate-600 line-clamp-3 flex-1 leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
