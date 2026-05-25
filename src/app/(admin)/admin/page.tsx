import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  DollarSign,
  ShieldCheck,
  ArrowUpRight,
  FileCheck,
} from 'lucide-react';
import {
  ADMIN_USER,
  DASHBOARD_STATS,
  RECENT_ENROLLMENTS,
  TOP_PERFORMING_COURSES,
  USER_DISTRIBUTION,
  REVENUE_STATS,
  MONTHLY_REVENUE,
  REVENUE_BY_CATEGORY,
  PLATFORM_ANALYTICS_DATA,
} from '@/constants/admin';
import AdminTopBar from '@/components/pages/admin/AdminTopBar';

const STAT_ICONS = [
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Award,
  ShieldCheck,
];
const STAT_COLORS = [
  'bg-blue-500/20 text-blue-400',
  'bg-brand-gold/20 text-brand-gold',
  'bg-emerald-500/20 text-emerald-400',
  'bg-purple-500/20 text-purple-400',
  'bg-cyan-500/20 text-cyan-400',
  'bg-rose-500/20 text-rose-400',
];

const VISIBILITY_STYLE: Record<string, string> = {
  Public: 'bg-emerald-500/15 text-emerald-400',
  Pending: 'bg-brand-gold/15 text-brand-gold',
  Archive: 'bg-white/[0.07] text-white/40',
};

const REV_ICON_COLORS = [
  'bg-emerald-500/20 text-emerald-400',
  'bg-brand-gold/20 text-brand-gold',
  'bg-purple-500/20 text-purple-400',
  'bg-blue-500/20 text-blue-400',
];

const _DONUT_R = 40;
const _DONUT_CIRCUMFERENCE = 2 * Math.PI * _DONUT_R;
const _DONUT_TOTAL = USER_DISTRIBUTION.reduce((a, s) => a + s.count, 0);
let _cumLen = 0;
const DONUT_SEGMENTS = USER_DISTRIBUTION.map((seg) => {
  const len = (seg.count / _DONUT_TOTAL) * _DONUT_CIRCUMFERENCE;
  const dashoffset = _DONUT_CIRCUMFERENCE - _cumLen;
  _cumLen += len;
  return { ...seg, len, dashoffset };
});

