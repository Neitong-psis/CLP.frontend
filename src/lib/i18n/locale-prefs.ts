import { routing, type Locale } from '@/i18n/routing';

const PREFIX = 'qb_locale';

const supportedLocales = new Set(routing.locales);

const getStorageKey = (userId: number) => `${PREFIX}:${userId}`;

function isLocale(value: string): value is Locale {
  return supportedLocales.has(value as Locale);
}

export function getSavedLocale(userId: number): Locale | null {
  if (typeof window === 'undefined') return null;

  try {
    const value = localStorage.getItem(getStorageKey(userId));

    return value && isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveLocale(userId: number, locale: Locale): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(getStorageKey(userId), locale);
  } catch {
    // Storage unavailable.
  }
}
