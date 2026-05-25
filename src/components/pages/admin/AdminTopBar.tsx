import { Bell, Settings2, ShieldCheck } from 'lucide-react';
import { ADMIN_USER } from '@/constants/admin';

interface AdminTopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function AdminTopBar({
  title,
  subtitle,
  actions,
}: AdminTopBarProps) {
  return (
    <div className="bg-brand-navy sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-white/[0.07] px-4 sm:px-6 lg:px-8">
      <div className="min-w-0">
        <h1 className="truncate text-base font-bold text-white sm:text-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-[11px] text-white/40">{subtitle}</p>
        )}
      </div>

      <div className="ml-4 flex shrink-0 items-center gap-2">
        {actions && <div className="mr-1">{actions}</div>}

        {/* Platform Admin badge */}
        <span className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold hidden items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold sm:flex">
          <ShieldCheck className="h-3 w-3" />
          Platform Admin
        </span>

        <button
          aria-label="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.07] hover:text-white/70"
        >
          <Bell className="h-4 w-4" />
          <span className="bg-brand-gold absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full" />
        </button>

        <button
          aria-label="Quick settings"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.07] hover:text-white/70"
        >
          <Settings2 className="h-4 w-4" />
        </button>

        <div className="bg-brand-gold ring-brand-gold/30 ml-1 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ring-2">
          {ADMIN_USER.initials}
        </div>
      </div>
    </div>
  );
}