// Simple SVG donut chart
function DonutChart() {
  const cx = 56;
  const cy = 56;

  return (
    <svg viewBox="0 0 112 112" className="h-32 w-32 -rotate-90">
      <circle
        r={_DONUT_R}
        cx={cx}
        cy={cy}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={20}
      />
      {DONUT_SEGMENTS.map((seg) => (
        <circle
          key={seg.label}
          r={_DONUT_R}
          cx={cx}
          cy={cy}
          fill="none"
          stroke={seg.color}
          strokeWidth={20}
          strokeDasharray={`${seg.len} ${_DONUT_CIRCUMFERENCE}`}
          strokeDashoffset={seg.dashoffset}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
}

// Simple SVG line chart for platform analytics
function LineChart() {
  const W = 560;
  const H = 140;
  const pad = { t: 10, r: 10, b: 24, l: 40 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const userMax = Math.max(...PLATFORM_ANALYTICS_DATA.map((d) => d.users));
  const enrollMax = Math.max(
    ...PLATFORM_ANALYTICS_DATA.map((d) => d.enrollments),
  );
  const n = PLATFORM_ANALYTICS_DATA.length;

  const ux = (i: number) => pad.l + (i / (n - 1)) * innerW;
  const uy = (v: number) => pad.t + (1 - v / userMax) * innerH;
  const ey = (v: number) => pad.t + (1 - v / enrollMax) * innerH;

  const userPath = PLATFORM_ANALYTICS_DATA.map(
    (d, i) => `${i === 0 ? 'M' : 'L'}${ux(i)},${uy(d.users)}`,
  ).join(' ');
  const enrollPath = PLATFORM_ANALYTICS_DATA.map(
    (d, i) => `${i === 0 ? 'M' : 'L'}${ux(i)},${ey(d.enrollments)}`,
  ).join(' ');

  const userAreaPath =
    userPath + ` L${ux(n - 1)},${pad.t + innerH} L${pad.l},${pad.t + innerH} Z`;
  const enrollAreaPath =
    enrollPath +
    ` L${ux(n - 1)},${pad.t + innerH} L${pad.l},${pad.t + innerH} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="uGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4a300" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f4a300" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
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
      {/* Areas */}
      <path d={enrollAreaPath} fill="url(#eGrad)" />
      <path d={userAreaPath} fill="url(#uGrad)" />
      {/* Lines */}
      <path
        d={enrollPath}
        fill="none"
        stroke="#10b981"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d={userPath}
        fill="none"
        stroke="#f4a300"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* X-axis labels */}
      {PLATFORM_ANALYTICS_DATA.map((d, i) => (
        <text
          key={d.month}
          x={ux(i)}
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

const REV_MAX = Math.max(...MONTHLY_REVENUE.map((d) => d.amount));

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        title="Admin Control Center"
        subtitle={`Live workspace synced for ${ADMIN_USER.email}`}
      />

      <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-6">
          <span className="bg-brand-gold/10 text-brand-gold mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold">
            Admin
          </span>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Platform Overview
          </h2>
          <p className="mt-1 text-sm text-white/40">
            Real-time updates for users, courses, revenue, and credentials.
          </p>
        </div>

        {/* 6 Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {DASHBOARD_STATS.map(({ label, value, change }, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div
                key={label}
                className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
              >
                <div
                  className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${STAT_COLORS[i]}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-[11px] font-medium text-white/40">{label}</p>
                <p className="mt-0.5 text-lg font-bold text-white">{value}</p>
                <p className="mt-1 flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />
                  {change}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active Templates single card */}
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-3.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
            <FileCheck className="h-4 w-4" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-white/50">
              Active Templates
            </span>
            <span className="text-xl font-bold text-white">14</span>
          </div>
          <span className="ml-auto flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400">
            <ArrowUpRight className="h-3 w-3" />
            +6%
          </span>
        </div>

        {/* User Distribution + Top Performing Courses */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* User Distribution */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <h3 className="mb-4 text-sm font-bold text-white">
              User Distribution
            </h3>
            <div className="flex items-center gap-6">
              <div className="relative flex-shrink-0">
                <DonutChart />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {USER_DISTRIBUTION.reduce((a, s) => a + s.count, 0)}
                  </span>
                  <span className="text-[10px] text-white/40">Total</span>
                </div>
              </div>
              <ul className="space-y-2.5">
                {USER_DISTRIBUTION.map((seg) => (
                  <li key={seg.label} className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="text-xs text-white/60">{seg.label}</span>
                    <span className="ml-auto pl-4 text-xs font-bold text-white">
                      {seg.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Top Performing Courses */}
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
            <h3 className="mb-4 text-sm font-bold text-white">
              Top Performing Courses
            </h3>
            <ul className="divide-y divide-white/[0.04]">
              {TOP_PERFORMING_COURSES.map((c, i) => (
                <li
                  key={c.title}
                  className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <span className="w-4 shrink-0 text-[11px] font-bold text-white/30">
                    #{i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-white/80">
                      {c.title}
                    </p>
                    <p className="text-[11px] text-white/35">
                      {c.students} students
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${VISIBILITY_STYLE[c.visibility]}`}
                  >
                    {c.visibility}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Platform Analytics line chart */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Platform Analytics</h3>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                <span className="bg-brand-gold h-2 w-2 rounded-full" />
                Users
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-white/50">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Enrollments
              </span>
            </div>
          </div>
          <p className="mb-4 text-[11px] text-white/35">
            Platform Growth across users, enrollments, and activity over the
            last 12 months.
          </p>
          <div className="h-36 w-full overflow-hidden">
            <LineChart />
          </div>
        </div>

        {/* Revenue metric cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {REVENUE_STATS.map(({ label, value, change }, i) => (
            <div
              key={label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
            >
              <div
                className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${REV_ICON_COLORS[i]}`}
              >
                <DollarSign className="h-4 w-4" />
              </div>
              <p className="text-[11px] text-white/40">{label}</p>
              <p className="mt-0.5 text-lg font-bold text-white">{value}</p>
              <p className="mt-1 flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400">
                <ArrowUpRight className="h-3 w-3" />
                {change}
              </p>
            </div>
          ))}
        </div>

        {/* Monthly Revenue bar chart */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
          <h3 className="mb-0.5 text-sm font-bold text-white">
            Monthly Revenue
          </h3>
          <p className="mb-5 text-[11px] text-white/35">
            Platform revenue over 12 months.
          </p>
          <div className="flex h-40 items-end gap-1.5">
            {MONTHLY_REVENUE.map(({ month, amount }) => (
              <div
                key={month}
                className="flex flex-1 flex-col items-center gap-1.5"
              >
                <div
                  className="bg-brand-gold/80 hover:bg-brand-gold w-full rounded-t-md transition-all"
                  style={{ height: `${(amount / REV_MAX) * 100}%` }}
                />
                <span className="text-[9px] text-white/35">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5">
          <h3 className="mb-4 text-sm font-bold text-white">
            Revenue by Category
          </h3>
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
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right text-xs font-semibold text-white/60">
                  {cat.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Enrollments table */}
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
            <h3 className="text-sm font-bold text-white">Recent Enrollments</h3>
            <a
              href="/admin/users"
              className="text-brand-gold text-xs font-semibold hover:underline"
            >
              View all
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {['User', 'Course', 'Date', 'Status'].map((h) => (
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
                {RECENT_ENROLLMENTS.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/[0.04] transition hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 font-medium text-white">
                      {row.user}
                    </td>
                    <td className="px-5 py-3.5 text-white/55">{row.course}</td>
                    <td className="px-5 py-3.5 text-white/35">{row.date}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          row.status === 'Active'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-white/[0.07] text-white/40'
                        }`}
                      >
                        {row.status}
                      </span>
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
