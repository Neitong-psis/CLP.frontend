import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

type LocaleFile = 'common' | 'auth' | 'admin' | 'educator' | 'learner';

const LOCALE_FILES: LocaleFile[] = [
  'common',
  'auth',
  'admin',
  'educator',
  'learner',
];

async function loadMessages(locale: string): Promise<Record<string, unknown>> {
  const chunks = await Promise.all(
    LOCALE_FILES.map((file) =>
      import(`./locales/${locale}/${file}.json`).then(
        (m) => m.default as Record<string, unknown>,
      ),
    ),
  );
  return Object.assign({}, ...chunks);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
