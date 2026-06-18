'use client';

import { ArrowUpRight } from 'lucide-react';
import { useEducatorAnalyticsPerformanceT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import { COURSE_ROWS } from '../_lib/metrics';

const MEDALS = [
  'from-amber-300 to-brand-gold text-brand-navy', // 1st
  'from-slate-400 to-slate-600 text-white', // 2nd
  'from-orange-300 to-amber-600 text-white', // 3rd
];

function completionTone(v: number) {
  if (v >= 70) return { bar: 'bg-emerald-500', text: 'text-emerald-600' };
  if (v >= 50) return { bar: 'bg-brand-gold', text: 'text-brand-gold' };
  return { bar: 'bg-rose-400', text: 'text-rose-500' };
}

export function CoursePerformanceTable() {
  const t = useEducatorAnalyticsPerformanceT();

  const TABLE_COLS = [
    t('rank'),
    t('course'),
    t('enrolled'),
    t('completion'),
    t('revenue'),
  ];

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-border flex items-center justify-between border-b px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-foreground text-sm font-bold">{t('title')}</h3>
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            {t('subtitle')}
          </p>
        </div>
        <span className="bg-muted text-muted-foreground hidden rounded-full px-3 py-1 text-[11px] font-semibold sm:inline-flex">
          {t('activeCourses', { count: COURSE_ROWS.length })}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-border border-b">
              {TABLE_COLS.map((h) => (
                <th
                  key={h}
                  className="text-muted-foreground px-5 py-3 text-left text-[11px] font-semibold tracking-wide uppercase sm:px-6"
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
                  className="animate-fade-in-up group border-border/50 hover:bg-muted/40 border-b transition-colors last:border-0 hover:shadow-[inset_3px_0_0_0_var(--color-brand-gold)]"
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  {/* Rank medal */}
                  <td className="px-5 py-4 sm:px-6">
                    <span
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition-transform duration-200 group-hover:scale-110',
                        i < 3
                          ? cn('bg-linear-to-br shadow-sm', MEDALS[i])
                          : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {course.rank}
                    </span>
                  </td>

                  {/* Title */}
                  <td className="text-foreground max-w-65 truncate px-5 py-4 font-semibold sm:px-6">
                    {course.title}
                  </td>

                  {/* Enrolled + share bar */}
                  <td className="px-5 py-4 sm:px-6">
                    <p className="text-foreground font-semibold tabular-nums">
                      {course.enrolled.toLocaleString()}
                    </p>
                    <div className="bg-muted mt-1 h-1 w-20 overflow-hidden rounded-full">
                      <div
                        className="animate-highlight-in bg-foreground/20 h-full origin-left rounded-full"
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
                      <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
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
