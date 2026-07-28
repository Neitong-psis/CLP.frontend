'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  Plus,
  BookOpen,
  ImageOff,
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
  AlertTriangle,
  X,
} from 'lucide-react';
import { useEducatorCoursesT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { PillTabs, type PillTab } from '@/components/common/list/PillTabs';
import { useCourseTasks } from '@/context/CourseTasksContext';
import { useCurrentUser } from '@/hooks/use-current-user';
import {
  COURSE_TASK_STATUSES,
  SLUG_TO_STATUS,
  STATUS_BADGE,
  type CourseTask,
  type CourseTaskStatus,
  type ReviewState,
  type TaskPriority,
} from '@/constants/educator';

// ── Style maps ───────────────────────────────────────────────────────────────

/** Under Review shows the admin decision instead of the raw status. */
const REVIEW_BADGE: Record<ReviewState, string> = {
  Approved: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-600',
  Reject: 'border-red-400/30 bg-red-500/10 text-red-600',
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

/** Course cover thumbnail — a fixed landscape frame so it reads as a proper
 *  photo regardless of how tall the card grows with its content, instead of
 *  stretching (and badly cropping) to match the row's full height. To Do
 *  shows an empty-cover placeholder since nothing has been written yet;
 *  everything else falls back to the generic poster only if the course has
 *  no `thumbnailUrl` of its own. */
function CardThumbnail({
  title,
  isToDo,
  thumbnailUrl,
}: {
  title: string;
  isToDo: boolean;
  thumbnailUrl?: string;
}) {
  if (isToDo) {
    return (
      <div className="border-border/70 text-muted-foreground/40 flex aspect-3/2 w-28 shrink-0 items-center justify-center rounded-xl border border-dashed sm:w-40">
        <ImageOff className="h-6 w-6" strokeWidth={1.5} />
      </div>
    );
  }
  return (
    <div className="border-border relative aspect-3/2 w-28 shrink-0 overflow-hidden rounded-xl border sm:w-40">
      <Image
        src={thumbnailUrl || '/image/web_design_poster.png'}
        alt={title}
        fill
        sizes="(max-width: 640px) 7rem, 10rem"
        quality={85}
        className="object-cover"
      />
    </div>
  );
}

/** First letter of up to two words — "Sarah Wilson" → "SW". */
function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/** Where a card leads, per the course lifecycle:
 *  To Do / In Writing → the wizard, pinned to this task via `draft` so edits
 *  patch the same record instead of creating a duplicate; Under Review /
 *  Published / Archived → the course preview. */
function routeForTask(task: CourseTask): string {
  switch (task.status) {
    case 'To Do':
    case 'In Writing':
      return `/educator/courses/new?draft=${task.id}`;
    default:
      return `/educator/courses/${task.id}`;
  }
}

// ── Component ────────────────────────────────────────────────────────────────

/** Coerces a `?tab=` slug (e.g. "in-writing") into a real status, falling
 *  back to "To Do" for anything missing or unrecognized. */
function readTabParam(value: string | null): CourseTaskStatus {
  return (value && SLUG_TO_STATUS[value]) || 'To Do';
}

function hasReviewFeedback(task: CourseTask): boolean {
  return (task.reviewFeedback?.length ?? 0) > 0;
}

/** A course only lives in the tab matching its real status — except an
 *  approved-and-published course that still carries an admin note also
 *  cross-lists under "Under Review", so that note doesn't quietly vanish
 *  the moment the course goes live. A clean approval (no note) shows only
 *  in "Published". */
function matchesTab(task: CourseTask, tab: CourseTaskStatus): boolean {
  if (task.status === tab) return true;
  return (
    tab === 'Under Review' &&
    task.status === 'Published' &&
    task.reviewState === 'Approved' &&
    hasReviewFeedback(task)
  );
}

export function CourseWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useEducatorCoursesT();
  const { toast } = useToast();
  const { tasks, removeTask } = useCourseTasks();
  // The wizard sends the educator back here on the tab their course actually
  // lands in (e.g. "In Writing" after Save Draft) instead of always "To Do".
  const [activeTab, setActiveTab] = useState<CourseTaskStatus>(() =>
    readTabParam(searchParams.get('tab')),
  );
  const [search, setSearch] = useState('');

  const counts = useMemo(() => {
    const map = Object.fromEntries(
      COURSE_TASK_STATUSES.map((s) => [
        s,
        tasks.filter((task) => matchesTab(task, s)).length,
      ]),
    ) as Record<CourseTaskStatus, number>;
    return map;
  }, [tasks]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter(
      (task) =>
        matchesTab(task, activeTab) &&
        (q === '' ||
          task.title.toLowerCase().includes(q) ||
          task.category.toLowerCase().includes(q)),
    );
  }, [tasks, activeTab, search]);

  const STATUS_TABS: PillTab<CourseTaskStatus>[] = COURSE_TASK_STATUSES.map(
    (status) => ({ value: status, label: status, count: counts[status] }),
  );

  // Delete is destructive and irreversible (no undo, no trash) — confirm
  // before it happens instead of deleting on the first click.
  const [pendingDelete, setPendingDelete] = useState<CourseTask | null>(null);

  function confirmDelete() {
    if (!pendingDelete) return;
    removeTask(pendingDelete.id);
    toast(t('deletedToast', { title: pendingDelete.title }), 'success');
    setPendingDelete(null);
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
        fullWidth
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
              crossListed={
                activeTab === 'Under Review' && task.status !== 'Under Review'
              }
              onOpen={() => router.push(routeForTask(task))}
              onDelete={() => setPendingDelete(task)}
              t={t}
            />
          ))}
        </div>
      )}

      {pendingDelete && (
        <DeleteConfirmDialog
          task={pendingDelete}
          onConfirm={confirmDelete}
          onClose={() => setPendingDelete(null)}
          t={t}
        />
      )}
    </div>
  );
}

