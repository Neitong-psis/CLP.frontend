'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { loginSchema } from '@/config/auth';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/Field';
import { InputWrapper, PasswordToggle, SubmitBtn, inputCls } from './shared';

export default function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      console.log('Login:', value);
    },
  });

  return (
    <form
      className="3xl:space-y-7 space-y-5 2xl:space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="email"
          validators={{
            onChange: loginSchema.shape.email,
            onBlur: loginSchema.shape.email,
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
            onChange: loginSchema.shape.password,
            onBlur: loginSchema.shape.password,
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
      </FieldGroup>

      <div className="flex items-center justify-between">
        <form.Field name="rememberMe">
          {(field) => (
            <label className="3xl:text-lg flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 2xl:text-base">
              <input
                type="checkbox"
                id={field.name}
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="accent-brand-gold h-4 w-4 rounded-md border-slate-300 2xl:h-5 2xl:w-5"
              />
              Remember me
            </label>
          )}
        </form.Field>
        <Link
          href="/auth/forgot-password"
          className="3xl:text-lg text-brand-gold text-sm font-semibold transition-opacity hover:opacity-75 2xl:text-base"
        >
          Forgot password?
        </Link>
      </div>

      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting) => <SubmitBtn label="Log In" disabled={isSubmitting} />}
      </form.Subscribe>
    </form>
  );
}
