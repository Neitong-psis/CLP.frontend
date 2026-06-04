import type { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { BackButton } from '@/components/pages/not-found/BackButton';
import { Spacer } from '@/components/ui/Spacer';

export const metadata: Metadata = {
  title: '404 – Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 text-center">
      {/* Background 404 watermark — centered on the page */}
      <span
        aria-hidden
        className="font-heading text-brand-navy/5 pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-[10rem] leading-none font-black tracking-tighter select-none sm:text-[16rem]"
      >
        404
      </span>

      {/* Logo pinned to top — absolute so it doesn't shift the centered content */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2">
        <Link
          href="/"
          aria-label="AYLA home"
          className="focus-visible:ring-brand-gold rounded-lg transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
        >
          <Logo size="md" variant="alt" />
        </Link>
      </div>

      <Spacer height={180} />

      {/* Main content — sits at the true vertical center, over the 404 */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <h1 className="font-heading text-brand-navy text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>

        <Spacer height={24} />

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <BackButton />
          <Link
            href="/"
            className="bg-brand-gold text-brand-navy hover:bg-brand-orange focus-visible:ring-brand-gold inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <Home aria-hidden className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
