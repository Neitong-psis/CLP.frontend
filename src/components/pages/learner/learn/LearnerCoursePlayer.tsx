'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLearnerMyLearningT } from '@/i18n';
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Play,
  ClipboardList,
  ClipboardCheck,
  Layers,
  BookOpen,
  CheckCircle2,
  Clock,
  Lightbulb,
  FileUp,
  UploadCloud,
  PanelLeftClose,
  PanelLeftOpen,
  Folder,
  Check,
  XCircle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NotificationBell } from '@/components/common/NotificationBell';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import Logo from '@/components/common/Logo';
import type { Course } from '@/constants/learner';
import {
  readCourseProgress,
  saveCourseProgress,
} from '@/lib/utils/courseStorage';
import { pushNotif } from '@/lib/utils/notifStorage';
import {
  LEARNER_ITEM_STATUSES,
  flattenItems,
  lessonCount,
  type ReviewModule,
  type ReviewLesson,
  type ReviewItem,
  type ReviewItemKind,
  type DocumentItem,
  type VideoItem,
  type QuizItem,
  type AssignmentItem,
} from '@/app/[locale]/(learner)/learn/[courseId]/_lib/content';
import type { QuizQuestion } from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';

// ── Props ─────────────────────────────────────────────────────────────────────

interface LearnerCoursePlayerProps {
  course: Course;
  modules: ReviewModule[];
  startItemId: string;
  isReplay: boolean;
  userEmail: string;
}

// ── Kind icon map ─────────────────────────────────────────────────────────────

const KIND_ICON: Record<ReviewItemKind, typeof Play> = {
  document: FileText,
  video: Play,
  quiz: ClipboardList,
  assignment: ClipboardCheck,
};

// ── Translation type ──────────────────────────────────────────────────────────

type TFn = ReturnType<typeof useLearnerMyLearningT>;

// ── Main component ────────────────────────────────────────────────────────────

