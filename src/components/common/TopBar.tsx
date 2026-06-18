import Link from 'next/link';
import { Plus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NotificationBell } from '@/components/common/NotificationBell';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { MobileMenuButton } from '@/components/common/sidebar/MobileMenuButton';
import type { SidebarRole } from '@/components/common/sidebar/Sidebar';

interface TopBarAction {
  label: string;
  href: string;
}

interface TopBarProps {
  role: SidebarRole;
  title: string;
  subtitle?: string;
  action?: TopBarAction;
}

const ROLE_BADGE: Record<SidebarRole, { label: string; className: string }> = {
  learner: {
    label: 'Learner',
    className: 'border-blue-400/30 bg-blue-500/10 text-blue-500',
  },
  educator: {
    label: 'Educator',
    className: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-500',
  },
  admin: {
    label: 'Admin',
    className: 'border-violet-400/30 bg-violet-500/10 text-violet-500',
  },
};

export default function TopBar({ role, title, subtitle, action }: TopBarProps) {
  const badge = ROLE_BADGE[role];

  return (
    <header className="border-border bg-card sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b px-4 sm:h-16 sm:gap-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="min-w-0 flex-1">
        <h1 className="text-foreground truncate text-base font-bold sm:text-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground truncate text-[11px]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right actions */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {action && (
          <Link
            href={action.href}
            className={buttonVariants({ variant: 'secondary', size: 'sm' })}
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">{action.label}</span>
          </Link>
        )}

        {/* Role badge — desktop only */}
        <span
          className={`hidden rounded-full border px-3 py-0.5 text-xs font-semibold lg:inline-flex ${badge.className}`}
        >
          {badge.label}
        </span>

        {/* Controls — desktop only; theme + language live in profile dropdown on mobile */}
        <div className="hidden lg:flex lg:items-center lg:gap-1.5">
          <ThemeToggle className="size-8" />
          <NotificationBell />
          <LanguageSwitcher />
        </div>

        {/* Notifications — mobile/tablet only; opens a bottom sheet */}
        <NotificationBell buttonClassName="size-9 lg:hidden" />

        {/* Profile avatar — mobile/tablet only; opens the nav dropdown */}
        <MobileMenuButton />
      </div>
    </header>
  );
}
