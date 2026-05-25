import { TrendingUp, Users, BookOpen, Award, ArrowUpRight } from 'lucide-react';
import {
  WEEKLY_ENROLLMENTS,
  TOP_COURSES,
  ADMIN_USERS,
  ADMIN_COURSES,
  REVENUE_BY_CATEGORY,
  PLATFORM_ANALYTICS_DATA,
} from '@/constants/admin';
import AdminTopBar from '@/components/pages/admin/AdminTopBar';

const BAR_MAX = Math.max(...WEEKLY_ENROLLMENTS.map((d) => d.count));

const METRICS = [
  {
    label: 'Total Learners',
    value: ADMIN_USERS.filter((u) => u.role === 'Learner').length.toString(),
    change: '+8%',
    icon: Users,
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    label: 'Published Courses',
    value: ADMIN_COURSES.filter(
      (c) => c.status === 'Published',
    ).length.toString(),
    change: '+2',
    icon: BookOpen,
    color: 'bg-brand-gold/20 text-brand-gold',
  },
  {
    label: 'Avg. Completion',
    value: `${Math.round(
      ADMIN_COURSES.filter((c) => c.completionRate > 0).reduce(
        (a, c) => a + c.completionRate,
        0,
      ) / ADMIN_COURSES.filter((c) => c.completionRate > 0).length,
    )}%`,
    change: '+5%',
    icon: TrendingUp,
    color: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    label: 'Total Enrollments',
    value: ADMIN_COURSES.reduce((a, c) => a + c.enrolled, 0).toLocaleString(),
    change: '+28%',
    icon: Award,
    color: 'bg-purple-500/20 text-purple-400',
  },
];

// Simple SVG line chart
function LineChart() {
  const W = 560;
  const H = 150;
  const pad = { t: 10, r: 10, b: 24, l: 10 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const n = PLATFORM_ANALYTICS_DATA.length;
  const enrollMax = Math.max(
    ...PLATFORM_ANALYTICS_DATA.map((d) => d.enrollments),
  );

  const ex = (i: number) => pad.l + (i / (n - 1)) * innerW;
  const ey = (v: number) => pad.t + (1 - v / enrollMax) * innerH;

  const path = PLATFORM_ANALYTICS_DATA.map(
    (d, i) => `${i === 0 ? 'M' : 'L'}${ex(i)},${ey(d.enrollments)}`,
  ).join(' ');
  const areaPath =
    path + ` L${ex(n - 1)},${pad.t + innerH} L${pad.l},${pad.t + innerH} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4a300" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f4a300" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={pad.l}
          x2={pad.l + innerW}
          y1={pad.t + t * innerH}
          y2={pad.t + t * innerH}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
        />
      ))}
      <path d={areaPath} fill="url(#aGrad)" />
      <path
        d={path}
        fill="none"
        stroke="#f4a300"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {PLATFORM_ANALYTICS_DATA.map((d, i) => (
        <text
          key={d.month}
          x={ex(i)}
          y={H - 4}
          textAnchor="middle"
          fontSize={9}
          fill="rgba(255,255,255,0.3)"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}

const CAT_MAX = Math.max(...REVENUE_BY_CATEGORY.map((c) => c.pct));

export default function AdminAnalyticsPage() {
  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        title="Analytics"
        subtitle="Platform performance and learner insights"
      />

      <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Metric cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {METRICS.map(({ label, value, change, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
            >
              <div
                className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${color}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-[11px] text-white/40">{label}</p>
              <p className="mt-0.5 text-xl font-bold text-white">{value}</p>
              <p className="mt-1 flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400">
                <ArrowUpRight className="h-3 w-3" />
                {change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Weekly enrollment chart */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <h3 className="mb-0.5 text-sm font-bold text-white">
              Weekly Enrollments
            </h3>
            <p className="mb-5 text-[11px] text-white/35">
              New course enrollments per day
            </p>
            <div className="flex h-40 items-end gap-2">
              {WEEKLY_ENROLLMENTS.map(({ day, count }) => (
                <div
                  key={day}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <span className="text-[10px] text-white/40">{count}</span>
                  <div
                    className="bg-brand-gold/80 hover:bg-brand-gold w-full rounded-t transition-colors"
                    style={{ height: `${(count / BAR_MAX) * 100}%` }}
                  />
                  <span className="text-[10px] text-white/35">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category breakdown */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <h3 className="mb-0.5 text-sm font-bold text-white">
              Revenue by Category
            </h3>
            <p className="mb-5 text-[11px] text-white/35">
              Total revenue per category
            </p>
            <ul className="space-y-3">
              {REVENUE_BY_CATEGORY.map((cat) => (
                <li key={cat.name} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-xs font-medium text-white/60">
                    {cat.name}
                  </span>
                  <div
                    className="flex-1 overflow-hidden rounded-full bg-white/[0.07]"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="bg-brand-gold h-full rounded-full"
                      style={{ width: `${(cat.pct / CAT_MAX) * 100}%` }}
                    />
                  </div>
                  <span className="w-14 shrink-0 text-right text-xs font-semibold text-white/55">
                    {cat.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Platform analytics line chart */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
          <h3 className="mb-0.5 text-sm font-bold text-white">
            Platform Analytics
          </h3>
          <p className="mb-4 text-[11px] text-white/35">
            Enrollment growth across the last 12 months
          </p>
          <div className="h-36 w-full overflow-hidden">
            <LineChart />
          </div>
        </div>

        {/* Top performing courses */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03]">
          <div className="border-b border-white/[0.07] px-5 py-4">
            <h3 className="text-sm font-bold text-white">
              Top Performing Courses
            </h3>
            <p className="mt-0.5 text-[11px] text-white/35">
              Ranked by enrollment count
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {['#', 'Course', 'Enrolled', 'Completion Rate'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-semibold tracking-wide text-white/35 uppercase"
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
                    className="border-b border-white/[0.04] hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.05] text-[11px] font-bold text-white/40">
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-white">
                      {course.title}
                    </td>
                    <td className="px-5 py-3.5 text-white/55">
                      {course.enrolled.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="overflow-hidden rounded-full bg-white/[0.08]"
                          style={{ height: '6px', width: '80px' }}
                        >
                          <div
                            className="bg-brand-gold h-full rounded-full"
                            style={{ width: `${course.completion}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-white/40">
                          {course.completion}%
                        </span>
                      </div>
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
