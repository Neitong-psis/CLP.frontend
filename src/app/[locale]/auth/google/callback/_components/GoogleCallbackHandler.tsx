'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { resolveHome } from '@/lib/rbac/has-role';
import { isApiError } from '@/lib/api/errors';
import { consumeGoogleCallback } from '@/services/auth/google-oauth';
import { ROLE, ROLE_HOME, type RoleId } from '@/constants/roles';

const PORTAL_ROLE: Record<'admin' | 'educator' | 'learner', RoleId> = {
  admin: ROLE.ADMIN,
  educator: ROLE.EDUCATOR,
  learner: ROLE.LEARNER,
};

type Phase = 'loading' | 'success' | 'error';

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function GoogleCallbackHandler() {
  const { loginWithOAuth } = useAuth();
  const [phase, setPhase] = useState<Phase>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    void (async () => {
      try {
        const { idToken, from, portal } = consumeGoogleCallback();
        const user = await loginWithOAuth({ provider: 'google', idToken });

        setPhase('success');
        // Brief success flash, then full-page redirect (no App Router dependency).
        await new Promise((r) => setTimeout(r, 800));

        // Prefer an explicit deep-link redirect, then the user's actual role home
        // (authoritative), then the portal that launched the OAuth as a fallback
        // for brand-new accounts whose role may not yet be resolved.
        const roleHome = resolveHome(user);
        const portalHome = portal ? ROLE_HOME[PORTAL_ROLE[portal]] : null;
        window.location.replace(
          from ?? (roleHome !== '/' ? roleHome : portalHome) ?? '/',
        );
      } catch (err) {
        setErrorMsg(
          isApiError(err)
            ? err.message
            : 'Google sign-in could not be completed.',
        );
        setPhase('error');
      }
    })();
  }, [loginWithOAuth]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      {/* Brand mark */}
      <div className="mb-8 text-center">
        <span className="text-brand-navy text-2xl font-extrabold tracking-tight">
          QB<span className="text-brand-gold">Tech</span>
        </span>
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        {phase === 'loading' && <LoadingState />}
        {phase === 'success' && <SuccessState />}
        {phase === 'error' && <ErrorState message={errorMsg} />}
      </div>

      <p className="mt-6 text-xs text-slate-400">Secured by Google OAuth 2.0</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        {/* Spinning ring */}
        <svg
          className="absolute inset-0 h-full w-full animate-spin"
          viewBox="0 0 64 64"
          fill="none"
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            className="text-slate-100"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="44 132"
            className="text-brand-gold"
          />
        </svg>
        {/* Google logo in center */}
        <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
          <GoogleLogo />
        </span>
      </div>

      <div>
        <p className="text-brand-navy text-base font-semibold">
          Signing you in…
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Verifying your Google account
        </p>
      </div>

      {/* Pulsing dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="bg-brand-gold h-1.5 w-1.5 animate-bounce rounded-full"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle className="h-7 w-7 text-emerald-500" />
      </span>
      <div>
        <p className="text-brand-navy text-base font-semibold">Welcome back!</p>
        <p className="mt-1 text-sm text-slate-400">Redirecting you now…</p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  const isConfigError =
    message.toLowerCase().includes('token') ||
    message.toLowerCase().includes('invalid');

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
        <AlertCircle className="h-7 w-7 text-rose-500" />
      </span>

      <div>
        <p className="text-brand-navy text-base font-semibold">
          Sign-in failed
        </p>
        <p className="mt-1.5 text-sm text-slate-500">
          {isConfigError
            ? 'Your Google session could not be verified. This can happen if the sign-in window was open too long.'
            : message}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        <Link
          href="/auth"
          className="bg-brand-gold flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
        >
          <GoogleLogo />
          Try again with Google
        </Link>
        <Link
          href="/auth"
          className="flex h-10 w-full items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Sign in with email instead
        </Link>
      </div>
    </div>
  );
}
