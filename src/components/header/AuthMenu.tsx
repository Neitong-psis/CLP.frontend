'use client';

import Link from 'next/link';
import { LogIn, UserPlus, GraduationCap, BookOpen } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils/cn';
import { useHeaderT } from '@/i18n';
import { authHref } from '@/constants/auth-links';
import { scrolledTheme } from '@/components/header/scrolledTheme';

function RoleMenuItems({ tab }: { tab: 'login' | 'signup' }) {
  const t = useHeaderT();
  return (
    <>
      <DropdownMenuItem asChild theme="light">
        <Link href={authHref(tab, 'learner')}>
          <GraduationCap aria-hidden className="h-4 w-4 opacity-60" />
          {t('learner')}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild theme="light">
        <Link href={authHref(tab, 'educator')}>
          <BookOpen aria-hidden className="h-4 w-4 opacity-60" />
          {t('educator')}
        </Link>
      </DropdownMenuItem>
    </>
  );
}

export function AuthMenu({ scrolled }: { scrolled: boolean }) {
  const t = useHeaderT();
  const theme = scrolledTheme(scrolled);

  return (
    <div className="hidden items-center gap-2.5 md:flex">
      <span
        aria-hidden
        className={cn('h-5 w-px transition-colors duration-300', theme.divider)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-px focus:outline-none',
              theme.loginBtn,
            )}
          >
            <span
              aria-hidden
              className={cn(
                'absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0',
                theme.loginBtnOverlay,
              )}
            />
            <LogIn
              aria-hidden
              className="relative h-4 w-4 transition-[translate] duration-200 group-hover:translate-x-0.5"
            />
            <span className="relative">{t('login')}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          theme="light"
          className="min-w-36 py-1.5"
        >
          <RoleMenuItems tab="login" />
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="group bg-brand-gold text-brand-navy relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-px hover:shadow-[0_0_0_4px_rgba(244,163,0,0.25)] focus:outline-none">
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-x-0"
            />
            <UserPlus
              aria-hidden
              className="relative h-4 w-4 transition-[scale] duration-200 group-hover:scale-110"
            />
            <span className="relative">{t('register')}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          theme="light"
          className="min-w-36 py-1.5"
        >
          <RoleMenuItems tab="signup" />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
