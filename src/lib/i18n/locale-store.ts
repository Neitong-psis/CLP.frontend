/**
 * Module-level locale singleton.
 *
 * Axios interceptors run outside React's component tree and cannot read
 * context. This module bridges the gap: LocaleProvider calls setLocale()
 * whenever the active locale changes, and the http client reads getLocale()
 * to inject the x-custom-lang header on every backend request.
 *
 * Safe for client-side use only — the http client is browser-only (it calls
 * window.location.assign on 401), so module-level state has no SSR race risk.
 */

let _locale = 'en';

export function getLocale(): string {
  return _locale;
}

export function setLocale(locale: string): void {
  _locale = locale;
}
