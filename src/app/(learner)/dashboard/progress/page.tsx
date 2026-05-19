import { Bell, Moon, BookOpen, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { MOCK_USER, ENROLLED_COURSES, SKILLS, WEEKLY_ACTIVITY } from "@/config/learner";

export default function ProgressPage() {
  const xpPercent = Math.round((MOCK_USER.xp / MOCK_USER.nextLevelXp) * 100);
  const completed = ENROLLED_COURSES.filter((c) => c.completed).length;
  const avgProgress = Math.round(ENROLLED_COURSES.reduce((s, c) => s + c.progress, 0) / ENROLLED_COURSES.length);
  const maxMinutes  = Math.max(...WEEKLY_ACTIVITY.map((d) => d.minutes));

  return (
    <div className="min-h-full">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold text-[#00003e] sm:text-xl">Progress &amp; Achievements</h1>
          <p className="text-xs text-slate-400">Live workspace synced for {MOCK_USER.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <Moon className="h-4 w-4" />
          </button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#f4a300]" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* XP Progress card */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-[#00003e] p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #f4a300 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">Total XP</p>
              <p className="text-4xl font-black text-white">{MOCK_USER.xp.toLocaleString()}</p>
              <p className="mt-1 text-sm text-white/50">
                {MOCK_USER.weeklyDaysCompleted} of {MOCK_USER.totalWeeklyDays} weekday study days completed
              </p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4a300]/20 px-3 py-1 text-xs font-bold text-[#f4a300]">
                Level {MOCK_USER.level} · Achieved
              </span>
              <p className="mt-1.5 text-xs text-white/40">Next level at {MOCK_USER.nextLevelXp.toLocaleString()} XP</p>
            </div>
          </div>

          {/* XP bar */}
          <div className="relative mt-5">
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-white/40">
              <span>Level {MOCK_USER.level}</span>
              <span>Level {MOCK_USER.level + 1}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#f4a300] to-[#e09400] transition-all duration-700"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <p className="mt-1 text-right text-[11px] text-white/40">{xpPercent}%</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { label: "Enrolled",      value: ENROLLED_COURSES.length, sub: "Total courses",        icon: BookOpen,    color: "bg-blue-500"    },
            { label: "Completed",     value: completed,                sub: "View certificates",    icon: CheckCircle, color: "bg-emerald-500" },
            { label: "Total Time",    value: "7h",                     sub: "This week",            icon: Clock,       color: "bg-violet-500"  },
            { label: "Avg Progress",  value: `${avgProgress}%`,        sub: "Across enrolled",      icon: TrendingUp,  color: "bg-[#f4a300]"  },
          ].map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-500">{label}</p>
                <p className="text-xl font-bold text-[#00003e]">{value}</p>
                <p className="text-[11px] text-slate-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Weekly activity */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-0.5 font-bold text-[#00003e]">Weekly Learning Activity</h2>
            <p className="mb-5 text-xs text-slate-400">Daily minutes spent learning vs. daily target (60 min)</p>
            <div className="flex items-end gap-1.5" style={{ height: "140px" }}>
              {WEEKLY_ACTIVITY.map(({ day, minutes }) => {
                const heightPct = Math.max(8, Math.round((minutes / maxMinutes) * 100));
                const overTarget = minutes >= 60;
                return (
                  <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="relative flex w-full flex-col justify-end" style={{ height: "110px" }}>
                      {/* Target line ghost */}
                      <div
                        className="absolute w-full rounded-t-sm bg-[#f4a300]/10"
                        style={{ height: `${Math.round((60 / maxMinutes) * 100)}%` }}
                      />
                      <div
                        className={`w-full rounded-t-md transition-all ${overTarget ? "bg-[#f4a300]" : "bg-[#f4a300]/50"}`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">{day}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#f4a300]" /> Goal met</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#f4a300]/40" /> Below goal</span>
            </div>
          </div>

          {/* Skill progress */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-0.5 font-bold text-[#00003e]">Skill Progress</h2>
            <p className="mb-5 text-xs text-slate-400">Your proficiency across learning areas</p>
            <ul className="flex flex-col gap-4">
              {SKILLS.map(({ name, progress }) => (
                <li key={name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-[#00003e]">{name}</span>
                    <span className="font-bold text-[#f4a300]">{progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#f4a300] to-[#e09400]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
