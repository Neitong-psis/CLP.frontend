"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { UserRole } from "@/constants/roles";
import { DEMO_USERS } from "@/config/demo-users";
import { ROUTES } from "@/config/routes";
import { loginSchema } from "@/schemas/auth";
import { useAuth } from "@/providers/auth-provider";
import { notifyError, notifySuccess } from "@/lib/toast";
import { cn } from "@/lib/cn";
import type { DemoUser } from "@/config/demo-users";

type AuthMode = "sign-in" | "sign-up";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, isAuthenticated } = useAuth();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("learner@clp.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isPending, startTransition] = useTransition();

  const nextHref = useMemo(
    () => searchParams.get("next") ?? ROUTES.dashboard.root,
    [searchParams],
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTES.dashboard.root);
    }
  }, [isAuthenticated, router]);

  function handleDemoLogin(user: DemoUser) {
    signIn(user);
    notifySuccess(`Signed in as ${user.name}`);
    router.push(nextHref);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#00153f]">Sign In to Your Account</h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Enter your credentials to access your courses
        </p>
      </div>

      <div className="flex rounded-full bg-[#F1F5F9] p-1">
        <AuthModeButton active={mode === "sign-in"} onClick={() => setMode("sign-in")}>
          Sign In
        </AuthModeButton>
        <AuthModeButton active={mode === "sign-up"} onClick={() => setMode("sign-up")}>
          Sign Up
        </AuthModeButton>
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          startTransition(() => {
            const parsed = loginSchema.safeParse({ email, password: password || "demo" });
            if (!parsed.success) {
              notifyError(parsed.error.issues.at(0)?.message ?? "Invalid credentials");
              return;
            }

            const demoUser =
              DEMO_USERS.find((user) => user.email === parsed.data.email) ?? DEMO_USERS[2];

            signIn(demoUser);
            notifySuccess(rememberMe ? "Welcome back!" : "Signed in");
            router.push(nextHref);
          });
        }}
      >
        <Field label="Email" icon={Mail}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className={inputClassName}
          />
        </Field>

        <Field label="Password" icon={Lock}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className={cn(inputClassName, "pr-11")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </Field>

        <div className="flex items-center justify-between gap-3 text-sm">
          <label className="inline-flex items-center gap-2 text-[#64748B]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="rounded border-[#CBD5E1]"
            />
            Remember me
          </label>
          <Link href={ROUTES.auth.forgotPassword} className="font-semibold text-[#E6A23C] hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-[#E6A23C] py-3 text-sm font-bold text-[#00153f] transition hover:brightness-105 disabled:opacity-60"
        >
          {isPending ? "Signing in…" : mode === "sign-in" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-[#E2E8F0]" />
        </div>
        <p className="relative mx-auto w-fit bg-white px-3 text-xs font-semibold tracking-wider text-[#94A3B8]">
          QUICK DEMO LOGIN
        </p>
      </div>

      <ul className="space-y-2">
        {DEMO_USERS.map((user) => (
          <li key={user.id}>
            <button
              type="button"
              onClick={() => handleDemoLogin(user)}
              className="flex w-full items-center gap-3 rounded-xl border border-[#E2E8F0] px-3 py-3 text-left transition hover:border-[#E6A23C]/50 hover:bg-[#FFFBEB]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00153f] text-xs font-bold text-white">
                {user.avatarInitials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#0F172A]">{user.label}</span>
                <span className="block text-xs text-[#64748B]">{user.accessLabel}</span>
              </span>
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", user.badgeClassName)}>
                {user.role === UserRole.Admin
                  ? "Admin"
                  : user.role === UserRole.Instructor
                    ? "Educator"
                    : "Learner"}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuthModeButton({
  active,
  onClick,
  children,
}: {
  readonly active: boolean;
  readonly onClick: () => void;
  readonly children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition",
        active ? "bg-white text-[#E6A23C] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]",
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  readonly label: string;
  readonly icon: typeof Mail;
  readonly children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#0F172A]" htmlFor={label.toLowerCase()}>
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
        {children}
      </div>
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0F172A] outline-none ring-1 ring-transparent focus:ring-[#E6A23C]";
