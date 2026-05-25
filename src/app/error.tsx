'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { RetryButton } from '@/components/pages/error/RetryButton';
import { Spacer } from '@/components/ui/Spacer';

interface ErrorPageProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function ErrorPage({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 text-center">
      <span
        aria-hidden
        className="font-heading pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-[10rem] leading-none font-black tracking-tighter text-[#00003e]/[0.05] select-none sm:text-[16rem]"
      >
        500
      </span>

      <div className="absolute top-20 left-1/2 -translate-x-1/2">
        <Link
          href="/"
          aria-label="AYLA home"
          className="rounded-lg transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300] focus-visible:ring-offset-4"
        >
          <Logo size="md" variant="alt" />
        </Link>
      </div>

      <Spacer height={180} />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[#00003e] sm:text-4xl">
          Something went wrong
        </h1>

        <p className="max-w-sm text-sm text-[#00003e]/60">
          An unexpected error occurred. Please try again, or return home if the
          problem persists.
        </p>

        <Spacer height={8} />

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <RetryButton onRetry={unstable_retry} />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#00003e]/20 px-6 py-2.5 text-sm font-semibold text-[#00003e] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00003e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4a300]"
          >
            <Home aria-hidden className="h-4 w-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
