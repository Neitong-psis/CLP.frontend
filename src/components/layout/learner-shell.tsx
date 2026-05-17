"use client";

import type { ReactNode } from "react";
import { memo } from "react";
import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { useSidebarState } from "@/hooks/use-sidebar-state";

interface LearnerShellProps {
  readonly children: ReactNode;
}

function LearnerShellComponent({ children }: LearnerShellProps) {
  const { collapsed, mobileOpen, toggleCollapsed, openMobile, closeMobile } =
    useSidebarState();

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0F172A]">
      <div className="lg:flex lg:min-h-screen">
        <AppSidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onToggleCollapsed={toggleCollapsed}
          onCloseMobile={closeMobile}
        />

        <div className="flex min-w-0 flex-1 flex-col lg:min-h-screen">
          <AppHeader onOpenMobileSidebar={openMobile} />
          <main className="flex-1">{children}</main>
          <AppFooter />
        </div>
      </div>
    </div>
  );
}

export const LearnerShell = memo(LearnerShellComponent);
