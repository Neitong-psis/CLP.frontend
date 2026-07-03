'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Play,
  ClipboardList,
  ClipboardCheck,
  Folder,
  Layers,
  BookOpen,
  MoreVertical,
  X,
  Check,
  CheckCircle2,
  Clock,
  Lightbulb,
  PanelLeftClose,
  PanelLeftOpen,
  FileUp,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NotificationBell } from '@/components/common/NotificationBell';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { PillTabs } from '@/components/common/list/PillTabs';
import Logo from '@/components/common/Logo';
import { useAdminReviewOverlayT } from '@/i18n';
import type { AdminCourseRow } from '@/constants/admin';
import {
  REVIEW_MODULES,
  flattenItems,
  lessonCount,
  type ReviewItem,
  type ReviewItemKind,
  type ReviewLesson,
  type ReviewModule,
  type DocumentItem,
  type VideoItem,
  type QuizItem,
  type QuizQuestion,
  type AssignmentItem,
} from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import { ApproveDialog, RejectDialog } from './ReviewDialogs';

type TFn = ReturnType<typeof useAdminReviewOverlayT>;
type DialogKind = 'approve' | 'reject' | null;

const KIND_ICON: Record<ReviewItemKind, typeof Play> = {
  document: FileText,
  video: Play,
  quiz: ClipboardList,
  assignment: ClipboardCheck,
};

interface CourseReviewOverlayProps {
  course: AdminCourseRow;
  onApprove: (course: AdminCourseRow) => void;
  onReject: (course: AdminCourseRow, feedback: string) => void;
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
  const firstVideo = items.find((i) => i.kind === 'video') ?? items[0];

