import type { ReactNode } from "react";
import { Shield } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface AuthShellProps {
  readonly children: ReactNode;
  readonly title?: string;
  readonly subtitle?: string;
}

export function AuthShell({ children, title, subtitle }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[#00153f]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        <aside className="relative hidden flex-col justify-center px-10 py-12 text-white lg:flex xl:px-16">
          <div className="inline-flex items-center gap-3">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl",
                "bg-gradient-to-br from-[#F6D794] via-[#E6A23C] to-[#C2410C]",
              )}
              aria-hidden
            >
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">{siteConfig.name}</p>
              <p className="text-sm font-medium text-[#E6A23C]">{siteConfig.fullName}</p>
            </div>
          </div>

          <div className="mt-16 max-w-lg">
            <h1 className="text-4xl font-bold leading-tight tracking-tight">
              Excellence in Education
            </h1>
            <p className="mt-5 text-base leading-7 text-white/70">
              Structured courses, guided progress, and role-based tools for every learning team.
            </p>
          </div>
        </aside>
        <main className="flex flex-col items-center justify-center px-4 py-10 sm:px-8">
          <div className="mb-8 flex items-center gap-3 text-white lg:hidden">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                "bg-gradient-to-br from-[#F6D794] via-[#E6A23C] to-[#C2410C]",
              )}
              aria-hidden
            >
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold">{siteConfig.name}</p>
              <p className="text-xs text-[#E6A23C]">{siteConfig.fullName}</p>
            </div>
          </div>
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            {title ? (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#00153f]">{title}</h1>
                {subtitle ? <p className="mt-2 text-sm text-[#64748B]">{subtitle}</p> : null}
              </div>
            ) : null}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
