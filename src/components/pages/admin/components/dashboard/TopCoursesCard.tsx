import { useAdminTopCoursesT } from '@/i18n';
import { cn } from '@/lib/utils/cn';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TopCourse {
  title: string;
  students: string;
  progress: number;
  instructor?: string;
}

export interface TopCoursesCardProps {
  data: readonly TopCourse[];
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(title: string): string {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

const AVATAR_TONES = [
  'bg-accent-blue/10 dark:bg-accent-blue/20 text-accent-blue',
  'bg-accent-indigo/10 dark:bg-accent-indigo/20 text-accent-indigo',
];

function completionColor(pct: number): string {
  if (pct >= 80) return 'var(--chart-emerald)';
  if (pct >= 60) return 'var(--chart-warn)';
  return 'var(--chart-bad)';
}

function completionPill(pct: number): string {
  if (pct >= 80) return 'bg-emerald-500/10 text-emerald-500';
  if (pct >= 60) return 'bg-amber-500/10 text-amber-500';
  return 'bg-rose-500/10 text-rose-500';
}

function rankStyle(i: number): string {
  if (i === 0) return 'text-accent-blue font-bold';
  if (i < 3) return 'text-foreground font-medium';
  return 'text-muted-foreground font-medium';
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TopCoursesCard({ data, className }: TopCoursesCardProps) {
  const t = useAdminTopCoursesT();
  return (
    <section
      className={cn(
        'border-border bg-card flex max-h-110 flex-col overflow-hidden rounded-2xl border-[0.5px]',
        className,
      )}
      aria-label="Top performing courses"
    >
      <header className="border-border flex shrink-0 items-center justify-between border-b px-6 py-4">
        <h3 className="text-foreground text-[14px] font-medium">
          {t('title')}
        </h3>
        <span className="text-muted-foreground text-[12px]">
          {t('coursesCount', { count: data.length })}
        </span>
      </header>

      {data.length === 0 ? (
        <p className="text-muted-foreground px-6 py-10 text-center text-[13px]">
          {t('noData')}
        </p>
      ) : (
        <ul className="divide-border scrollbar-none flex-1 divide-y overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {data.map((course, i) => (
            <li
              key={course.title}
              className="hover:bg-muted flex cursor-pointer items-center gap-4 px-6 py-3.5 transition-colors duration-150"
            >
              {/* Rank */}
              <span
                className={cn(
                  'w-4 shrink-0 text-center text-[13px] tabular-nums',
                  rankStyle(i),
                )}
                aria-label={`Rank ${i + 1}`}
              >
                {i + 1}
              </span>

              {/* Avatar */}
              <span
                className={cn(
                  'flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-medium',
                  AVATAR_TONES[i % AVATAR_TONES.length],
                )}
                aria-hidden="true"
              >
                {initials(course.title)}
              </span>

              {/* Identity + inline progress */}
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-[13px] font-medium">
                  {course.title}
                </p>
                {course.instructor && (
                  <p className="text-muted-foreground mt-0.5 truncate text-[11px]">
                    {course.instructor}
                  </p>
                )}
                <div className="bg-muted mt-1.5 h-0.5 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: completionColor(course.progress),
                    }}
                  />
                </div>
              </div>

              {/* Enrollment */}
              <div className="hidden shrink-0 text-right sm:block">
                <p className="text-foreground text-[13px] font-medium tabular-nums">
                  {course.students}
                </p>
                <p className="text-muted-foreground text-[11px]">
                  {t('enrolled')}
                </p>
              </div>

              {/* Completion pill */}
              <span
                className={cn(
                  'w-11 shrink-0 rounded-full py-1 text-center text-[12px] font-medium tabular-nums',
                  completionPill(course.progress),
                )}
              >
                {course.progress}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
