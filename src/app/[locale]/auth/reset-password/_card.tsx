'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Lock, XCircle } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { validateNewPassword } from '@/config/auth';
import { resetPassword } from '@/features/auth/auth.api';
import { isApiError } from '@/lib/api/errors';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/Field';
import {
  InputWrapper,
  PasswordToggle,
  SubmitBtn,
  inputCls,
} from '@/components/pages/auth/login/shared';

// ── Password strength ─────────────────────────────────────────────────────────

const STRENGTH_LABELS = ['Weak', 'Fair', 'Good', 'Strong'] as const;
const STRENGTH_COLORS = [
  'bg-red-400',
  'bg-amber-400',
  'bg-yellow-400',
  'bg-emerald-500',
] as const;

function getStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

// ── Invalid / expired link state ──────────────────────────────────────────────

function InvalidLinkState() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <XCircle className="h-8 w-8 text-red-500" />
      </div>
      <h2 className="text-brand-navy mb-2 text-xl font-bold">
        Invalid or expired link
      </h2>
      <p className="text-brand-navy/55 mb-6 text-sm leading-relaxed">
        This password reset link is invalid or has already been used. Please
        request a new one.
      </p>
      <Link
        href="/auth/forgot-password"
        className="bg-brand-gold hover:bg-brand-gold/90 inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-colors"
      >
        Request new link
      </Link>
    </div>
  );
}

// ── Success state ─────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
      </div>
      <h2 className="text-brand-navy mb-2 text-xl font-bold">
        Password updated!
      </h2>
      <p className="text-brand-navy/55 mb-6 text-sm leading-relaxed">
        Your password has been reset successfully. You can now log in with your
        new password.
      </p>
      <Link
        href="/auth"
        className="bg-brand-gold hover:bg-brand-gold/90 inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-colors"
      >
        Go to Log In
      </Link>
    </div>
  );
}

// ── Reset form ────────────────────────────────────────────────────────────────

function ResetPasswordForm({ hash }: { hash: string }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const form = useForm({
    defaultValues: { password: '', confirm: '' },
    onSubmit: async ({ value }) => {
      setFormError(null);
      try {
        await resetPassword(hash, value.password);
        setDone(true);
        setTimeout(() => router.replace('/auth'), 3000);
      } catch (error) {
        setFormError(
          isApiError(error)
            ? error.message
            : 'Reset failed. The link may have expired.',
        );
      }
    },
  });

  if (done) return <SuccessState />;

  return (
    <>
      <div className="mb-5 2xl:mb-6">
        <h2 className="text-brand-navy text-xl leading-tight font-bold sm:text-[1.6rem] 2xl:text-3xl">
          Set a new password
        </h2>
        <p className="text-brand-navy/45 mt-1.5 text-sm 2xl:text-base">
          Choose a strong password you haven&apos;t used before.
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
        <FieldGroup className="gap-4">
          {/* New password */}
          <form.Field
            name="password"
            validators={{
              onChange: validateNewPassword,
              onBlur: validateNewPassword,
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const strength = field.state.value
                ? getStrength(field.state.value)
                : 0;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-brand-navy text-sm font-semibold 2xl:text-base"
                  >
                    New password
                  </FieldLabel>
                  <InputWrapper
                    icon={
                      <Lock className="h-4.5 w-4.5 text-slate-400 2xl:h-5 2xl:w-5" />
                    }
                    suffix={
                      <PasswordToggle
                        show={showPassword}
                        onToggle={() => setShowPassword((v) => !v)}
                      />
                    }
                  >
                    <input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        void form.validateField('confirm', 'change');
                      }}
                      aria-invalid={isInvalid}
                      className={inputCls}
                    />
                  </InputWrapper>

                  {field.state.value && (
                    <div className="space-y-1">
                      <div className="flex gap-1" aria-hidden="true">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              i < strength
                                ? STRENGTH_COLORS[strength - 1]
                                : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400">
                        Strength:{' '}
                        <span className="font-medium text-slate-600">
                          {STRENGTH_LABELS[strength - 1] ?? 'Too short'}
                        </span>
                      </p>
                    </div>
                  )}

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors.map((e) => ({
                        message: String(e),
                      }))}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Confirm password */}
          <form.Field
            name="confirm"
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) => {
                const password = fieldApi.form.getFieldValue('password');
                if (!value) return 'Please confirm your password.';
                if (value !== password) return 'Passwords do not match.';
              },
              onBlur: ({ value, fieldApi }) => {
                const password = fieldApi.form.getFieldValue('password');
                if (!value) return 'Please confirm your password.';
                if (value !== password) return 'Passwords do not match.';
              },
            }}
          >
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-brand-navy text-sm font-semibold 2xl:text-base"
                  >
                    Confirm new password
                  </FieldLabel>
                  <InputWrapper
                    icon={
                      <Lock className="h-4.5 w-4.5 text-slate-400 2xl:h-5 2xl:w-5" />
                    }
                    suffix={
                      <PasswordToggle
                        show={showConfirm}
                        onToggle={() => setShowConfirm((v) => !v)}
                      />
                    }
                  >
                    <input
                      id={field.name}
                      name={field.name}
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className={inputCls}
                    />
                  </InputWrapper>
                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors.map((e) => ({
                        message: String(e),
                      }))}
                    />
                  )}
                </Field>
              );
            }}
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
              label={isSubmitting ? 'Updating…' : 'Reset Password'}
              disabled={isSubmitting}
            />
          )}
        </form.Subscribe>
      </form>
    </>
  );
}

// ── Entry point (reads searchParams) ─────────────────────────────────────────

export function ResetPasswordCard() {
  const searchParams = useSearchParams();
  const hash = searchParams.get('hash');

  return (
    <div className="w-full max-w-100 sm:max-w-115">
      <div className="rounded-2xl bg-white px-5 py-6 shadow-2xl shadow-black/40 sm:px-7 sm:py-7 xl:px-12 xl:py-9 2xl:rounded-3xl 2xl:px-14 2xl:py-12">
        {hash ? <ResetPasswordForm hash={hash} /> : <InvalidLinkState />}
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
  );
}
