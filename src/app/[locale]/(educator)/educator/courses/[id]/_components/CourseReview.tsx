'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEducatorReviewT } from '@/i18n';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Play,
  Lock,
  MoreVertical,
  PencilLine,
  Send,
  RotateCcw,
  FileUp,
  CheckCircle2,
  Clock,
  Lightbulb,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
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
  type DocumentItem,
  type VideoItem,
  type QuizItem,
  type QuizQuestion,
  type AssignmentItem,
} from '../_lib/content';
import { CourseContentSidebar } from '@/components/course-content/CourseContentSidebar';
import { CourseContentSheet } from '@/components/course-content/CourseContentSheet';
import {
  KIND_ICON,
  type SidebarLabels,
} from '@/components/course-content/types';
import { computeLocks, type ItemDone } from '@/lib/course-progress';

export function CourseReview({ task }: { task: CourseTask }) {
  const router = useRouter();
  const t = useEducatorReviewT();
  const { toast } = useToast();
  const currentUser = useCurrentUser();
  const modules = REVIEW_MODULES;
  const items = useMemo(() => flattenItems(modules), [modules]);

  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.id)),
  );
  const [viewed, setViewed] = useState<Set<string>>(
    () => new Set([items[0]?.id]),
  );
  const [showResubmit, setShowResubmit] = useState(false);
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
  const locks = useMemo(
    () => computeLocks(modules, isItemDone, true),
    [modules, isItemDone],
  );

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
    toast(t('resubmittedToast', { title: task.title }), 'success');
    router.push('/educator/courses');
  }

  function handleRestore() {
    toast(t('restoredToast', { title: task.title }), 'success');
    router.push('/educator/courses');
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

  const totalLessons = modules.reduce((s, m) => s + lessonCount(m), 0);
  const labels: SidebarLabels = {
    courseContent: t('courseContent'),
    moduleCount: t('modules', { count: modules.length }),
    lessonCount: t('lessons', { count: totalLessons }),
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
          lockingEnabled
          onSelect={select}
          onLockedSelect={() => toast(t('lockedToast'), 'info')}
          collapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed((v) => !v)}
          backHref="/educator/courses"
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
                      className="fixed inset-0 z-[55]"
                      onClick={() => setShowMobileActions(false)}
                      aria-hidden
                    />
                    <div className="bg-card ring-border absolute top-full right-0 z-[56] mt-1 min-w-48 overflow-hidden rounded-xl shadow-xl ring-1 dark:ring-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setShowMobileActions(false);
                          toast(t('openingEditor'), 'info');
                          router.push('/educator/courses/new');
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
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-500">
                {EDUCATOR_USER.role}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={handleExportPdf}
              >
                <Download className="h-4 w-4" />
                {t('exportPdf')}
              </Button>
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
                  onClick={() => {
                    toast(t('openingEditor'), 'info');
                    router.push('/educator/courses/new');
                  }}
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
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={() => setShowResubmit(true)}
                  >
                    <Send className="h-4 w-4" />
                    {t('resubmitBtn')}
                  </Button>
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

      {showContents && (
        <CourseContentSheet
          modules={modules}
          activeId={activeId}
          expanded={expanded}
          onToggleModule={toggleModule}
          isItemDone={isItemDone}
          lockingEnabled
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
      return <VideoPanel item={item} />;
    case 'document':
      return <DocumentPanel item={item} />;
    case 'quiz':
      return <QuizPanel item={item} />;
    case 'assignment':
      return <AssignmentPanel item={item} />;
  }
}

function VideoPanel({ item }: { item: VideoItem }) {
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
                  Educator preview — learners watch the full video
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
                <span className="text-muted-foreground text-sm leading-snug">
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
    <div className="space-y-4">
      {/* Header */}
      <div className="border-border bg-card rounded-2xl border p-5">
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
      <div className="border-border bg-card rounded-2xl border p-5">
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
        <div key={i} className="border-border bg-card rounded-2xl border p-5">
          <h3 className="text-foreground text-base font-bold">
            {section.heading}
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {section.text}
          </p>
          {section.tip && (
            <div className="border-brand-gold/20 bg-brand-gold/[0.06] mt-4 flex items-start gap-2.5 rounded-xl border px-4 py-3">
              <Lightbulb className="text-brand-gold mt-0.5 h-4 w-4 shrink-0" />
              <p className="text-brand-gold/90 text-sm">{section.tip}</p>
            </div>
          )}
        </div>
      ))}

      {/* Takeaways */}
      <div className="border-border bg-card rounded-2xl border p-5">
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
    </div>
  );
}

