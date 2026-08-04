import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { COOKIE, parseSessionRoleIds } from '@/lib/session/cookie-names';
import { matchProtectedRoute } from '@/lib/rbac/protected-routes';

const intlMiddleware = createMiddleware(routing);

const ADMIN_LOGIN = '/admin/login';

/**
 * Splits an optional leading locale segment off the pathname so RBAC matching
 * (which is defined on un-prefixed paths) still works for localized URLs.
 *
 * `/km/admin/users` → `{ prefix: '/km', rest: '/admin/users' }`
 * `/admin/users`    → `{ prefix: '',    rest: '/admin/users' }`
 */
function splitLocale(pathname: string): { prefix: string; rest: string } {
  const segment = pathname.split('/')[1] ?? '';
  if (hasLocale(routing.locales, segment)) {
    return {
      prefix: `/${segment}`,
      rest: pathname.slice(segment.length + 1) || '/',
    };
  }
  return { prefix: '', rest: pathname };
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const { prefix, rest } = splitLocale(pathname);

  // Skip RBAC entirely when demo mode is active (env var or runtime cookie).
  const isDemoMode =
    process.env.NEXT_PUBLIC_DEMO_MODE === 'true' ||
    request.cookies.get('qb_demo')?.value === '1';

  // Admin login is public; every other protected route flows through RBAC.
  if (!isDemoMode && rest !== ADMIN_LOGIN) {
    const route = matchProtectedRoute(rest);
    if (route) {
      const hasRefreshToken = Boolean(
        request.cookies.get(COOKIE.REFRESH_TOKEN)?.value,
      );
      const roleIds = parseSessionRoleIds(
        request.cookies.get(COOKIE.SESSION)?.value,
      );
      const isAuthenticated = hasRefreshToken && roleIds.length > 0;

      if (!isAuthenticated) {
        const loginPath = rest.startsWith('/admin') ? ADMIN_LOGIN : '/auth';
        const loginUrl = new URL(`${prefix}${loginPath}`, request.url);
        loginUrl.searchParams.set(
          'from',
          `${pathname}${request.nextUrl.search}`,
        );
        return NextResponse.redirect(loginUrl);
      }

      if (!roleIds.includes(route.role)) {
        return NextResponse.redirect(
          new URL(`${prefix}/unauthorized`, request.url),
        );
      }
    }
  }

  // Locale negotiation, NEXT_LOCALE cookie, and prefix rewriting/redirects.
  return intlMiddleware(request);
}

export const config = {
  // Run on every page (i18n needs it) except API, Next internals, and files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
