/**
 * Mock-auth switch for when the real backend is unavailable (e.g. the Railway
 * deployment expired). Set `NEXT_PUBLIC_MOCK_MODE=true` in the production env
 * only — local dev should stay unset so it keeps hitting the real backend.
 *
 * Dependency-free so it can be imported from Route Handlers, the client, and
 * middleware alike.
 */
export function isMockModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MOCK_MODE === 'true';
}
