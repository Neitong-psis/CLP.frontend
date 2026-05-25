import { Bell, Search } from 'lucide-react';
import { EDUCATOR_USER } from '@/constants/educator';

interface EducatorTopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function EducatorTopBar({
  title,
  subtitle,
  actions,
}: EducatorTopBarProps) {
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
        {actions}

        <button
          aria-label="Search"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <Bell className="h-4 w-4" />
          <span className="bg-brand-gold absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
        </button>

        <div className="bg-brand-gold flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white">
          {EDUCATOR_USER.initials}
        </div>
      </div>
    </header>
  );
}
