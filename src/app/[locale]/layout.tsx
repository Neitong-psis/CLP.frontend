import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { LocaleProvider } from '@/providers/locale-provider';

/**
 * Locale-scoped layout. Wraps children with the next-intl providers that
 * depend on the [locale] dynamic segment. Auth and theme are intentionally
 * excluded — they live in the root layout above this segment so they survive
 * locale switches without remounting.
 */
export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </NextIntlClientProvider>
  );
}
