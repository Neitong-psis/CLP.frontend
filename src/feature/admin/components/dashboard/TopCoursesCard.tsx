import { cn } from '@/utils/cn';

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
  'bg-accent-blue-soft text-accent-blue',
  'bg-accent-indigo-soft text-accent-indigo',
];

function completionColor(pct: number): string {
  if (pct >= 80) return '#10b981';
  if (pct >= 60) return '#f59e0b';
  return '#f43f5e';
}

function completionPill(pct: number): string {
  if (pct >= 80) return 'bg-emerald-50 text-emerald-700';
  if (pct >= 60) return 'bg-amber-50 text-amber-700';
  return 'bg-rose-50 text-rose-700';
}

function rankStyle(i: number): string {
  if (i === 0) return 'text-accent-blue font-bold';
  if (i < 3) return 'text-slate-600 font-medium';
  return 'text-slate-300 font-medium';
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TopCoursesCard({ data, className }: TopCoursesCardProps) {
  return (
    <section
      className={cn(
        'overflow-hidden rounded-2xl border-[0.5px] border-slate-200 bg-white',
        className,
      )}
      aria-label="Top performing courses"
    >
      <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <h3 className="text-[14px] font-medium text-slate-900">
          Top Performing Courses
        </h3>
        <span className="text-[12px] text-slate-400">
          {data.length} courses
        </span>
      </header>

      {data.length === 0 ? (
        <p className="px-6 py-10 text-center text-[13px] text-slate-400">
          No course data yet.
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {data.map((course, i) => (
            <li
              key={course.title}
              className="flex cursor-pointer items-center gap-4 px-6 py-3.5 transition-colors duration-150 hover:bg-slate-50"
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
                <p className="truncate text-[13px] font-medium text-slate-900">
                  {course.title}
                </p>
                {course.instructor && (
                  <p className="mt-0.5 truncate text-[11px] text-slate-400">
                    {course.instructor}
                  </p>
                )}
                <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-slate-100">
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
                <p className="text-[13px] font-medium text-slate-900 tabular-nums">
                  {course.students}
                </p>
                <p className="text-[11px] text-slate-400">enrolled</p>
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
