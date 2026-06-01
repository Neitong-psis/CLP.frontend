import Link from 'next/link';
import {
  BookOpen,
  CheckCircle,
  Clock,
  TrendingUp,
  Flame,
  Target,
  Trophy,
  ChevronRight,
} from 'lucide-react';
import {
  MOCK_USER,
  ENROLLED_COURSES,
  SKILLS,
  WEEKLY_ACTIVITY,
} from '@/config/learner';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

function skillLevel(p: number) {
  if (p >= 76)
    return {
      label: 'Expert',
      cls: 'bg-brand-navy/10 text-brand-navy',
    };
  if (p >= 51)
    return {
      label: 'Proficient',
      cls: 'bg-brand-gold/15 text-brand-gold',
    };
  if (p >= 26)
    return {
      label: 'Developing',
      cls: 'bg-slate-200 text-slate-600',
    };
  return {
    label: 'Novice',
    cls: 'bg-slate-100 text-slate-500',
  };
}

export default function ProgressPage() {
  const xpPercent = Math.round((MOCK_USER.xp / MOCK_USER.nextLevelXp) * 100);
  const xpToNext = MOCK_USER.nextLevelXp - MOCK_USER.xp;
  const completed = ENROLLED_COURSES.filter((c) => c.completed).length;
  const avgProgress = Math.round(
    ENROLLED_COURSES.reduce((s, c) => s + c.progress, 0) /
      ENROLLED_COURSES.length,
  );
  const maxMinutes = Math.max(...WEEKLY_ACTIVITY.map((d) => d.minutes));
  const totalMins = WEEKLY_ACTIVITY.reduce((s, d) => s + d.minutes, 0);
  const weekSummary = `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`;
  const targetLinePct = Math.round((60 / maxMinutes) * 100);

  return (
    <div className="min-h-full bg-slate-50">
      <TopBar
        role="learner"
        title="Progress & Achievements"
        subtitle={`${MOCK_USER.weeklyDaysCompleted} of ${MOCK_USER.totalWeeklyDays} study days completed this week`}
      />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* ── XP Hero ── */}
        <div className="bg-brand-navy mb-6 rounded-lg p-6 sm:p-8">
          <div>
            <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="mb-1 text-[11px] font-bold tracking-widest text-white/35 uppercase">
                  Total XP Earned
                </p>
                <p className="text-5xl leading-none font-black text-white">
                  {MOCK_USER.xp.toLocaleString()}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-medium text-white">
                    <Flame className="text-brand-gold h-3.5 w-3.5" />
                    {MOCK_USER.streak}-day streak
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-medium text-white">
                    <Target className="text-brand-gold h-3.5 w-3.5" />
                    {MOCK_USER.weeklyDaysCompleted}/{MOCK_USER.totalWeeklyDays}{' '}
                    days this week
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start gap-1.5 sm:items-end">
                <div className="bg-brand-gold flex h-16 w-16 flex-col items-center justify-center rounded-lg">
                  <span className="text-[9px] font-bold tracking-wide text-white/70 uppercase">
                    Level
                  </span>
                  <span className="text-3xl leading-none font-black text-white">
                    {MOCK_USER.level}
                  </span>
                </div>
                <p className="text-[11px] text-white/35">
                  {xpToNext.toLocaleString()} XP to next
                </p>
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-[11px] text-white/35">
                <span>
                  Lv {MOCK_USER.level} · {MOCK_USER.xp.toLocaleString()} XP
                </span>
                <span className="font-bold text-white/55">{xpPercent}%</span>
                <span>
                  Lv {MOCK_USER.level + 1} ·{' '}
                  {MOCK_USER.nextLevelXp.toLocaleString()} XP
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="bg-brand-gold h-full rounded-full transition-all"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Stat cards ── */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {(
            [
              {
                label: 'Enrolled',
                value: ENROLLED_COURSES.length,
                sub: 'Total courses',
                icon: BookOpen,
                color: 'bg-brand-navy',
                href: '/dashboard/my-learning',
              },
              {
                label: 'Completed',
                value: completed,
                sub: 'Certificates earned',
                icon: CheckCircle,
                color: 'bg-brand-gold',
                href: '/dashboard/certificates',
              },
              {
                label: 'This Week',
                value: weekSummary,
                sub: 'Study time',
                icon: Clock,
                color: 'bg-brand-navy',
                href: null,
              },
              {
                label: 'Avg Progress',
                value: `${avgProgress}%`,
                sub: 'Across all courses',
                icon: TrendingUp,
                color: 'bg-brand-gold',
                href: null,
              },
            ] as const
          ).map(({ label, value, sub, icon: Icon, color, href }) => {
            const card = (
              <>
                <div className={`h-1 w-full ${color}`} />
                <div className="flex items-center gap-3 p-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">{label}</p>
                    <p className="text-brand-navy text-xl leading-tight font-black">
                      {value}
                    </p>
                    <p className="text-[10px] text-slate-400">{sub}</p>
                  </div>
                </div>
              </>
            );
            return href ? (
              <Link
                key={label}
                href={href}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-slate-300"
              >
                {card}
              </Link>
            ) : (
              <div
                key={label}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                {card}
              </div>
            );
          })}
        </div>

        {/* ── Charts ── */}
        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          {/* Weekly activity */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-brand-navy font-bold">Weekly Activity</h2>
                <p className="text-xs text-slate-400">
                  Daily learning minutes · 60-min target
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-brand-navy text-lg leading-tight font-black">
                  {weekSummary}
                </p>
                <p className="text-[10px] text-slate-400">total this week</p>
              </div>
            </div>

            <div className="flex items-end gap-1.5" style={{ height: '148px' }}>
              {WEEKLY_ACTIVITY.map(({ day, minutes }) => {
                const isWeekend = day === 'Sat' || day === 'Sun';
                const overTarget = minutes >= 60;
                const barH = Math.max(
                  6,
                  Math.round((minutes / maxMinutes) * 100),
                );
                return (
                  <div
                    key={day}
                    className="flex flex-1 flex-col items-center gap-1"
                  >
                    <span className="text-[9px] font-bold text-slate-400">
                      {minutes}m
                    </span>

                    <div className="relative flex w-full flex-1 flex-col justify-end">
                      <div
                        className="bg-brand-gold/[0.08] absolute bottom-0 w-full rounded-t-sm"
                        style={{ height: `${targetLinePct}%` }}
                      />
                      <div
                        className={`relative w-full rounded-t-md transition-all ${
                          isWeekend
                            ? 'bg-slate-200'
                            : overTarget
                              ? 'bg-brand-gold'
                              : 'bg-brand-gold/40'
                        }`}
                        style={{ height: `${barH}%` }}
                      />
                    </div>

                    <span className="text-[10px] font-medium text-slate-400">
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="bg-brand-gold h-2 w-2 rounded-sm" /> Goal met
              </span>
              <span className="flex items-center gap-1.5">
                <span className="bg-brand-gold/40 h-2 w-2 rounded-sm" /> Below
                goal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-slate-200" /> Weekend
              </span>
            </div>
          </div>

          {/* Skill progress */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-brand-navy mb-0.5 font-bold">Skill Progress</h2>
            <p className="mb-5 text-xs text-slate-400">
              Proficiency across your learning areas
            </p>
            <ul className="flex flex-col gap-4">
              {SKILLS.map(({ name, progress }) => {
                const { label, cls } = skillLevel(progress);
                return (
                  <li key={name}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span className="text-brand-navy text-sm font-semibold">
                        {name}
                      </span>
                      <div className="flex shrink-0 items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${cls}`}
                        >
                          {label}
                        </span>
                        <span className="text-brand-gold w-9 text-right text-sm font-bold">
                          {progress}%
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="bg-brand-gold h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ── Course Progress ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-brand-navy font-bold">Course Progress</h2>
              <p className="text-xs text-slate-400">
                Progress across all your enrolled courses
              </p>
            </div>
            <Link
              href="/dashboard/my-learning"
              className="text-brand-gold flex items-center gap-1 text-xs font-semibold hover:underline"
            >
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            {ENROLLED_COURSES.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-3.5 rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100"
              >
                <div className="bg-brand-navy flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  {course.completed ? (
                    <Trophy className="h-5 w-5 text-white" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-white" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <p className="text-brand-navy truncate text-sm font-semibold">
                      {course.title}
                    </p>
                    <span
                      className={`shrink-0 text-xs font-bold ${
                        course.completed ? 'text-brand-gold' : 'text-brand-navy'
                      }`}
                    >
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full transition-all ${
                        course.completed ? 'bg-brand-navy' : 'bg-brand-gold'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {course.completed ? (
                  <span className="bg-brand-gold/15 text-brand-gold flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold">
                    <CheckCircle className="h-3 w-3" /> Done
                  </span>
                ) : (
                  <span className="bg-brand-gold/10 text-brand-gold shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold">
                    {course.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
