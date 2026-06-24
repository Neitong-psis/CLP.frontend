'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { validateEmail } from '@/config/auth';
import { forgotPassword } from '@/features/auth/auth.api';
import { isApiError } from '@/lib/api/errors';
import { FormField, SubmitBtn } from '@/components/pages/auth/login/shared';
import { FieldGroup } from '@/components/ui/Field';
import Logo from '@/components/common/Logo';

// ── Success state ─────────────────────────────────────────────────────────────

function SuccessState({
  email,
  onResend,
}: {
  email: string;
  onResend: () => void;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
      </div>
      <h2 className="text-brand-navy mb-2 text-xl font-bold sm:text-[1.6rem]">
        Check your inbox
      </h2>
      <p className="text-brand-navy/55 mb-1 text-sm leading-relaxed">
        We sent a password reset link to
      </p>
      <p className="text-brand-navy mb-6 text-sm font-semibold">{email}</p>
      <p className="mb-4 text-xs text-slate-400">
        Check your spam folder if you don&apos;t see it within a few minutes.
      </p>
      <button
        type="button"
        onClick={onResend}
        className="text-brand-gold text-sm font-semibold transition-opacity hover:opacity-75"
      >
        Didn&apos;t receive it? Send again
      </button>
    </div>
  );
}

// ── Form ──────────────────────────────────────────────────────────────────────

function ForgotPasswordForm({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) {
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: '' },
    onSubmit: async ({ value }) => {
      setFormError(null);
      try {
        await forgotPassword(value.email);
        onSuccess(value.email);
      } catch (error) {
        setFormError(
          isApiError(error)
            ? error.message
            : 'Something went wrong. Please try again.',
        );
      }
    },
  });

  return (
    <>
      <div className="mb-5 2xl:mb-6">
        <h2 className="text-brand-navy text-xl leading-tight font-bold sm:text-[1.6rem] 2xl:text-3xl">
          Forgot your password?
        </h2>
        <p className="text-brand-navy/45 mt-1.5 text-sm 2xl:text-base">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form
        className="space-y-5 2xl:space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (form.state.isSubmitting) return;
          void form.handleSubmit();
        }}
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' &&
            (e.target as HTMLElement).tagName === 'INPUT' &&
            !form.state.isSubmitting
          ) {
            e.preventDefault();
            void form.handleSubmit();
          }
        }}
      >
        <FieldGroup>
          <form.Field
            name="email"
            validators={{ onChange: validateEmail, onBlur: validateEmail }}
          >
            {(field) => (
              <FormField
                field={field}
                label="Email"
                icon={
                  <Mail className="h-4.5 w-4.5 text-slate-400 2xl:h-5 2xl:w-5" />
                }
                inputProps={{
                  type: 'email',
                  placeholder: 'you@example.com',
                  autoComplete: 'email',
                  onChange: (e) => field.handleChange(e.target.value),
                }}
              />
            )}
          </form.Field>
        </FieldGroup>

        {formError && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {formError}
          </p>
        )}

        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <SubmitBtn
              label={isSubmitting ? 'Sending…' : 'Send Reset Link'}
              disabled={isSubmitting}
            />
          )}
        </form.Subscribe>
      </form>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ForgotPasswordPage() {
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  return (
    <main className="bg-brand-navy flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <div className="mb-8">
        <Logo variant="light" size="md" />
      </div>

      <div className="w-full max-w-100 sm:max-w-115">
        <div className="rounded-2xl bg-white px-5 py-6 shadow-2xl shadow-black/40 sm:px-7 sm:py-7 xl:px-12 xl:py-9 2xl:rounded-3xl 2xl:px-14 2xl:py-12">
          {sentEmail ? (
            <SuccessState
              email={sentEmail}
              onResend={() => setSentEmail(null)}
            />
          ) : (
            <ForgotPasswordForm onSuccess={setSentEmail} />
          )}
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/auth"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