  const [activeId, setActiveId] = useState(firstVideo?.id ?? '');
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.id)),
  );
  const [viewed, setViewed] = useState<Set<string>>(
    () => new Set([firstVideo?.id]),
  );
  const [dialog, setDialog] = useState<DialogKind>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileModuleId, setMobileModuleId] = useState<string>(
    () =>
      modules.find((m) =>
        flattenItems([m]).some((item) => item.id === (firstVideo?.id ?? '')),
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (dialog) setDialog(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [dialog, onClose]);

  return (
    <div
      className="bg-background fixed inset-0 z-50 flex overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={`Review ${course.title}`}
    >
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Sidebar */}
        <ReviewSidebar
          courseTitle={course.title}
          modules={modules}
          activeId={activeId}
          reviewedCount={viewed.size}
          totalCount={items.length}
          expanded={expanded}
          collapsed={sidebarCollapsed}
          onCollapse={() => setSidebarCollapsed((v) => !v)}
          onToggleModule={toggleModule}
          onSelect={select}
          t={t}
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
                          setDialog('approve');
                        }}
                        className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                      >
                        <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                        {t('approve')}
                      </button>
                      <div className="border-border/60 border-t" />
                      <button
                        type="button"
                        onClick={() => {
                          setShowMobileActions(false);
                          setDialog('reject');
                        }}
                        className="text-foreground hover:bg-muted/60 flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors"
                      >
                        <X className="h-4 w-4 shrink-0 text-rose-500" />
                        {t('reject')}
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
            {active && <PreviewPanel item={active} />}
          </main>

          {/* Footer */}
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

            {/* Desktop: back | reject | approve */}
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
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-rose-300 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-800 dark:hover:bg-rose-950"
                  onClick={() => setDialog('reject')}
                >
                  <X className="h-4 w-4" />
                  {t('reject')}
                </Button>
                <Button
                  size="sm"
                  className="gap-1.5 bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500"
                  onClick={() => setDialog('approve')}
                >
                  <Check className="h-4 w-4" />
                  {t('approve')}
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {dialog === 'approve' && (
        <ApproveDialog
          courseTitle={course.title}
          onConfirm={() => onApprove(course)}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog === 'reject' && (
        <RejectDialog
          courseTitle={course.title}
          onConfirm={(feedback) => onReject(course, feedback)}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}

// ── ModuleCard ────────────────────────────────────────────────────────────────

function ModuleCard({
  module,
  isOpen,
  activeId,
  onToggle,
  onSelect,
}: {
  module: ReviewModule;
  isOpen: boolean;
  activeId: string;
  onToggle: () => void;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="mb-0.5">
      {/* Module header */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="hover:bg-muted/40 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left transition-colors"
      >
        <span className="bg-brand-gold/20 flex size-7 shrink-0 items-center justify-center rounded-full">
          <Layers className="text-brand-gold size-3.5" />
        </span>
        <span className="text-foreground min-w-0 flex-1 truncate text-sm font-bold">
          {module.title}
        </span>
        <ChevronDown
          className={cn(
            'text-muted-foreground h-3.5 w-3.5 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {/* Lessons — flat, indented */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-1 pl-2">
            {module.lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                activeId={activeId}
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
  onSelect,
}: {
  lesson: ReviewLesson;
  activeId: string;
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
    <div className="py-0.5">
      {/* Lesson header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="hover:bg-muted/40 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors"
      >
        <span className="bg-brand-gold/15 flex size-6 shrink-0 items-center justify-center rounded-full">
          <Folder className="text-brand-gold size-3" />
        </span>
        <span className="text-foreground min-w-0 flex-1 truncate text-xs font-semibold">
          {lesson.title}
        </span>
        <ChevronDown
          className={cn(
            'text-muted-foreground h-3 w-3 shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Items — flat list */}
      {allItems.length > 0 && (
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-200 ease-in-out',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <div className="pb-1 pl-2">
              {allItems.map((item) => (
                <TreeItemRow
                  key={item.id}
                  item={item}
                  isActive={item.id === activeId}
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

// ── TreeItemRow — icon + status overlay ───────────────────────────────────────

function TreeItemRow({
  item,
  isActive,
  onSelect,
}: {
  item: ReviewItem;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const Icon = KIND_ICON[item.kind];
  const status =
    item.kind === 'quiz' || item.kind === 'assignment' ? item.status : null;

  return (
    <button
      onClick={() => onSelect(item.id)}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors',
        isActive ? 'bg-brand-gold/10' : 'hover:bg-muted/40',
      )}
    >
      <div className="relative shrink-0">
        <Icon
          className={cn(
            'size-4',
            isActive ? 'text-brand-gold' : 'text-brand-gold/70',
          )}
        />
        {status && (
          <span className="absolute -top-1.5 -right-1.5">
            {status === 'Ready' && (
              <Check className="size-2.5 text-green-500" strokeWidth={3} />
            )}
            {status === 'Draft' && (
              <Clock className="size-2.5 text-amber-500" />
            )}
          </span>
        )}
      </div>

      <span
        className={cn(
          'min-w-0 flex-1 truncate text-xs font-medium',
          isActive ? 'text-foreground font-semibold' : 'text-muted-foreground',
        )}
      >
        {item.title}
      </span>
    </button>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function ReviewSidebar({
  courseTitle,
  modules,
  activeId,
  reviewedCount,
  totalCount,
  expanded,
  collapsed,
  onCollapse,
  onToggleModule,
  onSelect,
  t,
}: {
  courseTitle: string;
  modules: ReviewModule[];
  activeId: string;
  reviewedCount: number;
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
    totalCount === 0 ? 0 : Math.round((reviewedCount / totalCount) * 100);

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
        collapsed ? 'lg:w-18' : 'lg:w-72 xl:w-80',
      )}
    >
      {/* Expanded layout */}
      <div
        className={cn(
          'absolute inset-0 flex flex-col transition-opacity duration-200',
          collapsed ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-black/10 bg-white px-4 sm:h-16 dark:border-white/10 dark:bg-transparent">
          <Link
            href="/admin/courses"
            aria-label={t('backToCourses')}
            className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
          >
            <Logo size="md" variant="default" showText />
          </Link>
          <button
            onClick={onCollapse}
            aria-label="Collapse sidebar"
            className="ml-3 flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white/70"
          >
            <PanelLeftClose className="size-4" />
          </button>
        </div>

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
              {t('modules', { count: modules.length })}
            </span>
            <span className="border-border bg-muted/40 text-foreground/70 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold">
              <BookOpen className="h-3 w-3" />
              {t('lessons', { count: lessons })}
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
                {t('itemsReviewed', {
                  reviewed: reviewedCount,
                  total: totalCount,
                })}
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
              onToggle={() => onToggleModule(module.id)}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      {/* ── COLLAPSED — icon tree ────────────────────────────────────────────── */}
      <div
        className={cn(
          'absolute inset-0 flex w-18 flex-col transition-opacity duration-200',
          collapsed ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
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

        {/* Icon tree — staggered per level, leaf ticks reach the *edge* of each icon's ring
            (not its center — the tick's length equals that row's own left padding, so it
            stops exactly where the circle begins). Offsets are fixed pixel values chosen so
            the deepest (item) icon still lands inside the 60px content area:
              module center = 4(pl) + 14(half of size-7)      = 18px absolute
              lesson center = 18 + 4(pl) + 12(half of size-6) = 34px absolute
              item circle   = 34 + 4(pl) .. 34 + 4 + 20(size-5) = 38..58px absolute (fits, 60 max)
            Every level shares the same "circle node" treatment (sized down per level) for a
            consistent, cohesive look instead of mixing bare icons with circled ones. */}
        <div className="flex-1 overflow-y-auto px-1.5 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {modules.map((module, mIdx) => {
            const hasActive = flattenItems([module]).some(
              (i) => i.id === activeId,
            );
            const isMiniOpen = expandedMini.has(module.id);
            return (
              <div key={module.id} className="relative py-1">
                {mIdx > 0 && (
                  <div className="bg-muted-foreground/25 mx-auto mb-2 h-px w-8" />
                )}

                {/* Rail — from the module icon's center down through its open lessons/items */}
                {isMiniOpen && (
                  <div className="bg-muted-foreground/30 absolute top-6 bottom-0 left-[18px] w-px" />
                )}

                {/* Module button — icon fixed at x=18px (pl-1 + half of size-7) */}
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
                  className="hover:bg-muted/40 relative z-10 flex w-full items-center rounded-lg py-1.5 pl-1 transition-colors"
                >
                  <span
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-full',
                      hasActive ? 'bg-brand-gold/30' : 'bg-brand-gold/15',
                    )}
                  >
                    <Layers className="text-brand-gold size-3.5" />
                  </span>
                </button>

                {isMiniOpen && (
                  <div className="relative ml-[18px]">
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
                        <div key={lesson.id} className="py-1">
                          {/* Row wrapper — holds ONLY the leaf + button, so top-1/2 below
                              measures just this row's height, not the items rendered after it. */}
                          <div className="relative">
                            {/* Leaf — reaches from the module trunk to the edge of this lesson icon's ring */}
                            <div className="bg-muted-foreground/30 absolute top-1/2 left-0 h-px w-1 -translate-y-1/2" />

                            {/* Lesson button — icon fixed at x=16px relative to this wrapper */}
                            <button
                              onClick={() =>
                                setMiniLessonExpanded((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(lesson.id))
                                    next.delete(lesson.id);
                                  else next.add(lesson.id);
                                  return next;
                                })
                              }
                              title={lesson.title}
                              className="hover:bg-muted/40 relative z-10 flex w-full items-center rounded-lg py-1 pl-1 transition-colors"
                            >
                              <span
                                className={cn(
                                  'flex size-6 shrink-0 items-center justify-center rounded-full',
                                  lessonHasActive
                                    ? 'bg-brand-gold/30'
                                    : 'bg-brand-gold/15',
                                )}
                              >
                                <Folder className="text-brand-gold size-3.5" />
                              </span>
                            </button>
                          </div>

                          {/* Items — indented so the trunk aligns under the lesson icon's center */}
                          {isLessonOpen && lessonItems.length > 0 && (
                            <div className="relative ml-4">
                              {/* Trunk — was missing, so item leaves pointed at nothing to branch from */}
                              <div className="bg-muted-foreground/30 absolute inset-y-0 left-0 w-px" />
                              {lessonItems.map((item) => {
                                const Icon = KIND_ICON[item.kind];
                                const isActive = item.id === activeId;
                                const status =
                                  item.kind === 'quiz' ||
                                  item.kind === 'assignment'
                                    ? item.status
                                    : null;
                                return (
                                  <div
                                    key={item.id}
                                    className="relative py-1.5"
                                  >
                                    {/* Leaf — reaches from the lesson trunk to the edge of this item icon's ring */}
                                    <div className="bg-muted-foreground/30 absolute top-1/2 left-0 h-px w-1 -translate-y-1/2" />
                                    <button
                                      onClick={() => onSelect(item.id)}
                                      title={item.title}
                                      className="hover:bg-muted/40 relative z-10 flex w-full items-center rounded-lg py-0.5 pl-1 transition-colors"
                                    >
                                      <span
                                        className={cn(
                                          'relative flex size-5 shrink-0 items-center justify-center rounded-full',
                                          isActive
                                            ? 'bg-brand-gold/25'
                                            : 'bg-brand-gold/10',
                                        )}
                                      >
                                        <Icon
                                          className={cn(
                                            'size-3',
                                            isActive
                                              ? 'text-brand-gold'
                                              : 'text-brand-gold/70',
                                          )}
                                        />
                                        {status && (
                                          <span className="absolute -top-0.5 -right-0.5">
                                            {status === 'Ready' && (
                                              <Check
                                                className="size-2.5 text-green-500"
                                                strokeWidth={3}
                                              />
                                            )}
                                            {status === 'Draft' && (
                                              <Clock className="size-2.5 text-amber-500" />
                                            )}
                                          </span>
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
                  Admin preview — learners watch the full video
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
      <div className="border-border/60 border-b px-6 pt-6 pb-4">
        <p className="text-muted-foreground text-sm">
          Quiz for {item.forLesson}
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

      <div className="bg-muted/40 h-1.5 w-full">
        <div
          className="bg-brand-gold h-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

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
          · Admin preview only
        </p>
      )}
    </div>
  );
}

function AssignmentPanel({ item }: { item: AssignmentItem }) {
  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <div className="border-border/60 border-b px-6 pt-6 pb-5">
        <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
          Assignment
        </span>
        <h2 className="text-foreground mt-3 text-2xl font-bold">
          {item.title}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Assigned after {item.forLesson}
        </p>
      </div>

      <div className="space-y-5 px-6 py-5">
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

        <div className="border-border rounded-xl border p-4">
          <h3 className="text-foreground text-sm font-semibold">
            Instructions
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {item.instructions}
          </p>
        </div>

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

        <div className="border-border rounded-xl border-2 border-dashed p-8 text-center">
          <FileUp className="text-muted-foreground/40 mx-auto mb-3 h-8 w-8" />
          <p className="text-foreground text-sm font-semibold">
            Learner submission area
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            PDF, document, or shareable link accepted
          </p>
          <button
            type="button"
            disabled
            className="bg-brand-gold/40 text-brand-navy mt-4 cursor-not-allowed rounded-xl px-6 py-2.5 text-sm font-semibold"
          >
            Submit Assignment
          </button>
          <p className="text-muted-foreground mt-2 text-[11px]">
            Admin preview only
          </p>
        </div>
      </div>
    </div>
  );
}
