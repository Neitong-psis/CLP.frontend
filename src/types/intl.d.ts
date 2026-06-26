import type commonEn from '../i18n/locales/en/common.json';
import type authEn from '../i18n/locales/en/auth.json';
import type adminEn from '../i18n/locales/en/admin.json';
import type educatorEn from '../i18n/locales/en/educator.json';

type Messages = typeof commonEn &
  typeof authEn &
  typeof adminEn &
  typeof educatorEn;

declare global {
  type IntlMessages = Messages;
}
