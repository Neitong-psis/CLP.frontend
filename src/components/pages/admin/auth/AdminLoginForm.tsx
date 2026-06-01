'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { Lock, Mail } from 'lucide-react';
import { loginSchema } from '@/config/auth';
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
import {
  validateAdminCredentials,
  setAdminSession,
} from '@/feature/admin/auth/admin.auth';

export default function AdminLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      setAuthError(null);
      const session = validateAdminCredentials(value.email, value.password);
      if (!session) {
        setAuthError('Invalid email or password.');
        return;
      }
      setAdminSession(session);
      router.replace('/admin');
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
                    placeholder="admin@qbtech.com"
                    autoComplete="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      setAuthError(null);
                      field.handleChange(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setAuthError(null);
                      field.handleChange(e.target.value);
                    }}
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

      {authError && (
        <p className="text-sm font-medium text-red-500">{authError}</p>
      )}

      <form.Subscribe selector={(s) => s.isSubmitting}>
        {(isSubmitting) => (
          <SubmitBtn label="Sign In" disabled={isSubmitting} />
        )}
      </form.Subscribe>
    </form>
  );
}
