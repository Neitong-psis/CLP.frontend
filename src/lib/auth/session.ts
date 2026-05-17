import { MOCK_SESSION_STORAGE_KEY } from "@/constants/auth";
import type { MockSession } from "@/types/auth";

let _rawCache: string | null | undefined = undefined;
let _sessionCache: MockSession | null = null;

export function readMockSession(): MockSession | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(MOCK_SESSION_STORAGE_KEY);
    if (raw === _rawCache) return _sessionCache;
    _rawCache = raw;
    if (!raw) return (_sessionCache = null);
    const parsed = JSON.parse(raw) as MockSession;
    _sessionCache = !parsed?.email || !parsed?.name ? null : parsed;
    return _sessionCache;
  } catch {
    _sessionCache = null;
    return null;
  }
}

export function writeMockSession(session: MockSession): void {
  window.localStorage.setItem(MOCK_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearMockSession(): void {
  window.localStorage.removeItem(MOCK_SESSION_STORAGE_KEY);
}
