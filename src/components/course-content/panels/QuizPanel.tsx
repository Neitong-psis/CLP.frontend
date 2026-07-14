import { useEffect, useState } from 'react';
import { Clock, ClipboardList, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type {
  QuizItem,
  QuizQuestion,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import { ContentHeader } from './ContentHeader';
import type { PanelRole } from './types';

/** `125` -> `"02:05"`. */
function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

interface QuizPanelProps {
  item: QuizItem;
  role: PanelRole;
  /** Learner only — e.g. "Attempt 1 of 3", shown beside the timer. */
  attemptBadge?: React.ReactNode;
  /** Learner only — fires once, with the raw score, when they finish the
   *  last question. Pass/fail, retry, and attempt-tracking are the caller's
   *  concern (they vary by course/attempt state); this panel only runs the
   *  act of answering questions. */
  onFinish?: (correctCount: number, total: number) => void;
}

/**
 * Shared quiz-taking surface for review and learner contexts.
 *
 * Review (admin/educator): no start gate — jumps straight to question 1, and
 * the header shows the quiz's estimated duration as a static, non-running
 * clock. Learner: opens on a "Start Quiz" gate (the estimated duration still
 * static here), and starting it begins a real running timer that counts
 * while they answer.
 */
export function QuizPanel({
  item,
  role,
  attemptBadge,
  onFinish,
}: QuizPanelProps) {
  const totalQ = item.questions.length;
  const [started, setStarted] = useState(role === 'review');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(totalQ).fill(null),
  );

  useEffect(() => {
    if (!started || role !== 'learner') return;
    const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [started, role]);

  const question: QuizQuestion = item.questions[currentQ];
  const pct = Math.round(((currentQ + 1) / totalQ) * 100);
  const isLast = currentQ === totalQ - 1;

  function goNext() {
    if (isLast) {
      if (role === 'learner') {
        const correctCount = answers.filter(
          (a, i) => a === item.questions[i].correctIndex,
        ).length;
        onFinish?.(correctCount, totalQ);
      }
      return;
    }
    const nextIdx = currentQ + 1;
    const saved = answers[nextIdx];
    setCurrentQ(nextIdx);
    setSelected(saved);
    setRevealed(saved !== null);
  }

  function goBack() {
    if (currentQ === 0) return;
    const prevIdx = currentQ - 1;
    const saved = answers[prevIdx];
    setCurrentQ(prevIdx);
    setSelected(saved);
    setRevealed(saved !== null);
  }

  const timer =
    role === 'learner' && started ? (
      <span className="border-border bg-muted/40 text-foreground/70 flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tabular-nums">
        <Clock className="h-3.5 w-3.5" />
        {formatDuration(elapsedSeconds)}
      </span>
    ) : (
      <span className="border-border bg-muted/40 text-foreground/70 flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tabular-nums">
        <Clock className="h-3.5 w-3.5" />
        {formatDuration(item.estimatedMinutes * 60)}
      </span>
    );

  // ── Start gate (learner only) ────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="border-border bg-card overflow-hidden rounded-2xl border">
        <ContentHeader kindLabel="Quiz" title={item.title} meta={timer} />
        <div className="flex flex-col items-center gap-3.5 px-6 py-10 text-center">
          <div className="bg-brand-gold/10 flex size-12 items-center justify-center rounded-full">
            <ClipboardList className="text-brand-gold h-5 w-5" />
          </div>
          <div>
            <h3 className="text-foreground text-lg font-bold">
              Ready to start?
            </h3>
            <p className="text-muted-foreground mt-1 max-w-sm text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-3 py-1 text-xs font-medium">
              {totalQ} Questions
            </span>
            <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-3 py-1 text-xs font-medium">
              ~{item.estimatedMinutes} Minutes
            </span>
            {attemptBadge}
          </div>
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 mt-1 rounded-xl px-8 py-3 text-sm font-bold transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // ── Question screen ───────────────────────────────────────────────────────────
  return (
    <div className="border-border bg-card flex max-h-full flex-col overflow-hidden rounded-2xl border">
      <ContentHeader
        kindLabel="Quiz"
        title={item.title}
        meta={
          <div className="flex items-center gap-2">
            {attemptBadge}
            {timer}
          </div>
        }
        subRow={
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
              Question {currentQ + 1} of {totalQ}
            </span>
            <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
              Single Choice
            </span>
          </div>
        }
        className="shrink-0"
      />

      {/* Progress bar (pinned) */}
      <div className="bg-muted/40 h-1.5 w-full shrink-0">
        <div
          className="bg-brand-gold h-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Question + options — the only scrolling region */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-4 sm:px-6 sm:pt-5">
        <h3 className="text-foreground text-base font-bold sm:text-xl">
          {question.question}
        </h3>
        <p className="text-muted-foreground mt-0.5 text-xs sm:text-sm">
          Choose one answer.
        </p>

        <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
          {question.options.map((opt, i) => (
            <QuizOption
              key={i}
              option={opt}
              index={i}
              selected={selected}
              revealed={revealed}
              correctIndex={question.correctIndex}
              onSelect={(idx) => {
                setSelected(idx);
                setRevealed(true);
                setAnswers((prev) => {
                  const next = [...prev];
                  next[currentQ] = idx;
                  return next;
                });
              }}
            />
          ))}
        </div>

        {revealed && (
          <p
            className={cn(
              'mt-3 text-xs font-semibold',
              selected === question.correctIndex
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400',
            )}
          >
            {selected === question.correctIndex
              ? '✓ Correct!'
              : `✗ Correct answer: ${question.options[question.correctIndex]}`}
          </p>
        )}
      </div>

      {/* Nav footer (pinned) */}
      <div className="border-border/60 bg-card flex shrink-0 items-center justify-between border-t px-5 py-3 sm:px-6 sm:py-3.5">
        <button
          type="button"
          onClick={goBack}
          disabled={currentQ === 0}
          className="border-border text-foreground/70 hover:bg-muted/60 hover:text-foreground rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30"
        >
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!revealed || (role === 'review' && isLast)}
          className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast
            ? role === 'review'
              ? 'End of Preview'
              : 'Finish Quiz'
            : 'Next'}
        </button>
      </div>
    </div>
  );
}

