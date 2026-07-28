/**
 * Fake bearer tokens for mock mode — just enough structure to round-trip a
 * mock user id through the same access/refresh-token shape the real backend
 * uses, without any real signing (there is no real backend to verify it).
 */
const PREFIX = 'mock';

export function createMockToken(userId: string): string {
  return `${PREFIX}.${userId}.${Date.now()}`;
}

export function parseMockToken(
  token: string | null | undefined,
): string | null {
  if (!token) {
    return null;
  }
  const [prefix, userId] = token.split('.');
  return prefix === PREFIX && userId ? userId : null;
}
