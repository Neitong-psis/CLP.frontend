'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Settings, Languages, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuth } from '@/hooks/use-auth';

interface ProfileMenuProps {
  user: { name: string; email: string; initials: string; level?: number };
  roleLabel: string;
  settingsHref: string;
  profileHref: string;
  collapsed: boolean;
  learnMoreHref?: string;
  /** Where to land after a successful logout (e.g. `/admin/login`). */
  logoutHref?: string;
}

export default function ProfileMenu({
  user,
  roleLabel,
  settingsHref,
  profileHref,
  collapsed,
  learnMoreHref,
  logoutHref = '/auth',
}: ProfileMenuProps) {
  const router = useRouter();
  const { logout, isLoggingOut } = useAuth();

  async function handleLogout(): Promise<void> {
    try {
      await logout();
    } finally {
      router.replace(logoutHref);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/[0.07] focus-visible:outline-none">
          <div className="relative shrink-0">
            <div
              className={cn(
                'bg-brand-gold flex size-9 items-center justify-center rounded-full text-sm font-bold text-white',
                user.level != null && 'ring-brand-gold/30 ring-2',
              )}
            >
              {user.initials}
            </div>
          </div>
          <div
            className={cn(
              'min-w-0 flex-1 overflow-hidden text-left transition-[opacity,max-width] duration-300',
              collapsed ? 'max-w-0 opacity-0' : 'max-w-50 opacity-100',
            )}
          >
            <p className="truncate text-sm font-semibold whitespace-nowrap text-white">
              {user.name}
            </p>
            <p className="truncate text-xs whitespace-nowrap text-white/40">
              {roleLabel}
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        className="border-border bg-card w-56 border p-0 shadow-lg dark:bg-[#071225]"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="bg-brand-gold flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
            {user.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-foreground truncate text-sm font-bold">
              {user.name}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {user.email}
            </p>
          </div>
          <ThemeToggle className="-mr-1 size-8 shrink-0" />
        </div>

        <DropdownMenuSeparator className="bg-border" />

        <div className="px-2 py-1.5">
          <DropdownMenuItem
            asChild
            className="text-foreground focus:bg-muted focus:text-foreground rounded-lg"
          >
            <Link
              href={settingsHref}
              className="flex items-center gap-3 px-2 py-2"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                <Settings className="size-3.5 text-amber-500" />
              </span>
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border my-1" />

          <DropdownMenuItem
            asChild
            className="text-foreground focus:bg-muted focus:text-foreground rounded-lg"
          >
            <Link
              href={profileHref}
              className="flex items-center gap-3 px-2 py-2"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                <Languages className="size-3.5 text-blue-500" />
              </span>
              <span className="text-sm font-medium">Language</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border my-1" />

          <DropdownMenuItem
            asChild
            className="text-foreground focus:bg-muted focus:text-foreground rounded-lg"
          >
            <Link
              href={learnMoreHref ?? '#'}
              className="flex items-center gap-3 px-2 py-2"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                <HelpCircle className="size-3.5 text-emerald-500" />
              </span>
              <span className="text-sm font-medium">Learn More</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border my-1" />

          <DropdownMenuItem
            className="rounded-lg text-rose-500 focus:bg-rose-500/10 focus:text-rose-500"
            onSelect={handleLogout}
          >
            <button
              type="button"
              onClick={() => void handleLogout()}
              disabled={isLoggingOut}
              className="flex w-full cursor-pointer items-center gap-3 px-2 py-2"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-rose-500/10">
                <LogOut className="size-3.5 text-rose-500" />
              </span>
              <span className="text-sm font-medium">
                {isLoggingOut ? 'Signing out…' : 'Logout'}
              </span>
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
