import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;

  const fromURL = request.headers.get("referer");
  const toURL = nextUrl.pathname;

  if (!fromURL?.includes(toURL) && nextUrl.searchParams.has("page")) {
    nextUrl.searchParams.delete("page");
    return NextResponse.redirect(nextUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/catalogue",
};
