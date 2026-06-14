'use client';

import { Lock, Mail } from 'lucide-react';
import { validateEmail, validatePassword } from '@/config/auth';
import { FieldGroup } from '@/components/ui/Field';
import {
  FormField,
  PasswordToggle,
  SubmitBtn,
} from '@/components/pages/auth/login/shared';
import { useAdminLogin } from '../_lib/useAdminLogin';

// ── component ────────────────────────────────────────────────────

export default function AdminLoginForm() {
  const { form, showPassword, setShowPassword, authError, clearError } =
    useAdminLogin();

  return (
    <form
      className="3xl:space-y-7 space-y-5 2xl:space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!form.state.isSubmitting) form.handleSubmit();
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
                placeholder: 'example@domain.com',
                autoComplete: 'email',
                onChange: (e) => {
                  clearError();
                  field.handleChange(e.target.value);
                },
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
                onChange: (e) => {
                  clearError();
                  field.handleChange(e.target.value);
                },
              }}
            />
          )}
        </form.Field>
      </FieldGroup>

      {authError && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {authError}
        </p>
      )}

      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting) => (
          <SubmitBtn label="Sign In" disabled={isSubmitting} />
        )}
      </form.Subscribe>
    </form>
  );
}
