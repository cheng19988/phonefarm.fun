import Link from "next/link";

/** Lightweight markdown for blog posts — bold, lists, code blocks, links. */
export function renderSimpleMarkdown(content: string) {
  const blocks = content.trim().split(/\n\n+/);
  return blocks.map((block, bi) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("```")) {
      const code = trimmed.replace(/^```\n?/, "").replace(/\n?```$/, "");
      return (
        <pre key={bi} className="bg-slate-100 border border-slate-200 rounded-lg p-4 text-sm overflow-x-auto mb-4">
          <code className="text-slate-800 font-mono whitespace-pre-wrap break-words">{code}</code>
        </pre>
      );
    }

    if (/^\*\*[^*]+\*\*$/.test(trimmed)) {
      const heading = trimmed.replace(/^\*\*|\*\*$/g, "");
      return (
        <h2 key={bi} className="text-xl font-bold text-slate-900 mt-8 mb-3 first:mt-0">
          {heading}
        </h2>
      );
    }

    if (/^-\s/.test(trimmed)) {
      const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={bi} className="list-disc list-inside text-slate-600 space-y-2 mb-4 ml-1">
          {items.map((item, i) => (
            <li key={i}>{formatInline(item.replace(/^-\s*/, ""))}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={bi} className="text-slate-600 leading-relaxed mb-4">
        {formatInline(trimmed)}
      </p>
    );
  });
}

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">{part.slice(1, -1)}</code>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const href = linkMatch[2];
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-500 underline">
            {linkMatch[1]}
          </a>
        );
      }
      return <Link key={i} href={href} className="text-orange-600 hover:text-orange-500 underline">{linkMatch[1]}</Link>;
    }
    return part;
  });
}
