"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { registerSchema } from "@/schemas/auth";
import { notifyError, notifySuccess } from "@/lib/toast";
import { cn } from "@/lib/cn";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const parsed = registerSchema.safeParse({
            name,
            email,
            password,
            confirmPassword,
          });

          if (!parsed.success) {
            notifyError(parsed.error.issues.at(0)?.message ?? "Review the highlighted fields.");
            return;
          }

          // Mock onboarding without persistence.
          await new Promise((r) => setTimeout(r, 250));
          notifySuccess("Account created — check verification next.");
          window.location.href = ROUTES.auth.verifyEmail;
        });
      }}
    >
      <Field label="Full name" htmlFor="name">
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={controlClass()}
        />
      </Field>

      <Field label="Work email" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={controlClass()}
        />
      </Field>

      <Field label="Password" htmlFor="password">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={controlClass()}
        />
      </Field>

      <Field label="Confirm password" htmlFor="confirmPassword">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={controlClass()}
        />
      </Field>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full rounded-xl bg-[#E6A23C] px-4 py-3 text-sm font-semibold text-[#0F172A] shadow-sm ring-1 ring-[#F5D595]/70",
          "hover:brightness-[1.03] disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6A23C]",
        )}
      >
        {isPending ? "Creating…" : "Create account"}
      </motion.button>

      <p className="text-center text-sm text-[#64748B]">
        Already onboarded?{" "}
        <Link href={ROUTES.auth.login} className="font-semibold text-[#1E3A5F] hover:text-[#0F172A]">
          Sign in
        </Link>
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  readonly label: string;
  readonly htmlFor: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#0F172A]" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

function controlClass() {
  return cn(
    "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm text-[#0F172A] shadow-sm",
    "outline-none ring-1 ring-transparent focus:border-transparent focus:ring-[#E6A23C]",
  );
}
