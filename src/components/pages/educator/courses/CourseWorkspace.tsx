'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  BookOpen,
  PencilLine,
  CalendarDays,
  Flag,
  ArrowRight,
  RotateCcw,
  Eye,
  ClipboardList,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import {
  EDUCATOR_COURSE_TASKS,
  COURSE_TASK_STATUSES,
  type CourseTask,
  type CourseTaskStatus,
  type TaskPriority,
} from '@/constants/educator';

// ── Style maps ───────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<CourseTaskStatus, string> = {
  'To Do': 'border-slate-200 bg-slate-50 text-slate-600',
  'In Writing': 'border-blue-200 bg-blue-50 text-blue-600',
  'Under Review': 'border-amber-200 bg-amber-50 text-amber-700',
  Published: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Archived: 'border-slate-200 bg-slate-100 text-slate-500',
};

const PRIORITY_STYLE: Record<TaskPriority, string> = {
  High: 'text-rose-600',
  Medium: 'text-amber-600',
  Low: 'text-slate-500',
};

const STATUS_HINT: Record<CourseTaskStatus, string> = {
  'To Do': 'Open task details to review requirements before starting.',
  'In Writing': 'Keep drafting modules and lessons, then submit for review.',
  'Under Review': 'Submitted to admin. You will be notified after the review.',
  Published: 'Live for learners. Track performance in analytics.',
  Archived: 'Hidden from learners. Restore it to edit and republish.',
};

const ACTION_LABEL: Record<CourseTaskStatus, string> = {
  'To Do': 'Task Details',
  'In Writing': 'Continue Writing',
  'Under Review': 'View Submission',
  Published: 'View Course',
  Archived: 'Restore',
};

// ── Component ────────────────────────────────────────────────────────────────

export function CourseWorkspace() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<CourseTaskStatus>('To Do');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    const map = Object.fromEntries(
      COURSE_TASK_STATUSES.map((s) => [s, 0]),
    ) as Record<CourseTaskStatus, number>;
    for (const task of EDUCATOR_COURSE_TASKS) map[task.status] += 1;
    return map;
  }, []);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EDUCATOR_COURSE_TASKS.filter(
      (t) =>
        t.status === activeTab &&
        (q === '' ||
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)),
    );
  }, [activeTab, search]);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search your courses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="focus:border-brand-gold focus:ring-brand-gold/15 h-9 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-700 placeholder-slate-400 transition outline-none focus:ring-2"
          />
        </div>
        <Button
          className="gap-1.5 self-start sm:self-auto"
          onClick={() => router.push('/educator/courses/new')}
        >
          <Plus className="h-4 w-4" />
          Create a Course
        </Button>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Course status"
        className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-1"
      >
        {COURSE_TASK_STATUSES.map((status) => {
          const active = status === activeTab;
          return (
            <button
              key={status}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(status)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors',
                active
                  ? 'text-brand-gold bg-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700',
              )}
            >
              {status}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                  active
                    ? 'bg-brand-gold/15 text-brand-gold'
                    : 'bg-slate-200 text-slate-500',
                )}
              >
                {counts[status]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cards */}
      {visible.length === 0 ? (
        <EmptyState status={activeTab} hasSearch={search.trim().length > 0} />
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onOpen={() => router.push(`/educator/courses/${task.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Task card ────────────────────────────────────────────────────────────────

function TaskCard({ task, onOpen }: { task: CourseTask; onOpen: () => void }) {
  const isArchived = task.status === 'Archived';
  const ActionIcon =
    task.status === 'Published'
      ? Eye
      : task.status === 'Archived'
        ? RotateCcw
        : task.status === 'Under Review'
          ? ClipboardList
          : PencilLine;

  return (
    <article
      onClick={onOpen}
      className="group hover:border-brand-gold/40 cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:shadow-[0_1px_12px_-4px_rgba(15,23,42,0.15)]"
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        <div className="bg-brand-gold/10 group-hover:bg-brand-gold/15 flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors">
          <BookOpen className="text-brand-gold h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-brand-navy truncate text-[15px] font-bold">
            {task.title}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-sm text-slate-500">
            {task.description}
          </p>
        </div>

        <span
          className={cn(
            'shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold',
            STATUS_BADGE[task.status],
          )}
        >
          {task.status}
        </span>
      </div>

      {/* Meta row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 pl-13">
        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
          {task.category}
        </span>
        <span
          className={cn(
            'rounded-md px-2 py-0.5 text-[11px] font-semibold',
            task.price === 'Free'
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-brand-gold/10 text-brand-gold',
          )}
        >
          {task.price}
        </span>
        <span className="text-[11px] text-slate-400">
          Assigned by{' '}
          <span className="font-medium text-slate-500">{task.assignedBy}</span>
        </span>
      </div>

      {/* Footer panel */}
      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold">
            <Flag className={cn('h-3 w-3', PRIORITY_STYLE[task.priority])} />
            <span className={PRIORITY_STYLE[task.priority]}>
              {task.priority} priority
            </span>
          </span>
          <span className="hidden items-center gap-1.5 text-[11px] text-slate-500 sm:flex">
            <BookOpen className="h-3 w-3 text-slate-400" />
            Course Creation
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <CalendarDays className="h-3 w-3 text-slate-400" />
            {task.dueDate}
          </span>
          <span className="hidden text-[11px] text-slate-400 lg:inline">
            {STATUS_HINT[task.status]}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className={cn(
            'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
            isArchived
              ? 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
              : 'bg-brand-navy hover:bg-brand-navy-tint text-white',
          )}
        >
          <ActionIcon className="h-3.5 w-3.5" />
          {ACTION_LABEL[task.status]}
          {!isArchived && (
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
      </div>
    </article>
  );
}

// ── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({
  status,
  hasSearch,
}: {
  status: CourseTaskStatus;
  hasSearch: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-slate-50">
        <BookOpen className="h-6 w-6 text-slate-300" />
      </div>
      <p className="text-sm font-semibold text-slate-600">
        {hasSearch
          ? 'No courses match your search'
          : `Nothing in “${status}” yet`}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        {hasSearch
          ? 'Try a different keyword or switch tabs.'
          : 'Tasks will appear here as your courses move through this stage.'}
      </p>
    </div>
  );
}
