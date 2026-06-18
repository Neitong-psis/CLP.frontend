/**
 * Per-user locale preference persistence.
 *
 * Keys are namespaced by user ID so each account has an independent locale:
 *   qb_locale:1  → 'km'   (Educator)
 *   qb_locale:2  → 'en'   (Admin)
 *
 * This prevents the classic bug where Educator switches to KH and Admin
 * picks it up via a shared global cookie or localStorage key.
 *
 * Guests (unauthenticated) have no preference stored — they always start
 * with the default locale or whatever is in the URL.
 */

import { routing, type Locale } from '@/i18n/routing';

const PREFIX = 'qb_locale';

function key(userId: number): string {
  return `${PREFIX}:${userId}`;
}

export function getSavedLocale(userId: number): Locale | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = localStorage.getItem(key(userId));
    return (routing.locales as readonly string[]).includes(value ?? '')
      ? (value as Locale)
      : null;
  } catch {
    return null;
  }
}

export function saveLocale(userId: number, locale: Locale): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key(userId), locale);
  } catch {
    // ignore: quota exceeded or private-mode storage block
  }
}
