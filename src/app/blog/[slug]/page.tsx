import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/data/blog";
import { ContactCTA } from "@/components/shared";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: `/blog/${slug}` });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${slug}` },
      ])} />
      <article className="section">
        <div className="container-wide max-w-3xl">
          <Link href="/blog" className="text-cyan-400 text-sm">← Back to Guides</Link>
          <span className="block text-xs text-slate-500 mt-4">{post.category} · {post.date}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-8">{post.title}</h1>
          <div className="prose-content whitespace-pre-line">{post.content}</div>
          <div className="mt-12">
            <ContactCTA />
          </div>
        </div>
      </article>
    </>
  );
}
