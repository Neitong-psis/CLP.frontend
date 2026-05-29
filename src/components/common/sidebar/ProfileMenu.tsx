'use client';

import Link from 'next/link';
import { LogOut, Settings, Languages, HelpCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
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

      <DropdownMenuContent
        side="top"
        align="start"
        className="w-56 border border-slate-100 bg-white p-0 shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="bg-brand-gold flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
            {user.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-400">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-slate-100" />

        <div className="px-2 py-1.5">
          <DropdownMenuItem
            asChild
            className="rounded-lg text-slate-700 focus:bg-slate-50 focus:text-slate-900"
          >
            <Link
              href={settingsHref}
              className="flex items-center gap-3 px-2 py-2"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-50">
                <Settings className="size-3.5 text-amber-500" />
              </span>
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-slate-100" />

          <DropdownMenuItem
            asChild
            className="rounded-lg text-slate-700 focus:bg-slate-50 focus:text-slate-900"
          >
            <Link
              href={profileHref}
              className="flex items-center gap-3 px-2 py-2"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <Languages className="size-3.5 text-blue-500" />
              </span>
              <span className="text-sm font-medium">Language</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-slate-100" />

          <DropdownMenuItem
            asChild
            className="rounded-lg text-slate-700 focus:bg-slate-50 focus:text-slate-900"
          >
            <a href="#" className="flex items-center gap-3 px-2 py-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <HelpCircle className="size-3.5 text-emerald-500" />
              </span>
              <span className="text-sm font-medium">Learn More</span>
            </a>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1 bg-slate-100" />

          <DropdownMenuItem
            asChild
            className="rounded-lg text-rose-500 focus:bg-rose-50 focus:text-rose-600"
          >
            <a href="/auth" className="flex items-center gap-3 px-2 py-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-rose-50">
                <LogOut className="size-3.5 text-rose-500" />
              </span>
              <span className="text-sm font-medium">Logout</span>
            </a>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
