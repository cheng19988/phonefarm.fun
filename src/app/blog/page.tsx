import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Phone Farm Guides & Blog",
  description:
    "Practical guides on phone farm boxes, hardware selection, setup tutorials, real device vs cloud, and enterprise deployment.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="section">
      <div className="container-wide">
        <h1 className="section-title">Guides &amp; Resources</h1>
        <p className="section-subtitle">Practical guides for phone farm hardware, automation workflows, and deployment best practices.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 hover:border-cyan-800 transition-colors group">
              <span className="text-xs text-cyan-400">{post.category}</span>
              <span className="text-xs text-slate-500 ml-2">{post.date}</span>
              <h2 className="font-bold text-white mt-2 group-hover:text-cyan-400 transition-colors">{post.title}</h2>
              <p className="text-sm text-slate-400 mt-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
