"use client";

import { Menu } from "lucide-react";
import { memo, useMemo } from "react";
import { NotificationButton } from "@/components/clp/notification-button";
import { ThemeToggle } from "@/components/clp/theme-toggle";
import { useDashboardPageMeta } from "@/hooks/use-dashboard-page-meta";
import { useClientGreeting } from "@/hooks/use-greeting";
import { useLearnerProfile } from "@/providers/auth-provider";
import { cn } from "@/lib/cn";

interface AppHeaderProps {
  readonly onOpenMobileSidebar: () => void;
}

function AppHeaderComponent({ onOpenMobileSidebar }: AppHeaderProps) {
  const profile = useLearnerProfile();
  const pageMeta = useDashboardPageMeta();
  const greeting = useClientGreeting();

  const title = useMemo(() => {
    if (pageMeta.useGreeting) {
      const firstName = profile.name.split(" ")[0] ?? profile.name;
      return `${greeting}, ${firstName}!`;
    }
    return pageMeta.title;
  }, [greeting, pageMeta.title, pageMeta.useGreeting, profile.name]);

  const subtitle = `Live workspace synced for ${profile.email}`;

  return (
    <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-white/90 backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white lg:hidden",
            "hover:bg-[#F8FAFC]",
          )}
          aria-label="Open navigation"
          onClick={onOpenMobileSidebar}
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">
            {title}
          </h1>
          <p className="mt-0.5 truncate text-sm text-[#64748B]">{subtitle}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <NotificationButton count={1} />
        </div>
      </div>
    </header>
  );
}

export const AppHeader = memo(AppHeaderComponent);
