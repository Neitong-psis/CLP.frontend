'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail, User } from 'lucide-react';
import {
  Field,
  InputWrapper,
  PasswordToggle,
  PasswordStrength,
  SubmitBtn,
  inputCls,
} from './login/shared';
import { apiRegister, parseApiError } from '@/lib/api/auth';

export default function SignInForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setRegistered] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);
    try {
      const parts = fullName.trim().split(/\s+/);
      const firstName = parts[0] ?? '';
      const lastName = parts.slice(1).join(' ') || firstName;
      await apiRegister(firstName, lastName, email, password);
      setRegistered(true);
    } catch (err) {
      setAuthError(parseApiError(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (registered) {
    return (
      <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-6 text-center">
        <p className="text-sm font-semibold text-emerald-700">
          Account created! Check your email to confirm your address before
          logging in.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-3 2xl:space-y-4" onSubmit={handleSubmit}>
      {/* Full Name */}
      <Field label="Full Name" htmlFor="signup-name">
        <InputWrapper
          icon={
            <User className="h-[18px] w-[18px] text-slate-400 2xl:h-5 2xl:w-5" />
          }
        >
          <input
            id="signup-name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className={inputCls}
          />
        </InputWrapper>
      </Field>

      {/* Email */}
      <Field label="Email" htmlFor="signup-email">
        <InputWrapper
          icon={
            <Mail className="h-[18px] w-[18px] text-slate-400 2xl:h-5 2xl:w-5" />
          }
        >
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputCls}
          />
        </InputWrapper>
      </Field>

      {/* Password + strength */}
      <Field label="Password" htmlFor="signup-password">
        <InputWrapper
          icon={
            <Lock className="h-[18px] w-[18px] text-slate-400 2xl:h-5 2xl:w-5" />
          }
          suffix={
            passwordFocused && (
              <PasswordToggle
                show={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
            )
          }
        >
          <input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            required
            className={inputCls}
          />
        </InputWrapper>
        <PasswordStrength value={password} />
      </Field>

      {/* Terms */}
      <label className="flex cursor-pointer items-start gap-2.5 pt-0.5">
        <input
          type="checkbox"
          required
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#f4a300]"
        />
        <span className="text-xs leading-relaxed text-slate-500 2xl:text-sm">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="text-[#f4a300] hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[#f4a300] hover:underline">
            Privacy Policy
          </Link>
        </span>
      </label>

      {authError && (
        <p className="text-sm font-medium text-red-500">{authError}</p>
      )}

      <SubmitBtn
        label={isSubmitting ? 'Creating account…' : 'Create Account'}
      />
    </form>
  );
}
