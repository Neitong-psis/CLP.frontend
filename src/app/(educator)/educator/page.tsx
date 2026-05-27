import { Users, BookOpen, Star, DollarSign, ArrowUpRight } from 'lucide-react';
import {
  EDUCATOR_USER,
  DASHBOARD_STATS,
  MONTHLY_ENROLLMENTS,
  DASHBOARD_TOP_COURSES,
  COMPLETION_RATES,
  QUIZ_ANALYTICS,
} from '@/constants/educator';
import EducatorTopBar from '@/components/pages/educator/EducatorTopBar';

const STAT_ICONS = [Users, BookOpen, Star, DollarSign];
const STAT_BG = [
  'bg-brand-navy',
  'bg-brand-gold',
  'bg-brand-gold',
  'bg-brand-navy',
];

function EnrollmentChart() {
  const data = MONTHLY_ENROLLMENTS;
  const W = 800;
  const H = 200;
  const padL = 45;
  const padR = 20;
  const padT = 10;
  const padB = 36;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const maxVal = 450;

  const px = (i: number) => padL + (i / (data.length - 1)) * plotW;
  const py = (v: number) => padT + plotH - (v / maxVal) * plotH;

  const pts = data.map((d, i) => ({ x: px(i), y: py(d.count) }));

  let linePath = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpX = (prev.x + curr.x) / 2;
    linePath += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${padT + plotH} L ${padL} ${padT + plotH} Z`;

  const yLabels = [0, 100, 200, 300, 400];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: 220 }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00003e" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#00003e" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {yLabels.map((v) => (
        <g key={v}>
          <line
            x1={padL}
            y1={py(v)}
            x2={W - padR}
            y2={py(v)}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
          <text
            x={padL - 8}
            y={py(v) + 4}
            textAnchor="end"
            fill="#94a3b8"
            fontSize="11"
          >
            {v}
          </text>
        </g>
      ))}

      <path d={areaPath} fill="url(#chartGrad)" />
      <path
        d={linePath}
        fill="none"
        stroke="#00003e"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {data.map((d, i) => (
        <text
          key={d.month}
          x={px(i)}
          y={H - 6}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="11"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}

export default function EducatorDashboardPage() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <EducatorTopBar
        role="educator"
        title="Educator Dashboard"
        subtitle={`Live workspace synced for ${EDUCATOR_USER.email}`}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-6">
          <h2 className="text-brand-navy text-xl font-bold">
            Educator Overview
          </h2>
          <p className="mt-0.5 text-sm text-slate-400">
            Welcome back, {EDUCATOR_USER.name}. Overview and analytics are
            combined here.
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {DASHBOARD_STATS.map(({ label, value, change }, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${STAT_BG[i]}`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="flex items-center gap-0.5 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-bold text-green-600">
                    <ArrowUpRight className="h-3 w-3" />
                    {change}
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-400">
                  {label}
                </p>
                <p className="text-brand-navy mt-0.5 text-2xl font-black">
                  {value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Monthly Enrollment Trend */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="text-brand-navy mb-4 text-sm font-bold">
            Monthly Enrollment Trend
          </h3>
          <EnrollmentChart />
        </div>

        {/* Top Courses + Completion Rates */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-brand-navy mb-5 text-sm font-bold">
              Top Courses
            </h3>
            <ul className="space-y-5">
              {DASHBOARD_TOP_COURSES.map((c) => (
                <li
                  key={c.title}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-brand-navy truncate text-sm font-semibold">
                      {c.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {c.students.toLocaleString()} students
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-slate-500">
                    {c.rating} rating
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-brand-navy mb-5 text-sm font-bold">
              Completion Rates
            </h3>
            <ul className="space-y-4">
              {COMPLETION_RATES.map((c) => (
                <li key={c.title}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-brand-navy text-sm font-semibold">
                      {c.title}
                    </p>
                    <span className="text-brand-gold text-sm font-bold">
                      {c.rate}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="bg-brand-gold h-full rounded-full"
                      style={{ width: `${c.rate}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quiz Analytics */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-5">
            <h3 className="text-brand-navy text-sm font-bold">
              Quiz Analytics
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Completion rates, averages, pass/fail signals, and difficult
              question insights.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {QUIZ_ANALYTICS.map((q) => (
              <div
                key={q.title}
                className="rounded-lg border border-slate-200 p-4"
              >
                <p className="text-brand-navy text-sm font-bold">{q.title}</p>
                <p className="mt-0.5 mb-4 text-[11px] text-slate-400">
                  Difficult: {q.difficult}
                </p>
                <div className="space-y-2.5 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-500">Completion</span>
                    <span className="text-brand-navy font-bold">
                      {q.completion}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-500">Avg score</span>
                    <span className="text-brand-navy font-bold">
                      {q.avgScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-slate-500">Pass rate</span>
                    <span className="text-brand-navy font-bold">
                      {q.passRate}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
