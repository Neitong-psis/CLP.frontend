"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { ROUTES } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";
import { SkeletonBlock } from "@/components/ui/skeleton";

interface AuthGateProps {
  readonly children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated) return;
    const next = encodeURIComponent(pathname);
    router.replace(`${ROUTES.auth.login}?next=${next}`);
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return <AuthGateFallback />;
  }

  return children;
}

function AuthGateFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-clp-bg p-6"
      aria-busy="true"
      aria-label="Checking session"
    >
      <div className="w-full max-w-md space-y-4">
        <SkeletonBlock className="h-10 w-48" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-64 w-full" />
      </div>
    </div>
  );
}
