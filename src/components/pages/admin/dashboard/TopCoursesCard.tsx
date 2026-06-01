import { cn } from '@/utils/cn';
import type { TopCourseVisibility } from '@/constants/admin';

export interface TopCourse {
  title: string;
  students: string;
  visibility: TopCourseVisibility;
  progress: number;
}

export interface TopCoursesCardProps {
  data: readonly TopCourse[];
}

const VISIBILITY_STYLE: Record<TopCourseVisibility, string> = {
  Public: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Archive: 'bg-slate-100 text-slate-500',
};

export function TopCoursesCard({ data }: TopCoursesCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow">
      <h3 className="mb-5 text-sm font-bold text-slate-900">
        Top Performing Courses
      </h3>
      <ul className="divide-y divide-slate-100">
        {data.map((c, i) => (
          <li key={c.title} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 w-5 shrink-0 text-[11px] font-bold text-slate-400">
                #{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-800">
                  {c.title}
                </p>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="bg-brand-gold h-full rounded-full"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-400">
                  {c.students} students
                </p>
              </div>
              <span
                className={cn(
                  'ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold',
                  VISIBILITY_STYLE[c.visibility],
                )}
              >
                {c.visibility}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
