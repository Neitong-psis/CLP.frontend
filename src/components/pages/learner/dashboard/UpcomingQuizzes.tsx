import Link from 'next/link';
import { ChevronRight, BookOpen, Clock, Target, Calendar } from 'lucide-react';
import { QUIZZES } from '@/config/learner';
import type { QuizStatus } from '@/config/learner';

const ACCENT: Record<QuizStatus, string> = {
  'in-progress': 'border-l-brand-gold',
  pending: 'border-l-slate-200',
  completed: 'border-l-brand-navy/40',
};

const STATUS_PILL: Record<QuizStatus, string> = {
  'in-progress': 'bg-brand-gold/15 text-brand-gold',
  pending: 'bg-slate-100 text-slate-400',
  completed: 'bg-brand-navy/10 text-brand-navy',
};

const STATUS_LABEL: Record<QuizStatus, string> = {
  'in-progress': 'In Progress',
  pending: 'Upcoming',
  completed: 'Completed',
};

const CTA: Record<QuizStatus, { label: string; cls: string }> = {
  'in-progress': {
    label: 'Continue',
    cls: 'bg-brand-gold text-brand-navy hover:bg-brand-gold-dark',
  },
  pending: {
    label: 'Start Quiz',
    cls: 'bg-brand-navy text-white hover:opacity-90',
  },
  completed: {
    label: 'View Results',
    cls: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
  },
};

function ScoreRing({ score }: { score: number }) {
  const size = 44;
  const sw = 3;
  const r = (size - sw * 2) / 2;
  const circ = 2 * Math.PI * r;
  const fill = circ * (score / 100);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={sw}
          className="stroke-slate-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={sw}
          strokeLinecap="round"
          className="stroke-brand-gold"
          strokeDasharray={`${fill} ${circ - fill}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-brand-navy text-[10px] font-black">{score}%</span>
      </div>
    </div>
  );
}

export default function UpcomingQuizzes() {
  const due = QUIZZES.filter((q) => q.status !== 'completed').length;
  const total = QUIZZES.length;

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-brand-navy text-base font-bold">Quizzes</h2>
          <p className="mt-0.5 text-[11px] text-slate-400">
            {due} due &middot; {total} total
          </p>
        </div>
        <Link
          href="/dashboard/quizzes"
          className="text-brand-gold flex items-center gap-0.5 text-xs font-semibold hover:underline"
        >
          View all <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Quiz list */}
      <ul className="flex flex-col gap-3">
        {QUIZZES.map((q) => {
          const cta = CTA[q.status];

          return (
            <li
              key={q.id}
              className={`rounded-lg border border-l-[3px] border-slate-100 bg-white p-4 ${ACCENT[q.status]}`}
            >
              {/* Title + status indicator */}
              <div className="mb-2.5 flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-brand-navy text-sm leading-tight font-semibold">
                    {q.title}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-slate-400">
                    {q.course}
                  </p>
                </div>
                {q.status === 'completed' ? (
                  <ScoreRing score={q.score ?? 0} />
                ) : (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_PILL[q.status]}`}
                  >
                    {STATUS_LABEL[q.status]}
                  </span>
                )}
              </div>

              {/* Progress bar (in-progress only) */}
              {q.status === 'in-progress' && (
                <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="bg-brand-gold h-full rounded-full"
                    style={{ width: `${q.progress}%` }}
                  />
                </div>
              )}

              {/* Meta row */}
              <div className="mb-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {q.questions} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {q.timeLimit}
                </span>
                <span className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {q.passingScore}% pass
                </span>
              </div>

              {/* Deadline + CTA */}
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Calendar className="h-3 w-3 shrink-0" />
                  {q.deadline}
                </span>
                <Link
                  href="/dashboard/quizzes"
                  className={`shrink-0 rounded-md px-3 py-1.5 text-[11px] font-bold transition-colors ${cta.cls}`}
                >
                  {cta.label}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
