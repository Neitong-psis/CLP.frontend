"use client";

import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { Field, InputWrapper, PasswordToggle, SubmitBtn, inputCls } from "./shared";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-3 2xl:space-y-4 3xl:space-y-5" onSubmit={(e) => e.preventDefault()}>
      <Field label="Full Name" htmlFor="signup-name">
        <InputWrapper icon={<User className="h-[18px] w-[18px] text-slate-400 2xl:h-5 2xl:w-5" />}>
          <input
            id="signup-name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            className={inputCls}
          />
        </InputWrapper>
      </Field>

      <Field label="Email" htmlFor="signup-email">
        <InputWrapper icon={<Mail className="h-[18px] w-[18px] text-slate-400 2xl:h-5 2xl:w-5" />}>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={inputCls}
          />
        </InputWrapper>
      </Field>

      <Field label="Password" htmlFor="signup-password">
        <InputWrapper
          icon={<Lock className="h-[18px] w-[18px] text-slate-400 2xl:h-5 2xl:w-5" />}
          suffix={<PasswordToggle show={showPassword} onToggle={() => setShowPassword((v) => !v)} />}
        >
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            autoComplete="new-password"
            className={inputCls}
          />
        </InputWrapper>
      </Field>

      <SubmitBtn label="Create Account" />
    </form>
  );
}
