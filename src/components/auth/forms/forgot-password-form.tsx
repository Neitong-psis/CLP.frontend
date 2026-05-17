"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { forgotPasswordSchema } from "@/schemas/auth";
import { notifyError, notifySuccess } from "@/lib/toast";
import { cn } from "@/lib/cn";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const parsed = forgotPasswordSchema.safeParse({ email });
          if (!parsed.success) {
            notifyError(parsed.error.issues.at(0)?.message ?? "Email looks invalid.");
            return;
          }
          await new Promise((r) => setTimeout(r, 260));
          notifySuccess("Reset link dispatched (mock) — check your inbox.");
          setEmail("");
        });
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#0F172A]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm text-[#0F172A] shadow-sm",
            "outline-none ring-1 ring-transparent focus:border-transparent focus:ring-[#E6A23C]",
          )}
        />
      </div>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full rounded-xl bg-[#0F172A] px-4 py-3 text-sm font-semibold text-white shadow-sm",
          "hover:bg-[#1E293B] disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        {isPending ? "Sending…" : "Send reset link"}
      </motion.button>

      <p className="text-center text-sm text-[#64748B]">
        <Link href={ROUTES.auth.login} className="font-semibold text-[#1E3A5F] hover:text-[#0F172A]">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
