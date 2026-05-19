import { Bell, Moon } from "lucide-react";
import { QUIZZES, MOCK_USER } from "@/config/learner";

const STATUS_STYLES = {
  "in-progress": { dot: "bg-amber-400", badge: "bg-amber-100 text-amber-700", label: "In progress" },
  pending:        { dot: "bg-slate-400", badge: "bg-slate-100 text-slate-500", label: "Pending"      },
  completed:      { dot: "bg-emerald-400", badge: "bg-emerald-100 text-emerald-700", label: "Completed" },
} as const;

export default function QuizzesPage() {
  return (
    <div className="min-h-full">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3.5 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-bold text-[#00003e] sm:text-xl">Quizzes</h1>
          <p className="text-xs text-slate-400">Continue unfinished quizzes, review scores, and track completion</p>
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
        {/* Quiz cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUIZZES.map((quiz) => {
            const style = STATUS_STYLES[quiz.status];
            return (
              <div key={quiz.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-start justify-between gap-2">
                  <div>
                    <p className="mb-0.5 text-[11px] text-slate-400">{quiz.questions} questions</p>
                    <p className="font-bold text-[#00003e]">{quiz.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{quiz.course}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${style.badge}`}>
                    {style.label}
                  </span>
                </div>

                {/* Stats */}
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Passing",  value: `${quiz.passingScore}%` },
                    { label: "Limit",    value: quiz.timeLimit           },
                    { label: quiz.status === "completed" ? "Score" : "Progress", value: quiz.status === "completed" ? `${quiz.score}%` : `${quiz.progress}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-lg bg-slate-50 p-2 text-center">
                      <p className="text-sm font-bold text-[#00003e]">{value}</p>
                      <p className="text-[10px] text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{quiz.deadline}</span>
                  <span>{quiz.status === "completed" ? `${quiz.score}% result` : `${quiz.progress}% complete`}</span>
                </div>
                <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${quiz.status === "completed" ? "bg-emerald-500" : "bg-[#f4a300]"}`}
                    style={{ width: `${quiz.status === "completed" ? quiz.score : quiz.progress}%` }}
                  />
                </div>

                <button className={`w-full rounded-lg py-2.5 text-xs font-bold text-white transition ${
                  quiz.status === "completed" ? "bg-slate-500 hover:bg-slate-600" : "bg-[#f4a300] hover:bg-[#e09400]"
                }`}>
                  {quiz.status === "in-progress" ? "Continue Quiz" : quiz.status === "pending" ? "Start Quiz" : "Review History"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Quiz Timeline */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-0.5 font-bold text-[#00003e]">Quiz Timeline</h2>
          <p className="mb-5 text-xs text-slate-400">Upcoming quiz work and recent results in one place.</p>

          <ul className="flex flex-col gap-4">
            {QUIZZES.map((quiz, idx) => {
              const style = STATUS_STYLES[quiz.status];
              return (
                <li key={quiz.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-xs font-bold text-slate-500">
                      {idx + 1}
                    </span>
                    {idx < QUIZZES.length - 1 && <div className="mt-1 w-px flex-1 bg-slate-200" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-[#00003e]">{quiz.title}</p>
                        <p className="text-xs text-slate-400">{quiz.course}</p>
                        <p className="text-[11px] text-slate-400">Reminder target: {quiz.deadline}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${style.badge}`}>
                        {style.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${quiz.status === "completed" ? "bg-emerald-500" : "bg-[#f4a300]"}`}
                          style={{ width: `${quiz.status === "completed" ? quiz.score : quiz.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-500">
                        {quiz.status === "completed" ? `${quiz.score}%` : `${quiz.progress}%`}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
