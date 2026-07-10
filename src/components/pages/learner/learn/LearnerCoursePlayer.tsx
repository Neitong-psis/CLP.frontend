'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLearnerMyLearningT } from '@/i18n';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle2,
  Clock,
  Lightbulb,
  FileUp,
  UploadCloud,
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
  type DocumentItem,
  type VideoItem,
  type QuizItem,
  type AssignmentItem,
} from '@/app/[locale]/(learner)/learn/[courseId]/_lib/content';
import type { QuizQuestion } from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import Logo from '@/components/common/Logo';
import { Link } from '@/i18n/navigation';
import { RelearnOverlay } from '@/components/course-content/RelearnOverlay';
import { KIND_ICON } from '@/components/course-content/types';
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
            <div className="border-border bg-card scrollbar-none flex items-center gap-1 overflow-x-auto rounded-full border p-1 shadow-sm [&::-webkit-scrollbar]:hidden">
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
            <div className="scrollbar-none flex gap-1.5 overflow-x-auto pt-2 [&::-webkit-scrollbar]:hidden">
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
          isReplay={isReplay}
          continueFromSaved={continueFromSaved}
          startingFromBeginning={startingFromBeginning}
        />
      );
    case 'document':
      return <DocumentPanel item={item} />;
    case 'quiz':
      return (
        <QuizPanel
          item={item}
          attemptsUsed={quizAttemptsUsed}
          onResult={onQuizResult}
          attemptLabel={attemptLabel}
        />
      );
    case 'assignment':
      return (
        <AssignmentPanel item={item} onSubmitted={onAssignmentSubmitted} />
      );
  }
}

