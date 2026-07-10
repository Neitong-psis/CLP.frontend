const STORAGE_KEY = 'DEMO_MODE';
const COOKIE_NAME = 'qb_demo';

/** Returns true when demo mode is active. Safe to call on the server (returns false). */
export function isDemoModeActive(): boolean {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') return true;
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

/** Sets the demo cookie so the Edge middleware recognises demo mode. */
export function setDemoCookie(): void {
  document.cookie = `${COOKIE_NAME}=1; path=/; sameSite=lax`;
}

/** Clears the demo cookie. */
export function clearDemoCookie(): void {
  document.cookie = `${COOKIE_NAME}=; path=/; sameSite=lax; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
