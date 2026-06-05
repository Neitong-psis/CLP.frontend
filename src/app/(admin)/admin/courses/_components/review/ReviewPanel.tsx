'use client';

import { useState } from 'react';
import {
  Play,
  Clock,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
  CalendarDays,
  BookText,
  FileUp,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
  REVIEW_STATUS_STYLE,
  type AssignmentItem,
  type DocumentItem,
  type QuizItem,
  type ReviewItem,
  type VideoItem,
} from '../../_lib/review';

/** Renders the preview for whichever item the admin selected in the sidebar. */
export function ReviewPanel({ item }: { item: ReviewItem }) {
  switch (item.kind) {
    case 'video':
      return <VideoPanel item={item} />;
    case 'document':
      return <DocumentPanel item={item} />;
    case 'quiz':
      return <QuizPanel item={item} />;
    case 'assignment':
      return <AssignmentPanel item={item} />;
  }
}

// ── Shared ───────────────────────────────────────────────────────────────────

function KindBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
      {label}
    </span>
  );
}

function LockedNotice() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <Lock className="h-4 w-4 shrink-0 text-slate-400" />
      <p className="text-xs text-slate-500">
        Locked for learners until earlier lessons are complete. Shown here for
        review only.
      </p>
    </div>
  );
}

// ── Video ────────────────────────────────────────────────────────────────────

function VideoPanel({ item }: { item: VideoItem }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-4">
        <h3 className="text-sm font-bold text-slate-900">
          Lesson Introduction
        </h3>
        <p className="mt-1 text-sm text-slate-500">{item.intro}</p>
      </div>

      <div className="bg-brand-navy relative aspect-video w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="bg-brand-gold flex h-14 w-14 items-center justify-center rounded-full">
            <Play className="ml-0.5 h-6 w-6 fill-current text-white" />
          </span>
          <p className="text-base font-bold text-white">{item.title}</p>
          <p className="text-xs text-slate-300">{item.caption}</p>
        </div>
      </div>
    </div>
  );
}

// ── Document ─────────────────────────────────────────────────────────────────

function DocumentPanel({ item }: { item: DocumentItem }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <KindBadge label="Document Lesson" />
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
              REVIEW_STATUS_STYLE[item.status],
            )}
          >
            {item.status}
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
        <p className="mt-0.5 text-xs text-slate-400">{item.readingLabel}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-4">
        <h3 className="text-sm font-bold text-slate-900">
          Lesson Introduction
        </h3>
        <p className="mt-1 text-sm text-slate-500">{item.intro}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
          {item.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="bg-brand-gold/5 border-brand-gold/30 mt-4 rounded-lg border-l-2 px-4 py-3">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Key takeaway:</span>{' '}
            {item.keyTakeaway}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-bold text-slate-900">
            Lesson Information
          </h3>
          <dl className="mt-2 space-y-1 text-sm text-slate-500">
            <div className="flex gap-1">
              <dt className="text-slate-400">Duration:</dt>
              <dd>{item.duration}</dd>
            </div>
            <div className="flex gap-1">
              <dt className="text-slate-400">Quiz:</dt>
              <dd>{item.linkedQuiz}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="text-sm font-bold text-slate-900">Next Action</h3>
          <p className="mt-2 text-sm text-slate-500">
            Admin preview only. Learners can start the connected quiz after
            completion.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-bold text-slate-900">Learning Resources</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {item.resources.map((resource) => (
            <span
              key={resource}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600"
            >
              {resource}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────

function QuizPanel({ item }: { item: QuizItem }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const total = item.questions.length;
  const question = item.questions[index];
  const progressPct = Math.round(((index + 1) / total) * 100);
  const isLocked = item.status === 'Locked';

  return (
    <div className="space-y-4">
      {isLocked && <LockedNotice />}

      <div
        className={cn(
          'rounded-xl border border-slate-200 bg-white p-5 sm:p-6',
          isLocked && 'opacity-90',
        )}
      >
        <p className="text-xs text-slate-400">Quiz for: {item.forLesson}</p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">{item.title}</h2>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <KindBadge label={`Question ${index + 1} of ${total}`} />
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
            <Clock className="h-3 w-3" /> {item.minutes} Minutes
          </span>
          <KindBadge label="Single Choice" />
        </div>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="bg-brand-gold h-full rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <h3 className="mt-6 text-lg font-bold text-slate-900">
          {question.prompt}
        </h3>
        <p className="mt-0.5 text-sm text-slate-400">Choose one answer.</p>

        <div className="mt-4 space-y-3">
          {question.choices.map((choice, choiceIndex) => {
            const selected = answers[question.id] === choiceIndex;
            return (
              <button
                key={choice}
                onClick={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.id]: choiceIndex,
                  }))
                }
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors',
                  selected
                    ? 'border-brand-gold bg-brand-gold/5'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50',
                )}
              >
                <span
                  className={cn(
                    'flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2',
                    selected ? 'border-brand-gold' : 'border-slate-300',
                  )}
                >
                  {selected && (
                    <span className="bg-brand-gold h-2 w-2 rounded-full" />
                  )}
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {choice}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            disabled={index === total - 1}
            className="bg-brand-gold hover:bg-brand-gold-dark inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-40"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Assignment ───────────────────────────────────────────────────────────────

function AssignmentPanel({ item }: { item: AssignmentItem }) {
  const isLocked = item.status === 'Locked';

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <KindBadge label="Assignment" />
          <span
            className={cn(
              'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
              REVIEW_STATUS_STYLE[item.status],
            )}
          >
            {item.status}
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
        <p className="mt-0.5 text-sm text-slate-400">
          Assigned after {item.assignedAfter}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <InfoCard
          icon={<BookText className="h-4 w-4" />}
          label="Lesson"
          value={item.lessonTitle}
        />
        <InfoCard
          icon={<CalendarDays className="h-4 w-4" />}
          label="Due date"
          value={`Due ${item.dueDate}`}
        />
        <InfoCard
          icon={<FileUp className="h-4 w-4" />}
          label="Submission"
          value={item.submission}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-bold text-slate-900">Instructions</h3>
        <p className="mt-1 text-sm text-slate-500">{item.instructions}</p>
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-5 py-10 text-center">
        <UploadCloud className="mx-auto h-7 w-7 text-slate-400" />
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Learner upload area
        </p>
        <p className="mt-0.5 text-xs text-slate-400">
          PDF, document, or shareable link accepted
        </p>
        <button
          disabled
          className="bg-brand-gold/60 mt-4 cursor-not-allowed rounded-lg px-4 py-2 text-sm font-semibold text-white"
          title="Disabled in admin preview"
        >
          Submit Assignment
        </button>
        <p className="mt-2 text-[11px] text-slate-400">
          {isLocked
            ? 'Locked until earlier lessons are complete.'
            : 'Disabled in admin preview.'}
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
        <span className="text-slate-400">{icon}</span>
        {label}
      </p>
      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}
