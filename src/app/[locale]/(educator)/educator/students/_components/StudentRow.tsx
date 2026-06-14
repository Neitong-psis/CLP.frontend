import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { StudentRow as StudentRowData } from '@/constants/educator';
import {
  ACTIVITY_STYLE,
  STATUS_LABEL,
  STATUS_STYLE,
  avatarColor,
  initials,
  progressColor,
} from '../_lib/constants';

export function StudentRow({
  student,
  index,
}: {
  student: StudentRowData;
  index: number;
}) {
  return (
    <tr
      className="group animate-fade-in transition-colors hover:bg-slate-50/70"
      style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white',
              avatarColor(student.name),
            )}
          >
            {initials(student.name)}
          </div>
          <div className="min-w-0">
            <p className="text-brand-navy truncate font-semibold">
              {student.name}
            </p>
            <p className="truncate text-[11px] text-slate-400">
              {student.email}
            </p>
          </div>
        </div>
      </td>

      <td className="max-w-52 px-5 py-4">
        <p className="text-brand-navy truncate text-[13px] font-medium">
          {student.course}
        </p>
        <p className="text-[11px] text-slate-400">
          Enrolled {student.enrolled}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn(
                'animate-highlight-in h-full rounded-full',
                progressColor(student.progress),
              )}
              style={{
                width: `${student.progress}%`,
                animationDelay: `${0.2 + Math.min(index, 10) * 0.05}s`,
              }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-600 tabular-nums">
            {student.progress}%
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
            ACTIVITY_STYLE[student.activity],
          )}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {student.activity}
        </span>
      </td>

      <td className="px-5 py-4">
        <span
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
            STATUS_STYLE[student.status],
          )}
        >
          {STATUS_LABEL[student.status]}
        </span>
      </td>

      <td className="px-5 py-4 text-[13px] text-slate-500">
        {student.lastSeen}
      </td>

      <td className="text-brand-navy px-5 py-4 text-right text-[13px] font-bold tabular-nums">
        {student.earnings}
      </td>

      <td className="px-3 py-4">
        <a
          href={`mailto:${student.email}`}
          title={`Email ${student.name}`}
          className="hover:text-brand-gold flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-amber-50 focus-visible:opacity-100"
        >
          <Mail className="h-4 w-4" />
        </a>
      </td>
    </tr>
  );
}
