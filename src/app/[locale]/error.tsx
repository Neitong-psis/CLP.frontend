'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, ServerCrash } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { RetryButton } from '@/components/helper/RetryButton';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-rose-500/8">
          <ServerCrash aria-hidden className="h-10 w-10 text-rose-500" />
        </div>

        <span className="mb-4 inline-flex items-center rounded-full border border-rose-500/20 bg-rose-500/8 px-3 py-1 text-xs font-semibold tracking-wide text-rose-500">
          Error 500
        </span>

        <h1 className="font-heading text-foreground mb-3 text-2xl font-bold tracking-tight sm:text-3xl">
          Something went wrong
        </h1>

        <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
          An unexpected error occurred on our end. Please try again, or return
          home if the problem persists.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <RetryButton onRetry={reset} />
          <Link
            href="/"
            className="border-border text-foreground hover:bg-muted focus-visible:ring-brand-gold inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <Home aria-hidden className="h-4 w-4" />
            Go home
          </Link>
        </div>

        {error.digest && (
          <p className="text-muted-foreground/50 mt-10 font-mono text-[11px]">
            ID: {error.digest}
          </p>
        )}
      </main>
    </div>
  );
}
