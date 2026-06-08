import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section bg-slate-50 min-h-[50vh] flex items-center">
      <div className="container-wide max-w-lg text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Page not found</h1>
        <p className="text-slate-600 mb-8">The page you requested does not exist or has moved.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Home</Link>
          <Link href="/products" className="btn-secondary">Shop Hardware</Link>
          <Link href="/contact" className="btn-outline">Contact</Link>
        </div>
      </div>
    </div>
  );
}