export default function LearnerCoursePlayer({
  course,
  modules,
  startItemId,
  isReplay,
  userEmail,
}: LearnerCoursePlayerProps) {
  const router = useRouter();
  const t = useLearnerMyLearningT();
  const { toast } = useToast();
  const items = useMemo(() => flattenItems(modules), [modules]);

  const [activeId, setActiveId] = useState(startItemId);
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.id)),
  );
  const [viewed, setViewed] = useState<Set<string>>(() => {
    const staticCompleted = new Set(
      Object.entries(LEARNER_ITEM_STATUSES)
        .filter(([, s]) => s === 'completed' || s === 'passed')
        .map(([id]) => id),
    );
    const stored = readCourseProgress(course.id);
    return new Set([...staticCompleted, ...stored]);
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showContents, setShowContents] = useState(false);
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

  // True if the course was already 100% complete before this session started —
  // used to suppress the completion notification on replay / re-entry.
  const alreadyCompleteRef = useRef(
    items.length > 0 && readCourseProgress(course.id).length >= items.length,
  );

  // Persist progress whenever viewed changes
  useEffect(() => {
    saveCourseProgress(course.id, [...viewed]);
  }, [course.id, viewed]);

  // Fire completion toast + notification the first time the course hits 100%
  useEffect(() => {
    if (alreadyCompleteRef.current) return;
    if (items.length > 0 && viewed.size >= items.length) {
      alreadyCompleteRef.current = true;
      toast(
        '🎉 Course complete! Visit Certificates to verify your credential.',
        'success',
      );
      pushNotif({
        id: `complete-${course.id}`,
        type: 'success',
        title: 'Course Completed!',
        body: `${course.title} — Visit Certificates to verify your credential.`,
        time: 'Just now',
        read: false,
      });
    }
  }, [course.id, course.title, items.length, toast, viewed.size]);

  const active = items.find((i) => i.id === activeId) ?? items[0];
  const currentIndex = items.findIndex((i) => i.id === activeId);
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem =
    currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

  function select(id: string) {
    setActiveId(id);
    setViewed((prev) => new Set(prev).add(id));
    const newMod = modules.find((m) =>
      flattenItems([m]).some((item) => item.id === id),
    );
    if (newMod) setMobileModuleId(newMod.id);
  }

  function toggleModule(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleMarkComplete() {
    if (!activeId) return;
    setViewed((prev) => new Set(prev).add(activeId));
    if (nextItem) select(nextItem.id);
    else toast(t('markComplete') + ' ✓', 'success');
  }

  return (
    <div className="bg-background fixed inset-0 z-50 flex overflow-hidden">
      {/* ── Body: sidebar | main column ────────────────────────────────────── */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Review sidebar (owns its brand header) */}
        <ReviewSidebar
          courseTitle={course.title}
          modules={modules}
          activeId={activeId}
          viewed={viewed}
          totalCount={items.length}
          expanded={expanded}
          collapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed((v) => !v)}
          onToggleModule={toggleModule}
          onSelect={select}
          t={t}
        />

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
            </div>

            {/* ── Desktop: my learning title | role badge + controls ── */}
            <div className="hidden min-w-0 flex-1 lg:block">
              <h1 className="text-foreground truncate text-lg font-bold">
                {t('title')}
              </h1>
              <p className="text-muted-foreground truncate text-[11px]">
                {t('liveWorkspace', { email: userEmail })}
              </p>
            </div>
            <div className="hidden items-center gap-1.5 lg:flex">
              <span className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold rounded-full border px-3 py-0.5 text-xs font-semibold">
                Learner
              </span>
              <ThemeToggle className="size-8" />
              <NotificationBell />
              <LanguageSwitcher />
            </div>
          </header>

          {/* ── Mobile: module tabs + lesson chips ── */}
          <div className="border-border/60 shrink-0 border-b lg:hidden">
            {/* Module tabs — horizontal scroll */}
            <div className="flex gap-1.5 overflow-x-auto px-3 pt-2.5 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setMobileModuleId(mod.id)}
                  className={cn(
                    'shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors',
                    mod.id === mobileModuleId
                      ? 'bg-brand-navy dark:bg-brand-gold dark:text-brand-navy text-white'
                      : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {mod.title}
                </button>
              ))}
            </div>
            {/* Lesson chips — horizontal scroll for selected module */}
            <div className="flex gap-1.5 overflow-x-auto px-3 pb-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mobileItems.map((item) => {
                const Icon = KIND_ICON[item.kind];
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => select(item.id)}
                    className={cn(
                      'border-border flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors',
                      isActive
                        ? 'bg-brand-gold border-brand-gold text-brand-navy'
                        : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <Icon className="h-3 w-3 shrink-0" />
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
                onClick={() => prevItem && select(prevItem.id)}
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
                disabled={!nextItem}
                onClick={() => nextItem && select(nextItem.id)}
                className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 flex min-w-0 flex-1 items-center justify-end gap-1.5 rounded-xl px-3 py-2.5 text-right font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-25"
              >
                {nextItem && (
                  <span className="truncate text-[11px]">{nextItem.title}</span>
                )}
                <ChevronRight className="h-4 w-4 shrink-0" />
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

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!prevItem}
                  onClick={() => prevItem && select(prevItem.id)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5"
                  onClick={handleMarkComplete}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {t('markComplete')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!nextItem}
                  onClick={() => nextItem && select(nextItem.id)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {showContents && (
        <MobileContentsSheet
          modules={modules}
          activeId={activeId}
          expanded={expanded}
          viewed={viewed}
          totalCount={items.length}
          onSelect={(id) => {
            select(id);
            setShowContents(false);
          }}
          onToggleModule={toggleModule}
          onClose={() => setShowContents(false)}
          t={t}
        />
      )}
    </div>
  );
}

// ── Mobile contents sheet ─────────────────────────────────────────────────────

function MobileContentsSheet({
  modules,
  activeId,
  expanded,
  viewed,
  totalCount,
  onSelect,
  onToggleModule,
  onClose,
  t,
}: {
  modules: ReviewModule[];
  activeId: string;
  expanded: Set<string>;
  viewed: Set<string>;
  totalCount: number;
  onSelect: (id: string) => void;
  onToggleModule: (id: string) => void;
  onClose: () => void;
  t: TFn;
}) {
  const pct =
    totalCount === 0 ? 0 : Math.round((viewed.size / totalCount) * 100);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-60 sm:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Sheet panel */}
      <div className="bg-background absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-2xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
        {/* Drag handle */}
        <div className="flex shrink-0 justify-center pt-3 pb-1">
          <div className="bg-muted-foreground/25 h-1 w-10 rounded-full" />
        </div>

        {/* Sheet header */}
        <div className="border-border/60 flex shrink-0 items-center justify-between border-b px-4 pt-1 pb-3">
          <div>
            <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
              {t('courseContent')}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="border-border bg-muted/40 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold">
                <Layers className="h-3 w-3" />
                {t('modulesCount', { count: modules.length })}
              </span>
              <span className="border-border bg-muted/40 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold">
                <BookOpen className="h-3 w-3" />
                {t('lessonsCount', {
                  count: modules.reduce((s, m) => s + lessonCount(m), 0),
                })}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground hover:bg-muted/60 flex size-8 items-center justify-center rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="shrink-0 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-[11px]">
              {viewed.size} / {totalCount} completed
            </span>
            <span className="text-brand-gold text-[11px] font-bold">
              {pct}%
            </span>
          </div>
          <div className="bg-muted mt-1.5 h-1.5 overflow-hidden rounded-full">
            <div
              className="bg-brand-gold h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Module cards */}
        <div className="flex-1 overflow-y-auto px-3 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {modules.map((module) => {
            const isOpen = expanded.has(module.id);
            return (
              <ModuleCard
                key={module.id}
                module={module}
                isOpen={isOpen}
                activeId={activeId}
                viewed={viewed}
                onToggle={() => onToggleModule(module.id)}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function ReviewSidebar({
  courseTitle,
  modules,
  activeId,
  viewed,
  totalCount,
  expanded,
  collapsed,
  onToggleModule,
  onCollapse,
  onSelect,
  t,
}: {
  courseTitle: string;
  modules: ReviewModule[];
  activeId: string;
  viewed: Set<string>;
  totalCount: number;
  expanded: Set<string>;
  collapsed: boolean;
  onCollapse: () => void;
  onToggleModule: (id: string) => void;
  onSelect: (id: string) => void;
  t: TFn;
}) {
  const lessons = modules.reduce((sum, m) => sum + lessonCount(m), 0);
  const pct =
    totalCount === 0 ? 0 : Math.round((viewed.size / totalCount) * 100);

  const [manualExpanded, setManualExpanded] = useState<Set<string>>(() => {
    const active = modules.find((m) =>
      flattenItems([m]).some((i) => i.id === activeId),
    );
    return active ? new Set([active.id]) : new Set();
  });

  // all lessons open by default in mini view
  const [miniLessonExpanded, setMiniLessonExpanded] = useState<Set<string>>(
    () => new Set(modules.flatMap((m) => m.lessons.map((l) => l.id))),
  );

  const activeModuleId = useMemo(
    () =>
      modules.find((m) => flattenItems([m]).some((i) => i.id === activeId))?.id,
    [activeId, modules],
  );

  const expandedMini = useMemo(
    () =>
      activeModuleId
        ? new Set([...manualExpanded, activeModuleId])
        : manualExpanded,
    [manualExpanded, activeModuleId],
  );

  return (
    <aside
      className={cn(
        'border-border bg-background relative hidden shrink-0 overflow-hidden border-r transition-[width] duration-300 ease-in-out lg:flex',
        collapsed ? 'lg:w-24' : 'lg:w-72 xl:w-80',
      )}
    >
      {/* ── EXPANDED — full tree layout ──────────────────────────────────────── */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col transition-opacity duration-200',
          collapsed ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        {/* Brand header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-black/10 bg-white px-4 sm:h-16 dark:border-white/10 dark:bg-transparent">
          <Logo size="md" variant="default" showText />
          <button
            onClick={onCollapse}
            aria-label="Collapse sidebar"
            className="ml-3 flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white/70"
          >
            <PanelLeftClose className="size-4" />
          </button>
        </div>

        {/* Course info + progress */}
        <div className="border-border/60 shrink-0 border-b px-4 py-4">
          <p className="text-muted-foreground text-[10px] font-semibold tracking-widest uppercase">
            {t('courseContent')}
          </p>
          <h2 className="text-foreground mt-1.5 text-sm leading-snug font-bold">
            {courseTitle}
          </h2>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="border-border bg-muted/40 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold">
              <Layers className="h-3 w-3" />
              {t('modulesCount', { count: modules.length })}
            </span>
            <span className="border-border bg-muted/40 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold">
              <BookOpen className="h-3 w-3" />
              {t('lessonsCount', { count: lessons })}
            </span>
          </div>
          <div className="mt-3">
            <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-brand-gold h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-muted-foreground text-[11px]">
                {viewed.size} / {totalCount} completed
              </p>
              <span className="text-brand-gold text-[11px] font-bold">
                {pct}%
              </span>
            </div>
          </div>
        </div>

        {/* Tree — scrollable */}
        <div className="flex-1 overflow-y-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isOpen={expanded.has(module.id)}
              activeId={activeId}
              viewed={viewed}
              onToggle={() => onToggleModule(module.id)}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      {/* ── COLLAPSED — icon tree ────────────────────────────────────────────── */}
      <div
        className={cn(
          'absolute inset-0 flex w-24 flex-col transition-opacity duration-200',
          collapsed ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        {/* Header — logo → expand on hover */}
        <div className="group/mini relative flex h-14 shrink-0 items-center justify-center border-b border-black/10 bg-white sm:h-16 dark:border-white/10 dark:bg-transparent">
          <button
            onClick={onCollapse}
            aria-label="Expand sidebar"
            className="relative flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover/mini:opacity-0">
              <Logo size="sm" variant="default" />
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-slate-400 opacity-0 transition-opacity duration-200 group-hover/mini:opacity-100 dark:text-white/40">
              <PanelLeftOpen className="size-4" />
            </span>
          </button>
        </div>

        {/* Icon tree */}
        <div className="flex-1 overflow-y-auto px-2 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {modules.map((module, mIdx) => {
            const hasActive = flattenItems([module]).some(
              (i) => i.id === activeId,
            );
            const isMiniOpen = expandedMini.has(module.id);
            return (
              <div key={module.id} className="py-1">
                {mIdx > 0 && (
                  <div className="bg-border/40 mx-auto mb-2 h-px w-10" />
                )}

                {/* Module button */}
                <button
                  onClick={() =>
                    setManualExpanded((prev) => {
                      const next = new Set(prev);
                      if (next.has(module.id)) next.delete(module.id);
                      else next.add(module.id);
                      return next;
                    })
                  }
                  title={module.title}
                  className="hover:bg-muted/40 flex w-full items-center justify-center rounded-lg py-1.5 transition-colors"
                >
                  <span
                    className={cn(
                      'flex size-10 items-center justify-center rounded-full',
                      hasActive ? 'bg-brand-gold/30' : 'bg-brand-gold/15',
                    )}
                  >
                    <Layers className="text-brand-gold size-5" />
                  </span>
                </button>

                {/* Lessons — tree line from module */}
                {isMiniOpen && (
                  <div className="border-muted-foreground/20 relative ml-5 border-l pl-2.5">
                    {module.lessons.map((lesson) => {
                      const lessonItems: ReviewItem[] = [
                        ...lesson.documents,
                        ...lesson.videos,
                        ...lesson.quizzes,
                        ...lesson.assignments,
                      ];
                      const lessonHasActive = lessonItems.some(
                        (i) => i.id === activeId,
                      );
                      const isLessonOpen = miniLessonExpanded.has(lesson.id);
                      return (
                        <div key={lesson.id} className="relative py-1">
                          {/* horizontal connector */}
                          <div className="bg-muted-foreground/20 absolute top-[18px] -left-2.5 h-px w-2.5" />

                          {/* Lesson button */}
                          <button
                            onClick={() =>
                              setMiniLessonExpanded((prev) => {
                                const next = new Set(prev);
                                if (next.has(lesson.id)) next.delete(lesson.id);
                                else next.add(lesson.id);
                                return next;
                              })
                            }
                            title={lesson.title}
                            className="hover:bg-muted/40 flex w-full items-center justify-center rounded-lg py-1 transition-colors"
                          >
                            <span
                              className={cn(
                                'flex size-8 items-center justify-center rounded-full',
                                lessonHasActive
                                  ? 'bg-brand-gold/30'
                                  : 'bg-brand-gold/15',
                              )}
                            >
                              <Folder className="text-brand-gold size-4" />
                            </span>
                          </button>

                          {/* Items — tree line from lesson */}
                          {isLessonOpen && lessonItems.length > 0 && (
                            <div className="border-muted-foreground/20 relative ml-4 border-l pl-2.5">
                              {lessonItems.map((item) => {
                                const Icon = KIND_ICON[item.kind];
                                const isActive = item.id === activeId;
                                const status = viewed.has(item.id)
                                  ? 'completed'
                                  : (LEARNER_ITEM_STATUSES[item.id] ??
                                    'unread');
                                return (
                                  <div key={item.id} className="relative py-1">
                                    {/* horizontal connector */}
                                    <div className="bg-muted-foreground/20 absolute top-[16px] -left-2.5 h-px w-2.5" />
                                    <button
                                      onClick={() => onSelect(item.id)}
                                      title={item.title}
                                      className={cn(
                                        'relative flex w-full items-center justify-center rounded-lg py-1 transition-colors',
                                        isActive
                                          ? 'bg-brand-gold/15'
                                          : 'hover:bg-muted/40',
                                      )}
                                    >
                                      <Icon
                                        className={cn(
                                          'size-5',
                                          isActive
                                            ? 'text-brand-gold'
                                            : 'text-brand-gold/70',
                                        )}
                                      />
                                      <span className="absolute top-0.5 right-1.5">
                                        {(status === 'completed' ||
                                          status === 'passed') && (
                                          <Check
                                            className="size-3 text-green-500"
                                            strokeWidth={3}
                                          />
                                        )}
                                        {status === 'failed' && (
                                          <XCircle className="size-3 text-red-500" />
                                        )}
                                        {status === 'submitted' && (
                                          <Clock className="text-brand-gold size-3" />
                                        )}
                                      </span>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

// ── ModuleCard ────────────────────────────────────────────────────────────────

function ModuleCard({
  module,
  isOpen,
  activeId,
  viewed,
  onToggle,
  onSelect,
}: {
  module: ReviewModule;
  isOpen: boolean;
  activeId: string;
  viewed: Set<string>;
  onToggle: () => void;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="py-0.5">
      {/* Module row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="hover:bg-muted/40 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors"
      >
        <ChevronDown
          className={cn(
            'text-muted-foreground h-3.5 w-3.5 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
        <span className="bg-brand-gold/20 flex size-7 shrink-0 items-center justify-center rounded-full">
          <Layers className="text-brand-gold size-3.5" />
        </span>
        <span className="text-foreground min-w-0 flex-1 truncate text-sm font-bold">
          {module.title}
        </span>
      </button>

      {/* Lessons — animated tree */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-muted-foreground/20 relative ml-[18px] border-l pb-1 pl-5">
            {module.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                activeId={activeId}
                viewed={viewed}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── LessonCard ────────────────────────────────────────────────────────────────

function LessonCard({
  lesson,
  activeId,
  viewed,
  onSelect,
}: {
  lesson: ReviewLesson;
  activeId: string;
  viewed: Set<string>;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const allItems: ReviewItem[] = [
    ...lesson.documents,
    ...lesson.videos,
    ...lesson.quizzes,
    ...lesson.assignments,
  ];

  return (
    <div className="relative py-0.5">
      {/* Horizontal branch connector */}
      <div className="bg-muted-foreground/20 absolute top-[18px] -left-5 h-px w-4" />

      {/* Lesson row */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="hover:bg-muted/40 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors"
      >
        <ChevronDown
          className={cn(
            'text-muted-foreground h-3 w-3 shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
        <span className="bg-brand-gold/20 flex size-6 shrink-0 items-center justify-center rounded-full">
          <Folder className="text-brand-gold size-3" />
        </span>
        <span className="text-foreground min-w-0 flex-1 truncate text-xs font-semibold">
          {lesson.title}
        </span>
      </button>

      {/* Items — animated tree */}
      {allItems.length > 0 && (
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-200 ease-in-out',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <div className="border-muted-foreground/20 relative ml-[14px] border-l pb-1 pl-4">
              {allItems.map((item) => (
                <TreeItemRow
                  key={item.id}
                  item={item}
                  isActive={item.id === activeId}
                  viewed={viewed}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── TreeItemRow — icon + status badge overlay ─────────────────────────────────

function TreeItemRow({
  item,
  isActive,
  viewed,
  onSelect,
}: {
  item: ReviewItem;
  isActive: boolean;
  viewed: Set<string>;
  onSelect: (id: string) => void;
}) {
  const Icon = KIND_ICON[item.kind];
  const learnerStatus = viewed.has(item.id)
    ? 'completed'
    : (LEARNER_ITEM_STATUSES[item.id] ?? 'unread');

  return (
    <div className="relative py-0.5">
      {/* Horizontal branch connector */}
      <div className="bg-muted-foreground/20 absolute top-[14px] -left-4 h-px w-3" />

      <button
        onClick={() => onSelect(item.id)}
        className={cn(
          'flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors',
          isActive ? 'bg-brand-gold/10' : 'hover:bg-muted/40',
        )}
      >
        {/* Icon with status badge overlay */}
        <div className="relative shrink-0">
          <Icon
            className={cn(
              'size-4',
              isActive ? 'text-brand-gold' : 'text-brand-gold/70',
            )}
          />
          <span className="absolute -top-1.5 -right-1.5">
            {(learnerStatus === 'completed' || learnerStatus === 'passed') && (
              <Check className="size-2.5 text-green-500" strokeWidth={3} />
            )}
            {learnerStatus === 'failed' && (
              <XCircle className="size-2.5 text-red-500" />
            )}
            {learnerStatus === 'submitted' && (
              <Clock className="text-brand-gold size-2.5" />
            )}
          </span>
        </div>

        <span
          className={cn(
            'min-w-0 flex-1 truncate text-xs font-medium',
            isActive
              ? 'text-foreground font-semibold'
              : 'text-muted-foreground',
          )}
        >
          {item.title}
        </span>
      </button>
    </div>
  );
}

// ── Content panels ────────────────────────────────────────────────────────────

function ContentPanel({
  item,
  isReplay,
  continueFromSaved,
  startingFromBeginning,
}: {
  item: ReviewItem;
  isReplay: boolean;
  continueFromSaved: string;
  startingFromBeginning: string;
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
      return <QuizPanel item={item} />;
    case 'assignment':
      return <AssignmentPanel item={item} />;
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

function QuizPanel({ item }: { item: QuizItem }) {
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
      setFinished(true);
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
    const passed = pctScore >= 60;
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
              A score of 60% or above is required to pass. Review the lesson and
              try again.
            </p>
          )}
          <button
            type="button"
            onClick={restart}
            className="border-border text-foreground/70 hover:bg-muted/60 hover:text-foreground mt-2 rounded-xl border px-6 py-2.5 text-sm font-medium transition-colors"
          >
            Retry Quiz
          </button>
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

function AssignmentPanel({ item }: { item: AssignmentItem }) {
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
        setTimeout(() => setUploadState('done'), 400);
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
