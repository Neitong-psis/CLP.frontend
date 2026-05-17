"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";
import { verifyEmailSchema } from "@/schemas/auth";
import { notifyError, notifySuccess } from "@/lib/toast";
import { cn } from "@/lib/cn";

export function VerifyEmailForm() {
  const [isPending, startTransition] = useTransition();
  const [token, setToken] = useState("");

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const parsed = verifyEmailSchema.safeParse({ token });
          if (!parsed.success) {
            notifyError(parsed.error.issues.at(0)?.message ?? "Enter a valid token.");
            return;
          }
          await new Promise((r) => setTimeout(r, 260));
          notifySuccess("Email verified (mock). You can sign in.");
          window.location.href = ROUTES.auth.login;
        });
      }}
    >
      <div className="space-y-2">
        <label className="text-sm font-semibold text-[#0F172A]" htmlFor="token">
          Verification code
        </label>
        <input
          id="token"
          name="token"
          autoComplete="one-time-code"
          required
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className={cn(
            "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm text-[#0F172A] shadow-sm",
            "outline-none ring-1 ring-transparent focus:border-transparent focus:ring-[#E6A23C]",
          )}
        />
        <p className="text-xs text-[#64748B]">Mock flow: enter any code with 6+ characters.</p>
      </div>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full rounded-xl bg-[#1E3A5F] px-4 py-3 text-sm font-semibold text-white shadow-sm",
          "hover:bg-[#163152] disabled:pointer-events-none disabled:opacity-50",
        )}
      >
        {isPending ? "Verifying…" : "Verify email"}
      </motion.button>

      <p className="text-center text-sm text-[#64748B]">
        <Link href={ROUTES.auth.login} className="font-semibold text-[#1E3A5F] hover:text-[#0F172A]">
          Go to sign in
        </Link>
      </p>
    </form>
  );
}
