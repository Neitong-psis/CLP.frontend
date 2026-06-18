import type commonEn from '../i18n/locales/en/common.json';
import type authEn from '../i18n/locales/en/auth.json';
import type adminEn from '../i18n/locales/en/admin.json';
import type educatorEn from '../i18n/locales/en/educator.json';

// Merge all locale files into a single Messages type.
// English is the source of truth — TypeScript will surface missing keys
// in other locales at build time.
type Messages = typeof commonEn &
  typeof authEn &
  typeof adminEn &
  typeof educatorEn;

declare global {
  // Augments next-intl's own type — enables full autocomplete and key
  // validation in useTranslations() and getTranslations() calls.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
