/**
 * Single-flight access-token refresh.
 *
 * Guarantees the BFF `/api/auth/refresh` endpoint is called at most once per
 * refresh cycle, regardless of how many concurrent callers trigger it.
 * All callers share the same in-flight `Promise` via a module-level latch.
 *
 * On success, the new access token is persisted via {@link setSession}.
 * On failure, the session is cleared via {@link clearSession}.
 */
import { BFF_ENDPOINTS } from '@/lib/api/config';
import { refreshResultSchema } from '@/schemas/auth.schema';
import { clearSession, setSession, type ClientSession } from './session';

let inFlight: Promise<ClientSession | null> | null = null;

/**
 * Requests a new access token from the BFF refresh endpoint.
 *
 * If a refresh is already in progress, returns the existing `Promise` so the
 * endpoint is never called more than once concurrently (single-flight guarantee).
 *
 * @returns The new {@link ClientSession} on success, or `null` if the refresh
 *          failed (expired refresh token, network error, or invalid response).
 */
export function refreshSession(): Promise<ClientSession | null> {
  if (!inFlight) {
    inFlight = performRefresh().finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}

async function performRefresh(): Promise<ClientSession | null> {
  try {
    const response = await fetch(BFF_ENDPOINTS.refresh, { method: 'POST' });
    if (!response.ok) {
      clearSession();
      return null;
    }
    const data = refreshResultSchema.parse(await response.json());
    const session: ClientSession = {
      accessToken: data.accessToken,
      tokenExpires: data.tokenExpires,
    };
    setSession(session);
    return session;
  } catch {
    clearSession();
    return null;
  }
}
