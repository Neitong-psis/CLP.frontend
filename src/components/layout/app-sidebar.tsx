"use client";

import { ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import Logo from "@/components/common/Logo";
import { ROUTES } from "@/config/routes";
import { learnerNavItems } from "@/constants/navigation";
import { UserRole } from "@/constants/roles";
import { useLearnerProfile } from "@/providers/auth-provider";
import { cn } from "@/lib/cn";

interface AppSidebarProps {
  readonly collapsed: boolean;
  readonly mobileOpen: boolean;
  readonly onToggleCollapsed: () => void;
  readonly onCloseMobile: () => void;
}

function AppSidebarComponent({
  collapsed,
  mobileOpen,
  onToggleCollapsed,
  onCloseMobile,
}: AppSidebarProps) {
  const pathname = usePathname();
  const profile = useLearnerProfile();

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        aria-hidden={!mobileOpen}
        tabIndex={mobileOpen ? 0 : -1}
        className={cn(
          "fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onCloseMobile}
      />

      <aside
        aria-label="Primary navigation"
        className={cn(
          "fixed left-0 top-0 z-40 flex h-[100dvh] flex-col bg-[#00153f] text-white shadow-xl",
          "transition-[transform,width] duration-200 ease-out",
          "lg:sticky lg:top-0 lg:h-screen lg:shadow-none",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "w-[84px] lg:w-[84px]" : "w-[280px]",
        )}
      >
        <div className="flex items-start justify-between gap-2 px-4 pb-2 pt-5">
          {!collapsed && <Logo size="sm" variant="light" />}
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="hidden rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white lg:inline-flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" aria-hidden />
            ) : (
              <PanelLeftClose className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>

        <div className={cn("px-4 pb-2", collapsed && "px-2")}>
          <span
            className={cn(
              "inline-flex rounded-full bg-[#1E3A5F] px-3 py-1 text-xs font-semibold text-[#EEF2FF] ring-1 ring-white/10",
              collapsed && "mx-auto w-full justify-center px-1",
            )}
          >
            {collapsed ? "L" : "Learner"}
          </span>
          <span className="sr-only">{`Role: ${UserRole.Learner}`}</span>
        </div>

        <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-2 pb-4">
          {learnerNavItems.map((item) => {
            const active =
              item.href === ROUTES.dashboard.root
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} prefetch onClick={onCloseMobile}>
                <span
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                    active
                      ? "bg-[#E6A23C] font-semibold text-[#00153f] shadow-sm"
                      : "text-white/75 hover:bg-white/10 hover:text-white",
                    collapsed && "justify-center px-2",
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                  {!collapsed ? (
                    <>
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      {typeof item.badgeCount === "number" ? (
                        <span
                          className={cn(
                            "inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold",
                            active ? "bg-[#00153f]/15 text-[#00153f]" : "bg-white/10 text-white",
                          )}
                        >
                          {item.badgeCount}
                        </span>
                      ) : null}
                      {active ? <ChevronRight className="h-4 w-4 shrink-0" aria-hidden /> : null}
                    </>
                  ) : null}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className={cn("mt-auto border-t border-white/10 p-4", collapsed && "p-2")}>
          <div
            className={cn(
              "flex items-center gap-3 rounded-xl bg-white/5 p-2 ring-1 ring-white/10",
              collapsed && "justify-center",
            )}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6A23C] text-sm font-bold text-[#00153f]"
              aria-hidden
            >
              {profile.avatarInitials}
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{profile.name}</p>
                <p className="truncate text-xs text-white/60">{profile.email}</p>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}

export const AppSidebar = memo(AppSidebarComponent);
