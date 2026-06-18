import type { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Logo from '@/components/common/Logo';
import { BackButton } from '@/components/helper/BackButton';

export const metadata: Metadata = {
  title: '404 – Page Not Found',
  description: 'The page you are looking for does not exist.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ),
};

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <header className="border-border/50 flex h-16 shrink-0 items-center border-b px-6">
        <Link
          href="/"
          aria-label="QBTECH home"
          className="focus-visible:ring-brand-gold rounded-lg transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <Logo size="md" variant="alt" />
        </Link>
      </header>

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        {/* Subtle background number */}
        <span
          aria-hidden
          className="font-heading text-brand-navy/5 pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-[10rem] leading-none font-black tracking-tighter select-none sm:text-[16rem]"
        >
          404
        </span>

        <div className="relative z-10 flex flex-col items-center gap-5">
          <h1 className="font-heading text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
            {t('title')}
          </h1>

          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <BackButton />
            <Link
              href="/"
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 focus-visible:ring-brand-gold inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <Home aria-hidden className="h-4 w-4" />
              {t('home')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