// ── Task card ────────────────────────────────────────────────────────────────

type TFn = ReturnType<typeof useEducatorCoursesT>;

function TaskCard({
  task,
  crossListed,
  onOpen,
  onDelete,
  t,
}: {
  task: CourseTask;
  /** True when this card is showing under "Under Review" even though its
   *  real status has moved on — an approved-and-published course that still
   *  carries an admin note. */
  crossListed: boolean;
  onOpen: () => void;
  onDelete: () => void;
  t: TFn;
}) {
  const currentUser = useCurrentUser();
  const isToDo = task.status === 'To Do';
  const showPrice = task.status !== 'Archived';
  // To Do is the only stage assigned by an admin; afterwards the educator owns it.
  const personName = isToDo ? task.assignedBy : currentUser.fullName;
  const author = isToDo ? `${t('assignedBy')} ${personName}` : personName;

  return (
    <article
      onClick={onOpen}
      className="group border-border bg-card hover:border-brand-navy/20 flex cursor-pointer items-start gap-4 rounded-2xl border p-3 transition-all duration-200 hover:shadow-md sm:p-4 dark:hover:border-white/12 dark:hover:shadow-none"
    >
      <CardThumbnail
        title={task.title}
        isToDo={isToDo}
        thumbnailUrl={task.thumbnailUrl}
      />

      <div className="min-w-0 flex-1">
        {/* Header: title + status badge */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-foreground text-sm leading-snug font-bold sm:text-base">
            {task.title}
          </h3>
          <StatusBadge task={task} crossListed={crossListed} t={t} />
        </div>

        {/* Description */}
        <p className="text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-relaxed sm:text-[13px]">
          {task.description}
        </p>

        {/* Meta row: chips + educator avatar/author (left) · actions (right) */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1.5">
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
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="bg-brand-gold flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white">
                {getInitials(personName)}
              </span>
              <span className="text-muted-foreground truncate text-[11px] font-medium">
                {author}
              </span>
            </span>
          </div>

          <CardActions task={task} onOpen={onOpen} onDelete={onDelete} t={t} />
        </div>

        {/* Note / stats box */}
        <NoteBox task={task} crossListed={crossListed} t={t} />
      </div>
    </article>
  );
}

// ── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({
  task,
  crossListed,
  t,
}: {
  task: CourseTask;
  crossListed: boolean;
  t: TFn;
}) {
  // Under Review shows the admin decision instead of the raw status — and so
  // does a cross-listed Published card, since "Published" alone wouldn't
  // explain why it's sitting in the Under Review list.
  if ((task.status === 'Under Review' || crossListed) && task.reviewState) {
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
        <button type="button" onClick={del} className={DELETE_BTN}>
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

/** Same shape as OUTLINE_BTN — bordered, same padding/radius — tinted red so
 *  Delete reads as an equally deliberate action, not an afterthought. */
const DELETE_BTN =
  'border-red-500/25 bg-card text-red-500 hover:border-red-500/50 hover:bg-red-500/10 inline-flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors dark:border-red-400/25 dark:text-red-400 dark:hover:border-red-400/45 dark:hover:bg-red-500/10';

// ── Note / stats box ─────────────────────────────────────────────────────────

function NoteBox({
  task,
  crossListed,
  t,
}: {
  task: CourseTask;
  crossListed: boolean;
  t: TFn;
}) {
  const box =
    'bg-muted/40 mt-3 rounded-xl px-3 py-2.5 text-[11px] leading-relaxed';

  // Cross-listed under "Under Review" — call out the lingering note instead
  // of the usual Published stats, which would otherwise explain nothing.
  if (crossListed) {
    return (
      <div className={cn(box, 'text-muted-foreground')}>
        <span className="text-foreground font-semibold">
          {t('note.approvedLabel')}{' '}
        </span>
        {t('note.approvedBody')}
      </div>
    );
  }

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

// ── Delete confirmation ──────────────────────────────────────────────────────

function DeleteConfirmDialog({
  task,
  onConfirm,
  onClose,
  t,
}: {
  task: CourseTask;
  onConfirm: () => void;
  onClose: () => void;
  t: TFn;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm duration-150"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('deleteDialog.title')}
        className="animate-in fade-in-0 zoom-in-95 bg-card w-full max-w-sm rounded-2xl p-6 shadow-2xl duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
            </span>
            <div className="min-w-0">
              <h2 className="text-foreground text-base font-bold">
                {t('deleteDialog.title')}
              </h2>
              <p className="text-muted-foreground text-xs">
                {t('deleteDialog.subtitle')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('deleteDialog.cancel')}
            className="text-muted-foreground hover:bg-muted hover:text-foreground shrink-0 rounded-lg p-1.5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-border bg-muted/40 mt-4 rounded-xl border px-3.5 py-3">
          <p className="text-foreground truncate text-sm font-semibold">
            {task.title}
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {task.category} · {task.status}
          </p>
        </div>

        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          {t('deleteDialog.message')}
        </p>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <Button variant="outline" onClick={onClose}>
            {t('deleteDialog.cancel')}
          </Button>
          <Button
            className="gap-1.5 bg-rose-500 text-white hover:bg-rose-600 focus-visible:ring-rose-500"
            onClick={onConfirm}
          >
            <Trash2 className="h-4 w-4" />
            {t('deleteDialog.confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
}
