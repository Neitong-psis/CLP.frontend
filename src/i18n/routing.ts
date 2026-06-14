import { defineRouting } from 'next-intl/routing';

/**
 * Central i18n routing config — the single source of truth for which locales
 * exist and how they appear in the URL.
 *
 * `localePrefix: 'as-needed'` keeps the default locale (`en`) un-prefixed, so
 * existing URLs like `/courses` and `/admin` keep working unchanged. Only
 * non-default locales are prefixed, e.g. `/km/courses`.
 */
export const routing = defineRouting({
  locales: ['en', 'km'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
