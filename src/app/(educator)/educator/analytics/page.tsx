import { TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react';
import {
  WEEKLY_ENROLLMENTS,
  TOP_COURSES,
  EDUCATOR_STUDENTS,
  EDUCATOR_COURSES,
} from '@/constants/educator';
import EducatorTopBar from '@/components/pages/educator/EducatorTopBar';

const BAR_MAX = Math.max(...WEEKLY_ENROLLMENTS.map((d) => d.count));

const METRICS = [
  {
    label: 'Total Students',
    value: EDUCATOR_STUDENTS.length.toString(),
    icon: Users,
    color: 'bg-brand-navy',
  },
  {
    label: 'Published Courses',
    value: EDUCATOR_COURSES.filter(
      (c) => c.status === 'Published',
    ).length.toString(),
    icon: BookOpen,
    color: 'bg-brand-gold',
  },
  {
    label: 'Avg. Completion',
    value: `${Math.round(
      EDUCATOR_COURSES.filter((c) => c.enrolled > 0).reduce(
        (a, c) => a + c.completionRate,
        0,
      ) / EDUCATOR_COURSES.filter((c) => c.enrolled > 0).length,
    )}%`,
    icon: TrendingUp,
    color: 'bg-brand-navy',
  },
  {
    label: 'Total Revenue',
    value: '$20,208',
    icon: DollarSign,
    color: 'bg-brand-gold',
  },
];

const COMPLETION_BREAKDOWN = [
  { label: '0–25%', count: 1 },
  { label: '26–50%', count: 2 },
  { label: '51–75%', count: 3 },
  { label: '76–100%', count: 2 },
];
const BREAKDOWN_MAX = Math.max(...COMPLETION_BREAKDOWN.map((b) => b.count));

export default function EducatorAnalyticsPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        role="educator"
        title="Analytics"
        subtitle="Your course performance and learner insights"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Metric cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {METRICS.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color}`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">{label}</p>
                <p className="text-brand-navy text-xl font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* Weekly enrollment chart */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="text-brand-navy mb-1 text-sm font-bold">
              Weekly Enrollments
            </h3>
            <p className="mb-4 text-[11px] text-slate-400">
              New enrollments into your courses per day
            </p>
            <div className="flex h-40 items-end gap-2">
              {WEEKLY_ENROLLMENTS.map(({ day, count }) => (
                <div
                  key={day}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <span className="text-[10px] text-slate-400">{count}</span>
                  <div
                    className="bg-brand-gold/80 hover:bg-brand-gold w-full rounded-t transition-colors"
                    style={{ height: `${(count / BAR_MAX) * 100}%` }}
                  />
                  <span className="text-[10px] text-slate-400">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Completion breakdown */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h3 className="text-brand-navy mb-1 text-sm font-bold">
              Student Completion Ranges
            </h3>
            <p className="mb-4 text-[11px] text-slate-400">
              How far along your students are
            </p>
            <ul className="space-y-4">
              {COMPLETION_BREAKDOWN.map((b) => (
                <li key={b.label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-brand-navy text-xs font-medium">
                      {b.label} complete
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {b.count} students
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="bg-brand-gold h-full rounded-full"
                      style={{ width: `${(b.count / BREAKDOWN_MAX) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top performing courses table */}
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-brand-navy text-sm font-bold">
              Course Performance
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Ranked by enrollment count
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  {[
                    '#',
                    'Course',
                    'Enrolled',
                    'Completion Rate',
                    'Revenue',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-semibold tracking-wide text-slate-400 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_COURSES.map((course, i) => (
                  <tr
                    key={course.title}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-5 py-3.5 text-slate-300">#{i + 1}</td>
                    <td className="text-brand-navy px-5 py-3.5 font-medium">
                      {course.title}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {course.enrolled.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="bg-brand-gold h-full rounded-full"
                            style={{ width: `${course.completion}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {course.completion}%
                        </span>
                      </div>
                    </td>
                    <td className="text-brand-gold px-5 py-3.5 font-semibold">
                      ${(course.enrolled * 24).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
