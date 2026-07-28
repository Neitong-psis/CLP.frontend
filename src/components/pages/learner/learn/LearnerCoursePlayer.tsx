'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLearnerMyLearningT } from '@/i18n';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  X,
  Trophy,
  Award,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NotificationBell } from '@/components/common/NotificationBell';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useCurrentUser } from '@/hooks/use-current-user';
import type { Course } from '@/constants/learner';
import {
  readCourseProgress,
  saveCourseProgress,
  readCourseState,
  saveCourseState,
} from '@/lib/utils/courseStorage';
import { pushNotif } from '@/lib/utils/notifStorage';
import { exportCourseToPdf } from '@/lib/utils/courseExportPdf';
import {
  LEARNER_ITEM_STATUSES,
  flattenItems,
  lessonCount,
  type ReviewModule,
  type ReviewItem,
  type QuizItem,
} from '@/app/[locale]/(learner)/learn/[courseId]/_lib/content';
import Logo from '@/components/common/Logo';
import { Link } from '@/i18n/navigation';
import { RelearnOverlay } from '@/components/course-content/RelearnOverlay';
import { KIND_ICON } from '@/components/course-content/types';
import {
  VideoPanel,
  DocumentPanel,
  QuizPanel,
  AssignmentPanel,
} from '@/components/course-content/panels';
import { AssignmentSubmission } from './AssignmentSubmission';
import {
  CourseSidebar,
  type CourseSidebarLabels,
} from '@/components/course-sidebar';
import { toSidebarCourse } from './courseSidebarAdapter';
import {
  computeLocks,
  flattenLessons,
  type ItemDone,
} from '@/lib/course-progress';

const MAX_QUIZ_ATTEMPTS = 3;
const QUIZ_PASS_PERCENT = 60;

// ── Props ─────────────────────────────────────────────────────────────────────

