'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Lock,
  MoreVertical,
  X,
  Check,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NotificationBell } from '@/components/common/NotificationBell';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { PillTabs } from '@/components/common/list/PillTabs';
import { useAdminReviewOverlayT } from '@/i18n';
import type { AdminCourseRow } from '@/constants/admin';
import type { ReviewFeedbackItem } from '@/constants/educator';
import { exportCourseToPdf } from '@/lib/utils/courseExportPdf';
import {
  REVIEW_MODULES,
  flattenItems,
  lessonCount,
  type ReviewItem,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import {
  ReviewSummarySheet,
  ItemApproveDialog,
  ItemRejectDialog,
} from './ReviewDialogs';
import { CourseContentSidebar } from '@/components/course-content/CourseContentSidebar';
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
import {
  computeLocks,
  flattenLessons,
  type ItemDone,
} from '@/lib/course-progress';

type DialogKind = 'approve' | 'reject' | null;

/** Per-item admin decision, keyed by `ReviewItem.id`. A rejection carries the
 *  reviewer's note; that note is what the educator eventually sees. */
export interface ItemDecision {
  status: 'approved' | 'rejected';
  note?: string;
}

interface CourseReviewOverlayProps {
  course: AdminCourseRow;
  onApprove: (course: AdminCourseRow, feedback: ReviewFeedbackItem[]) => void;
  onReject: (course: AdminCourseRow, feedback: ReviewFeedbackItem[]) => void;
  onClose: () => void;
}

export function CourseReviewOverlay({
  course,
  onApprove,
  onReject,
  onClose,
}: CourseReviewOverlayProps) {
  const t = useAdminReviewOverlayT();
  const modules = REVIEW_MODULES;
  const items = useMemo(() => flattenItems(modules), [modules]);

  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.id)),
  );
  const [viewed, setViewed] = useState<Set<string>>(
    () => new Set([items[0]?.id]),
  );
  const [dialog, setDialog] = useState<DialogKind>(null);
  const [itemDialog, setItemDialog] = useState<'approve' | 'reject' | null>(
    null,
  );
  const [decisions, setDecisions] = useState<Record<string, ItemDecision>>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
  // so they never block.
  const isItemDone = useMemo<ItemDone>(
    () => (item) => (item.kind === 'quiz' ? true : viewed.has(item.id)),
    [viewed],
  );
  // Sequential locking never made sense for a reviewer — admin approves every
  // item regardless of order, so nothing is ever gated here.
  const locks = useMemo(
    () => computeLocks(modules, isItemDone, false),
    [modules, isItemDone],
  );

  function getItemBadge(item: ReviewItem): ItemBadge {
    return decisions[item.id]?.status ?? null;
  }

  const allDecided = items.length > 0 && items.every((i) => decisions[i.id]);
  const anyRejected = items.some((i) => decisions[i.id]?.status === 'rejected');
  const pendingCount = items.filter((i) => !decisions[i.id]).length;

  const active = items.find((i) => i.id === activeId) ?? items[0];
  const currentIndex = items.findIndex((i) => i.id === activeId);
  const nextItem =
    currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

  function goTo(id: string) {
    setActiveId(id);
    setViewed((prev) => new Set(prev).add(id));
    const newMod = modules.find((m) =>
      flattenItems([m]).some((item) => item.id === id),
    );
    if (newMod) setMobileModuleId(newMod.id);
  }

  function select(id: string) {
    if (locks.lockedItemIds.has(id)) return;
    goTo(id);
  }

  function handleExportPdf() {
    exportCourseToPdf(
      {
        title: course.title,
        author: course.instructor,
        category: course.category,
        level: course.level,
      },
      modules,
    );
  }

  function toggleModule(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /** Every decided item, approved or rejected, note or not — the full review
   *  the educator will see, matching the summary the admin just confirmed. */
  function gatherFeedback(
    decisionMap: Record<string, ItemDecision>,
  ): ReviewFeedbackItem[] {
    return flattenLessons(modules).flatMap(
      ({ lesson, items: lessonItemsList }) =>
        lessonItemsList
          .filter((i) => decisionMap[i.id])
          .map((i) => ({
            itemId: i.id,
            lessonTitle: lesson.title,
            itemTitle: i.title,
            status: decisionMap[i.id]!.status,
            note: decisionMap[i.id]!.note ?? '',
          })),
    );
  }

  function decideActiveItem(status: 'approved' | 'rejected', note?: string) {
    if (!active) return;
    setDecisions((prev) => ({ ...prev, [active.id]: { status, note } }));
    setItemDialog(null);
    // Click-through, like the educator's own review flow: deciding an item
    // advances straight to the next one instead of leaving the admin to hunt
    // for it in the sidebar.
    if (nextItem) goTo(nextItem.id);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (dialog) setDialog(null);
      else if (itemDialog) setItemDialog(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [dialog, itemDialog, onClose]);

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
    <div
      className="bg-background fixed inset-0 z-50 flex overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`Review ${course.title}`}
    >
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Shared course-content sidebar */}
        <CourseContentSidebar
          courseTitle={course.title}
          modules={modules}
          activeId={activeId}
          expanded={expanded}
          onToggleModule={toggleModule}
          isItemDone={isItemDone}
          lockingEnabled={false}
          getItemBadge={getItemBadge}
          showTypeIcon
          onSelect={select}
          collapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed((v) => !v)}
          backHref="/admin/courses"
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

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="border-border bg-card relative flex h-14 shrink-0 items-center border-b px-3 sm:h-16 sm:px-4">
            {/* Mobile */}
            <div className="flex w-full items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={onClose}
                aria-label={t('backToCourses')}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-foreground min-w-0 flex-1 truncate text-sm font-bold sm:text-base">
                {course.title}
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
                      className="fixed inset-0 z-[55]"
                      onClick={() => setShowMobileActions(false)}
                      aria-hidden
                    />
                    <div className="bg-card ring-border absolute top-full right-0 z-[56] mt-1 min-w-48 overflow-hidden rounded-xl shadow-xl ring-1 dark:ring-white/10">
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
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden min-w-0 flex-1 lg:block">
              <h1 className="text-foreground truncate text-lg font-bold">
                {t('heading')}
              </h1>
              <p className="text-muted-foreground truncate text-[11px]">
                {course.title} · {t('submittedBy')} {course.instructor}
              </p>
            </div>
            <div className="hidden items-center gap-1.5 lg:flex">
              <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-500">
                {t('pendingReview')}
              </span>
              <ThemeToggle className="size-8" />
              <NotificationBell />
              <LanguageSwitcher />
            </div>
          </header>

          {/* Mobile: module tabs + lesson chips */}
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
            <div className="flex gap-1.5 overflow-x-auto px-3 pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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

          {/* Footer */}
          <footer className="border-border bg-card/90 shrink-0 border-t backdrop-blur-md">
            {/* Mobile: decide the active item until every item is decided,
                then a single Submit Review action — same pattern as desktop. */}
            <div className="flex items-center gap-2 px-3 py-3 lg:hidden">
              {allDecided ? (
                <Button
                  size="sm"
                  className="w-full gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500"
                  onClick={() => setDialog(anyRejected ? 'reject' : 'approve')}
                >
                  <Check className="h-4 w-4" />
                  {t('submitReview')}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-1.5 border-rose-300 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-800 dark:hover:bg-rose-950"
                    onClick={() => setItemDialog('reject')}
                  >
                    <X className="h-4 w-4" />
                    {t('reject')}
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500"
                    onClick={() => setItemDialog('approve')}
                  >
                    <Check className="h-4 w-4" />
                    {t('approve')}
                  </Button>
                </>
              )}
            </div>

            {/* Desktop: back | reject/approve for the active item until every
                item has a decision, then a single Submit Review action —
                mirrors the educator's Next → Resubmit footer pattern. */}
            <div className="hidden items-center justify-between gap-2 px-6 py-3 lg:flex">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={onClose}
              >
                <ArrowLeft className="h-4 w-4" />
                {t('backToCourses')}
              </Button>
              <div className="flex items-center gap-3">
                {!allDecided && pendingCount > 0 && (
                  <p className="text-muted-foreground hidden text-xs font-medium sm:block">
                    {t('gateHint', { count: pendingCount })}
                  </p>
                )}
                {allDecided ? (
                  <Button
                    size="sm"
                    className="gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500"
                    onClick={() =>
                      setDialog(anyRejected ? 'reject' : 'approve')
                    }
                  >
                    <Check className="h-4 w-4" />
                    {t('submitReview')}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 border-rose-300 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-800 dark:hover:bg-rose-950"
                      onClick={() => setItemDialog('reject')}
                    >
                      <X className="h-4 w-4" />
                      {t('reject')}
                    </Button>
                    <Button
                      size="sm"
                      className="gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500"
                      onClick={() => setItemDialog('approve')}
                    >
                      <Check className="h-4 w-4" />
                      {t('approve')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </footer>
        </div>
      </div>

      <ReviewSummarySheet
        open={dialog !== null}
        courseTitle={course.title}
        items={items}
        decisions={decisions}
        onConfirm={() =>
          anyRejected
            ? onReject(course, gatherFeedback(decisions))
            : onApprove(course, gatherFeedback(decisions))
        }
        onClose={() => setDialog(null)}
      />
      {itemDialog === 'approve' && active && (
        <ItemApproveDialog
          itemTitle={active.title}
          initialNote={decisions[active.id]?.note}
          onConfirm={(note) => decideActiveItem('approved', note)}
          onClose={() => setItemDialog(null)}
        />
      )}
      {itemDialog === 'reject' && active && (
        <ItemRejectDialog
          itemTitle={active.title}
          initialNote={decisions[active.id]?.note}
          onConfirm={(note) => decideActiveItem('rejected', note)}
          onClose={() => setItemDialog(null)}
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
          placeholderNote="Admin preview — learners watch the full video"
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
