/**
 * Mock-data switch, forced on everywhere (local dev and production) so the
 * app always runs against mock data instead of the real backend.
 *
 * Dependency-free so it can be imported from Route Handlers, the client, and
 * middleware alike.
 */
export function isMockModeEnabled(): boolean {
  return true;
}