// ── Interactive quiz preview ──────────────────────────────────────────────────

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
        'flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-150',
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
  const t = useEducatorReviewT();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const question: QuizQuestion = item.questions[currentQ];
  const pct = Math.round(((currentQ + 1) / item.totalQuestions) * 100);
  const isLast = currentQ === item.questions.length - 1;

  function goNext() {
    if (!isLast) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  function goBack() {
    if (currentQ > 0) {
      setCurrentQ((q) => q - 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      {/* Header */}
      <div className="border-border/60 border-b px-6 pt-6 pb-4">
        <p className="text-muted-foreground text-sm">
          {t('quizFor')} {item.forLesson}
        </p>
        <h2 className="text-foreground mt-1 text-2xl font-bold">
          {item.title}
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-3 py-1 text-xs font-medium">
            Question {currentQ + 1} of {item.totalQuestions}
          </span>
          <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-3 py-1 text-xs font-medium">
            {item.estimatedMinutes} Minutes
          </span>
          <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-3 py-1 text-xs font-medium">
            Single Choice
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-muted/40 h-1.5 w-full">
        <div
          className="bg-brand-gold h-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Question */}
      <div className="px-6 pt-6 pb-4">
        <h3 className="text-foreground text-xl font-bold">
          {question.question}
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">Choose one answer.</p>

        <div className="mt-5 space-y-3">
          {question.options.map((opt, i) => (
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

      {/* Nav footer */}
      <div className="border-border/60 flex items-center justify-between border-t px-6 py-4">
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
          disabled={isLast}
          className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLast ? 'End of Preview' : 'Next'}
        </button>
      </div>

      {isLast && (
        <p className="text-muted-foreground border-border/40 border-t px-6 py-3 text-center text-[11px]">
          Previewing {item.questions.length} of {item.totalQuestions} questions
          · Educator preview only
        </p>
      )}
    </div>
  );
}

function AssignmentPanel({ item }: { item: AssignmentItem }) {
  const t = useEducatorReviewT();
  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      {/* Header */}
      <div className="border-border/60 border-b px-6 pt-6 pb-5">
        <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
          {t('assignment')}
        </span>
        <h2 className="text-foreground mt-3 text-2xl font-bold">
          {item.title}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Assigned after {item.forLesson}
        </p>
      </div>

      <div className="space-y-5 px-6 py-5">
        {/* Meta row */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Lesson', value: item.forLesson },
            { label: 'Due date', value: `Due ${item.dueDate}` },
            { label: 'Submission', value: item.submission },
          ].map(({ label, value }) => (
            <div key={label} className="border-border rounded-xl border p-4">
              <p className="text-muted-foreground text-xs">{label}</p>
              <p className="text-foreground mt-1 text-sm font-semibold">
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

        {/* Upload zone */}
        <div className="border-border rounded-xl border-2 border-dashed p-8 text-center">
          <FileUp className="text-muted-foreground/40 mx-auto mb-3 h-8 w-8" />
          <p className="text-foreground text-sm font-semibold">
            Upload your assignment
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            PDF, document, or shareable link accepted
          </p>
          <button
            type="button"
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 mt-4 rounded-xl px-6 py-2.5 text-sm font-semibold transition-colors"
          >
            Submit Assignment
          </button>
        </div>
      </div>
    </div>
  );
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
