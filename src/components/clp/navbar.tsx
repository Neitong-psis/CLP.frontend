"use client";

import { Menu } from "lucide-react";
import { useMemo } from "react";
import type { BreadcrumbItem } from "@/components/clp/breadcrumbs";
import { DashboardBreadcrumbs } from "@/components/clp/dashboard-breadcrumbs";
import { NotificationButton } from "@/components/clp/notification-button";
import { AvatarDropdown } from "@/components/clp/avatar-dropdown";
import type { UserProfileDto } from "@/types/dto";
import { notifyInfo } from "@/lib/toast";
import { useModalContext } from "@/contexts/modal-context";
import { cn } from "@/lib/cn";

interface NavbarProps {
  readonly greetingText: string;
  readonly profile: UserProfileDto;
  readonly breadcrumbs?: readonly BreadcrumbItem[];
  readonly onOpenMobileSidebar: () => void;
}

export function Navbar({
  greetingText,
  profile,
  breadcrumbs,
  onOpenMobileSidebar,
}: NavbarProps) {
  const { openModal } = useModalContext();

  const greetingLine = useMemo(() => `${greetingText}, ${profile.name.split(" ")[0] ?? profile.name}!`, [greetingText, profile.name]);

  return (
    <header className="sticky top-0 z-20 border-b border-[#E2E8F0] bg-[#F8FAFC]/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white shadow-sm lg:hidden",
            "hover:-translate-y-0.5 hover:shadow-md",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6A23C]",
          )}
          aria-label="Open navigation"
          onClick={onOpenMobileSidebar}
        >
          <Menu className="h-5 w-5 text-[#0F172A]" aria-hidden />
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-xl font-semibold tracking-tight text-[#0F172A] sm:text-2xl">
            {greetingLine}
          </h1>
          <div className="mt-2">
            <DashboardBreadcrumbs overrides={breadcrumbs} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NotificationButton
            count={3}
            onClick={() => {
              notifyInfo("You have 3 updates in My Learning.");
              openModal({
                title: "Notifications",
                description: "Preview of notification center (mock).",
                content: (
                  <ul className="space-y-2 text-sm text-[#64748B]">
                    <li>New module available in Web Development.</li>
                    <li>Your streak milestone is approaching.</li>
                    <li>Certificate issued for Cloud Essentials.</li>
                  </ul>
                ),
              });
            }}
          />

          <div className="hidden h-8 w-px bg-[#E2E8F0] sm:block" aria-hidden />

          <AvatarDropdown profile={profile} />
        </div>
      </div>
    </header>
  );
}
