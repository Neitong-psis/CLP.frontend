'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { confirmEmail } from '@/services/auth/auth.api';
import { isApiError } from '@/lib/api/errors';
import { EMAIL_CONFIRMED_CHANNEL } from '@/lib/auth/constants';

type Status = 'pending' | 'success' | 'error';

function ConfirmEmailCard() {
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');
  const [status, setStatus] = useState<Status>(hash ? 'pending' : 'error');
  const [errorMessage, setErrorMessage] = useState<string | null>(
    hash ? null : 'This confirmation link is missing its code.',
  );
  // React 19 StrictMode double-invokes effects in dev; the hash is single-use,
  // so guard against firing the confirmation request twice.
  const requested = useRef(false);

  useEffect(() => {
    if (!hash || requested.current) return;
    requested.current = true;

    confirmEmail(hash)
      .then(() => {
        setStatus('success');
        // Signal any open verify-email tab in the same browser.
        if ('BroadcastChannel' in window) {
          const ch = new BroadcastChannel(EMAIL_CONFIRMED_CHANNEL);
          ch.postMessage({ type: 'email-confirmed' });
          ch.close();
        }
      })
      .catch((err: unknown) => {
        setStatus('error');
        setErrorMessage(
          isApiError(err) && err.status === 404
            ? 'This link has already been used or the account no longer exists.'
            : 'This confirmation link is invalid or has expired.',
        );
      });
  }, [hash]);

  return (
    <div className="animate-fade-in w-full max-w-md rounded-2xl bg-white px-7 py-9 text-center shadow-2xl shadow-black/40">
      {status === 'pending' && (
        <>
          <Loader2 className="text-brand-gold mx-auto h-12 w-12 animate-spin" />
          <h1 className="text-brand-navy mt-5 text-xl font-bold">
            Confirming your email…
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Hang tight, this only takes a second.
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle2 className="animate-scale-in mx-auto h-12 w-12 text-emerald-500" />
          <h1 className="text-brand-navy mt-5 text-xl font-bold">
            Email confirmed!
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Your account is now active. You can log in and start learning.
          </p>
          <Link
            href="/auth"
            className="bg-brand-gold mt-6 inline-block w-full rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Go to Login
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle className="animate-scale-in mx-auto h-12 w-12 text-rose-500" />
          <h1 className="text-brand-navy mt-5 text-xl font-bold">
            Confirmation failed
          </h1>
          <p className="mt-2 text-sm text-slate-500">{errorMessage}</p>
          <Link
            href="/auth"
            className="bg-brand-navy mt-6 inline-block w-full rounded-lg px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Back to Login
          </Link>
        </>
      )}
    </div>
  );
}

export default function ConfirmEmailPage() {
  return (
    <main className="bg-brand-navy flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <div className="mb-8">
        <Logo variant="light" size="md" />
      </div>
      <Suspense
        fallback={
          <Loader2 className="text-brand-gold h-12 w-12 animate-spin" />
        }
      >
        <ConfirmEmailCard />
      </Suspense>
    </main>
  );
}
