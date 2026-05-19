import Link from "next/link";
import { Bell, Moon, Flame, Zap, Target, BookOpen, Clock, TrendingUp, Award, ChevronRight, Play } from "lucide-react";
import { MOCK_USER, ENROLLED_COURSES, QUIZZES, CATEGORY_GRADIENT } from "@/config/learner";

export default function DashboardPage() {
  const inProgress = ENROLLED_COURSES.filter((c) => !c.completed).slice(0, 3);
  const upcomingQuizzes = QUIZZES.filter((q) => q.status !== "completed");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold text-[#00003e] sm:text-xl">{greeting}, {MOCK_USER.name.split(" ")[0]}!</h1>
          <p className="text-xs text-slate-400">Live workspace synced for {MOCK_USER.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <Moon className="h-4 w-4" />
          </button>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#f4a300]" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero welcome card */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-[#00003e] p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, #f4a300 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#f4a300]/10 blur-3xl" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#f4a300]/15 px-3 py-1">
              <Flame className="h-3.5 w-3.5 text-[#f4a300]" />
              <span className="text-xs font-semibold text-[#f4a300]">{MOCK_USER.streak}-Day Streak!</span>
              <span className="rounded-full bg-[#f4a300]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#f4a300]">Achieved</span>
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              You&apos;ve learned {MOCK_USER.weeklyLearned} this week.
            </h2>
            <p className="mt-1 text-sm text-white/50">Keep going — you&apos;re on a roll!</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white">
                <Target className="h-3.5 w-3.5 text-[#f4a300]" />
                Daily goal: {MOCK_USER.dailyGoal}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white">
                <Zap className="h-3.5 w-3.5 text-[#f4a300]" />
                XP: {MOCK_USER.xp.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { label: "Enrolled", value: "5", sub: "Active courses",     icon: BookOpen,    color: "bg-blue-500"    },
            { label: "Hours Learned", value: "7h", sub: "This week",    icon: Clock,       color: "bg-emerald-500" },
            { label: "Streak", value: `${MOCK_USER.streak} days`, sub: `Personal best: ${MOCK_USER.personalBestStreak}`, icon: Flame, color: "bg-[#f4a300]" },
            { label: "Certificates", value: "2", sub: "My certificates", icon: Award,       color: "bg-violet-500"  },
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

        {/* Upcoming Quizzes */}
        {upcomingQuizzes.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#00003e]">Upcoming Quizzes</h2>
                <p className="text-xs text-slate-400">Deadlines and pending quizzes</p>
              </div>
              <Link href="/dashboard/quizzes" className="flex items-center gap-1 text-xs font-semibold text-[#f4a300] hover:underline">
                Open quizzes <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingQuizzes.map((q) => (
                <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-slate-400">{q.questions} questions</p>
                      <p className="font-semibold text-[#00003e]">{q.title}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{q.course}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      q.status === "in-progress" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"
                    }`}>
                      {q.status === "in-progress" ? "In progress" : "Pending"}
                    </span>
                  </div>
                  <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[#f4a300]" style={{ width: `${q.progress}%` }} />
                  </div>
                  <div className="mb-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{q.deadline}</span>
                    <span>{q.progress}%</span>
                  </div>
                  <Link href="/dashboard/quizzes" className="block w-full rounded-lg bg-[#f4a300] py-2 text-center text-xs font-bold text-white transition hover:bg-[#e09400]">
                    {q.status === "in-progress" ? "Continue Quiz" : "Start Quiz"}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Continue Learning */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#00003e]">Continue Learning</h2>
              <p className="text-xs text-slate-400">Pick up where you left off</p>
            </div>
            <Link href="/dashboard/my-learning" className="flex items-center gap-1 text-xs font-semibold text-[#f4a300] hover:underline">
              View all <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {inProgress.map((course) => (
              <div key={course.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className={`flex h-28 items-center justify-center bg-gradient-to-br ${CATEGORY_GRADIENT[course.category] ?? "from-slate-600 to-slate-700"}`}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <span className="mb-1.5 inline-block rounded-full bg-[#00003e]/5 px-2 py-0.5 text-[10px] font-semibold text-[#00003e]/60">
                    {course.category}
                  </span>
                  <p className="mb-0.5 font-semibold leading-snug text-[#00003e]">{course.title}</p>
                  <p className="mb-3 text-xs text-slate-400">{course.author}</p>
                  <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Progress</span>
                    <span className="font-semibold text-[#00003e]">{course.progress}%</span>
                  </div>
                  <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-[#f4a300]" style={{ width: `${course.progress}%` }} />
                  </div>
                  <Link href="/dashboard/my-learning" className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#f4a300] py-2 text-xs font-bold text-white transition hover:bg-[#e09400]">
                    <Play className="h-3 w-3" /> Continue
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
