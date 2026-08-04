import { Mail } from 'lucide-react';
import { useEducatorStudentsT } from '@/i18n';
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
  onView,
}: {
  student: StudentRowData;
  index: number;
  onView?: () => void;
}) {
  const t = useEducatorStudentsT();

  return (
    <tr
      className="group animate-fade-in hover:bg-muted/40 transition-colors"
      style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
    >
      <td className="px-5 py-4">
        <button
          type="button"
          onClick={onView}
          className="flex items-center gap-3 text-left"
        >
          <div
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition-transform group-hover/name:scale-105',
              avatarColor(student.name),
            )}
          >
            {initials(student.name)}
          </div>
          <div className="min-w-0">
            <p className="text-foreground hover:text-brand-gold truncate font-semibold underline-offset-2 transition-colors hover:underline">
              {student.name}
            </p>
            <p className="text-muted-foreground truncate text-[11px]">
              {student.email}
            </p>
          </div>
        </button>
      </td>

      <td className="max-w-52 px-5 py-4">
        <p className="text-foreground truncate text-[13px] font-medium">
          {student.course}
        </p>
        <p className="text-muted-foreground text-[11px]">
          {t('enrolled', { date: student.enrolled })}
        </p>
      </td>

      <td className="px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
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
          <span className="text-foreground text-xs font-semibold tabular-nums">
            {student.progress}%
          </span>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap',
            ACTIVITY_STYLE[student.activity],
          )}
        >
          <span className="size-1.5 shrink-0 rounded-full bg-current" />
          {student.activity}
        </span>
      </td>

      <td className="px-5 py-4">
        <span
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap',
            STATUS_STYLE[student.status],
          )}
        >
          {STATUS_LABEL[student.status]}
        </span>
      </td>

      <td className="text-muted-foreground px-5 py-4 text-[13px]">
        {student.lastSeen}
      </td>

      <td className="text-foreground px-5 py-4 text-right text-[13px] font-bold tabular-nums">
        {student.earnings}
      </td>

      <td className="px-3 py-4">
        <a
          href={`mailto:${student.email}`}
          title={`Email ${student.name}`}
          className="hover:text-brand-gold text-muted-foreground/40 flex h-8 w-8 items-center justify-center rounded-lg opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-amber-500/10 focus-visible:opacity-100"
        >
          <Mail className="h-4 w-4" />
        </a>
      </td>
    </tr>
  );
}
