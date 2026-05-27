import Link from 'next/link';
import { Bell, Plus } from 'lucide-react';
import { MOCK_USER } from '@/constants/learner';
import { ADMIN_USER } from '@/constants/admin';
import { EDUCATOR_USER } from '@/constants/educator';
import { buttonVariants } from '@/components/ui/button';
import type { SidebarRole } from '@/components/common/sidebar/Sidebar';

const ROLE_USER: Record<SidebarRole, { initials: string }> = {
  learner: MOCK_USER,
  educator: EDUCATOR_USER,
  admin: ADMIN_USER,
};

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

export default function TopBar({ role, title, subtitle, action }: TopBarProps) {
  const { initials } = ROLE_USER[role];

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="text-brand-navy truncate text-base font-bold">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-[11px] text-slate-400">{subtitle}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {action && (
          <Link
            href={action.href}
            className={buttonVariants({ variant: 'secondary', size: 'sm' })}
          >
            <Plus className="size-4" />
            {action.label}
          </Link>
        )}

        <button
          aria-label="Search"
          className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        ></button>

        <button
          aria-label="Notifications"
          className="relative flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <Bell className="size-4" />
          <span className="bg-brand-gold absolute top-1.5 right-1.5 size-2 rounded-full" />
        </button>

        <div className="bg-brand-gold flex size-8 items-center justify-center rounded-full text-xs font-bold text-white">
          {initials}
        </div>
      </div>
    </header>
  );
}
