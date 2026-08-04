'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, User } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import {
  validateEmail,
  validateFullName,
  validateNewPassword,
} from '@/config/auth';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/Field';
import { useAuth } from '@/hooks/use-auth';
import { safeRedirect } from '@/lib/utils/safeRedirect';
import { isApiError } from '@/lib/api/errors';
import {
  InputWrapper,
  PasswordToggle,
  SubmitBtn,
  inputCls,
} from '@/components/pages/auth/login/shared';

const STRENGTH_LABELS = ['Weak', 'Fair', 'Good', 'Strong'] as const;
const STRENGTH_COLORS = [
  'bg-red-400',
  'bg-amber-400',
  'bg-yellow-400',
  'bg-emerald-500',
] as const;

function getPasswordStrength(password: string): number {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = safeRedirect(searchParams.get('from'));
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { register } = useAuth();

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setFormError(null);
      const [firstName = value.fullName, ...rest] = value.fullName
        .trim()
        .split(/\s+/);
      const lastName = rest.join(' ') || firstName;
      try {
        await register({
          firstName,
          lastName,
          email: value.email,
          password: value.password,
        });
        const query = new URLSearchParams({ email: value.email });
        if (from) query.set('from', from);
        router.push(`/auth/verify-email?${query.toString()}`);
      } catch (error) {
        setFormError(
          isApiError(error)
            ? error.message
            : 'Registration failed. Please try again.',
        );
      }
    },
  });

  return (
    <form
      className="3xl:space-y-5 space-y-3 2xl:space-y-4"
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
      <FieldGroup className="3xl:gap-5 gap-3 2xl:gap-4">
        <form.Field
          name="fullName"
          validators={{
            onChange: validateFullName,
            onBlur: validateFullName,
          }}
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="3xl:text-lg text-brand-navy text-sm font-semibold 2xl:text-base"
                >
                  Full Name
                </FieldLabel>
                <InputWrapper
                  icon={
                    <User className="h-4.5 w-4.5 text-slate-400 2xl:h-5 2xl:w-5" />
                  }
                >
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Your full name"
                    autoComplete="name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    aria-describedby={
                      isInvalid ? `${field.name}-error` : undefined
                    }
                    className={inputCls}
                  />
                </InputWrapper>
                {isInvalid && (
                  <FieldError
                    id={`${field.name}-error`}
                    errors={field.state.meta.errors.map((e) => ({
                      message: String(e),
                    }))}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: validateEmail,
            onBlur: validateEmail,
          }}
        >
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="3xl:text-lg text-brand-navy text-sm font-semibold 2xl:text-base"
                >
                  Email
                </FieldLabel>
                <InputWrapper
                  icon={
                    <Mail className="h-4.5 w-4.5 text-slate-400 2xl:h-5 2xl:w-5" />
                  }
                >
                  <input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    aria-describedby={
                      isInvalid ? `${field.name}-error` : undefined
                    }
                    className={inputCls}
                  />
                </InputWrapper>
                {isInvalid && (
                  <FieldError
                    id={`${field.name}-error`}
                    errors={field.state.meta.errors.map((e) => ({
                      message: String(e),
                    }))}
                  />
                )}
              </Field>
            );
          }}
        </form.Field>

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
              ? getPasswordStrength(field.state.value)
              : 0;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel
                  htmlFor={field.name}
                  className="3xl:text-lg text-brand-navy text-sm font-semibold 2xl:text-base"
                >
                  Password
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
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    aria-describedby={`${field.name}-strength${isInvalid ? ` ${field.name}-error` : ''}`}
                    className={inputCls}
                  />
                </InputWrapper>

                {field.state.value && (
                  <div id={`${field.name}-strength`} className="space-y-1">
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
                    id={`${field.name}-error`}
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
            label={isSubmitting ? 'Creating account…' : 'Create Account'}
            disabled={isSubmitting}
          />
        )}
      </form.Subscribe>
    </form>
  );
}
