/**
 * Auth cookie names, constants, and shared options.
 *
 * Intentionally dependency-free so this module can be imported from every
 * Next.js runtime: Route Handlers (Node.js), middleware (Edge), and Client Components.
 *
 * Cookie roles:
 * - `qb_rt`   — httpOnly refresh token (server-only; never read by client JS).
 * - `qb_sess` — httpOnly session payload with role IDs (server-only RBAC).
 * - `qb_auth` — non-httpOnly presence flag (client-readable, non-sensitive).
 */
export const COOKIE = {
  /** httpOnly — the backend refresh token. Never readable by client JS. */
  REFRESH_TOKEN: 'qb_rt',
  /** httpOnly — JSON `{ roleIds }` used by middleware for role routing. */
  SESSION: 'qb_sess',
  /** Non-httpOnly — a presence flag so the client knows to attempt a refresh. */
  AUTH_FLAG: 'qb_auth',
} as const;

/** Refresh-token lifetime in seconds (30 days) — cookie maxAge. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

/** Payload stored (as JSON) in the {@link COOKIE.SESSION} cookie. */
export interface SessionCookiePayload {
  roleIds: string[];
}

export interface BaseCookieOptions {
  path: string;
  sameSite: 'lax';
  secure: boolean;
}

/**
 * Returns shared cookie attributes applied to all auth cookies.
 *
 * `secure` is enabled in production only so cookies work over plain
 * `http://localhost` during local development without any manual override.
 *
 * @returns Base cookie options (`path`, `sameSite`, `secure`).
 */
export function baseCookieOptions(): BaseCookieOptions {
  return {
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  };
}

/**
 * Safely parses the session cookie value into an array of role IDs.
 *
 * Returns an empty array on any parse failure (missing cookie, malformed JSON,
 * or unexpected payload shape) so callers always receive a usable value.
 *
 * @param rawValue - The raw cookie string from `cookies().get(COOKIE.SESSION)?.value`.
 * @returns Array of role ID strings, or `[]` if the cookie is absent or invalid.
 */
export function parseSessionRoleIds(rawValue: string | undefined): string[] {
  if (!rawValue) {
    return [];
  }
  try {
    const parsed = JSON.parse(rawValue) as Partial<SessionCookiePayload>;
    return Array.isArray(parsed.roleIds)
      ? parsed.roleIds.filter((id): id is string => typeof id === 'string')
      : [];
  } catch {
    return [];
  }
}
