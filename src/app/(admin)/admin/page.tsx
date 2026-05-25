import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Award,
  ShieldCheck,
  ArrowUpRight,
  FileCheck,
  Activity,
  Globe,
} from 'lucide-react';
import {
  ADMIN_USER,
  DASHBOARD_STATS,
  TOP_PERFORMING_COURSES,
  USER_DISTRIBUTION,
  PLATFORM_ANALYTICS_DATA,
  REVENUE_STATS,
  MONTHLY_REVENUE,
  REVENUE_BY_CATEGORY,
} from '@/constants/admin';
import AdminTopBar from '@/components/pages/admin/AdminTopBar';

const STAT_EXTRAS = [
  { Icon: Users, color: 'bg-blue-100 text-blue-600', desc: 'From live user records' },
  { Icon: BookOpen, color: 'bg-emerald-100 text-emerald-600', desc: '11 total courses' },
  { Icon: TrendingUp, color: 'bg-violet-100 text-violet-600', desc: 'All-time enrollments' },
  { Icon: DollarSign, color: 'bg-orange-100 text-orange-600', desc: 'May 2026' },
  { Icon: Award, color: 'bg-amber-100 text-amber-600', desc: 'Total issued to date' },
  { Icon: ShieldCheck, color: 'bg-sky-100 text-sky-600', desc: 'Verified credentials' },
];

