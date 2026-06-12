import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Keep one canonical host — avoids cookie/session split between apex and www. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (host === "phonefarm.fun") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.phonefarm.fun";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|llms.txt|llms-full.txt|images/).*)"],
};
