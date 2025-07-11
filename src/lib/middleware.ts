// middleware.ts (or /src/middleware.ts)
import { NextRequest } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import { locales, defaultLocale } from './i18n'; // the union‑typed list we made earlier

// Library expects a config object: { locales, defaultLocale, ...optionalFlags }
const i18nConfig = { locales, defaultLocale };

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

// Only run on “real” pages (skip /api, _next, static files)
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
