import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import '../globals.css';
import { rootMetadata } from '@/config/metadata';
import { AppProviders } from '@/providers/app-providers';
import { routing } from '@/i18n/routing';

export const metadata: Metadata = rootMetadata;

export default async function RootLayout({
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
    <html lang={locale} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <AppProviders>
            <main className="flex-1">{children}</main>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
