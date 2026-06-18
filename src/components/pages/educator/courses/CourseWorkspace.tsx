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
import { useEducatorCoursesT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { useCourseTasks } from '@/context/CourseTasksContext';
import {
  COURSE_TASK_STATUSES,
  type CourseTask,
  type CourseTaskStatus,
  type TaskPriority,
} from '@/constants/educator';

// ── Style maps ───────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<CourseTaskStatus, string> = {
  'To Do': 'border-border bg-muted/40 text-foreground/80',
  'In Writing': 'border-blue-400/30 bg-blue-500/10 text-blue-500',
  'Under Review': 'border-amber-400/30 bg-amber-500/10 text-amber-500',
  Published: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-500',
  Archived: 'border-border bg-muted text-muted-foreground',
};

const PRIORITY_STYLE: Record<TaskPriority, string> = {
  High: 'text-rose-600',
  Medium: 'text-amber-600',
  Low: 'text-muted-foreground',
};

const ACTION_LABEL_KEY: Record<
  CourseTaskStatus,
  'toDo' | 'inWriting' | 'underReview' | 'published' | 'archived'
> = {
  'To Do': 'toDo',
  'In Writing': 'inWriting',
  'Under Review': 'underReview',
  Published: 'published',
  Archived: 'archived',
};

// ── Component ────────────────────────────────────────────────────────────────

export function CourseWorkspace() {
  const router = useRouter();
  const t = useEducatorCoursesT();
  const { tasks } = useCourseTasks();
  const [activeTab, setActiveTab] = useState<CourseTaskStatus>('To Do');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    const map = Object.fromEntries(
      COURSE_TASK_STATUSES.map((s) => [s, 0]),
    ) as Record<CourseTaskStatus, number>;
    for (const task of tasks) map[task.status] += 1;
    return map;
  }, [tasks]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter(
      (t) =>
        t.status === activeTab &&
        (q === '' ||
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)),
    );
  }, [tasks, activeTab, search]);

  return (
    <div className="flex flex-col gap-4">
      {/* Header — single row on all sizes */}
      <div className="flex items-center gap-2">
        <div className="relative min-w-0 flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <input
            type="search"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-brand-navy focus:ring-brand-navy/20 dark:focus:border-brand-gold dark:focus:ring-brand-gold/20 h-9 w-full rounded-lg border pr-3 pl-9 text-sm transition outline-none focus:ring-2"
          />
        </div>
        {/* Icon-only on mobile, full label on sm+ */}
        <Button
          className="shrink-0 gap-1.5"
          onClick={() => router.push('/educator/courses/new')}
          aria-label={t('create')}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">{t('create')}</span>
        </Button>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Course status"
        className="border-border bg-muted/40 flex gap-1 overflow-x-auto rounded-xl border p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                'flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors sm:flex-1 sm:px-3.5',
                active
                  ? 'bg-card text-brand-navy dark:text-brand-gold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {status}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                  active
                    ? 'bg-brand-navy dark:bg-brand-gold dark:text-brand-navy text-white'
                    : 'bg-muted-foreground/20 text-muted-foreground',
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
        <EmptyState
          status={activeTab}
          hasSearch={search.trim().length > 0}
          t={t}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onOpen={() => router.push(`/educator/courses/${task.id}`)}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Task card ────────────────────────────────────────────────────────────────

type TFn = ReturnType<typeof useEducatorCoursesT>;

function TaskCard({
  task,
  onOpen,
  t,
}: {
  task: CourseTask;
  onOpen: () => void;
  t: TFn;
}) {
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
      className="group border-border bg-card hover:border-brand-navy/20 cursor-pointer rounded-2xl border p-4 transition-all duration-200 hover:shadow-md dark:hover:border-white/12 dark:hover:shadow-none"
    >
      {/* Top row: icon + title + status badge */}
      <div className="flex items-start gap-3">
        <div className="bg-brand-navy/8 group-hover:bg-brand-navy/12 flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors dark:bg-white/6 dark:group-hover:bg-white/9">
          <BookOpen className="text-brand-navy dark:text-brand-gold/80 h-4.5 w-4.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-foreground text-sm leading-snug font-bold">
              {task.title}
            </h3>
            <span
              className={cn(
                'mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                STATUS_BADGE[task.status],
              )}
            >
              {task.status}
            </span>
          </div>
          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed">
            {task.description}
          </p>
        </div>
      </div>

      {/* Chips row */}
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span className="border-border bg-muted/50 text-muted-foreground rounded-md border px-2 py-0.5 text-[11px] font-medium">
          {task.category}
        </span>
        <span
          className={cn(
            'rounded-md px-2 py-0.5 text-[11px] font-semibold',
            task.price === 'Free'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-muted text-foreground',
          )}
        >
          {task.price}
        </span>
        <span className="text-muted-foreground/55 text-[11px]">
          {t('assignedBy')}{' '}
          <span className="text-muted-foreground font-medium">
            {task.assignedBy}
          </span>
        </span>
      </div>

      {/* Footer: priority + date left, action right — always a single row */}
      <div className="border-border/40 mt-3 flex items-center justify-between gap-3 border-t pt-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] font-semibold">
            <Flag
              className={cn('h-3 w-3 shrink-0', PRIORITY_STYLE[task.priority])}
            />
            <span className={PRIORITY_STYLE[task.priority]}>
              {t('priorityLabel', { priority: task.priority })}
            </span>
          </span>
          <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <CalendarDays className="text-muted-foreground/50 h-3 w-3 shrink-0" />
            {task.dueDate}
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="border-border bg-muted/40 text-foreground hover:border-brand-navy/25 hover:bg-brand-navy/8 hover:text-brand-navy inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors dark:hover:border-white/15 dark:hover:bg-white/6 dark:hover:text-white"
        >
          <ActionIcon className="h-3 w-3" />
          {t(`actionLabel.${ACTION_LABEL_KEY[task.status]}`)}
          {!isArchived && (
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
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
  t,
}: {
  status: CourseTaskStatus;
  hasSearch: boolean;
  t: TFn;
}) {
  return (
    <div className="border-border bg-card flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
      <div className="bg-muted mb-3 flex size-12 items-center justify-center rounded-2xl">
        <BookOpen className="text-muted-foreground/40 h-6 w-6" />
      </div>
      <p className="text-foreground text-sm font-semibold">
        {hasSearch ? t('noResultsSearch') : t('nothingInStatus', { status })}
      </p>
      <p className="text-muted-foreground mt-1 text-xs">
        {hasSearch ? t('tryKeyword') : t('tasksWillAppear')}
      </p>
    </div>
  );
}
