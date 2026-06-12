import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CANONICAL_HOST } from "@/lib/site-url";

const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

/** Keep one canonical host — 301 to www for apex, Vercel preview, and other aliases. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host || host === "localhost" || host === "127.0.0.1") {
    return NextResponse.next();
  }

  const isCanonical = host === CANONICAL_HOST;
  const isApex = host === "phonefarm.fun";
  const isVercelPreview = host.endsWith(".vercel.app");

  if (!isCanonical && (isApex || isVercelPreview)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|llms.txt|llms-full.txt|images/).*)"],
};