const REV_EXTRAS = [
  { Icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
  { Icon: Activity, color: 'bg-teal-100 text-teal-600' },
  { Icon: Activity, color: 'bg-violet-100 text-violet-600' },
  { Icon: Globe, color: 'bg-orange-100 text-orange-600' },
];

const VISIBILITY_STYLE: Record<string, string> = {
  Public: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Archive: 'bg-slate-100 text-slate-500',
};

/* ── Donut chart ─────────────────────────────────────────────────────────── */
const _R = 40;
const _C = 2 * Math.PI * _R;
const _TOTAL = USER_DISTRIBUTION.reduce((a, s) => a + s.count, 0);
let _off = 0;
const DONUT_SEGS = USER_DISTRIBUTION.map((seg) => {
  const len = (seg.count / _TOTAL) * _C;
  const dashoffset = _C - _off;
  _off += len;
  return { ...seg, len, dashoffset };
});

function DonutChart() {
  return (
    <svg viewBox="0 0 112 112" className="h-36 w-36 -rotate-90">
      <circle r={_R} cx={56} cy={56} fill="none" stroke="#f1f5f9" strokeWidth={20} />
      {DONUT_SEGS.map((seg) => (
        <circle
          key={seg.label}
          r={_R} cx={56} cy={56}
          fill="none"
          stroke={seg.color}
          strokeWidth={20}
          strokeDasharray={`${seg.len} ${_C}`}
          strokeDashoffset={seg.dashoffset}
          strokeLinecap="butt"
        />
      ))}
    </svg>
  );
}

/* ── Platform Analytics line chart ──────────────────────────────────────── */
const LA_YMAX = 120000;
const LA_YTICKS = [0, 30000, 60000, 90000, 120000];

function LineChart() {
  const W = 600, H = 220;
  const pad = { t: 10, r: 20, b: 36, l: 68 };
  const iW = W - pad.l - pad.r;
  const iH = H - pad.t - pad.b;
  const n = PLATFORM_ANALYTICS_DATA.length;

  const ux = (i: number) => pad.l + (i / (n - 1)) * iW;
  const uy = (v: number) => pad.t + (1 - v / LA_YMAX) * iH;

  const uPath = PLATFORM_ANALYTICS_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${ux(i)},${uy(d.users)}`).join(' ');
  const ePath = PLATFORM_ANALYTICS_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${ux(i)},${uy(d.enrollments)}`).join(' ');
  const eArea = ePath + ` L${ux(n - 1)},${pad.t + iH} L${pad.l},${pad.t + iH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <defs>
        <linearGradient id="laGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      {LA_YTICKS.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={pad.l + iW} y1={uy(t)} y2={uy(t)} stroke="#e2e8f0" strokeWidth={1} />
          <text x={pad.l - 8} y={uy(t)} textAnchor="end" fontSize={9} fill="#94a3b8" dominantBaseline="middle">
            {t === 0 ? '0' : String(t)}
          </text>
        </g>
      ))}
      <path d={eArea} fill="url(#laGrad)" />
      <path d={ePath} fill="none" stroke="#10b981" strokeWidth={2.5} strokeLinejoin="round" />
      <path d={uPath} fill="none" stroke="#3b82f6" strokeWidth={2.5} strokeLinejoin="round" />
      {PLATFORM_ANALYTICS_DATA.map((d, i) => (
        <text key={d.month} x={ux(i)} y={H - 8} textAnchor="middle" fontSize={9} fill="#94a3b8">
          {d.month}
        </text>
      ))}
    </svg>
  );
}

/* ── Monthly Revenue bar chart ───────────────────────────────────────────── */
const REV_YMAX = 100;
const REV_YTICKS = [0, 25, 50, 75, 100];

function RevenueBarChart() {
  const W = 600, H = 200;
  const pad = { t: 10, r: 10, b: 28, l: 48 };
  const iW = W - pad.l - pad.r;
  const iH = H - pad.t - pad.b;
  const n = MONTHLY_REVENUE.length;
  const slotW = iW / n;
  const barW = slotW * 0.62;

  const uy = (v: number) => pad.t + (1 - v / REV_YMAX) * iH;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {REV_YTICKS.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={pad.l + iW} y1={uy(t)} y2={uy(t)} stroke="#e2e8f0" strokeWidth={1} />
          <text x={pad.l - 6} y={uy(t)} textAnchor="end" fontSize={9} fill="#94a3b8" dominantBaseline="middle">
            ${t}k
          </text>
        </g>
      ))}
      {MONTHLY_REVENUE.map(({ month, amount }, i) => {
        const bH = (amount / REV_YMAX) * iH;
        const x = pad.l + i * slotW + (slotW - barW) / 2;
        return (
          <g key={month}>
            <rect x={x} y={uy(amount)} width={barW} height={bH} rx={3} fill="#f4a300" fillOpacity={0.85} />
            <text x={x + barW / 2} y={H - 6} textAnchor="middle" fontSize={9} fill="#94a3b8">
              {month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        title="Platform Overview"
        subtitle={`Live workspace synced for ${ADMIN_USER.email}`}
      />

      <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero */}
        <div>
          <h2 className="text-xl font-bold text-teal-700 sm:text-2xl">
            Platform Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Real-time operating view for users, courses, revenue, and credentials.
          </p>
        </div>

        {/* 6 Stat cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {DASHBOARD_STATS.map(({ label, value, change }, i) => {
            const { Icon, color, desc } = STAT_EXTRAS[i];
            return (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" />
                    {change}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500">{label}</p>
                <p className="mt-0.5 text-xl font-bold text-slate-900">{value}</p>
                <p className="mt-1 text-[10px] text-slate-400">{desc}</p>
              </div>
            );
          })}
        </div>

        {/* User Distribution + Top Performing Courses */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-5 text-sm font-bold text-slate-900">User Distribution</h3>
            <div className="flex items-center gap-8">
              <div className="relative shrink-0">
                <DonutChart />
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-slate-900">{_TOTAL}</span>
                  <span className="text-[10px] text-slate-400">Total</span>
                </div>
              </div>
              <ul className="flex-1 space-y-3">
                {USER_DISTRIBUTION.map((seg) => (
                  <li key={seg.label} className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="text-sm text-slate-600">{seg.label}</span>
                    <span className="ml-auto text-sm font-bold text-slate-900">{seg.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-5 text-sm font-bold text-slate-900">Top Performing Courses</h3>
            <ul className="divide-y divide-slate-100">
              {TOP_PERFORMING_COURSES.map((c, i) => (
                <li key={c.title} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 shrink-0 text-[11px] font-bold text-slate-400">#{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-800">{c.title}</p>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                        <div className="bg-brand-gold h-full rounded-full" style={{ width: `${c.progress}%` }} />
                      </div>
                      <p className="mt-1 text-[10px] text-slate-400">{c.students} students</p>
                    </div>
                    <span className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${VISIBILITY_STYLE[c.visibility]}`}>
                      {c.visibility}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Platform Analytics */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Platform Analytics</h3>
          <p className="mb-5 mt-1 text-xs text-slate-500">
            Platform Growth across users, enrollments, and activity over the last 12 months.
          </p>
          <LineChart />
          <div className="mt-4 flex justify-center gap-6">
            <span className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              Users
            </span>
            <span className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Enrollments
            </span>
          </div>
        </div>

        {/* Revenue stat cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {REVENUE_STATS.map(({ label, value, change }, i) => {
            const { Icon, color } = REV_EXTRAS[i];
            return (
              <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                    <ArrowUpRight className="h-3 w-3" />
                    {change}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500">{label}</p>
                <p className="mt-0.5 text-xl font-bold text-slate-900">{value}</p>
              </div>
            );
          })}
        </div>

        {/* Monthly Revenue bar chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Monthly Revenue</h3>
          <p className="mb-5 mt-1 text-xs text-slate-500">Platform revenue over 12 months.</p>
          <RevenueBarChart />
        </div>

        {/* Revenue by Category */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-5 text-sm font-bold text-slate-900">Revenue by Category</h3>
          <ul className="space-y-4">
            {REVENUE_BY_CATEGORY.map((cat) => (
              <li key={cat.name} className="flex items-center gap-4">
                <span className="w-28 shrink-0 text-xs font-semibold text-slate-700">{cat.name}</span>
                <div className="flex-1 overflow-hidden rounded-full bg-slate-100" style={{ height: '6px' }}>
                  <div className="bg-brand-gold h-full rounded-full" style={{ width: `${cat.pct}%` }} />
                </div>
                <span className="w-14 shrink-0 text-right text-xs font-semibold text-slate-600">{cat.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
