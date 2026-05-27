'use client';

import Link from 'next/link';
import { LogOut, Settings, User } from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface ProfileMenuProps {
  user: { name: string; email: string; initials: string; level?: number };
  roleLabel: string;
  settingsHref: string;
  profileHref: string;
  collapsed: boolean;
}

export default function ProfileMenu({
  user,
  roleLabel,
  settingsHref,
  profileHref,
  collapsed,
}: ProfileMenuProps) {
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

      <DropdownMenuContent side="top" align="start" className="w-56">
        <div className="px-4 py-3">
          <p className="text-sm font-semibold text-white">{user.name}</p>
          <p className="text-xs text-white/40">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={profileHref} className="flex items-center gap-2">
              <User className="size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={settingsHref} className="flex items-center gap-2">
              <Settings className="size-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href="/auth"
            className="flex items-center gap-2 text-red-400 focus:text-red-400"
          >
            <LogOut className="size-4" />
            Sign out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
