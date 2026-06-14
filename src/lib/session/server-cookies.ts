/**
 * Server-only cookie management for the BFF Route Handlers.
 *
 * Manages three auth cookies via the `next/headers` API:
 * - `qb_rt`   — httpOnly refresh token (never accessible to client JavaScript).
 * - `qb_sess` — httpOnly session payload containing role IDs for server-side RBAC.
 * - `qb_auth` — non-httpOnly presence flag, readable by client JS as a session hint.
 *
 * **Only import from Route Handlers or Server Actions.** This module uses
 * `next/headers`, which is unavailable in Client Components and will throw at runtime.
 */
import { cookies } from 'next/headers';
import {
  baseCookieOptions,
  COOKIE,
  parseSessionRoleIds,
  SESSION_MAX_AGE_SECONDS,
} from './cookie-names';

/**
 * Persists all three auth cookies after a successful login or initial token issuance.
 *
 * Sets:
 * - `qb_rt`   — httpOnly; the backend refresh token. Never readable by client JS.
 * - `qb_sess` — httpOnly; JSON payload `{ roleIds }` for server-side RBAC decisions.
 * - `qb_auth` — non-httpOnly; a boolean presence flag so the client can detect an
 *               active session without accessing the token itself.
 *
 * @param params.refreshToken - Opaque refresh token received from the backend.
 * @param params.roleIds       - Role ID strings to embed in the session cookie.
 */
export async function setAuthCookies(params: {
  refreshToken: string;
  roleIds: string[];
}): Promise<void> {
  const store = await cookies();
  const base = baseCookieOptions();

  store.set(COOKIE.REFRESH_TOKEN, params.refreshToken, {
    ...base,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  store.set(COOKIE.SESSION, JSON.stringify({ roleIds: params.roleIds }), {
    ...base,
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  store.set(COOKIE.AUTH_FLAG, '1', {
    ...base,
    httpOnly: false,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/**
 * Replaces the stored refresh token after a successful silent refresh.
 *
 * Only updates the `qb_rt` cookie; the session payload and auth flag are left
 * unchanged, as the user's identity and roles have not changed.
 *
 * @param refreshToken - The new opaque refresh token returned by the backend.
 */
export async function rotateRefreshToken(refreshToken: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE.REFRESH_TOKEN, refreshToken, {
    ...baseCookieOptions(),
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/**
 * Deletes all three auth cookies, effectively terminating the session.
 *
 * Called on explicit logout or when a token refresh attempt fails.
 * Safe to invoke even when some cookies are already absent.
 */
export async function clearAuthCookies(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE.REFRESH_TOKEN);
  store.delete(COOKIE.SESSION);
  store.delete(COOKIE.AUTH_FLAG);
}

/**
 * Reads the httpOnly refresh token from the incoming request cookies.
 *
 * Used exclusively by the BFF refresh Route Handler to forward the token to
 * the backend without it ever being accessible to client JavaScript.
 *
 * @returns The raw refresh token string, or `null` if no session cookie is present.
 */
export async function readRefreshToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE.REFRESH_TOKEN)?.value ?? null;
}

/**
 * Reads the role IDs from the httpOnly session cookie.
 *
 * Used by Route Handlers and middleware to make RBAC decisions server-side,
 * without needing a round-trip to the backend.
 *
 * @returns Array of role ID strings, or an empty array if the cookie is absent or malformed.
 */
export async function readSessionRoleIds(): Promise<string[]> {
  const store = await cookies();
  return parseSessionRoleIds(store.get(COOKIE.SESSION)?.value);
}
