'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEducatorReviewT } from '@/i18n';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  MessageSquare,
  MoreVertical,
  PencilLine,
  Send,
  Download,
  Trophy,
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { NotificationBell } from '@/components/common/NotificationBell';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { PillTabs } from '@/components/common/list/PillTabs';
import { EDUCATOR_USER, type CourseTask } from '@/constants/educator';
import { useCurrentUser } from '@/hooks/use-current-user';
import { exportCourseToPdf } from '@/lib/utils/courseExportPdf';
import {
  REVIEW_MODULES,
  flattenItems,
  lessonCount,
  type ReviewItem,
  type ReviewModule,
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
import { AssignmentSubmission } from '@/components/pages/learner/learn/AssignmentSubmission';
import { computeLocks, type ItemDone } from '@/lib/course-progress';
import { ItemEditModal } from './ItemEditModal';

/** Immutably patches one item inside the nested module → lesson → item tree. */
function replaceItemInModules(
  modules: ReviewModule[],
  updated: ReviewItem,
): ReviewModule[] {
  return modules.map((mod) => ({
    ...mod,
    lessons: mod.lessons.map((lesson) => {
      switch (updated.kind) {
        case 'document':
          return lesson.documents.some((d) => d.id === updated.id)
            ? {
                ...lesson,
                documents: lesson.documents.map((d) =>
                  d.id === updated.id ? updated : d,
                ),
              }
            : lesson;
        case 'video':
          return lesson.videos.some((v) => v.id === updated.id)
            ? {
                ...lesson,
                videos: lesson.videos.map((v) =>
                  v.id === updated.id ? updated : v,
                ),
              }
            : lesson;
        case 'quiz':
          return lesson.quizzes.some((q) => q.id === updated.id)
            ? {
                ...lesson,
                quizzes: lesson.quizzes.map((q) =>
                  q.id === updated.id ? updated : q,
                ),
              }
            : lesson;
        case 'assignment':
          return lesson.assignments.some((a) => a.id === updated.id)
            ? {
                ...lesson,
                assignments: lesson.assignments.map((a) =>
                  a.id === updated.id ? updated : a,
                ),
              }
            : lesson;
      }
    }),
  }));
}

export function CourseReview({ task }: { task: CourseTask }) {
  const router = useRouter();
  const t = useEducatorReviewT();
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const [modules, setModules] = useState<ReviewModule[]>(() =>
    structuredClone(REVIEW_MODULES),
  );
  const items = useMemo(() => flattenItems(modules), [modules]);

  const isUnderReview = task.status === 'Under Review';
  const isDecidedApproved = isUnderReview && task.reviewState === 'Approved';
  const isDecidedRejected = isUnderReview && task.reviewState === 'Reject';
  const hasDecision = isDecidedApproved || isDecidedRejected;
  const feedback = task.reviewFeedback ?? [];
  const rejectedFeedbackCount = feedback.filter(
    (f) => f.status === 'rejected',
  ).length;
  const rejectedIds = useMemo(
    () =>
      new Set(
        (task.reviewFeedback ?? [])
          .filter((f) => f.status === 'rejected')
          .map((f) => f.itemId),
      ),
    [task.reviewFeedback],
  );
  const [resolvedItemIds, setResolvedItemIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [editModalItem, setEditModalItem] = useState<ReviewItem | null>(null);
  // Assignment submissions made this session, while previewing a published
  // course as a learner would experience it (upload UI only shows there).
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(
    () => new Set(),
  );

  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.id)),
  );
  const [viewed, setViewed] = useState<Set<string>>(
    () => new Set([items[0]?.id]),
  );
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
   *  with something that actually means something. A locally-resolved item
   *  (fixed via the edit modal this session) reads as approved regardless of
   *  the original decision, since it's no longer what the admin flagged. */
  function getItemBadge(item: ReviewItem): ItemBadge {
    if (!isUnderReview) return null;
    if (resolvedItemIds.has(item.id)) return 'approved';
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
  const isPublishedView = task.status === 'Published';

  // Show type icons in sidebar for both Published and Under Review statuses
  const shouldShowTypeIcons =
    task.status === 'Published' || task.status === 'Under Review';

  const activeNeedsEdit = Boolean(
    active && rejectedIds.has(active.id) && !resolvedItemIds.has(active.id),
  );
  const showEditAction =
    !isArchived && !isPublishedView && !isDecidedApproved && activeNeedsEdit;
  const showNextAction =
    !isArchived &&
    !isPublishedView &&
    !isDecidedApproved &&
    !activeNeedsEdit &&
    Boolean(nextItem);
  const showResubmitAction =
    !isArchived &&
    !isPublishedView &&
    !isDecidedApproved &&
    !activeNeedsEdit &&
    !nextItem;

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

  function handleRestoreArchived() {
    toast(t('openingEditor'), 'info');
    router.push(`/educator/courses/new?draft=${task.id}&step=3`);
  }

  /** From the per-item "Edit" split button — the whole-course option jumps
   *  straight to Step 2 (Course Content) instead of starting over at Step 1. */
  function handleEditWholeCourse() {
    toast(t('openingEditor'), 'info');
    router.push(`/educator/courses/new?draft=${task.id}&step=2`);
  }

  function handleResubmitFast() {
    toast(t('openingEditor'), 'info');
    router.push(`/educator/courses/new?draft=${task.id}&step=3`);
  }

  function handleSaveEdit(updated: ReviewItem) {
    setModules((prev) => replaceItemInModules(prev, updated));
    setResolvedItemIds((prev) => new Set(prev).add(updated.id));
    setEditModalItem(null);
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
        <CourseContentSidebar
          courseTitle={task.title}
          modules={modules}
          activeId={activeId}
          expanded={expanded}
          onToggleModule={toggleModule}
          isItemDone={isItemDone}
          lockingEnabled={false}
          getItemBadge={getItemBadge}
          showTypeIcon={shouldShowTypeIcons}
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
                          handleExportPdf();
                        }}
                        className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                      >
                        <Download className="text-muted-foreground h-4 w-4 shrink-0" />
                        {t('exportPdf')}
                      </button>
                      <div className="border-border/60 border-t" />
                      {isArchived && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowMobileActions(false);
                            handleRestoreArchived();
                          }}
                          className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                        >
                          <PencilLine className="text-muted-foreground h-4 w-4 shrink-0" />
                          {t('editCourse')}
                        </button>
                      )}
                      {showEditAction && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setShowMobileActions(false);
                              if (active) setEditModalItem(active);
                            }}
                            className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                          >
                            <PencilLine className="text-muted-foreground h-4 w-4 shrink-0" />
                            {t('editThisItem')}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowMobileActions(false);
                              handleEditWholeCourse();
                            }}
                            className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                          >
                            <PencilLine className="text-muted-foreground h-4 w-4 shrink-0" />
                            {t('editWholeCourse')}
                          </button>
                        </>
                      )}
                      {showNextAction && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowMobileActions(false);
                            if (nextItem) goTo(nextItem.id);
                          }}
                          className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                        >
                          <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0" />
                          {t('nextButton')}
                        </button>
                      )}
                      {showResubmitAction && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowMobileActions(false);
                            handleResubmitFast();
                          }}
                          className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                        >
                          <Send className="text-muted-foreground h-4 w-4 shrink-0" />
                          {t('resubmitBtn')}
                        </button>
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
            {active && (
              <PreviewPanel
                item={active}
                asLearner={isPublishedView}
                isSubmitted={submittedIds.has(active.id)}
                onSubmitted={() =>
                  setSubmittedIds((prev) => new Set(prev).add(active.id))
                }
              />
            )}
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
                disabled={!nextItem || nextLocked || activeNeedsEdit}
                onClick={() =>
                  nextItem &&
                  !nextLocked &&
                  !activeNeedsEdit &&
                  goTo(nextItem.id)
                }
                title={
                  nextLocked
                    ? t('lockedNextHint')
                    : activeNeedsEdit
                      ? t('editRequiredHint')
                      : undefined
                }
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
                {isArchived && (
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={handleRestoreArchived}
                  >
                    <PencilLine className="h-4 w-4" />
                    {t('editCourse')}
                  </Button>
                )}
                {showEditAction && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" className="gap-1.5">
                        <PencilLine className="h-4 w-4" />
                        {t('editButton')}
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent theme="light" align="end">
                      <DropdownMenuItem
                        theme="light"
                        onSelect={() => active && setEditModalItem(active)}
                      >
                        {t('editThisItem')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        theme="light"
                        onSelect={handleEditWholeCourse}
                      >
                        {t('editWholeCourse')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                {showNextAction && (
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={() => nextItem && goTo(nextItem.id)}
                  >
                    {t('nextButton')}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
                {showResubmitAction && (
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={handleResubmitFast}
                  >
                    <Send className="h-4 w-4" />
                    {t('resubmitBtn')}
                  </Button>
                )}
                {isPublishedView && (
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={() => nextItem && goTo(nextItem.id)}
                  >
                    {!nextItem ? (
                      <>
                        <Trophy className="h-4 w-4" />
                        {t('finishCourse')}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        {t('markComplete')}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </footer>
        </div>
      </div>

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
          showTypeIcon={isPublishedView}
          onSelect={(id) => {
            select(id);
            setShowContents(false);
          }}
          onLockedSelect={() => toast(t('lockedToast'), 'info')}
          labels={labels}
          onClose={() => setShowContents(false)}
        />
      )}

      {editModalItem && (
        <ItemEditModal
          item={editModalItem}
          onSave={handleSaveEdit}
          onClose={() => setEditModalItem(null)}
        />
      )}
    </div>
  );
}

// ── Preview panels ────────────────────────────────────────────────────────────

function PreviewPanel({
  item,
  asLearner,
  isSubmitted,
  onSubmitted,
}: {
  item: ReviewItem;
  /** A published course previews exactly as a learner experiences it — a
   *  real quiz start-gate/timer and a working assignment upload, not the
   *  review-only static preview. */
  asLearner: boolean;
  isSubmitted: boolean;
  onSubmitted: () => void;
}) {
  const role = asLearner ? 'learner' : 'review';
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
      return <QuizPanel item={item} role={role} />;
    case 'assignment':
      return (
        <AssignmentPanel
          item={item}
          role={role}
          submissionSlot={
            <AssignmentSubmission
              initiallySubmitted={isSubmitted}
              onSubmitted={onSubmitted}
            />
          }
        />
      );
  }
}
