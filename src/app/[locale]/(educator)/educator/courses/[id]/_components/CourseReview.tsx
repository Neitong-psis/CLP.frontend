'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEducatorReviewT } from '@/i18n';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lock,
  MessageSquare,
  MoreVertical,
  PencilLine,
  Send,
  RotateCcw,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { NotificationBell } from '@/components/common/NotificationBell';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { PillTabs } from '@/components/common/list/PillTabs';
import { EDUCATOR_USER, type CourseTask } from '@/constants/educator';
import { useCourseTasks } from '@/context/CourseTasksContext';
import { useCurrentUser } from '@/hooks/use-current-user';
import { exportCourseToPdf } from '@/lib/utils/courseExportPdf';
import {
  REVIEW_MODULES,
  flattenItems,
  lessonCount,
  type ReviewItem,
} from '../_lib/content';
import { CourseContentSidebar } from '@/components/course-content/CourseContentSidebar';
import { CourseContentSheet } from '@/components/course-content/CourseContentSheet';
import {
  KIND_ICON,
  type ItemBadge,
  type SidebarLabels,
} from '@/components/course-content/types';
import {
  VideoPanel,
  DocumentPanel,
  QuizPanel,
  AssignmentPanel,
} from '@/components/course-content/panels';
import { computeLocks, type ItemDone } from '@/lib/course-progress';

