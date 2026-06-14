/**
 * Client-side session facade.
 *
 * Wraps the in-memory access-token store with a higher-level interface and exposes
 * a lightweight auth-presence heuristic so the session provider can skip silent
 * refresh calls for unauthenticated users.
 *
 * Security model:
 * - Access token lives in memory only — never in `localStorage` — limiting XSS exposure.
 * - Refresh token lives in an httpOnly cookie managed server-side (see {@link server-cookies}).
 * - `hasAuthHint()` reads only a non-sensitive presence flag, never the token itself.
 */
import {
  clearAccessToken,
  getAccessToken,
  getTokenExpires,
  setAccessToken,
} from './access-token-store';
import { COOKIE } from './cookie-names';

export interface ClientSession {
  accessToken: string;
  tokenExpires: number;
}

/**
 * Returns the current client-side session from the in-memory store.
 *
 * @returns The active {@link ClientSession}, or `null` if no access token is held in memory.
 */
export function getSession(): ClientSession | null {
  const accessToken = getAccessToken();
  const tokenExpires = getTokenExpires();
  if (!accessToken || tokenExpires === null) {
    return null;
  }
  return { accessToken, tokenExpires };
}

/**
 * Writes a new session into the in-memory access-token store.
 *
 * @param session - The access token and its expiry timestamp (epoch ms).
 */
export function setSession(session: ClientSession): void {
  setAccessToken(session.accessToken, session.tokenExpires);
}

/**
 * Removes the access token from the in-memory store, signing the client out locally.
 *
 * Does not touch cookies. For a full logout, also call {@link clearAuthCookies}
 * server-side (which the BFF logout handler handles).
 */
export function clearSession(): void {
  clearAccessToken();
}

/**
 * Checks whether the non-httpOnly auth-presence cookie (`qb_auth`) is set.
 *
 * Used as a cheap client-side signal to determine whether a silent refresh attempt
 * is worth making on page load. A missing flag means the user has no session (or
 * never logged in), so the refresh call is skipped entirely.
 *
 * This cookie carries no sensitive data — it is a boolean presence indicator only.
 *
 * @returns `true` when the auth flag cookie is present; `false` in SSR or when absent.
 */
export function hasAuthHint(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  return document.cookie
    .split('; ')
    .some((entry) => entry.startsWith(`${COOKIE.AUTH_FLAG}=`));
}
