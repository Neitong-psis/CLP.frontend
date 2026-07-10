'use client';

import { useCallback, useMemo, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils/cn';
import { MiniRail } from './MiniRail';
import { ModuleAccordion } from './ModuleAccordion';
import { SidebarHeader } from './SidebarHeader';
import { DrawerClose, SidebarCollapse } from './SidebarCollapse';
import {
  DEFAULT_LABELS,
  DEFAULT_STORAGE_KEY,
  DURATION,
  EASE,
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_WIDTH_MINI,
} from './constants';
import { useExpandedModule } from './hooks/useExpandedModule';
import { useSidebar } from './hooks/useSidebar';
import {
  buildModuleIndex,
  courseProgress,
  findItemLocation,
} from './selectors';
import type {
  ContentItem,
  CourseModule,
  CourseSidebarLabels,
  CourseSidebarProps,
  Lesson,
  ProgressSummary,
} from './types';

/** Distance the drawer must be flung or dragged before it dismisses. */
const SWIPE_CLOSE_OFFSET = 80;
const SWIPE_CLOSE_VELOCITY = 400;

export function CourseSidebar({
  course,
  currentItemId,
  onSelectItem,
  onLockedItem,
  defaultMode = 'expanded',
  brand,
  titleAction,
  labels: labelOverrides,
  storageKey = DEFAULT_STORAGE_KEY,
  className,
}: CourseSidebarProps) {
  const labels = useMemo(
    () => ({ ...DEFAULT_LABELS, ...labelOverrides }),
    [labelOverrides],
  );

  const shell = useSidebar(storageKey, defaultMode);

  const currentLocation = useMemo(
    () => findItemLocation(course, currentItemId),
    [course, currentItemId],
  );
  const currentModuleId = currentLocation?.module.id ?? null;

  const accordion = useExpandedModule(course, currentModuleId, storageKey);

  const overall = useMemo(() => courseProgress(course), [course]);
  const moduleMeta = useMemo(
    () => buildModuleIndex(course, currentItemId),
    [course, currentItemId],
  );

  // Selecting an item from a drawer must also dismiss the drawer, otherwise
  // the learner lands on content they cannot see. Expanding here (an event
  // handler) rather than leaning on the render-time follow in
  // `useExpandedModule` is what persists the choice to storage.
  const { closeDrawer, isDesktop } = shell;
  const { expand } = accordion;
  const handleSelectItem = useCallback(
    (item: ContentItem, lesson: Lesson, module: CourseModule) => {
      expand(module.id);
      onSelectItem(item, lesson, module);
      if (!isDesktop) closeDrawer();
    },
    [expand, onSelectItem, isDesktop, closeDrawer],
  );

  const handleLockedItem = useCallback(
    (item: ContentItem, lesson: Lesson, module: CourseModule) =>
      onLockedItem?.(item, lesson, module),
    [onLockedItem],
  );

  const { toggleMode } = shell;
  const handleOpenModuleFromRail = useCallback(
    (moduleId: string) => {
      expand(moduleId);
      toggleMode();
    },
    [expand, toggleMode],
  );

  const body = shell.isMini ? (
    <MiniRail
      modules={course.modules}
      moduleMeta={moduleMeta}
      currentItemId={currentItemId}
      labels={labels}
      onSelectItem={handleSelectItem}
      onOpenModule={handleOpenModuleFromRail}
    />
  ) : (
    <ModuleAccordion
      modules={course.modules}
      moduleMeta={moduleMeta}
      currentItemId={currentItemId}
      expandedId={accordion.expandedId}
      onToggleModule={accordion.toggle}
      onExpandModule={accordion.expand}
      labels={labels}
      onSelectItem={handleSelectItem}
      onLockedItem={handleLockedItem}
    />
  );

  const action = shell.isDesktop ? (
    <SidebarCollapse
      isMini={shell.isMini}
      onToggle={shell.toggleMode}
      collapseLabel={labels.collapse}
      expandLabel={labels.expand}
    />
  ) : (
    <DrawerClose onClose={shell.closeDrawer} label={labels.closeDrawer} />
  );

  const panel = (
    <SidebarPanel
      isMini={shell.isMini}
      brand={brand}
      action={action}
      titleAction={titleAction}
      courseTitle={course.title}
      overall={overall}
      labels={labels}
    >
      {body}
    </SidebarPanel>
  );

  if (shell.isDesktop) {
    return (
      <DesktopSidebar
        isMini={shell.isMini}
        labels={labels}
        className={className}
      >
        {panel}
      </DesktopSidebar>
    );
  }

  return (
    <MobileDrawer
      isOpen={shell.isDrawerOpen}
      onOpen={shell.openDrawer}
      onClose={shell.closeDrawer}
      labels={labels}
      className={className}
    >
      {panel}
    </MobileDrawer>
  );
}

// ── Shell: desktop column ─────────────────────────────────────────────────────

function DesktopSidebar({
  isMini,
  labels,
  className,
  children,
}: {
  readonly isMini: boolean;
  readonly labels: CourseSidebarLabels;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const width = isMini ? SIDEBAR_WIDTH_MINI : SIDEBAR_WIDTH_EXPANDED;

  return (
    <motion.nav
      aria-label={labels.courseContent}
      initial={false}
      animate={{ width }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: DURATION.collapse, ease: EASE }
      }
      style={{ width }}
      className={cn(
        'border-border/60 bg-card flex h-full shrink-0 flex-col border-r',
        className,
      )}
    >
      {children}
    </motion.nav>
  );
}

// ── Shell: tablet / mobile drawer ─────────────────────────────────────────────

function MobileDrawer({
  isOpen,
  onOpen,
  onClose,
  labels,
  className,
  children,
}: {
  readonly isOpen: boolean;
  readonly onOpen: () => void;
  readonly onClose: () => void;
  readonly labels: CourseSidebarLabels;
  readonly className?: string;
  readonly children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        aria-label={labels.openDrawer}
        aria-expanded={isOpen}
        className={cn(
          'border-border bg-card text-foreground rounded-md border px-3 py-1.5',
          'text-[13px] font-medium transition-colors duration-150',
          'hover:bg-muted focus-visible:ring-course-accent outline-none focus-visible:ring-2',
          className,
        )}
      >
        {labels.courseContent}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="scrim"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : DURATION.collapse }}
              className="fixed inset-0 z-40 bg-black/40"
            />
            <motion.nav
              key="drawer"
              aria-label={labels.courseContent}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: DURATION.collapse, ease: EASE }
              }
              // Swipe to close: drag left past the threshold, or flick.
              drag="x"
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 1, right: 0 }}
              onDragEnd={(_, info) => {
                const draggedFar = info.offset.x < -SWIPE_CLOSE_OFFSET;
                const flicked = info.velocity.x < -SWIPE_CLOSE_VELOCITY;
                if (draggedFar || flicked) onClose();
              }}
              className={cn(
                'bg-card border-border/60 fixed inset-y-0 left-0 z-50 flex flex-col border-r',
                'w-[min(320px,85vw)]',
              )}
            >
              {children}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Panel: the shared top row / header / body stack ───────────────────────────

function SidebarPanel({
  isMini,
  brand,
  action,
  titleAction,
  courseTitle,
  overall,
  labels,
  children,
}: {
  readonly isMini: boolean;
  readonly brand: ReactNode;
  readonly action: ReactNode;
  readonly titleAction: ReactNode;
  readonly courseTitle: string;
  readonly overall: ProgressSummary;
  readonly labels: CourseSidebarLabels;
  readonly children: ReactNode;
}) {
  if (isMini) {
    return (
      <>
        <div className="border-border/60 flex justify-center border-b py-3">
          {action}
        </div>
        <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Brand + collapse toggle share one row — the toggle stays anchored
          beside the logo rather than floating in the title row below it. */}
      <div className="border-border/60 flex h-14 shrink-0 items-center justify-between border-b px-3 sm:h-16">
        {brand}
        <div className="ml-auto">{action}</div>
      </div>
      <SidebarHeader
        courseTitle={courseTitle}
        progress={overall}
        labels={labels}
        titleAction={titleAction}
      />
      {/* The only scroll container in the expanded sidebar; the header stays pinned. */}
      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </>
  );
}
