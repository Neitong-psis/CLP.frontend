'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, User } from 'lucide-react';
import {
  Field,
  InputWrapper,
  PasswordToggle,
  PasswordStrength,
  SubmitBtn,
  inputCls,
} from './shared';

export default function SignInForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <form
      className="space-y-3 2xl:space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        router.push('/dashboard');
      }}
    >
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

      <SubmitBtn label="Create Account" />
    </form>
  );
}