interface LearnerCoursePlayerProps {
  course: Course;
  modules: ReviewModule[];
  startItemId: string;
  isReplay: boolean;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function LearnerCoursePlayer({
  course,
  modules,
  startItemId,
  isReplay,
}: LearnerCoursePlayerProps) {
  const router = useRouter();
  const t = useLearnerMyLearningT();
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const items = useMemo(() => flattenItems(modules), [modules]);

  const [activeId, setActiveId] = useState(startItemId);
  const itemIds = useMemo(() => new Set(items.map((i) => i.id)), [items]);

  // localStorage is unavailable during SSR, so initialize from static demo
  // data only; real progress is merged in after mount (see hydrate effect).
  // Docs/videos count via `viewed` (persisted to the legacy array key so the
  // My Learning / dashboard percent readers keep working); quizzes must be
  // *passed* and assignments *submitted*, tracked in `passed`/`submitted`.
  // Seeds are filtered against this course's real item ids so unrelated demo
  // ids can't inflate progress.
  const [viewed, setViewed] = useState<Set<string>>(
    () =>
      new Set(
        Object.entries(LEARNER_ITEM_STATUSES)
          .filter(
            ([id, s]) =>
              (s === 'completed' || s === 'passed') && itemIds.has(id),
          )
          .map(([id]) => id),
      ),
  );
  const [passed, setPassed] = useState<Set<string>>(
    () =>
      new Set(
        Object.entries(LEARNER_ITEM_STATUSES)
          .filter(([id, s]) => s === 'passed' && itemIds.has(id))
          .map(([id]) => id),
      ),
  );
  const [submitted, setSubmitted] = useState<Set<string>>(
    () =>
      new Set(
        Object.entries(LEARNER_ITEM_STATUSES)
          .filter(([id, s]) => s === 'submitted' && itemIds.has(id))
          .map(([id]) => id),
      ),
  );
  const [attempts, setAttempts] = useState<Record<string, number>>({});
  const [relearn, setRelearn] = useState<{
    lessonId: string;
    lessonTitle: string;
  } | null>(null);

  // Guards the persist effects below so they can't overwrite previously-saved
  // progress with the static seed before that data has been read in.
  const hydratedRef = useRef(false);
  const alreadyCompleteRef = useRef(false);

  useEffect(() => {
    const id = setTimeout(() => {
      const storedViewed = readCourseProgress(course.id).filter((itemId) =>
        itemIds.has(itemId),
      );
      const state = readCourseState(course.id);
      const storedPassed = state.passed.filter((i) => itemIds.has(i));
      const storedSubmitted = state.submitted.filter((i) => itemIds.has(i));

      const mergedViewed = new Set([...viewed, ...storedViewed]);
      const mergedPassed = new Set([...passed, ...storedPassed]);
      const mergedSubmitted = new Set([...submitted, ...storedSubmitted]);

      setViewed(mergedViewed);
      setPassed(mergedPassed);
      setSubmitted(mergedSubmitted);
      setAttempts(state.attempts);

      // Suppress the completion overlay on re-entry into an already-finished
      // course by pre-marking it complete against the freshly-read state.
      const done = (item: ReviewItem) =>
        item.kind === 'quiz'
          ? mergedPassed.has(item.id)
          : item.kind === 'assignment'
            ? mergedSubmitted.has(item.id)
            : mergedViewed.has(item.id);
      alreadyCompleteRef.current = items.length > 0 && items.every(done);

      hydratedRef.current = true;
    }, 0);
    return () => clearTimeout(id);
    // Seed sets are stable identities from useState initializers; re-running
    // only when the course/item set changes is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.id, itemIds, items]);

  const [showCompletion, setShowCompletion] = useState(false);
  const [mobileModuleId, setMobileModuleId] = useState<string>(
    () =>
      modules.find((m) =>
        flattenItems([m]).some((item) => item.id === startItemId),
      )?.id ??
      modules[0]?.id ??
      '',
  );

  const mobileModule = useMemo(
    () => modules.find((m) => m.id === mobileModuleId) ?? modules[0],
    [modules, mobileModuleId],
  );
  const mobileItems = useMemo(
    () => (mobileModule ? flattenItems([mobileModule]) : []),
    [mobileModule],
  );

  // ── Completion + locking ────────────────────────────────────────────────────
  const isItemDone = useCallback<ItemDone>(
    (item) => {
      if (item.kind === 'quiz') return passed.has(item.id);
      if (item.kind === 'assignment') return submitted.has(item.id);
      return viewed.has(item.id);
    },
    [passed, submitted, viewed],
  );

  const locks = useMemo(
    () => computeLocks(modules, isItemDone, true),
    [modules, isItemDone],
  );

  // Persist viewed (legacy key) and the richer state (separate key).
  useEffect(() => {
    if (!hydratedRef.current) return;
    saveCourseProgress(course.id, [...viewed]);
  }, [course.id, viewed]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    saveCourseState(course.id, {
      passed: [...passed],
      submitted: [...submitted],
      attempts,
    });
  }, [course.id, passed, submitted, attempts]);

  // Fire the completion overlay once the whole course is genuinely done. The
  // state update is deferred a tick so it isn't a synchronous setState in the
  // effect body (matches the pattern used elsewhere in this app).
  useEffect(() => {
    if (!hydratedRef.current || alreadyCompleteRef.current) return;
    if (!(items.length > 0 && items.every(isItemDone))) return;
    alreadyCompleteRef.current = true;
    const id = setTimeout(() => {
      setShowCompletion(true);
      pushNotif({
        id: `complete-${course.id}`,
        type: 'success',
        title: 'Course Completed!',
        body: `${course.title} — Visit Certificates to verify your credential.`,
        time: 'Just now',
        read: false,
      });
    }, 0);
    return () => clearTimeout(id);
  }, [isItemDone, items, course.id, course.title]);

  const active = items.find((i) => i.id === activeId) ?? items[0];
  const currentIndex = items.findIndex((i) => i.id === activeId);
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem =
    currentIndex < items.length - 1 ? items[currentIndex + 1] : null;
  const nextLocked = nextItem ? locks.lockedItemIds.has(nextItem.id) : false;
  const activeLessonId = useMemo(
    () =>
      flattenLessons(modules).find((f) =>
        f.items.some((i) => i.id === activeId),
      )?.lesson.id,
    [modules, activeId],
  );

  function markViewed(id: string) {
    setViewed((prev) => new Set(prev).add(id));
  }

  /** Navigate + mark viewed without a lock check (for programmatic moves). */
  function goTo(id: string) {
    setActiveId(id);
    markViewed(id);
    const newMod = modules.find((m) =>
      flattenItems([m]).some((item) => item.id === id),
    );
    if (newMod) setMobileModuleId(newMod.id);
  }

  /** Public selection — blocks locked items with a hint toast. */
  function select(id: string) {
    if (locks.lockedItemIds.has(id)) {
      toast(t('lockedToast'), 'info');
      return;
    }
    goTo(id);
  }

  /** Reset a lesson's content + quiz progress (keep submitted assignments) and
   *  send the learner back to its first item to relearn it. */
  function relearnLesson(lessonId: string) {
    const flat = flattenLessons(modules).find((f) => f.lesson.id === lessonId);
    if (!flat) return;
    const contentIds = [...flat.lesson.documents, ...flat.lesson.videos].map(
      (i) => i.id,
    );
    const quizIds = flat.lesson.quizzes.map((q) => q.id);
    const wipe = new Set([...contentIds, ...quizIds]);

    setViewed((prev) => new Set([...prev].filter((id) => !wipe.has(id))));
    setPassed(
      (prev) => new Set([...prev].filter((id) => !quizIds.includes(id))),
    );
    setAttempts((prev) => {
      const next = { ...prev };
      for (const id of quizIds) delete next[id];
      return next;
    });

    const firstId = flat.items[0]?.id;
    if (firstId) goTo(firstId);
    setRelearn({ lessonId, lessonTitle: flat.lesson.title });
  }

  function handleQuizResult(quizPassed: boolean) {
    if (!active) return;
    markViewed(active.id);
    if (quizPassed) {
      setPassed((prev) => new Set(prev).add(active.id));
      return;
    }
    // Already-passed quizzes can be retaken freely without re-triggering the
    // 3-strikes relearn.
    if (passed.has(active.id)) return;
    const used = (attempts[active.id] ?? 0) + 1;
    setAttempts((prev) => ({ ...prev, [active.id]: used }));
    if (used >= MAX_QUIZ_ATTEMPTS && activeLessonId) {
      relearnLesson(activeLessonId);
    }
  }

  function handleAssignmentSubmitted() {
    if (!active) return;
    setSubmitted((prev) => new Set(prev).add(active.id));
    markViewed(active.id);
  }

  /** Footer primary action — advance to the next item, blocked at a lesson
   *  boundary until the current lesson is fully complete. */
  function handleContinue() {
    if (!nextItem) {
      if (items.every(isItemDone)) setShowCompletion(true);
      else toast(t('finishBlocked'), 'info');
      return;
    }
    if (nextLocked) {
      toast(t('lockedToast'), 'info');
      return;
    }
    goTo(nextItem.id);
  }

  function handleExportPdf() {
    exportCourseToPdf(
      {
        title: course.title,
        author: course.author,
        category: course.category,
        level: course.level,
        description: course.description,
      },
      modules,
    );
  }

  const sidebarLabels: Partial<CourseSidebarLabels> = useMemo(
    () => ({
      courseContent: t('courseContent'),
      overallProgress: t('overallProgress'),
      moduleLabel: (index) => t('moduleLabel', { number: index + 1 }),
      moduleCompleted: (done, total) => t('itemsCompleted', { done, total }),
      modulePercent: (percent) => t('modulePercent', { percent }),
      lockedModule: t('lockedModule'),
      lockedLesson: t('locked'),
      disabledModule: t('notPublished'),
      collapse: t('collapseSidebar'),
      expand: t('expandSidebar'),
      closeDrawer: t('closeContents'),
      openDrawer: t('openContents'),
      itemTypes: {
        document: t('reading'),
        video: t('video'),
        quiz: t('quiz'),
        assignment: t('assignment'),
      },
      minutesShort: (count) => t('minutesShort', { count }),
    }),
    [t],
  );

  // Rebuilt whenever completion, attempts, or locking changes — the sidebar is
  // a pure projection of that state, never a second copy of it.
  const sidebarCourse = useMemo(
    () =>
      toSidebarCourse({
        courseId: course.id,
        courseTitle: course.title,
        modules,
        locks,
        isItemDone,
        attempts,
        submitted,
        maxQuizAttempts: MAX_QUIZ_ATTEMPTS,
        labels: {
          completed: t('statusCompleted'),
          pending: t('statusPending'),
          submitted: t('statusSubmitted'),
          attemptsUsed: (used, max) => t('attemptsUsed', { used, max }),
          lockedHint: (lesson) => t('lockedHint', { lesson }),
          lockedFallback: t('locked'),
        },
      }),
    [
      course.id,
      course.title,
      modules,
      locks,
      isItemDone,
      attempts,
      submitted,
      t,
    ],
  );

  return (
    <div className="bg-background fixed inset-0 z-50 flex overflow-hidden">
      {/* ── Body: sidebar | main column ────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Desktop only: the player already owns the mobile module tabs below,
            so the sidebar's own drawer trigger is suppressed under lg.
            `lg:contents` lets the sidebar be a direct flex child of this row. */}
        <div className="hidden lg:contents">
          <CourseSidebar
            course={sidebarCourse}
            currentItemId={activeId}
            onSelectItem={(item) => select(item.id)}
            onLockedItem={() => toast(t('lockedToast'), 'info')}
            storageKey={`course-sidebar:${course.id}`}
            labels={sidebarLabels}
            brand={
              <Link
                href="/my-learning"
                aria-label={t('backToMyLearning')}
                className="focus-visible:ring-course-accent rounded-md outline-none focus-visible:ring-2"
              >
                <Logo size="md" variant="default" showText />
              </Link>
            }
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
          />
        </div>

        {/* Main column: header + content + footer nav */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="border-border bg-card relative flex h-14 shrink-0 items-center border-b px-3 sm:h-16 sm:px-4">
            {/* ── Mobile: back arrow | course title ── */}
            <div className="flex w-full items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => router.push('/my-learning')}
                aria-label={t('backToMyLearning')}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-foreground min-w-0 flex-1 truncate text-sm font-bold sm:text-base">
                {course.title}
              </h1>
              <button
                type="button"
                onClick={handleExportPdf}
                aria-label={t('exportPdf')}
                className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>

            {/* ── Desktop: my learning title | role badge + controls ── */}
            <div className="hidden min-w-0 flex-1 lg:block">
              <h1 className="text-foreground truncate text-lg font-bold">
                {t('title')}
              </h1>
              <p className="text-muted-foreground truncate text-[11px]">
                {t('liveWorkspace', { email: currentUser.email })}
              </p>
            </div>
            <div className="hidden items-center gap-1.5 lg:flex">
              <span className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold rounded-full border px-3 py-0.5 text-xs font-semibold">
                Learner
              </span>
              {/* Export now lives in the sidebar's brand row, beside the logo. */}
              <ThemeToggle className="size-8" />
              <NotificationBell />
              <LanguageSwitcher />
            </div>
          </header>

          {/* ── Mobile: module tabs + lesson chips ── */}
          <div className="border-border/60 shrink-0 border-b px-3 pt-2.5 pb-1.5 lg:hidden">
            {/* Module tabs — pill bar styled like the certificates status tabs */}
            <div className="border-border bg-card flex scrollbar-none items-center gap-1 overflow-x-auto rounded-full border p-1 shadow-sm [&::-webkit-scrollbar]:hidden">
              {modules.map((mod) => {
                const isActiveTab = mod.id === mobileModuleId;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setMobileModuleId(mod.id)}
                    className={cn(
                      'flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-150',
                      isActiveTab
                        ? 'bg-brand-gold/10 text-brand-gold ring-brand-gold/40 ring-1'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                    )}
                  >
                    {mod.title}
                    <span
                      className={cn(
                        'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums',
                        isActiveTab
                          ? 'bg-brand-gold text-brand-navy'
                          : 'bg-muted-foreground/12 text-muted-foreground dark:bg-white/10 dark:text-white/70',
                      )}
                    >
                      {lessonCount(mod)}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Lesson chips — horizontal scroll for selected module */}
            <div className="flex scrollbar-none gap-1.5 overflow-x-auto pt-2 [&::-webkit-scrollbar]:hidden">
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
              <ContentPanel
                item={active}
                isReplay={isReplay}
                continueFromSaved={t('continueFromSaved')}
                startingFromBeginning={t('startingFromBeginning')}
                quizAttemptsUsed={attempts[active.id] ?? 0}
                onQuizResult={handleQuizResult}
                onAssignmentSubmitted={handleAssignmentSubmitted}
                attemptLabel={(n, max) => t('attemptOf', { n, max })}
              />
            )}
          </main>

          {/* Footer nav */}
          <footer className="border-border bg-card/90 shrink-0 border-t backdrop-blur-md">
            {/* Mobile: prev / next lesson */}
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
                onClick={handleContinue}
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

            {/* Desktop: back to my learning | prev | mark complete | next */}
            <div className="hidden items-center justify-between gap-2 px-6 py-3 lg:flex">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => router.push('/my-learning')}
              >
                <ArrowLeft className="h-4 w-4" />
                {t('backToMyLearning')}
              </Button>

              <Button
                size="sm"
                className="gap-1.5"
                onClick={handleContinue}
                disabled={Boolean(nextItem) && nextLocked}
                title={nextItem && nextLocked ? t('lockedNextHint') : undefined}
              >
                {!nextItem ? (
                  <>
                    <Trophy className="h-4 w-4" />
                    {t('finishCourse')}
                  </>
                ) : nextLocked ? (
                  <>
                    <Lock className="h-4 w-4" />
                    {t('locked')}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    {t('markComplete')}
                  </>
                )}
              </Button>
            </div>
          </footer>
        </div>
      </div>

      {showCompletion && (
        <CourseCompletionOverlay
          courseTitle={course.title}
          totalItems={items.length}
          onClaim={() => router.push('/certificates')}
          onDismiss={() => setShowCompletion(false)}
        />
      )}

      {relearn && (
        <RelearnOverlay
          lessonTitle={relearn.lessonTitle}
          title={t('relearnTitle')}
          body={t('relearnBody')}
          reviewCta={t('relearnCta')}
          onReview={() => setRelearn(null)}
        />
      )}
    </div>
  );
}

// ── Course completion overlay ─────────────────────────────────────────────────

function CourseCompletionOverlay({
  courseTitle,
  totalItems,
  onClaim,
  onDismiss,
}: {
  courseTitle: string;
  totalItems: number;
  onClaim: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="bg-card border-border relative w-full max-w-md rounded-2xl border p-8 text-center shadow-2xl">
        {/* Dismiss */}
        <button
          type="button"
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground absolute top-4 right-4 rounded-lg p-1 transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <span className="bg-brand-gold/15 border-brand-gold/25 flex size-20 items-center justify-center rounded-full border-2">
            <Trophy className="text-brand-gold size-10" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-foreground mb-1 text-2xl font-bold">
          Course Complete!
        </h2>
        <p className="text-muted-foreground mb-1 text-sm font-medium">
          {courseTitle}
        </p>
        <p className="text-muted-foreground mb-6 text-xs">
          {totalItems} of {totalItems} items completed
        </p>

        {/* Stats row */}
        <div className="border-border mb-6 flex divide-x rounded-xl border">
          <div className="flex flex-1 flex-col items-center gap-0.5 py-3">
            <Award className="text-brand-gold mb-0.5 size-5" />
            <span className="text-foreground text-sm font-bold">100%</span>
            <span className="text-muted-foreground text-[11px]">Progress</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-0.5 py-3">
            <CheckCircle2 className="mb-0.5 size-5 text-emerald-500" />
            <span className="text-foreground text-sm font-bold">
              {totalItems}
            </span>
            <span className="text-muted-foreground text-[11px]">
              Items done
            </span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-0.5 py-3">
            <Trophy className="text-brand-gold mb-0.5 size-5" />
            <span className="text-foreground text-sm font-bold">1</span>
            <span className="text-muted-foreground text-[11px]">
              Certificate
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={onClaim}
          className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 mb-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
        >
          <Award className="size-4" />
          Claim Your Certificate
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="text-muted-foreground hover:text-foreground w-full rounded-xl py-2 text-sm transition-colors"
        >
          Continue Reviewing
        </button>
      </div>
    </div>
  );
}

// ── Content panels ────────────────────────────────────────────────────────────

function ContentPanel({
  item,
  isReplay,
  continueFromSaved,
  startingFromBeginning,
  quizAttemptsUsed,
  onQuizResult,
  onAssignmentSubmitted,
  attemptLabel,
}: {
  item: ReviewItem;
  isReplay: boolean;
  continueFromSaved: string;
  startingFromBeginning: string;
  quizAttemptsUsed: number;
  onQuizResult: (passed: boolean) => void;
  onAssignmentSubmitted: () => void;
  attemptLabel: (n: number, max: number) => string;
}) {
  switch (item.kind) {
    case 'video':
      return (
        <VideoPanel
          item={item}
          placeholderNote={isReplay ? startingFromBeginning : continueFromSaved}
        />
      );
    case 'document':
      return <DocumentPanel item={item} />;
    case 'quiz':
      return (
        <LearnerQuizPanel
          key={quizAttemptsUsed}
          item={item}
          attemptsUsed={quizAttemptsUsed}
          onResult={onQuizResult}
          attemptLabel={attemptLabel}
        />
      );
    case 'assignment':
      return (
        <AssignmentPanel
          item={item}
          role="learner"
          submissionSlot={
            <AssignmentSubmission
              initiallySubmitted={
                LEARNER_ITEM_STATUSES[item.id] === 'submitted'
              }
              onSubmitted={onAssignmentSubmitted}
            />
          }
        />
      );
  }
}

// ── Quiz — results screen wraps the shared question-taking surface ──────────

function LearnerQuizPanel({
  item,
  attemptsUsed,
  onResult,
  attemptLabel,
}: {
  item: QuizItem;
  attemptsUsed: number;
  onResult: (passed: boolean) => void;
  attemptLabel: (n: number, max: number) => string;
}) {
  const totalQ = item.questions.length;
  const [result, setResult] = useState<{ correct: number } | null>(null);

  if (result) {
    const pctScore = Math.round((result.correct / totalQ) * 100);
    const passed = pctScore >= QUIZ_PASS_PERCENT;
    const attemptsLeft = MAX_QUIZ_ATTEMPTS - (attemptsUsed + 1);
    return (
      <div className="border-border bg-card overflow-hidden rounded-2xl border">
        <div className="border-border/60 border-b px-6 pt-6 pb-4">
          <p className="text-muted-foreground text-sm">
            Quiz for {item.forLesson}
          </p>
          <h2 className="text-foreground mt-1 text-2xl font-bold">
            {item.title}
          </h2>
        </div>
        <div className="bg-muted/40 h-1.5 w-full">
          <div className="bg-brand-gold h-full w-full" />
        </div>
        <div className="flex flex-col items-center gap-4 px-6 py-12">
          <div
            className={cn(
              'flex size-24 items-center justify-center rounded-full text-3xl font-bold',
              passed
                ? 'bg-emerald-500/10 text-emerald-500'
                : 'bg-rose-500/10 text-rose-500',
            )}
          >
            {pctScore}%
          </div>
          <h3
            className={cn(
              'text-xl font-bold',
              passed ? 'text-emerald-500' : 'text-rose-500',
            )}
          >
            {passed ? 'Quiz Passed!' : 'Quiz Failed'}
          </h3>
          <p className="text-muted-foreground text-sm">
            You got{' '}
            <span className="text-foreground font-semibold">
              {result.correct}
            </span>{' '}
            out of{' '}
            <span className="text-foreground font-semibold">{totalQ}</span>{' '}
            questions correct.
          </p>
          {!passed && (
            <p className="text-muted-foreground text-center text-xs">
              {attemptsLeft > 0
                ? `A score of ${QUIZ_PASS_PERCENT}% or above is required to pass. ${attemptsLeft} attempt${attemptsLeft > 1 ? 's' : ''} left.`
                : 'No attempts remaining — this lesson has been reset for you to review again.'}
            </p>
          )}
          {!passed && attemptsLeft > 0 && (
            <button
              type="button"
              onClick={() => setResult(null)}
              className="border-border text-foreground/70 hover:bg-muted/60 hover:text-foreground mt-2 rounded-xl border px-6 py-2.5 text-sm font-medium transition-colors"
            >
              Retry Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <QuizPanel
      item={item}
      role="learner"
      attemptBadge={
        <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
          {attemptLabel(attemptsUsed + 1, MAX_QUIZ_ATTEMPTS)}
        </span>
      }
      onFinish={(correct) => {
        setResult({ correct });
        onResult(Math.round((correct / totalQ) * 100) >= QUIZ_PASS_PERCENT);
      }}
    />
  );
}
