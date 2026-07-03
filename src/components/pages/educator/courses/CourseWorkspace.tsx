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
  ClipboardList,
  Trash2,
  Users,
  DollarSign,
  Star,
  Clock,
} from 'lucide-react';
import { useEducatorCoursesT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { PillTabs, type PillTab } from '@/components/common/list/PillTabs';
import { useCourseTasks } from '@/context/CourseTasksContext';
import {
  COURSE_TASK_STATUSES,
  EDUCATOR_USER,
  type CourseTask,
  type CourseTaskStatus,
  type ReviewState,
  type TaskPriority,
} from '@/constants/educator';

// ── Style maps ───────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<CourseTaskStatus, string> = {
  'To Do': 'border-border bg-muted/40 text-muted-foreground',
  'In Writing': 'border-blue-400/30 bg-blue-500/10 text-blue-500',
  'Under Review': 'border-amber-400/30 bg-amber-500/10 text-amber-600',
  Published: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-600',
  Archived: 'border-border bg-muted text-muted-foreground',
};

/** Under Review shows the admin decision instead of the raw status. */
const REVIEW_BADGE: Record<ReviewState, string> = {
  Approved: 'border-transparent bg-emerald-500 text-white',
  Reject: 'border-transparent bg-red-500 text-white',
  'Under Review': 'border-amber-400/40 bg-amber-500/10 text-amber-600',
};

const REVIEW_LABEL_KEY: Record<ReviewState, 'approved' | 'reject' | 'pending'> =
  {
    Approved: 'approved',
    Reject: 'reject',
    'Under Review': 'pending',
  };

const PRIORITY_STYLE: Record<TaskPriority, string> = {
  High: 'text-rose-600',
  Medium: 'text-amber-600',
  Low: 'text-muted-foreground',
};

/** Where a card leads, per the course lifecycle:
 *  To Do → start writing (blank wizard); In Writing → continue the draft;
 *  Under Review / Published / Archived → the course preview. */
function routeForTask(task: CourseTask): string {
  switch (task.status) {
    case 'To Do':
      return '/educator/courses/new';
    case 'In Writing':
      return `/educator/courses/new?draft=${task.id}`;
    default:
      return `/educator/courses/${task.id}`;
  }
}

// ── Component ────────────────────────────────────────────────────────────────

export function CourseWorkspace() {
  const router = useRouter();
  const t = useEducatorCoursesT();
  const { toast } = useToast();
  const { tasks, removeTask } = useCourseTasks();
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

  const STATUS_TABS: PillTab<CourseTaskStatus>[] = COURSE_TASK_STATUSES.map(
    (status) => ({ value: status, label: status, count: counts[status] }),
  );

  function handleDelete(task: CourseTask) {
    removeTask(task.id);
    toast(t('deletedToast', { title: task.title }), 'success');
  }

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
      <PillTabs
        tabs={STATUS_TABS}
        value={activeTab}
        onChange={setActiveTab}
        ariaLabel="Course status"
      />

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
              onOpen={() => router.push(routeForTask(task))}
              onDelete={() => handleDelete(task)}
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
  onDelete,
  t,
}: {
  task: CourseTask;
  onOpen: () => void;
  onDelete: () => void;
  t: TFn;
}) {
  const isToDo = task.status === 'To Do';
  const showPrice = task.status !== 'Archived';
  // To Do is the only stage assigned by an admin; afterwards the educator owns it.
  const author = isToDo
    ? `${t('assignedBy')} ${task.assignedBy}`
    : EDUCATOR_USER.name;

  return (
    <article
      onClick={onOpen}
      className="group border-border bg-card hover:border-brand-navy/20 cursor-pointer rounded-2xl border p-4 transition-all duration-200 hover:shadow-md dark:hover:border-white/12 dark:hover:shadow-none"
    >
      {/* Header: title + status badge */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-foreground text-sm leading-snug font-bold sm:text-base">
          {task.title}
        </h3>
        <StatusBadge task={task} t={t} />
      </div>

      {/* Description */}
      <p className="text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-relaxed sm:text-[13px]">
        {task.description}
      </p>

      {/* Meta row: icon + chips + author (left) · actions (right) */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="bg-brand-gold/10 flex size-9 shrink-0 items-center justify-center rounded-xl">
            <BookOpen className="text-brand-gold h-4.5 w-4.5" />
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="border-border bg-muted/50 text-muted-foreground rounded-md border px-2 py-0.5 text-[11px] font-medium">
              {task.category}
            </span>
            {showPrice && (
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
            )}
            <span className="text-muted-foreground truncate text-[11px] font-medium">
              {author}
            </span>
          </div>
        </div>

        <CardActions task={task} onOpen={onOpen} onDelete={onDelete} t={t} />
      </div>

      {/* Note / stats box */}
      <NoteBox task={task} t={t} />
    </article>
  );
}

// ── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ task, t }: { task: CourseTask; t: TFn }) {
  if (task.status === 'Under Review' && task.reviewState) {
    return (
      <span
        className={cn(
          'mt-0.5 shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold',
          REVIEW_BADGE[task.reviewState],
        )}
      >
        {t(`reviewState.${REVIEW_LABEL_KEY[task.reviewState]}`)}
      </span>
    );
  }
  return (
    <span
      className={cn(
        'mt-0.5 shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold',
        STATUS_BADGE[task.status],
      )}
    >
      {task.status}
    </span>
  );
}

// ── Card actions (right side of the meta row) ────────────────────────────────

function CardActions({
  task,
  onOpen,
  onDelete,
  t,
}: {
  task: CourseTask;
  onOpen: () => void;
  onDelete: () => void;
  t: TFn;
}) {
  const open = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };
  const del = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  // Published has no explicit action — the whole card opens the preview.
  if (task.status === 'Published') return null;

  if (task.status === 'In Writing' || task.status === 'Archived') {
    return (
      <div className="flex shrink-0 items-center gap-1.5">
        <button type="button" onClick={open} className={OUTLINE_BTN}>
          <PencilLine className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t('actions.edit')}</span>
        </button>
        <button
          type="button"
          onClick={del}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-red-500 transition-colors hover:bg-red-500/10"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t('actions.delete')}</span>
        </button>
      </div>
    );
  }

  // To Do → Task Details · Under Review → Review
  const Icon = task.status === 'Under Review' ? ClipboardList : PencilLine;
  const label =
    task.status === 'Under Review'
      ? t('actions.review')
      : t('actions.taskDetails');
  return (
    <button type="button" onClick={open} className={OUTLINE_BTN}>
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{label}</span>
      <ArrowRight className="hidden h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 sm:inline" />
    </button>
  );
}

