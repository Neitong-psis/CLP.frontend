'use client';

import { useState } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { signUpSchema } from '@/config/auth';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/Field';
import { InputWrapper, PasswordToggle, SubmitBtn, inputCls } from './shared';

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
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Sign up:', value);
    },
  });

  return (
    <form
      className="3xl:space-y-5 space-y-3 2xl:space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="3xl:gap-5 gap-3 2xl:gap-4">
        <form.Field
          name="fullName"
          validators={{
            onChange: signUpSchema.shape.fullName,
            onBlur: signUpSchema.shape.fullName,
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
            onChange: signUpSchema.shape.email,
            onBlur: signUpSchema.shape.email,
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
            onChange: signUpSchema.shape.password,
            onBlur: signUpSchema.shape.password,
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

      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting) => (
          <SubmitBtn label="Create Account" disabled={isSubmitting} />
        )}
      </form.Subscribe>
    </form>
  );
}