function VideoPanel({
  item,
  isReplay,
  continueFromSaved,
  startingFromBeginning,
}: {
  item: VideoItem;
  isReplay: boolean;
  continueFromSaved: string;
  startingFromBeginning: string;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] 2xl:grid-cols-[minmax(0,1fr)_400px]">
      {/* ── Main column: player + title/meta ──────────────────────────────── */}
      <div className="min-w-0 space-y-4">
        {/* Player */}
        <div className="border-border relative aspect-video w-full overflow-hidden rounded-2xl border bg-black shadow-sm">
          {item.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <div className="bg-brand-navy absolute inset-0 flex flex-col items-center justify-center gap-4 dark:bg-[#071225]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,163,0,0.08)_0%,transparent_70%)]" />
              <div className="bg-brand-gold relative flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_32px_rgba(244,163,0,0.4)]">
                <Play className="text-brand-navy ml-1 h-7 w-7 fill-current" />
              </div>
              <div className="relative text-center">
                <p className="text-base font-bold text-white">{item.title}</p>
                <p className="mt-1 text-xs text-white/50">
                  {isReplay ? startingFromBeginning : continueFromSaved}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Title + meta — below the video, YouTube-style */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="border-border bg-muted/40 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
              <Play className="h-3 w-3" />
              Video Lesson
            </span>
            <span className="border-border bg-muted/40 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
              <Clock className="h-3 w-3" />
              {item.duration}
            </span>
          </div>
          <h2 className="text-foreground mt-3 text-xl font-bold sm:text-2xl">
            {item.title}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {item.intro}
          </p>
        </div>
      </div>

      {/* ── Side column: lesson resources ─────────────────────────────────── */}
      <aside className="space-y-4 xl:sticky xl:top-0 xl:self-start">
        {/* In This Video */}
        <div className="border-border bg-card rounded-2xl border p-5">
          <h3 className="text-foreground flex items-center gap-2 text-sm font-bold">
            <Lightbulb className="text-brand-gold h-4 w-4" />
            In This Video
          </h3>
          <ul className="mt-3 space-y-2.5">
            {item.topics.map((topic, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start gap-2.5 text-sm leading-snug"
              >
                <span className="text-brand-gold mt-0.5 shrink-0 font-bold">
                  ▸
                </span>
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Moments — click to jump */}
        <div className="border-border bg-card rounded-2xl border p-5">
          <h3 className="text-foreground flex items-center gap-2 text-sm font-bold">
            <Clock className="text-brand-gold h-4 w-4" />
            Key Moments
          </h3>
          <div className="mt-3 space-y-1">
            {item.moments.map((moment, i) => (
              <button
                key={i}
                type="button"
                disabled={!item.youtubeId}
                onClick={() =>
                  item.youtubeId &&
                  window.open(
                    `https://www.youtube.com/watch?v=${item.youtubeId}&t=${timeToSeconds(moment.time)}s`,
                    '_blank',
                    'noopener,noreferrer',
                  )
                }
                className="hover:bg-muted/60 -mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors disabled:cursor-default disabled:hover:bg-transparent"
              >
                <span className="bg-brand-gold/10 text-brand-gold shrink-0 rounded-md px-2 py-0.5 font-mono text-xs font-semibold">
                  {moment.time}
                </span>
                <span className="text-muted-foreground group-hover:text-foreground text-sm leading-snug">
                  {moment.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

/** Convert a "m:ss" or "h:mm:ss" timestamp to total seconds. */
function timeToSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  return parts.reduce((acc, part) => acc * 60 + part, 0);
}

function DocumentPanel({ item }: { item: DocumentItem }) {
  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      {/* Header */}
      <div className="border-border/60 border-b px-6 pt-6 pb-5">
        <div className="flex items-center justify-between">
          <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
            Document Lesson
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Clock className="h-3.5 w-3.5" />
            {item.readTime}
          </span>
        </div>
        <h2 className="text-foreground mt-3 text-2xl font-bold">
          {item.title}
        </h2>
        <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
          {item.intro}
        </p>
      </div>

      {/* Objectives */}
      <div className="border-border/60 border-b px-6 py-5">
        <h3 className="text-foreground mb-3 text-sm font-bold">
          What You&apos;ll Learn
        </h3>
        <ul className="space-y-2">
          {item.objectives.map((obj, i) => (
            <li
              key={i}
              className="text-muted-foreground flex items-start gap-2.5 text-sm"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Content sections */}
      {item.sections.map((section, i) => (
        <div
          key={i}
          className={cn(
            'px-6 py-5',
            i < item.sections.length - 1
              ? 'border-border/60 border-b'
              : item.takeaways.length > 0
                ? 'border-border/60 border-b'
                : '',
          )}
        >
          <h3 className="text-foreground text-base font-bold">
            {section.heading}
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {section.text}
          </p>
          {section.tip && (
            <div className="border-brand-gold/20 bg-brand-gold/6 mt-4 flex items-start gap-2.5 rounded-xl border px-4 py-3">
              <Lightbulb className="text-brand-gold mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-brand-gold/90 text-sm">{section.tip}</p>
            </div>
          )}
        </div>
      ))}

      {/* Key Takeaways */}
      {item.takeaways.length > 0 && (
        <div className="px-6 py-5">
          <h3 className="text-foreground mb-3 text-sm font-bold">
            Key Takeaways
          </h3>
          <ul className="space-y-2">
            {item.takeaways.map((point, i) => (
              <li
                key={i}
                className="text-foreground/75 flex items-start gap-2.5 text-sm"
              >
                <span className="text-brand-gold mt-0.5 shrink-0 font-bold">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Interactive quiz ──────────────────────────────────────────────────────────

function QuizOption({
  option,
  index,
  selected,
  revealed,
  correctIndex,
  onSelect,
}: {
  option: string;
  index: number;
  selected: number | null;
  revealed: boolean;
  correctIndex: number;
  onSelect: (i: number) => void;
}) {
  const isSelected = selected === index;
  const isCorrect = index === correctIndex;

  let ring = 'border-border hover:border-brand-gold/40 hover:bg-muted/40';
  let dot = 'border-border';
  let text = 'text-foreground/80';

  if (revealed) {
    if (isCorrect) {
      ring = 'border-emerald-400/60 bg-emerald-50 dark:bg-emerald-500/10';
      dot = 'border-emerald-500 bg-emerald-500';
      text = 'text-emerald-700 dark:text-emerald-400 font-semibold';
    } else if (isSelected) {
      ring = 'border-rose-400/60 bg-rose-50 dark:bg-rose-500/10';
      dot = 'border-rose-500 bg-rose-500';
      text = 'text-rose-600 dark:text-rose-400';
    }
  } else if (isSelected) {
    ring = 'border-brand-gold bg-brand-gold/8';
    dot = 'border-brand-gold bg-brand-gold';
    text = 'text-foreground font-semibold';
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      disabled={revealed}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-150 sm:gap-3 sm:px-4 sm:py-3.5',
        ring,
      )}
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all',
          dot,
        )}
      >
        {isSelected && !revealed && (
          <span className="h-2 w-2 rounded-full bg-white" />
        )}
        {revealed && isCorrect && (
          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
        )}
      </span>
      <span className={cn('text-sm', text)}>{option}</span>
    </button>
  );
}

function QuizPanel({
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
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(totalQ).fill(null),
  );
  const [finished, setFinished] = useState(false);

  const question: QuizQuestion = item.questions[currentQ];
  const pct = finished
    ? 100
    : Math.round(((currentQ + 1) / item.totalQuestions) * 100);
  const isLast = currentQ === totalQ - 1;

  const finalScore = answers.filter(
    (a, i) => a === item.questions[i].correctIndex,
  ).length;

  function goNext() {
    if (isLast) {
      const passedNow =
        Math.round((finalScore / totalQ) * 100) >= QUIZ_PASS_PERCENT;
      setFinished(true);
      onResult(passedNow);
    } else {
      const nextIdx = currentQ + 1;
      const saved = answers[nextIdx];
      setCurrentQ(nextIdx);
      setSelected(saved);
      setRevealed(saved !== null);
    }
  }

  function goBack() {
    if (currentQ > 0) {
      const prevIdx = currentQ - 1;
      const saved = answers[prevIdx];
      setCurrentQ(prevIdx);
      setSelected(saved);
      setRevealed(saved !== null);
    }
  }

  function restart() {
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setAnswers(Array(totalQ).fill(null));
    setFinished(false);
  }

  // ── Results screen ──────────────────────────────────────────────────────────
  if (finished) {
    const pctScore = Math.round((finalScore / totalQ) * 100);
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
            <span className="text-foreground font-semibold">{finalScore}</span>{' '}
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
              onClick={restart}
              className="border-border text-foreground/70 hover:bg-muted/60 hover:text-foreground mt-2 rounded-xl border px-6 py-2.5 text-sm font-medium transition-colors"
            >
              Retry Quiz
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Question screen ─────────────────────────────────────────────────────────
  return (
    <div className="border-border bg-card flex max-h-full flex-col overflow-hidden rounded-2xl border">
      {/* Header (pinned) */}
      <div className="border-border/60 shrink-0 border-b px-5 pt-4 pb-2.5 sm:px-6 sm:pt-6 sm:pb-4">
        <p className="text-muted-foreground text-xs sm:text-sm">
          Quiz for {item.forLesson}
        </p>
        <h2 className="text-foreground mt-0.5 text-lg font-bold sm:mt-1 sm:text-2xl">
          {item.title}
        </h2>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:mt-3 sm:gap-2">
          <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-medium sm:px-3 sm:py-1 sm:text-xs">
            Question {currentQ + 1} of {item.totalQuestions}
          </span>
          <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-medium sm:px-3 sm:py-1 sm:text-xs">
            {item.estimatedMinutes} Minutes
          </span>
          <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-medium sm:px-3 sm:py-1 sm:text-xs">
            Single Choice
          </span>
          <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 sm:px-3 sm:py-1 sm:text-xs dark:text-amber-400">
            {attemptLabel(attemptsUsed + 1, MAX_QUIZ_ATTEMPTS)}
          </span>
        </div>
      </div>

      {/* Progress bar (pinned) */}
      <div className="bg-muted/40 h-1.5 w-full shrink-0">
        <div
          className="bg-brand-gold h-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Question + options — the only scrolling region */}
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 pb-4 sm:px-6 sm:pt-6">
        <h3 className="text-foreground text-base font-bold sm:text-xl">
          {question.question}
        </h3>
        <p className="text-muted-foreground mt-0.5 text-xs sm:mt-1 sm:text-sm">
          Choose one answer.
        </p>

        <div className="mt-3 space-y-2 sm:mt-5 sm:space-y-3">
          {question.options.map((opt: string, i: number) => (
            <QuizOption
              key={i}
              option={opt}
              index={i}
              selected={selected}
              revealed={revealed}
              correctIndex={question.correctIndex}
              onSelect={(idx) => {
                setSelected(idx);
                setRevealed(true);
                setAnswers((prev) => {
                  const next = [...prev];
                  next[currentQ] = idx;
                  return next;
                });
              }}
            />
          ))}
        </div>

        {revealed && (
          <p
            className={cn(
              'mt-4 text-xs font-semibold',
              selected === question.correctIndex
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400',
            )}
          >
            {selected === question.correctIndex
              ? '✓ Correct!'
              : `✗ Correct answer: ${question.options[question.correctIndex]}`}
          </p>
        )}
      </div>

      {/* Nav footer (pinned — always reachable without scrolling) */}
      <div className="border-border/60 bg-card flex shrink-0 items-center justify-between border-t px-5 py-3.5 sm:px-6 sm:py-4">
        <button
          type="button"
          onClick={goBack}
          disabled={currentQ === 0}
          className="border-border text-foreground/70 hover:bg-muted/60 hover:text-foreground rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-30"
        >
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={!revealed}
          className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
}

function AssignmentPanel({
  item,
  onSubmitted,
}: {
  item: AssignmentItem;
  onSubmitted: () => void;
}) {
  const initialStatus = LEARNER_ITEM_STATUSES[item.id] ?? 'unread';

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'done'>(
    'idle',
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSubmitted = initialStatus === 'submitted' || uploadState === 'done';

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function addFiles(incoming: FileList | null) {
    if (!incoming || incoming.length === 0) return;
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      const next = Array.from(incoming).filter((f) => !existing.has(f.name));
      return [...prev, ...next];
    });
    setUploadState('idle');
    setUploadProgress(0);
    // Reset so the same file can be re-selected after removal
    if (inputRef.current) inputRef.current.value = '';
  }

  function removeFile(name: string) {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function handleSubmit() {
    if (files.length === 0 || uploadState === 'uploading') return;
    setUploadState('uploading');
    setUploadProgress(0);

    let progress = 0;
    intervalRef.current = setInterval(() => {
      progress += Math.random() * 12 + 6;
      if (progress >= 100) {
        clearInterval(intervalRef.current!);
        setUploadProgress(100);
        setTimeout(() => {
          setUploadState('done');
          onSubmitted();
        }, 400);
      } else {
        setUploadProgress(Math.round(Math.min(progress, 99)));
      }
    }, 140);
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      {/* Header */}
      <div className="border-border/60 border-b px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5">
        <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
          Assignment
        </span>
        <h2 className="text-foreground mt-3 text-xl font-bold sm:text-2xl">
          {item.title}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Assigned after {item.forLesson}
        </p>
      </div>

      <div className="space-y-4 px-5 py-4 sm:space-y-5 sm:px-6 sm:py-5">
        {/* Meta row — compact rows on mobile, cards on desktop */}
        <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
          {[
            { label: 'Lesson', value: item.forLesson },
            { label: 'Due date', value: `Due ${item.dueDate}` },
            { label: 'Submission', value: item.submission },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="border-border flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 sm:flex-col sm:items-start sm:py-4"
            >
              <p className="text-muted-foreground shrink-0 text-xs">{label}</p>
              <p className="text-foreground text-right text-sm font-semibold sm:mt-1 sm:text-left">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="border-border rounded-xl border p-4">
          <h3 className="text-foreground text-sm font-semibold">
            Instructions
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {item.instructions}
          </p>
        </div>

        {/* Requirements */}
        <div className="border-border rounded-xl border p-4">
          <h3 className="text-foreground mb-3 text-sm font-semibold">
            Requirements
          </h3>
          <ul className="space-y-2">
            {item.requirements.map((req, i) => (
              <li
                key={i}
                className="text-muted-foreground flex items-start gap-2.5 text-sm"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Submission area */}
        {isSubmitted ? (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-5 py-4">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Submitted
              </p>
              <p className="text-xs text-emerald-600/70 dark:text-emerald-400/60">
                Your assignment has been submitted and is awaiting review.
              </p>
            </div>
          </div>
        ) : files.length > 0 ? (
          /* Files selected — list + submit */
          <div className="border-border space-y-3 rounded-xl border p-5">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <p className="text-foreground text-sm font-semibold">
                {files.length} file{files.length > 1 ? 's' : ''} selected
              </p>
              <span className="text-muted-foreground text-xs">
                {formatSize(totalSize)} total
              </span>
            </div>

            {/* File list */}
            <ul className="space-y-2">
              {files.map((f, idx) => (
                <li
                  key={f.name}
                  className="bg-muted/40 flex items-center gap-3 rounded-lg px-3 py-2.5"
                >
                  <FileUp className="text-brand-gold h-5 w-5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium">
                      {f.name}
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      {formatSize(f.size)}
                    </p>
                  </div>
                  {/* Per-file progress or remove */}
                  {uploadState === 'uploading' ? (
                    <span className="text-muted-foreground text-[11px] tabular-nums">
                      {idx < Math.floor((uploadProgress / 100) * files.length)
                        ? '✓'
                        : idx ===
                            Math.floor((uploadProgress / 100) * files.length)
                          ? `${uploadProgress}%`
                          : '—'}
                    </span>
                  ) : uploadState === 'idle' ? (
                    <button
                      type="button"
                      onClick={() => removeFile(f.name)}
                      className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors"
                      aria-label={`Remove ${f.name}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>

            {/* Overall progress bar */}
            {uploadState === 'uploading' && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    Uploading {files.length} file
                    {files.length > 1 ? 's' : ''}…
                  </span>
                  <span className="text-foreground font-semibold">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="bg-muted h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-brand-gold h-full rounded-full transition-[width] duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={uploadState === 'uploading'}
                className={cn(
                  'flex-1 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all',
                  uploadState === 'uploading'
                    ? 'bg-brand-gold/50 text-brand-navy/60 cursor-not-allowed'
                    : 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90 cursor-pointer',
                )}
              >
                {uploadState === 'uploading'
                  ? `Uploading… ${uploadProgress}%`
                  : `Submit ${files.length} File${files.length > 1 ? 's' : ''}`}
              </button>
              {uploadState === 'idle' && (
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="border-border text-muted-foreground hover:text-foreground rounded-xl border px-4 py-2.5 text-sm transition-colors"
                >
                  Add More
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Drop zone */
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              'cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200',
              isDragging
                ? 'border-brand-gold bg-brand-gold/5 scale-[1.01]'
                : 'border-border hover:border-brand-gold/50 hover:bg-muted/30',
            )}
          >
            <UploadCloud
              className={cn(
                'mx-auto mb-3 h-10 w-10 transition-colors duration-200',
                isDragging ? 'text-brand-gold' : 'text-muted-foreground/40',
              )}
            />
            <p className="text-foreground text-sm font-semibold">
              {isDragging ? 'Drop files here' : 'Upload your assignment'}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              Drag & drop multiple files or click to browse · PDF, DOCX, ZIP,
              images
            </p>
            <span className="bg-brand-gold text-brand-navy mt-4 inline-block rounded-xl px-6 py-2.5 text-sm font-semibold">
              Browse Files
            </span>
          </div>
        )}

        {/* Hidden multi-file input */}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.zip,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
