/**
 * Server-only cookie management for BFF Route Handlers.
 *
 * Three auth cookies:
 * - `qb_rt`   — httpOnly refresh token (never accessible to client JS).
 * - `qb_sess` — httpOnly session payload `{ roleIds }` for server-side RBAC.
 * - `qb_auth` — non-httpOnly presence flag readable by client JS.
 *
 * IMPORTANT: In Next.js App Router, setting cookies via `cookies()` from
 * `next/headers` is only reliable inside Server Actions. Inside Route Handlers
 * the write operations are silently dropped for httpOnly cookies. Always use
 * the `applyAuthCookies`, `applyRefreshTokenRotation`, and `clearAuthCookies`
 * helpers which mutate the `NextResponse` directly instead.
 */
import type { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  baseCookieOptions,
  COOKIE,
  parseSessionRoleIds,
  SESSION_MAX_AGE_SECONDS,
} from './cookie-names';

// ── Write helpers (mutate NextResponse) ──────────────────────────────────────

/**
 * Attaches all three auth cookies to `res` after a successful login.
 * Call this instead of `setAuthCookies` inside Route Handlers.
 */
export function applyAuthCookies(
  res: NextResponse,
  params: { refreshToken: string; roleIds: string[] },
): void {
  const base = baseCookieOptions();
  res.cookies.set(COOKIE.REFRESH_TOKEN, params.refreshToken, {
    ...base,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  res.cookies.set(COOKIE.SESSION, JSON.stringify({ roleIds: params.roleIds }), {
    ...base,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  res.cookies.set(COOKIE.AUTH_FLAG, '1', {
    ...base,
    httpOnly: false,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/**
 * Rotates the refresh-token cookie on `res` after a successful silent refresh.
 * Leaves `qb_sess` and `qb_auth` unchanged.
 */
export function applyRefreshTokenRotation(
  res: NextResponse,
  refreshToken: string,
): void {
  res.cookies.set(COOKIE.REFRESH_TOKEN, refreshToken, {
    ...baseCookieOptions(),
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/**
 * Clears all three auth cookies on `res`, terminating the session.
 * Safe to call even when some cookies are already absent.
 */
export function clearAuthCookies(res: NextResponse): void {
  res.cookies.delete(COOKIE.REFRESH_TOKEN);
  res.cookies.delete(COOKIE.SESSION);
  res.cookies.delete(COOKIE.AUTH_FLAG);
}

// ── Read helpers (use next/headers — safe for reading in Route Handlers) ─────

/**
 * Reads the httpOnly refresh token from the incoming request cookies.
 */
export async function readRefreshToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE.REFRESH_TOKEN)?.value ?? null;
}

/**
 * Reads the role IDs from the httpOnly session cookie.
 */
export async function readSessionRoleIds(): Promise<string[]> {
  const store = await cookies();
  return parseSessionRoleIds(store.get(COOKIE.SESSION)?.value);
}
