import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_HOST } from "@/lib/site-url";

/** Keep one canonical host — 301 to www for apex, Vercel preview, and other aliases. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host || host === "localhost" || host === "127.0.0.1") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();
  const isCanonical = host === CANONICAL_HOST;
  const isApex = host === "phonefarm.fun";
  const isVercelPreview = host.endsWith(".vercel.app");
  const isProduction =
    process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
  const needsHostRedirect =
    !isCanonical && (isApex || (isVercelPreview && isProduction));

  if (needsHostRedirect) {
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 301);
  }

  if (proto === "http") {
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|llms.txt|llms-full.txt|images/).*)"],
};
