import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/data/blog";
import { ContactCTA } from "@/components/shared";
import { buildMetadata, breadcrumbJsonLd, articleJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared";
import { Breadcrumbs } from "@/components/store";
import { renderSimpleMarkdown } from "@/lib/markdown";

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

function readingTime(content: string) {
  const words = content.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={[
        articleJsonLd({ title: post.title, description: post.excerpt, slug, date: post.date }),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ]),
      ]} />
      <article className="section pt-10 md:pt-14">
        <div className="container-wide max-w-4xl">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]} />
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-4">
            <span className="text-orange-600 font-medium">{post.category}</span>
            <span>·</span>
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span>{readingTime(post.content)} min read</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-tight mb-5 tracking-tight">{post.title}</h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 md:mb-12 leading-relaxed border-b border-slate-200 pb-8 md:pb-10">{post.excerpt}</p>
          <div className="article-body prose-content text-base md:text-lg">{renderSimpleMarkdown(post.content)}</div>
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link href="/blog" className="text-orange-600 text-sm hover:text-orange-500">← All guides</Link>
          </div>
          <div className="mt-12">
            <ContactCTA />
          </div>
        </div>
      </article>
    </>
  );
}
