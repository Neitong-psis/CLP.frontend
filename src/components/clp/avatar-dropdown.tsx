"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOut, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import type { UserProfileDto } from "@/types/dto";
import { ROUTES } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";
import { notifySuccess } from "@/lib/toast";
import { cn } from "@/lib/cn";

interface AvatarDropdownProps {
  readonly profile: UserProfileDto;
  readonly className?: string;
}

export function AvatarDropdown({ profile, className }: AvatarDropdownProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
    notifySuccess("Signed out");
    router.push(ROUTES.auth.login);
  }, [router, signOut]);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-w-0 items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-3 py-2 shadow-sm",
            "transition hover:-translate-y-0.5 hover:shadow-md",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6A23C]",
            className,
          )}
        >
          <div className="hidden min-w-0 text-left sm:block">
            <p className="truncate text-sm font-semibold text-[#0F172A]">{profile.name}</p>
            <p className="truncate text-xs text-[#64748B]">{profile.email}</p>
          </div>

          <div
            aria-hidden="true"
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
              "bg-gradient-to-br from-[#F6D794] via-[#E6A23C] to-[#C97A16] font-semibold text-[#0F172A]",
            )}
          >
            {profile.avatarInitials}
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            "z-[60] min-w-[220px] rounded-xl border border-[#E2E8F0] bg-white p-1 shadow-xl",
          )}
          sideOffset={8}
          align="end"
        >
          <DropdownMenu.Label className="px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Signed in as
            </p>
            <p className="truncate text-sm font-semibold text-[#0F172A]">{profile.name}</p>
            <p className="truncate text-xs text-[#64748B]">{profile.email}</p>
          </DropdownMenu.Label>

          <DropdownMenu.Item asChild className="cursor-pointer rounded-lg outline-none">
            <Link
              href={ROUTES.dashboard.settings}
              className="flex items-center gap-2 px-3 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              <UserCircle2 className="h-4 w-4" aria-hidden />
              Profile
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-[#EEF2FF]" />

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              setOpen(false);
              handleSignOut();
            }}
            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-700 outline-none hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