const OUTLINE_BTN =
  'border-border bg-card text-foreground hover:border-brand-navy/25 hover:bg-brand-navy/8 hover:text-brand-navy inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors dark:hover:border-white/15 dark:hover:bg-white/6 dark:hover:text-white';

// ── Note / stats box ─────────────────────────────────────────────────────────

function NoteBox({ task, t }: { task: CourseTask; t: TFn }) {
  const box =
    'bg-muted/40 mt-3 rounded-xl px-3 py-2.5 text-[11px] leading-relaxed';

  if (task.status === 'To Do') {
    return (
      <div className={cn(box, 'flex flex-wrap items-center gap-x-2 gap-y-1.5')}>
        <span className="inline-flex items-center gap-1 font-semibold">
          <Flag
            className={cn('h-3 w-3 shrink-0', PRIORITY_STYLE[task.priority])}
          />
          <span className={PRIORITY_STYLE[task.priority]}>
            {t('priorityLabel', { priority: task.priority })}
          </span>
        </span>
        <span className="border-border bg-card text-muted-foreground rounded-md border px-1.5 py-0.5 font-medium">
          {t('courseCreation')}
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-1">
          <CalendarDays className="text-muted-foreground/50 h-3 w-3 shrink-0" />
          {t('due', { date: task.dueDate })}
        </span>
        <span className="text-muted-foreground/70">{t('statusHint.toDo')}</span>
      </div>
    );
  }

  if (task.status === 'Published') {
    return (
      <div className={cn(box, 'flex flex-wrap items-center gap-x-4 gap-y-1.5')}>
        <span className="text-muted-foreground inline-flex items-center gap-1.5">
          <Users className="text-brand-gold h-3.5 w-3.5 shrink-0" />
          {t('publishedStats.students', {
            count: (task.students ?? 0).toLocaleString(),
          })}
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          {t('publishedStats.revenue', { revenue: task.revenue ?? '$0' })}
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-1.5">
          <Star className="text-brand-gold h-3.5 w-3.5 shrink-0 fill-current" />
          {t('publishedStats.rating', { rating: task.rating ?? 0 })}
        </span>
        <span className="text-muted-foreground inline-flex items-center gap-1.5">
          <Clock className="text-muted-foreground/50 h-3.5 w-3.5 shrink-0" />
          {t('publishedStats.updated', { ago: task.updatedAgo ?? '' })}
        </span>
      </div>
    );
  }

  // In Writing · Under Review · Archived — a bold label + descriptive note.
  const noteLabel =
    task.status === 'In Writing'
      ? t('note.draftLabel')
      : task.status === 'Under Review'
        ? t('note.reviewLabel')
        : t('note.archivedLabel');

  const noteBody =
    task.status === 'In Writing'
      ? t('note.draftBody')
      : task.status === 'Under Review'
        ? t('note.reviewBody', { ago: task.submittedAgo ?? '' })
        : t('note.archivedBody');

  return (
    <div className={cn(box, 'text-muted-foreground')}>
      <span className="text-foreground font-semibold">{noteLabel} </span>
      {noteBody}
    </div>
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
