'use client';

import { useEffect } from 'react';
import {
  Activity,
  BookOpen,
  CalendarDays,
  Clock,
  DollarSign,
  Mail,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { StudentRow, StudentActivity } from '@/constants/educator';
import {
  ACTIVITY_STYLE,
  STATUS_LABEL,
  STATUS_STYLE,
  avatarColor,
  initials,
  progressColor,
} from '../_lib/constants';

const ACTIVITY_BANNER: Record<StudentActivity, { from: string; to: string }> = {
  'Highly active': { from: '#059669', to: '#0891b2' },
  Active: { from: '#2563eb', to: '#7c3aed' },
  'At risk': { from: '#f59e0b', to: '#ef4444' },
};

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="border-border bg-background flex flex-col items-center gap-1.5 rounded-xl border px-3 py-4">
      <Icon className="text-muted-foreground h-4 w-4" />
      <span className="text-foreground text-sm leading-none font-bold">
        {value}
      </span>
      <span className="text-muted-foreground text-center text-[10px] leading-tight font-medium">
        {label}
      </span>
    </div>
  );
}

export function StudentViewModal({
  student,
  onClose,
}: {
  student: StudentRow;
  onClose: () => void;
}) {
  const banner = ACTIVITY_BANNER[student.activity];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${student.name} — Student profile`}
        className="animate-scale-in bg-card w-full max-w-md overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 rounded-lg p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Banner */}
        <div
          className="relative h-28"
          style={{
            background: `linear-gradient(135deg, ${banner.from} 0%, ${banner.to} 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Avatar overlapping banner */}
          <div
            className="ring-card absolute -bottom-9 left-1/2 -translate-x-1/2 rounded-2xl ring-4"
            style={{ zIndex: 1 }}
          >
            <div
              className={cn(
                'flex items-center justify-center rounded-2xl text-xl font-extrabold text-white shadow-lg',
                avatarColor(student.name),
              )}
              style={{ width: 72, height: 72 }}
            >
              {initials(student.name)}
            </div>
          </div>
        </div>

        {/* Identity */}
        <div className="px-6 pb-4 text-center" style={{ paddingTop: 52 }}>
          <h2 className="text-foreground text-xl font-bold tracking-tight">
            {student.name}
          </h2>
          <p className="text-muted-foreground mt-0.5 flex items-center justify-center gap-1.5 text-sm">
            <Mail className="h-3.5 w-3.5" />
            {student.email}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span
              className={cn(
                'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                STATUS_STYLE[student.status],
              )}
            >
              {STATUS_LABEL[student.status]}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
                ACTIVITY_STYLE[student.activity],
              )}
            >
              <Activity className="h-3 w-3" />
              {student.activity}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-border mx-6 border-t" />

        {/* Course progress */}
        <div className="border-border mx-6 mt-4 mb-1 rounded-xl border px-4 py-3.5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              Enrolled Course
            </p>
            <span className="text-foreground text-xs font-bold tabular-nums">
              {student.progress}%
            </span>
          </div>
          <p className="text-foreground mb-2.5 truncate text-sm font-semibold">
            {student.course}
          </p>
          <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                progressColor(student.progress),
              )}
              style={{ width: `${student.progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 px-6 py-4">
          <StatCard
            icon={CalendarDays}
            label="Enrolled"
            value={student.enrolled}
          />
          <StatCard icon={Clock} label="Last Seen" value={student.lastSeen} />
          <StatCard
            icon={DollarSign}
            label="Revenue"
            value={student.earnings}
          />
        </div>

        {/* Footer */}
        <div className="border-border flex items-center justify-end gap-2 border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="border-border text-muted-foreground hover:bg-muted rounded-xl border px-5 py-2 text-sm font-semibold transition-colors"
          >
            Close
          </button>
          <a
            href={`mailto:${student.email}`}
            className="bg-brand-gold hover:bg-brand-gold/90 flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-bold text-white transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            Email Student
          </a>
        </div>
      </div>
    </div>
  );
}
