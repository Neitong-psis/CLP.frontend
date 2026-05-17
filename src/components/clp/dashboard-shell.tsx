"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "@/components/clp/sidebar";
import { Navbar } from "@/components/clp/navbar";
import type { UserProfileDto } from "@/types/dto";
import type { BreadcrumbItem } from "@/components/clp/breadcrumbs";

interface DashboardShellProps {
  readonly profile: UserProfileDto;
  readonly greetingText: string;
  readonly breadcrumbs?: readonly BreadcrumbItem[];
  readonly children: ReactNode;
}

export function DashboardShell({
  profile,
  greetingText,
  breadcrumbs,
  children,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024 && mobileOpen) {
        setMobileOpen(false);
      }
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((v) => !v);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <div className="lg:flex lg:min-h-screen">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapsed={toggleCollapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={closeMobile}
        />

        <div className="min-w-0 flex-1 lg:flex lg:flex-col">
          <Navbar
            greetingText={greetingText}
            profile={profile}
            breadcrumbs={breadcrumbs}
            onOpenMobileSidebar={openMobile}
          />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
