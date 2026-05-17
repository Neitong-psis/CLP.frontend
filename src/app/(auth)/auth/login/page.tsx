import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-panel";
import { LoginForm } from "@/components/auth/forms/login-form";
import { SkeletonBlock } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Authenticate to access the CLP learner workspace.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}

function LoginFormFallback() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading sign-in form">
      <SkeletonBlock className="h-8 w-56" />
      <SkeletonBlock className="h-10 w-full rounded-full" />
      <SkeletonBlock className="h-10 w-full" />
      <SkeletonBlock className="h-10 w-full" />
      <SkeletonBlock className="h-11 w-full" />
    </div>
  );
}
