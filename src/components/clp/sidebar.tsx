"use client";

import { BookOpen, ChevronLeft, ChevronRight, PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { learnerNavItems } from "@/constants/navigation";
import { UserRole } from "@/constants/roles";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface SidebarProps {
  readonly collapsed: boolean;
  readonly onToggleCollapsed: () => void;
  readonly mobileOpen: boolean;
  readonly onCloseMobile: () => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Close navigation"
        aria-hidden={!mobileOpen}
        tabIndex={mobileOpen ? 0 : -1}
        className={cn(
          "fixed inset-0 z-30 bg-black/35 backdrop-blur-[1px] lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onCloseMobile}
      />

      {/* Sidebar */}
      <aside
        aria-label="Primary navigation"
        className={cn(
          "z-40 flex h-[100dvh] w-[280px] flex-col bg-[#0F172A] text-white shadow-xl",
          "transition-[transform,width] duration-200 ease-out",
          "fixed left-0 top-0 lg:relative lg:left-auto lg:top-auto lg:shadow-none lg:transition-[transform,width]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          collapsed ? "lg:w-[84px]" : "lg:w-[280px]",
          "lg:sticky lg:top-0 lg:h-screen lg:shrink-0",
        )}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-5">
          <div className={cn("flex min-w-0 items-center gap-3", collapsed && "lg:justify-center lg:px-0")}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
              <BookOpen className="h-5 w-5 text-[#E6A23C]" aria-hidden />
            </div>
            <div className={cn("min-w-0", collapsed && "lg:hidden")}>
              <p className="text-sm font-semibold tracking-wide">{siteConfig.name}</p>
              <p className="truncate text-xs text-white/60">{siteConfig.fullName}</p>
            </div>
          </div>
        </div>

        <div className={cn("px-3", collapsed && "lg:px-2")}>
          <div
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold",
              "w-fit bg-[#1E3A5F] text-[#EEF2FF] ring-1 ring-white/10",
              collapsed && "lg:mx-auto lg:w-16 lg:text-center lg:text-[10px]",
            )}
          >
            <span className={cn(collapsed && "lg:hidden")}>Learner</span>
            <span className={cn(!collapsed && "hidden", "hidden lg:inline")}>L</span>
          </div>
          <div className="sr-only">{`Role: ${UserRole.Learner}`}</div>
        </div>

        <nav className={cn("mt-6 flex-1 space-y-1 overflow-y-auto px-2 pb-4", collapsed && "lg:px-2")}>
          {learnerNavItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} prefetch onClick={onCloseMobile}>
                <motion.span
                  layout
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                    active
                      ? "bg-[#E6A23C] font-semibold text-[#0F172A]"
                      : "text-white/80 hover:bg-white/10 hover:text-white",
                    collapsed && "lg:justify-center lg:gap-0",
                  )}
                  whileHover={{ x: collapsed ? 0 : 3 }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />

                  <span className={cn("min-w-0 flex-1 truncate", collapsed && "lg:hidden")}>
                    {item.label}
                  </span>

                  {typeof item.badgeCount === "number" && !collapsed ? (
                    <span
                      className={cn(
                        "inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold",
                        active ? "bg-[#0F172A]/10 text-[#0F172A]" : "bg-white/10 text-white",
                      )}
                    >
                      {item.badgeCount}
                    </span>
                  ) : null}

                  {active ? (
                    <ChevronRight className={cn("h-4 w-4", collapsed && "lg:hidden")} aria-hidden />
                  ) : null}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        <div className={cn("mt-auto border-t border-white/10 p-3", collapsed && "lg:p-2")}>
          <button
            type="button"
            onClick={onToggleCollapsed}
            className={cn(
              "hidden lg:flex lg:w-full items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm text-white/80",
              "hover:bg-white/10 hover:text-white",
              collapsed && "lg:justify-center",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" aria-hidden />
            ) : (
              <>
                <span className="inline-flex items-center gap-2">
                  <PanelLeftClose className="h-4 w-4" aria-hidden />
                  Collapse
                </span>
                <ChevronLeft className="h-4 w-4 opacity-70" aria-hidden />
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
