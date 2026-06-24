export const SUPPORTED_LOCALES = ['en', 'km'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

let currentLocale: Locale = 'en';

export const getLocale = (): Locale => currentLocale;

export const setLocale = (locale: Locale): void => {
  currentLocale = locale;
};
