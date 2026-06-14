import Link from 'next/link';
import { Plus } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NotificationBell } from '@/components/common/NotificationBell';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
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
    className: 'border-blue-200 bg-blue-50 text-blue-600',
  },
  educator: {
    label: 'Educator',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  },
  admin: {
    label: 'Admin',
    className: 'border-violet-200 bg-violet-50 text-violet-600',
  },
};

// iconBtn removed — not used

export default function TopBar({ role, title, subtitle, action }: TopBarProps) {
  const badge = ROLE_BADGE[role];

  return (
    <header className="border-border bg-card sticky top-0 z-10 flex h-14 shrink-0 items-center gap-4 border-b px-4 sm:h-16 sm:px-6 lg:px-8">
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

        {/* Role badge */}
        <span
          className={`hidden rounded-full border px-3 py-0.5 text-xs font-semibold sm:inline-flex ${badge.className}`}
        >
          {badge.label}
        </span>

        {/* Dark mode toggle */}
        <ThemeToggle className="size-8" />

        {/* Notifications */}
        <NotificationBell />

        {/* Language picker */}
        <LanguageSwitcher scrolled={false} />
      </div>
    </header>
  );
}
