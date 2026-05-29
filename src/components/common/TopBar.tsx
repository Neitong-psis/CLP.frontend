import Link from 'next/link';
import { Bell, Plus, Moon, Globe } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
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

const iconBtn =
  'flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700';

export default function TopBar({ role, title, subtitle, action }: TopBarProps) {
  const badge = ROLE_BADGE[role];

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:h-16 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="min-w-0 flex-1">
        <h1 className="text-brand-navy truncate text-base font-bold sm:text-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-[11px] text-slate-400">{subtitle}</p>
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
        <button aria-label="Toggle dark mode" className={iconBtn}>
          <Moon className="size-4" />
        </button>

        {/* Notifications */}
        <button aria-label="Notifications" className={`relative ${iconBtn}`}>
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
        </button>

        {/* Language / Globe */}
        <button aria-label="Language" className={iconBtn}>
          <Globe className="size-4" />
        </button>
      </div>
    </header>
  );
}