// ── Answer option ────────────────────────────────────────────────────────────

function QuizOption({
  option,
  index,
  selected,
  revealed,
  correctIndex,
  onSelect,
}: {
  option: string;
  index: number;
  selected: number | null;
  revealed: boolean;
  correctIndex: number;
  onSelect: (i: number) => void;
}) {
  const isSelected = selected === index;
  const isCorrect = index === correctIndex;

  let ring = 'border-border hover:border-brand-gold/40 hover:bg-muted/40';
  let dot = 'border-border';
  let text = 'text-foreground/80';

  if (revealed) {
    if (isCorrect) {
      ring = 'border-emerald-400/60 bg-emerald-50 dark:bg-emerald-500/10';
      dot = 'border-emerald-500 bg-emerald-500';
      text = 'text-emerald-700 dark:text-emerald-400 font-semibold';
    } else if (isSelected) {
      ring = 'border-rose-400/60 bg-rose-50 dark:bg-rose-500/10';
      dot = 'border-rose-500 bg-rose-500';
      text = 'text-rose-600 dark:text-rose-400';
    }
  } else if (isSelected) {
    ring = 'border-brand-gold bg-brand-gold/8';
    dot = 'border-brand-gold bg-brand-gold';
    text = 'text-foreground font-semibold';
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      disabled={revealed}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-150 sm:gap-3 sm:px-4 sm:py-3',
        ring,
      )}
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all',
          dot,
        )}
      >
        {isSelected && !revealed && (
          <span className="h-2 w-2 rounded-full bg-white" />
        )}
        {revealed && isCorrect && (
          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
        )}
      </span>
      <span className={cn('text-sm', text)}>{option}</span>
    </button>
  );
}
