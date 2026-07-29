import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

/**
 * Every page lives under a locale. A visitor landing on `/` is sent to the
 * language their browser asks for — Bosnian, Croatian and Serbian all map to
 * `bs`, since the site treats them as one language.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${negotiate(request.headers.get("accept-language"))}${pathname}`;
  return NextResponse.redirect(url);
}

function negotiate(header: string | null) {
  if (!header) return defaultLocale;

  // "bs-BA,bs;q=0.9,hr;q=0.8" → the first tag we recognise wins.
  const tags = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .filter(Boolean);

  for (const tag of tags) {
    const base = tag.split("-")[0];
    if (base === "bs" || base === "hr" || base === "sr") return "bs";
    if (base === "en") return "en";
  }
  return defaultLocale;
}

export const config = {
  // Skip API routes, Next internals and anything with a file extension.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