export function CourseReview({ task }: { task: CourseTask }) {
  const router = useRouter();
  const t = useEducatorReviewT();
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const { updateTask } = useCourseTasks();
  const modules = REVIEW_MODULES;
  const items = useMemo(() => flattenItems(modules), [modules]);

  const isUnderReview = task.status === 'Under Review';
  const isDecidedApproved = isUnderReview && task.reviewState === 'Approved';
  const isDecidedRejected = isUnderReview && task.reviewState === 'Reject';
  const hasDecision = isDecidedApproved || isDecidedRejected;
  const feedback = task.reviewFeedback ?? [];
  const rejectedFeedbackCount = feedback.filter(
    (f) => f.status === 'rejected',
  ).length;

  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.id)),
  );
  const [viewed, setViewed] = useState<Set<string>>(
    () => new Set([items[0]?.id]),
  );
  const [showResubmit, setShowResubmit] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const isArchived = task.status === 'Archived';
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const [mobileModuleId, setMobileModuleId] = useState<string>(
    () =>
      modules.find((m) =>
        flattenItems([m]).some((item) => item.id === (items[0]?.id ?? '')),
      )?.id ??
      modules[0]?.id ??
      '',
  );
  const [showMobileActions, setShowMobileActions] = useState(false);

  const mobileModule = useMemo(
    () => modules.find((m) => m.id === mobileModuleId) ?? modules[0],
    [modules, mobileModuleId],
  );
  const mobileItems = useMemo(
    () => (mobileModule ? flattenItems([mobileModule]) : []),
    [mobileModule],
  );

  // Reviewer completion: opening an item counts; preview quizzes are non-scored
  // so they never block. Locking is still enforced (all-three-surfaces policy).
  const isItemDone = useMemo<ItemDone>(
    () => (item) => (item.kind === 'quiz' ? true : viewed.has(item.id)),
    [viewed],
  );
  // Sequential locking never made sense for a reviewer (every item unlocks
  // itself the instant it's opened) — reviewers see all content, always.
  const locks = useMemo(
    () => computeLocks(modules, isItemDone, false),
    [modules, isItemDone],
  );

  /** Admin's per-item decision, once one exists — replaces the old fake lock
   *  with something that actually means something. */
  function getItemBadge(item: ReviewItem): ItemBadge {
    if (!isUnderReview) return null;
    if (task.reviewState === 'Approved') return 'approved';
    if (task.reviewState === 'Reject') {
      const entry = task.reviewFeedback?.find((f) => f.itemId === item.id);
      return entry?.status === 'rejected' ? 'rejected' : 'approved';
    }
    return null;
  }

  const active = items.find((i) => i.id === activeId) ?? items[0];
  const currentIndex = items.findIndex((i) => i.id === activeId);
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem =
    currentIndex < items.length - 1 ? items[currentIndex + 1] : null;
  const nextLocked = nextItem ? locks.lockedItemIds.has(nextItem.id) : false;

  function goTo(id: string) {
    setActiveId(id);
    setViewed((prev) => new Set(prev).add(id));
    const newMod = modules.find((m) =>
      flattenItems([m]).some((item) => item.id === id),
    );
    if (newMod) setMobileModuleId(newMod.id);
  }

  function select(id: string) {
    if (locks.lockedItemIds.has(id)) {
      toast(t('lockedToast'), 'info');
      return;
    }
    goTo(id);
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
    updateTask(task.id, {
      reviewState: 'Under Review',
      reviewFeedback: undefined,
    });
    toast(t('resubmittedToast', { title: task.title }), 'success');
    router.push('/educator/courses');
  }

  function handleRestore() {
    toast(t('restoredToast', { title: task.title }), 'success');
    router.push('/educator/courses');
  }

  function handleEditCourse() {
    toast(t('openingEditor'), 'info');
    router.push(`/educator/courses/new?draft=${task.id}`);
  }

  function handleExportPdf() {
    exportCourseToPdf(
      {
        title: task.title,
        category: task.category,
        description: task.description,
      },
      modules,
    );
  }

  const labels: SidebarLabels = {
    courseContent: t('courseContent'),
    formatProgress: (done, total) =>
      t('itemsReviewed', { reviewed: done, total }),
    backAria: t('backToCourses'),
    collapseAria: t('collapseSidebar'),
    expandAria: t('expandSidebar'),
    lockedHint: (lesson) => t('lockedHint', { lesson }),
    lockedShort: t('locked'),
  };

  return (
    <div className="bg-background fixed inset-0 z-50 flex overflow-hidden">
      {/* ── Body: sidebar | main column ────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Shared course-content sidebar (owns its brand header) */}
        <CourseContentSidebar
          courseTitle={task.title}
          modules={modules}
          activeId={activeId}
          expanded={expanded}
          onToggleModule={toggleModule}
          isItemDone={isItemDone}
          lockingEnabled={false}
          getItemBadge={getItemBadge}
          onSelect={select}
          onLockedSelect={() => toast(t('lockedToast'), 'info')}
          collapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed((v) => !v)}
          backHref="/educator/courses"
          titleAction={
            <button
              type="button"
              onClick={handleExportPdf}
              aria-label={t('exportPdf')}
              title={t('exportPdf')}
              className="text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-course-accent flex size-7 shrink-0 items-center justify-center rounded-md transition-colors duration-150 outline-none focus-visible:ring-2"
            >
              <Download aria-hidden className="size-4" />
            </button>
          }
          labels={labels}
        />

        {/* Main column: header + content + footer nav */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="border-border bg-card relative flex h-14 shrink-0 items-center border-b px-3 sm:h-16 sm:px-4">
            {/* ── Mobile: back arrow | course title | actions menu ── */}
            <div className="flex w-full items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => router.push('/educator/courses')}
                aria-label={t('backToCourses')}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-foreground min-w-0 flex-1 truncate text-sm font-bold sm:text-base">
                {task.title}
              </h1>
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setShowMobileActions((v) => !v)}
                  aria-label="More actions"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-9 items-center justify-center rounded-lg transition-colors"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                {showMobileActions && (
                  <>
                    <div
                      className="fixed inset-0 z-55"
                      onClick={() => setShowMobileActions(false)}
                      aria-hidden
                    />
                    <div className="bg-card ring-border absolute top-full right-0 z-[56] mt-1 min-w-48 overflow-hidden rounded-xl shadow-xl ring-1 dark:ring-white/10">
                      {hasDecision && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setShowMobileActions(false);
                              setShowFeedback(true);
                            }}
                            className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                          >
                            <MessageSquare className="text-muted-foreground h-4 w-4 shrink-0" />
                            {t('feedbackButton')}
                          </button>
                          <div className="border-border/60 border-t" />
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setShowMobileActions(false);
                          handleEditCourse();
                        }}
                        className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                      >
                        <PencilLine className="text-muted-foreground h-4 w-4 shrink-0" />
                        {t('editCourse')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowMobileActions(false);
                          handleExportPdf();
                        }}
                        className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                      >
                        <Download className="text-muted-foreground h-4 w-4 shrink-0" />
                        {t('exportPdf')}
                      </button>
                      <div className="border-border/60 border-t" />
                      {isArchived ? (
                        <button
                          type="button"
                          onClick={() => {
                            setShowMobileActions(false);
                            handleRestore();
                          }}
                          className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                        >
                          <RotateCcw className="text-muted-foreground h-4 w-4 shrink-0" />
                          {t('restoreBtn')}
                        </button>
                      ) : (
                        !isDecidedApproved && (
                          <button
                            type="button"
                            onClick={() => {
                              setShowMobileActions(false);
                              setShowResubmit(true);
                            }}
                            className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                          >
                            <Send className="text-muted-foreground h-4 w-4 shrink-0" />
                            {t('resubmitBtn')}
                          </button>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Desktop: review title | role badge + controls ── */}
            <div className="hidden min-w-0 flex-1 lg:block">
              <h1 className="text-foreground truncate text-lg font-bold">
                {t('heading')}
              </h1>
              <p className="text-muted-foreground truncate text-[11px]">
                Live workspace synced for {currentUser.email}
              </p>
            </div>
            <div className="hidden items-center gap-1.5 lg:flex">
              {hasDecision && (
                <button
                  type="button"
                  onClick={() => setShowFeedback(true)}
                  className="border-border text-foreground/80 hover:bg-muted/60 relative flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  {t('feedbackButton')}
                  {isDecidedRejected && (
                    <span className="absolute -top-1 -right-1 flex size-2.5 rounded-full bg-rose-500" />
                  )}
                </button>
              )}
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-500">
                {EDUCATOR_USER.role}
              </span>
              <ThemeToggle className="size-8" />
              <NotificationBell />
              <LanguageSwitcher />
            </div>
          </header>

          {/* ── Mobile: module tabs + lesson chips (KOMPLEX-style nav) ── */}
          <div className="border-border/60 shrink-0 border-b lg:hidden">
            {/* Module tabs — certificate-style pill switcher */}
            <div className="px-3 pt-2.5 pb-1.5">
              <PillTabs
                tabs={modules.map((mod) => ({
                  value: mod.id,
                  label: mod.title,
                  count: lessonCount(mod),
                }))}
                value={mobileModuleId}
                onChange={setMobileModuleId}
              />
            </div>
            {/* Lesson chips — horizontal scroll for selected module */}
            <div className="scrollbar-none flex gap-1.5 overflow-x-auto px-3 pb-2.5 [&::-webkit-scrollbar]:hidden">
              {mobileItems.map((item) => {
                const Icon = KIND_ICON[item.kind];
                const isActive = item.id === activeId;
                const locked = locks.lockedItemIds.has(item.id);
                const done = isItemDone(item);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => select(item.id)}
                    className={cn(
                      'border-border flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors',
                      locked
                        ? 'bg-muted/30 text-muted-foreground/60 cursor-not-allowed'
                        : isActive
                          ? 'bg-brand-gold border-brand-gold text-brand-navy'
                          : done
                            ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {locked ? (
                      <Lock className="h-3 w-3 shrink-0" />
                    ) : (
                      <Icon className="h-3 w-3 shrink-0" />
                    )}
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <main className="min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            {active && <PreviewPanel item={active} />}
          </main>

          {/* Footer nav */}
          <footer className="border-border bg-card/90 shrink-0 border-t backdrop-blur-md">
            {/* Mobile: prev / next lesson — KOMPLEX-style bottom nav */}
            <div className="flex items-center gap-2 px-3 py-3 lg:hidden">
              <button
                type="button"
                disabled={!prevItem}
                onClick={() => prevItem && goTo(prevItem.id)}
                className="border-border text-foreground/70 hover:bg-muted/60 hover:text-foreground flex min-w-0 flex-1 items-center gap-1.5 rounded-xl border px-3 py-2.5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-25"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                {prevItem && (
                  <span className="truncate text-[11px] font-medium">
                    {prevItem.title}
                  </span>
                )}
              </button>
              <button
                type="button"
                disabled={!nextItem || nextLocked}
                onClick={() => nextItem && !nextLocked && goTo(nextItem.id)}
                title={nextLocked ? t('lockedNextHint') : undefined}
                className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 flex min-w-0 flex-1 items-center justify-end gap-1.5 rounded-xl px-3 py-2.5 text-right font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-25"
              >
                {nextLocked ? (
                  <Lock className="h-4 w-4 shrink-0" />
                ) : (
                  <>
                    {nextItem && (
                      <span className="truncate text-[11px]">
                        {nextItem.title}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </>
                )}
              </button>
            </div>

            {/* Desktop: back | edit | resubmit */}
            <div className="hidden items-center justify-between gap-2 px-6 py-3 lg:flex">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => router.push('/educator/courses')}
              >
                <ArrowLeft className="h-4 w-4" />
                {t('backToCourses')}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={handleEditCourse}
                >
                  <PencilLine className="h-4 w-4" />
                  {t('editCourse')}
                </Button>
                {isArchived ? (
                  <Button size="sm" className="gap-1.5" onClick={handleRestore}>
                    <RotateCcw className="h-4 w-4" />
                    {t('restoreBtn')}
                  </Button>
                ) : (
                  !isDecidedApproved && (
                    <Button
                      size="sm"
                      className="gap-1.5"
                      onClick={() => setShowResubmit(true)}
                    >
                      <Send className="h-4 w-4" />
                      {t('resubmitBtn')}
                    </Button>
                  )
                )}
              </div>
            </div>
          </footer>
        </div>
      </div>

      {showResubmit && (
        <ResubmitDialog
          courseTitle={task.title}
          onConfirm={handleResubmit}
          onClose={() => setShowResubmit(false)}
        />
      )}

      <Sheet open={showFeedback} onOpenChange={setShowFeedback}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t('feedbackSheetTitle')}</SheetTitle>
            <SheetDescription>
              {isDecidedApproved
                ? t('decisionApprovedBody')
                : t('decisionRejectedBody', { count: rejectedFeedbackCount })}
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div
              className={cn(
                'mb-4 flex items-center gap-2.5 rounded-xl border px-3.5 py-3',
                isDecidedApproved
                  ? 'border-emerald-400/30 bg-emerald-500/10'
                  : 'border-rose-400/30 bg-rose-500/10',
              )}
            >
              {isDecidedApproved ? (
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-500" />
              ) : (
                <AlertTriangle className="h-4.5 w-4.5 shrink-0 text-rose-500" />
              )}
              <p
                className={cn(
                  'text-sm font-bold',
                  isDecidedApproved
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-rose-700 dark:text-rose-400',
                )}
              >
                {isDecidedApproved
                  ? t('decisionApprovedTitle')
                  : t('decisionRejectedTitle')}
              </p>
            </div>

            {feedback.length === 0 ? (
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('feedbackEmptyApproved')}
              </p>
            ) : (
              <ul className="space-y-2.5">
                {feedback.map((f) => (
                  <li
                    key={f.itemId}
                    className="border-border bg-muted/40 rounded-xl border px-3.5 py-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-foreground min-w-0 truncate text-sm font-semibold">
                        {f.itemTitle}
                      </p>
                      <span
                        className={cn(
                          'shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold',
                          f.status === 'approved'
                            ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-600'
                            : 'border-rose-400/30 bg-rose-500/10 text-rose-600',
                        )}
                      >
                        {f.status === 'approved'
                          ? t('feedbackApprovedTag')
                          : t('feedbackRejectedTag')}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                      {f.note}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        select(f.itemId);
                        setShowFeedback(false);
                      }}
                      className="text-brand-gold mt-2 text-[11px] font-semibold underline underline-offset-2 hover:no-underline"
                    >
                      {t('feedbackViewItem')}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {showContents && (
        <CourseContentSheet
          modules={modules}
          activeId={activeId}
          expanded={expanded}
          onToggleModule={toggleModule}
          isItemDone={isItemDone}
          lockingEnabled={false}
          getItemBadge={getItemBadge}
          onSelect={(id) => {
            select(id);
            setShowContents(false);
          }}
          onLockedSelect={() => toast(t('lockedToast'), 'info')}
          labels={labels}
          onClose={() => setShowContents(false)}
        />
      )}
    </div>
  );
}

// ── Preview panels ────────────────────────────────────────────────────────────

function PreviewPanel({ item }: { item: ReviewItem }) {
  switch (item.kind) {
    case 'video':
      return (
        <VideoPanel
          item={item}
          placeholderNote="Educator preview — learners watch the full video"
        />
      );
    case 'document':
      return <DocumentPanel item={item} />;
    case 'quiz':
      return <QuizPanel item={item} role="review" />;
    case 'assignment':
      return <AssignmentPanel item={item} role="review" />;
  }
}

// ── Resubmit dialog ───────────────────────────────────────────────────────────

function ResubmitDialog({
  courseTitle,
  onConfirm,
  onClose,
}: {
  courseTitle: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const t = useEducatorReviewT();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('dialogTitle')}
    >
      <div
        className="bg-card w-full max-w-sm rounded-2xl p-6 text-center shadow-2xl ring-1 ring-black/10 dark:ring-white/6"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="bg-brand-gold/15 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
          <Send className="text-brand-gold h-6 w-6" />
        </span>
        <h2 className="text-foreground mt-4 text-lg font-bold">
          {t('dialogTitle')}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {t('dialogDesc', { title: courseTitle })}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="outline" onClick={onClose}>
            {t('dialogCancel')}
          </Button>
          <Button onClick={onConfirm}>{t('dialogConfirm')}</Button>
        </div>
      </div>
    </div>
  );
}
