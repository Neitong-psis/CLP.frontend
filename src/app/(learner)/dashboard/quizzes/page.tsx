import { QUIZZES } from '@/config/learner';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';

const STATUS_BADGE: Record<string, string> = {
  'in-progress': 'border border-brand-gold text-brand-gold',
  pending: 'text-slate-400',
  completed: 'bg-green-500 text-white',
};

const STATUS_LABEL: Record<string, string> = {
  'in-progress': 'In progress',
  pending: 'Pending',
  completed: 'Completed',
};

const CTA_LABEL: Record<string, string> = {
  'in-progress': 'Continue Quiz',
  pending: 'Start Quiz',
  completed: 'Review History',
};

export default function QuizzesPage() {
  return (
    <div className="min-h-full bg-slate-50">
      <TopBar
        title="Quizzes"
        subtitle="Continue unfinished quizzes, review scores, and track completion"
      />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* ── Quiz cards ── */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUIZZES.map((quiz) => {
            const displayValue =
              quiz.status === 'completed' ? (quiz.score ?? 0) : quiz.progress;
            const deadlineLabel =
              quiz.status === 'completed' ? 'Completed' : quiz.deadline;
            const resultLabel =
              quiz.status === 'completed'
                ? `${quiz.score}% result`
                : `${quiz.progress}% complete`;

            return (
              <div
                key={quiz.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5"
              >
                {/* Header */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-[11px] font-medium text-slate-400">
                    {quiz.questions} questions
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE[quiz.status]}`}
                  >
                    {STATUS_LABEL[quiz.status]}
                  </span>
                </div>

                {/* Title + course */}
                <p className="text-brand-navy mb-0.5 text-base leading-snug font-bold">
                  {quiz.title}
                </p>
                <p className="mb-4 text-xs text-slate-400">{quiz.course}</p>

                {/* Stats row */}
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {[
                    { label: 'Passing', value: `${quiz.passingScore}%` },
                    { label: 'Limit', value: quiz.timeLimit },
                    {
                      label: quiz.status === 'completed' ? 'Score' : 'Progress',
                      value:
                        quiz.status === 'completed'
                          ? `${quiz.score}%`
                          : `${quiz.progress}%`,
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-lg bg-slate-50 px-2 py-3 text-center"
                    >
                      <p className="text-brand-navy text-sm font-bold">
                        {value}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Progress */}
                <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{deadlineLabel}</span>
                  <span>{resultLabel}</span>
                </div>
                <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="bg-brand-gold h-full rounded-full transition-all"
                    style={{ width: `${displayValue}%` }}
                  />
                </div>

                {/* CTA */}
                <button className="bg-brand-gold hover:bg-brand-gold-dark mt-auto w-full rounded-lg py-2.5 text-sm font-bold text-white transition-colors">
                  {CTA_LABEL[quiz.status]}
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Quiz Timeline ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-brand-navy mb-0.5 text-base font-bold">
            Quiz Timeline
          </h2>
          <p className="mb-6 text-sm text-slate-400">
            Upcoming quiz work and recent results in one place.
          </p>

          <ul className="flex flex-col">
            {QUIZZES.map((quiz, idx) => {
              const displayValue =
                quiz.status === 'completed' ? (quiz.score ?? 0) : quiz.progress;
              const reminderLabel =
                quiz.status === 'completed' ? 'Completed' : quiz.deadline;

              return (
                <li key={quiz.id} className="flex gap-4">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center">
                    <div className="bg-brand-gold flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      {idx + 1}
                    </div>
                    {idx < QUIZZES.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-slate-200" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ${idx < QUIZZES.length - 1 ? 'pb-6' : ''}`}
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-brand-navy font-bold">
                          {quiz.title}
                        </p>
                        <p className="text-xs text-slate-400">{quiz.course}</p>
                        <p className="text-xs text-slate-400">
                          Reminder target: {reminderLabel}
                        </p>
                      </div>
                      <span
                        className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE[quiz.status]}`}
                      >
                        {STATUS_LABEL[quiz.status]}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="bg-brand-gold h-full rounded-full transition-all"
                          style={{ width: `${displayValue}%` }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right text-xs font-semibold text-slate-500">
                        {displayValue}%
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
