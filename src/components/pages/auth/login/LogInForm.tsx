'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { validateEmail, validatePassword } from '@/config/auth';
import { FieldGroup } from '@/components/ui/Field';
import { useAuth } from '@/hooks/use-auth';
import { resolveHome } from '@/lib/rbac/has-role';
import { isApiError } from '@/lib/api/errors';
import { FormField, PasswordToggle, SubmitBtn } from './shared';

export default function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMounted = useRef(true);
  useEffect(() => {
    // StrictMode unmounts/remounts in dev — re-arm the flag on every mount,
    // not just the first, or it stays false forever after the simulated unmount.
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      setFormError(null);
      try {
        const user = await login({
          email: value.email,
          password: value.password,
        });
        const from = searchParams.get('from');
        router.replace(from ?? resolveHome(user));
      } catch (error) {
        if (isMounted.current) {
          setFormError(
            isApiError(error) ? error.message : 'Unable to log in. Try again.',
          );
        }
      }
    },
  });

  return (
    <form
      className="3xl:space-y-7 space-y-5 2xl:space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (form.state.isSubmitting) return;
        form.handleSubmit();
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

        <form.Field
          name="password"
          validators={{ onChange: validatePassword, onBlur: validatePassword }}
        >
          {(field) => (
            <FormField
              field={field}
              label="Password"
              icon={
                <Lock className="h-4.5 w-4.5 text-slate-400 2xl:h-5 2xl:w-5" />
              }
              suffix={
                <PasswordToggle
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                />
              }
              inputProps={{
                type: showPassword ? 'text' : 'password',
                placeholder: 'Enter your password',
                autoComplete: 'current-password',
                onChange: (e) => field.handleChange(e.target.value),
              }}
            />
          )}
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

      {formError && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {formError}
        </p>
      )}

      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting) => <SubmitBtn label="Log In" disabled={isSubmitting} />}
      </form.Subscribe>
    </form>
  );
}
