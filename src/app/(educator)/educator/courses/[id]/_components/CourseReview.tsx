'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ChevronDown,
  FileText,
  Play,
  ClipboardList,
  ClipboardCheck,
  Layers,
  BookOpen,
  PencilLine,
  Send,
  CalendarDays,
  FileUp,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { EDUCATOR_USER, type CourseTask } from '@/constants/educator';
import {
  REVIEW_MODULES,
  ITEM_STATUS_STYLE,
  flattenItems,
  lessonCount,
  type ReviewItem,
  type ReviewItemKind,
  type ReviewModule,
  type DocumentItem,
  type VideoItem,
  type QuizItem,
  type AssignmentItem,
} from '../_lib/content';

const KIND_ICON: Record<ReviewItemKind, typeof Play> = {
  document: FileText,
  video: Play,
  quiz: ClipboardList,
  assignment: ClipboardCheck,
};

export function CourseReview({ task }: { task: CourseTask }) {
  const router = useRouter();
  const { toast } = useToast();
  const modules = REVIEW_MODULES;
  const items = useMemo(() => flattenItems(modules), [modules]);
  const firstVideo = items.find((i) => i.kind === 'video') ?? items[0];

  const [activeId, setActiveId] = useState(firstVideo?.id ?? '');
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.id)),
  );
  const [viewed, setViewed] = useState<Set<string>>(
    () => new Set([firstVideo?.id]),
  );
  const [showResubmit, setShowResubmit] = useState(false);

  const active = items.find((i) => i.id === activeId) ?? items[0];

  function select(id: string) {
    setActiveId(id);
    setViewed((prev) => new Set(prev).add(id));
  }

  function toggleModule(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleResubmit() {
    setShowResubmit(false);
    toast(`"${task.title}" was resubmitted for review.`, 'success');
    router.push('/educator/courses');
  }

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
        <button
          onClick={() => router.push('/educator/courses')}
          aria-label="Back to My Courses"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-brand-navy truncate text-base font-bold sm:text-lg">
            Course Review
          </h1>
          <p className="truncate text-[11px] text-slate-400">
            Live workspace synced for {EDUCATOR_USER.email}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-600 sm:inline-flex">
          {EDUCATOR_USER.role}
        </span>
      </header>

      {/* Body */}
      <div className="flex flex-1 flex-col lg:flex-row">
        <ReviewSidebar
          courseTitle={task.title}
          modules={modules}
          activeId={activeId}
          reviewedCount={viewed.size}
          totalCount={items.length}
          expanded={expanded}
          onToggleModule={toggleModule}
          onSelect={select}
        />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
            {active && <PreviewPanel item={active} />}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
        <Button
          variant="outline"
          className="gap-1.5"
          onClick={() => router.push('/educator/courses')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to My Courses
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={() => {
              toast('Opening the course editor…', 'info');
              router.push('/educator/courses/new');
            }}
          >
            <PencilLine className="h-4 w-4" /> Edit Course
          </Button>
          <Button className="gap-1.5" onClick={() => setShowResubmit(true)}>
            <Send className="h-4 w-4" /> Resubmit for Review
          </Button>
        </div>
      </footer>

      {showResubmit && (
        <ResubmitDialog
          courseTitle={task.title}
          onConfirm={handleResubmit}
          onClose={() => setShowResubmit(false)}
        />
      )}
    </div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────────────

function ReviewSidebar({
  courseTitle,
  modules,
  activeId,
  reviewedCount,
  totalCount,
  expanded,
  onToggleModule,
  onSelect,
}: {
  courseTitle: string;
  modules: ReviewModule[];
  activeId: string;
  reviewedCount: number;
  totalCount: number;
  expanded: Set<string>;
  onToggleModule: (id: string) => void;
  onSelect: (id: string) => void;
}) {
  const lessons = modules.reduce((sum, m) => sum + lessonCount(m), 0);
  const pct =
    totalCount === 0 ? 0 : Math.round((reviewedCount / totalCount) * 100);

  return (
    <aside className="shrink-0 border-b border-slate-200 bg-white lg:w-72 lg:border-r lg:border-b-0 xl:w-80">
      <div className="border-b border-slate-100 px-5 py-4">
        <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
          Course Content
        </p>
        <h2 className="text-brand-navy mt-1 text-sm leading-snug font-bold">
          {courseTitle}
        </h2>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            <Layers className="h-3 w-3" /> {modules.length} Modules
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            <BookOpen className="h-3 w-3" /> {lessons} Lessons
          </span>
        </div>
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="bg-brand-gold h-full rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">
            {reviewedCount} of {totalCount} items reviewed
          </p>
        </div>
      </div>

      <div className="max-h-[40vh] overflow-y-auto lg:max-h-none">
        {modules.map((module) => {
          const isOpen = expanded.has(module.id);
          return (
            <div key={module.id} className="border-b border-slate-100">
              <button
                onClick={() => onToggleModule(module.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-2 px-5 py-3.5 text-left transition-colors hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="text-brand-navy text-sm font-bold">
                    {module.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {lessonCount(module)} lessons created by educator
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    'mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <div className="pb-2">
                  <Group
                    label="Text/Image Lessons"
                    items={module.documents}
                    activeId={activeId}
                    onSelect={onSelect}
                  />
                  <Group
                    label="Video Lessons"
                    items={module.videos}
                    activeId={activeId}
                    onSelect={onSelect}
                  />
                  <Group
                    label="Quiz"
                    items={module.quizzes}
                    activeId={activeId}
                    onSelect={onSelect}
                  />
                  <Group
                    label="Assignment"
                    items={module.assignments}
                    activeId={activeId}
                    onSelect={onSelect}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function Group({
  label,
  items,
  activeId,
  onSelect,
}: {
  label: string;
  items: ReviewItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="mt-1">
      <p className="px-5 py-1.5 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
        {label}
      </p>
      <ul>
        {items.map((item) => {
          const Icon = KIND_ICON[item.kind];
          const isActive = item.id === activeId;
          const status =
            item.kind === 'quiz' || item.kind === 'assignment'
              ? item.status
              : null;
          return (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 border-l-2 px-5 py-2 text-left transition-colors',
                  isActive
                    ? 'border-brand-gold bg-brand-gold/10'
                    : 'border-transparent hover:bg-slate-50',
                )}
              >
                <Icon
                  className={cn(
                    'h-3.5 w-3.5 shrink-0',
                    isActive ? 'text-brand-gold' : 'text-slate-400',
                  )}
                />
                <span
                  className={cn(
                    'min-w-0 flex-1 truncate text-xs font-medium',
                    isActive ? 'text-brand-navy' : 'text-slate-600',
                  )}
                >
                  {item.title}
                </span>
                {status && (
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                      ITEM_STATUS_STYLE[status],
                    )}
                  >
                    {status}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Preview panels ───────────────────────────────────────────────────────────

function PreviewPanel({ item }: { item: ReviewItem }) {
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

function IntroCard({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-4">
      <h3 className="text-sm font-bold text-slate-900">Lesson Introduction</h3>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}

function VideoPanel({ item }: { item: VideoItem }) {
  return (
    <div className="space-y-4">
      <IntroCard text={item.intro} />
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

function DocumentPanel({ item }: { item: DocumentItem }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
          Document Lesson
        </span>
        <h2 className="mt-3 text-xl font-bold text-slate-900">{item.title}</h2>
      </div>
      <IntroCard text={item.intro} />
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="space-y-3 text-sm leading-relaxed text-slate-600">
          {item.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuizPanel({ item }: { item: QuizItem }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
            Quiz
          </span>
          <span
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
              ITEM_STATUS_STYLE[item.status],
            )}
          >
            {item.status}
          </span>
        </div>
        <h2 className="mt-3 text-xl font-bold text-slate-900">{item.title}</h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Quiz for: {item.forLesson}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InfoCard
          icon={<ClipboardList className="h-4 w-4" />}
          label="Questions"
          value={`${item.questions} questions`}
        />
        <InfoCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label="Connected lesson"
          value={item.forLesson}
        />
      </div>
    </div>
  );
}

function AssignmentPanel({ item }: { item: AssignmentItem }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
            Assignment
          </span>
          <span
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
              ITEM_STATUS_STYLE[item.status],
            )}
          >
            {item.status}
          </span>
        </div>
        <h2 className="mt-3 text-xl font-bold text-slate-900">{item.title}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
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

// ── Resubmit dialog ──────────────────────────────────────────────────────────

function ResubmitDialog({
  courseTitle,
  onConfirm,
  onClose,
}: {
  courseTitle: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resubmit for review"
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="bg-brand-gold/15 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <Send className="text-brand-gold h-6 w-6" />
        </span>
        <h2 className="mt-3 text-lg font-bold text-slate-900">
          Resubmit for review?
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          “{courseTitle}” will be sent to an admin for approval. You can keep
          editing until it is approved.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>Resubmit</Button>
        </div>
      </div>
    </div>
  );
}
