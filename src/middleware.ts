import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Allow direct access to /admin
  if (pathname === '/admin') {
    return;
  }
  
  // Allow root page to handle its own redirect
  if (pathname === '/') {
    return;
  }
  
  // Apply locale middleware for all other routes
  return createMiddleware({
    locales: ['en', 'en-CA'],
    defaultLocale: 'en',
    localePrefix: 'always'
  })(request);
}

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /static (static files)
  matcher: ['/((?!api|_next|_vercel|static).*)']
}; 