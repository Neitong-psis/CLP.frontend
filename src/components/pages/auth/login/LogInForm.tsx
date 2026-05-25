'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';
import {
  Field,
  InputWrapper,
  PasswordToggle,
  SubmitBtn,
  inputCls,
} from './shared';

export default function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="3xl:space-y-7 space-y-5 2xl:space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <Field label="Email" htmlFor="email">
        <InputWrapper
          icon={
            <Mail className="h-[18px] w-[18px] text-slate-400 2xl:h-5 2xl:w-5" />
          }
        >
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputCls}
          />
        </InputWrapper>
      </Field>

      <Field label="Password" htmlFor="password">
        <InputWrapper
          icon={
            <Lock className="h-[18px] w-[18px] text-slate-400 2xl:h-5 2xl:w-5" />
          }
          suffix={
            <PasswordToggle
              show={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
            />
          }
        >
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputCls}
          />
        </InputWrapper>
      </Field>

      <div className="flex items-center justify-between">
        <label className="3xl:text-lg flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 2xl:text-base">
          <input
            type="checkbox"
            className="h-4 w-4 rounded-md border-slate-300 accent-[#f4a300] 2xl:h-5 2xl:w-5"
          />
          Remember me
        </label>
        <Link
          href="/auth/forgot-password"
          className="3xl:text-lg text-sm font-semibold text-[#f4a300] transition-opacity hover:opacity-75 2xl:text-base"
        >
          Forgot password?
        </Link>
      </div>

      <SubmitBtn label="Sign In" />
    </form>
  );
}
