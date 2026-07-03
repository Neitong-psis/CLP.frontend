'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { inter, jakarta } from '@/config/font';
import { RetryButton } from '@/components/helper/RetryButton';
import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="font-sans">
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 text-center">
          <span
            aria-hidden
            className="font-heading text-brand-navy/5 pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-[10rem] leading-none font-black tracking-tighter select-none sm:text-[16rem]"
          >
            500
          </span>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <h1 className="font-heading text-brand-navy text-3xl font-bold tracking-tight sm:text-4xl">
              Something went wrong
            </h1>

            <p className="text-brand-navy/60 max-w-sm text-sm">
              A critical error occurred. Please try again or return home.
            </p>

            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <RetryButton onRetry={unstable_retry} />
              <Link
                href="/"
                className="border-brand-navy/20 text-brand-navy hover:border-brand-navy focus-visible:ring-brand-gold inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2"
              >
                <Home aria-hidden className="h-4 w-4" />
                Go home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
