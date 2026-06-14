/**
 * Hand-rolled Google OpenID Connect redirect flow (no SDK).
 *
 * `startGoogleLogin` sends the browser to Google's consent screen with a
 * one-time `state` + `nonce` stored in sessionStorage. Google redirects back
 * to `/auth/google/callback#id_token=...`, where `consumeGoogleCallback`
 * verifies both values and hands the `idToken` to the BFF for the actual
 * session exchange (the backend re-verifies the token signature + audience).
 */

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const STORAGE_KEY = 'qbt:oauth:google';

interface PendingAuth {
  state: string;
  nonce: string;
  /** Post-login redirect target captured from `?from=` on the login page. */
  from: string | null;
}

function randomToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Whether Google login is configured (client ID present at build time). */
export function isGoogleLoginEnabled(): boolean {
  return Boolean(GOOGLE_CLIENT_ID);
}

/** Redirects the browser to Google's sign-in screen. No-op if unconfigured. */
export function startGoogleLogin(from: string | null = null): void {
  if (!GOOGLE_CLIENT_ID) return;

  const pending: PendingAuth = {
    state: randomToken(),
    nonce: randomToken(),
    from,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pending));

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${window.location.origin}/auth/google/callback`,
    response_type: 'id_token',
    scope: 'openid email profile',
    state: pending.state,
    nonce: pending.nonce,
    prompt: 'select_account',
  });

  window.location.assign(`${GOOGLE_AUTH_URL}?${params.toString()}`);
}

export interface GoogleCallbackResult {
  idToken: string;
  from: string | null;
}

/**
 * Parses and validates the `#id_token=...&state=...` fragment on the callback
 * page. One-shot: the pending entry is cleared on first call so a replayed
 * URL cannot establish a second session.
 *
 * @throws Error if the state/nonce don't match or the fragment is malformed.
 */
export function consumeGoogleCallback(): GoogleCallbackResult {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  sessionStorage.removeItem(STORAGE_KEY);
  if (!raw) {
    throw new Error('No Google sign-in in progress.');
  }
  const pending = JSON.parse(raw) as PendingAuth;

  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const idToken = fragment.get('id_token');
  const state = fragment.get('state');

  if (!idToken || !state || state !== pending.state) {
    throw new Error('Google sign-in response failed validation.');
  }

  // Defence-in-depth: confirm the token was minted for our request.
  // (The backend independently verifies signature and audience.)
  if (decodeJwtPayload(idToken).nonce !== pending.nonce) {
    throw new Error('Google sign-in response failed validation.');
  }

  return { idToken, from: pending.from };
}

/** Decodes a JWT payload (base64url, not plain base64 — atob needs the swap). */
function decodeJwtPayload(jwt: string): { nonce?: string } {
  const segment = jwt.split('.')[1] ?? '';
  const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
  return JSON.parse(atob(padded)) as { nonce?: string };
}
