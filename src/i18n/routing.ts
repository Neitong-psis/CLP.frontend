import { defineRouting } from 'next-intl/routing';

/**
 * Central i18n routing config — the single source of truth for which locales
 * exist and how they appear in the URL.
 *
 * `localePrefix: 'never'` keeps locale out of the URL entirely — the active
 * locale is stored in the `NEXT_LOCALE` cookie and resolved by the proxy on
 * every request. URLs always look like `/educator/courses` regardless of
 * whether the user is viewing in English or Khmer.
 */
export const routing = defineRouting({
  locales: ['en', 'km'],
  defaultLocale: 'en',
  localePrefix: 'never',
});

export type Locale = (typeof routing.locales)[number];
