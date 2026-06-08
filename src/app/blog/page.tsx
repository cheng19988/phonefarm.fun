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
  "enterprise-phone-farm-deployment": IMAGES.power.hero,
};

function readingTime(content: string) {
  const words = content.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Phone Farm Hardware Guides"
        subtitle="Choosing phone farm boxes, motherboard clusters, power and cooling, rack deployment, and remote operation workflows."
        compact
      />
      <section className="section pt-10 md:pt-12">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card overflow-hidden hover:border-orange-200 transition-colors group flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-slate-50 overflow-hidden">
                  <Image
                    src={BLOG_IMAGES[post.slug] ?? IMAGES.phoneFarmBox.card}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="text-orange-600 font-medium">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{readingTime(post.content)} min read</span>
                  </div>
                  <h2 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-600 line-clamp-2 flex-1">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
