import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { COURSE_ROWS } from '../_lib/metrics';

const TABLE_COLS = ['#', 'Course', 'Enrolled', 'Completion', 'Revenue'];

const MEDALS = [
  'from-amber-300 to-brand-gold text-brand-navy', // 1st
  'from-slate-200 to-slate-400 text-slate-700', // 2nd
  'from-orange-300 to-amber-600 text-white', // 3rd
];

function completionTone(v: number) {
  if (v >= 70) return { bar: 'bg-emerald-500', text: 'text-emerald-600' };
  if (v >= 50) return { bar: 'bg-brand-gold', text: 'text-brand-gold-dark' };
  return { bar: 'bg-rose-400', text: 'text-rose-500' };
}

export function CoursePerformanceTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-brand-navy text-sm font-bold">
            Course Performance
          </h3>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Ranked by enrollment count
          </p>
        </div>
        <span className="hidden rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-500 sm:inline-flex">
          {COURSE_ROWS.length} active courses
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              {TABLE_COLS.map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[11px] font-semibold tracking-wide text-slate-400 uppercase sm:px-6"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COURSE_ROWS.map((course, i) => {
              const tone = completionTone(course.completion);
              return (
                <tr
                  key={course.title}
                  className="animate-fade-in-up group border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/70 hover:shadow-[inset_3px_0_0_0_var(--color-brand-gold)]"
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  {/* Rank medal */}
                  <td className="px-5 py-4 sm:px-6">
                    <span
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition-transform duration-200 group-hover:scale-110',
                        i < 3
                          ? cn('bg-linear-to-br shadow-sm', MEDALS[i])
                          : 'bg-slate-100 text-slate-400',
                      )}
                    >
                      {course.rank}
                    </span>
                  </td>

                  {/* Title */}
                  <td className="text-brand-navy max-w-[260px] truncate px-5 py-4 font-semibold sm:px-6">
                    {course.title}
                  </td>

                  {/* Enrolled + share bar */}
                  <td className="px-5 py-4 sm:px-6">
                    <p className="text-brand-navy font-semibold tabular-nums">
                      {course.enrolled.toLocaleString()}
                    </p>
                    <div className="mt-1 h-1 w-20 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="bg-brand-navy/30 animate-highlight-in h-full origin-left rounded-full"
                        style={{
                          width: `${course.share * 100}%`,
                          animationDelay: `${0.3 + i * 0.08}s`,
                        }}
                      />
                    </div>
                  </td>

                  {/* Completion */}
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-2.5">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={cn(
                            'animate-highlight-in h-full origin-left rounded-full',
                            tone.bar,
                          )}
                          style={{
                            width: `${course.completion}%`,
                            animationDelay: `${0.35 + i * 0.08}s`,
                          }}
                        />
                      </div>
                      <span
                        className={cn(
                          'text-[11px] font-bold tabular-nums',
                          tone.text,
                        )}
                      >
                        {course.completion}%
                      </span>
                    </div>
                  </td>

                  {/* Revenue */}
                  <td className="px-5 py-4 sm:px-6">
                    <span className="text-brand-gold-dark inline-flex items-center gap-1 font-bold tabular-nums">
                      ${course.revenue.toLocaleString()}
                      <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
