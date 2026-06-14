/**
 * In-memory access-token store.
 *
 * The access token lives exclusively in this module-level variable — never in
 * `localStorage`, `sessionStorage`, or a readable cookie — so it cannot be
 * exfiltrated by XSS-injected scripts via persistent storage.
 *
 * On a full page reload the store is empty; the session provider restores
 * the token via a silent refresh against the httpOnly refresh-token cookie.
 */
interface TokenState {
  accessToken: string | null;
  /** Epoch milliseconds at which the access token expires. */
  tokenExpires: number | null;
}

let state: TokenState = { accessToken: null, tokenExpires: null };

/**
 * Returns the current in-memory access token, or `null` if no session is active.
 */
export function getAccessToken(): string | null {
  return state.accessToken;
}

/**
 * Returns the expiry timestamp (epoch ms) of the current access token, or `null`.
 */
export function getTokenExpires(): number | null {
  return state.tokenExpires;
}

/**
 * Writes a new access token and its expiry into the in-memory store.
 *
 * @param accessToken  - JWT access token string.
 * @param tokenExpires - Expiry as epoch milliseconds.
 */
export function setAccessToken(
  accessToken: string,
  tokenExpires: number,
): void {
  state = { accessToken, tokenExpires };
}

/**
 * Clears the in-memory access token and expiry, wiping the client-side session state.
 */
export function clearAccessToken(): void {
  state = { accessToken: null, tokenExpires: null };
}
