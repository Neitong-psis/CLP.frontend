import { Bell } from 'lucide-react';
import { MOCK_USER } from '@/config/learner';

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <Bell className="h-4 w-4" />
          <span className="bg-brand-gold absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full" />
        </button>

        <div className="bg-brand-gold ml-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white">
          {MOCK_USER.initials}
        </div>
      </div>
    </div>
  );
}
