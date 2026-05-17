import type { ReactNode } from "react";
import { Suspense } from "react";
import { AuthGate } from "@/components/auth/auth-gate";
import { LearnerShell } from "@/components/layout/learner-shell";
import { SkeletonBlock } from "@/components/ui/skeleton";

export default function LearnerLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense fallback={<LearnerLayoutFallback />}>
      <AuthGate>
        <LearnerShell>{children}</LearnerShell>
      </AuthGate>
    </Suspense>
  );
}

function LearnerLayoutFallback() {
  return (
    <div className="flex min-h-screen bg-[#F5F7FA] p-6" aria-busy="true">
      <SkeletonBlock className="hidden h-full w-64 lg:block" />
      <div className="flex flex-1 flex-col gap-4">
        <SkeletonBlock className="h-16 w-full" />
        <SkeletonBlock className="h-96 flex-1" />
      </div>
    </div>
  );
}
