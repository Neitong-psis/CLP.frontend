import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

/**
 * Shown when the email-confirmed broadcast is received.
 * Each element enters with a staggered delay so the user's eye follows
 * the reveal top-to-bottom rather than everything popping in at once.
 */
export function ConfirmedView() {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Icon — outer ring pulses once, inner ring is static, check scales in */}
      <div className="relative">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/25" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 ring-4 ring-emerald-100">
          <CheckCircle2 className="animate-scale-in h-10 w-10 text-emerald-500" />
        </div>
      </div>

      <h1
        className="text-brand-navy animate-fade-in-up mt-6 text-2xl font-bold"
        style={{ animationDelay: '120ms' }}
      >
        Account activated!
      </h1>

      <p
        className="animate-fade-in-up mt-2 max-w-xs text-sm leading-relaxed text-slate-500"
        style={{ animationDelay: '220ms' }}
      >
        Your email is confirmed. You&apos;re all set to start learning.
      </p>

      <div
        className="animate-slide-up mt-8 w-full"
        style={{ animationDelay: '340ms' }}
      >
        <Link
          href="/auth"
          className="bg-brand-gold shadow-brand-gold/25 flex items-center justify-center rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
