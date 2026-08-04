/**
 * Validates a `?from=` redirect target from the auth flow. Only same-origin
 * relative paths are allowed — rejects absolute URLs and protocol-relative
 * paths (`//evil.com`) that would otherwise let an attacker bounce a login
 * through this app to an external site.
 */
export function safeRedirect(from: string | null): string | null {
  if (!from) return null;
  if (!from.startsWith('/') || from.startsWith('//')) return null;
  return from;
}
