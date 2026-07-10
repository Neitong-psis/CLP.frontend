'use client';

import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type DropAnimation,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { BookOpen, GripVertical, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateCourseT } from '@/i18n';
import type { CourseModule } from '../_lib/types';
import { insertByAnchor, reorderByAnchor } from '../_lib/builder';
import { ModuleItem } from './ModuleItem';
import { LessonHeaderPreview } from './LessonItem';

type DragItem =
  | { type: 'module'; title: string; lessonCount: number }
  | { type: 'lesson'; title: string };

/** Where the dragged item would land if dropped right now.
 *  `id` is the neighboring module/lesson id; `inside` targets a module
 *  directly (e.g. a collapsed or empty one) rather than a specific lesson. */
export type DropIndicator = {
  id: string;
  position: 'before' | 'after' | 'inside';
};

const dropAnimation: DropAnimation = {
  duration: 200,
  easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: '0.4' } },
  }),
};

export function CourseContentStep({
  modules,
  onAddModule,
  onUpdateModule,
  onDeleteModule,
  onMoveModule,
  onModulesChange,
}: {
  modules: CourseModule[];
  onAddModule: () => void;
  onUpdateModule: (index: number, updated: CourseModule) => void;
  onDeleteModule: (index: number) => void;
  onMoveModule: (index: number, dir: 'up' | 'down') => void;
  onModulesChange: (updater: (prev: CourseModule[]) => CourseModule[]) => void;
}) {
  const t = useCreateCourseT();
  const [activeItem, setActiveItem] = useState<DragItem | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(
    null,
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current;
    if (data?.type === 'module') {
      setActiveItem({
        type: 'module',
        title: data.title,
        lessonCount: data.module.lessons.length,
      });
    } else if (data?.type === 'lesson') {
      setActiveItem({ type: 'lesson', title: data.title });
    }
  }

  // Only tracks where the item WOULD land — cheap, so it stays smooth even
  // while the pointer moves continuously. The actual reorder happens once,
  // on drop, in handleDragEnd.
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return setDropIndicator(null);

    const activeId = String(active.id);
    const overId = String(over.id);
    if (activeId === overId) return setDropIndicator(null);

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'module' && overData?.type === 'module') {
      setDropIndicator({ id: overId, position: resolveSide(event) });
      return;
    }

    if (activeData?.type === 'lesson') {
      if (overData?.type === 'lesson') {
        setDropIndicator({ id: overId, position: resolveSide(event) });
        return;
      }
      if (overData?.type === 'module') {
        setDropIndicator({ id: overId, position: 'inside' });
        return;
      }
    }

    setDropIndicator(null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active } = event;
    const indicator = dropIndicator;
    setActiveItem(null);
    setDropIndicator(null);
    if (!indicator) return;

    const activeData = active.data.current;
    const activeId = String(active.id);

    if (activeData?.type === 'module') {
      // Modules only ever reorder relative to another module — 'inside' is
      // exclusively for dropping a lesson onto a module container.
      const { position } = indicator;
      if (position === 'inside') return;
      const anchorId = indicator.id;
      onModulesChange((prev) =>
        reorderByAnchor(prev, activeId, anchorId, position),
      );
      return;
    }

    if (activeData?.type === 'lesson') {
      onModulesChange((prev) => {
        const fromIdx = prev.findIndex((m) =>
          m.lessons.some((l) => l.id === activeId),
        );
        if (fromIdx === -1) return prev;
        const lesson = prev[fromIdx].lessons.find((l) => l.id === activeId);
        if (!lesson) return prev;

        const toIdx =
          indicator.position === 'inside'
            ? prev.findIndex((m) => m.id === indicator.id)
            : prev.findIndex((m) =>
                m.lessons.some((l) => l.id === indicator.id),
              );
        if (toIdx === -1) return prev;

        // Remove first, then insert relative to the (now-filtered) target
        // list — works uniformly whether the move is within the same module
        // or across two different ones.
        const next = [...prev];
        next[fromIdx] = {
          ...prev[fromIdx],
          lessons: prev[fromIdx].lessons.filter((l) => l.id !== activeId),
        };
        const baseLessons = next[toIdx].lessons;
        next[toIdx] = {
          ...next[toIdx],
          lessons:
            indicator.position === 'inside'
              ? [...baseLessons, lesson]
              : insertByAnchor(
                  baseLessons,
                  lesson,
                  indicator.id,
                  indicator.position,
                ),
        };
        return next;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveItem(null);
        setDropIndicator(null);
      }}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-foreground text-base font-bold">
              {t('content.curriculum')}
            </h2>
            <p className="text-muted-foreground text-xs">
              {t('content.curriculumDesc')}
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            className="shrink-0 gap-1.5 bg-blue-950 hover:bg-blue-900 focus-visible:ring-blue-950 dark:bg-amber-400 dark:text-gray-900 dark:hover:bg-amber-300 dark:focus-visible:ring-amber-400"
            onClick={onAddModule}
          >
            <Plus className="h-3.5 w-3.5" /> {t('content.addModule')}
          </Button>
        </div>

        {modules.length === 0 ? (
          <div className="animate-fade-in border-border bg-card rounded-2xl border-2 border-dashed py-16 text-center">
            <BookOpen className="text-muted-foreground/40 mx-auto mb-3 h-8 w-8" />
            <p className="text-muted-foreground text-sm font-semibold">
              {t('content.noModulesYet')}
            </p>
            <p className="text-muted-foreground/70 mt-1 text-xs">
              {t('content.addModuleHint')}
            </p>
          </div>
        ) : (
          <SortableContext
            items={modules.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {modules.map((module, index) => (
                <ModuleItem
                  key={module.id}
                  module={module}
                  moduleIndex={index}
                  totalModules={modules.length}
                  dropIndicator={dropIndicator}
                  onUpdate={(updated) => onUpdateModule(index, updated)}
                  onDelete={() => onDeleteModule(index)}
                  onMove={(dir) => onMoveModule(index, dir)}
                  onAddModule={onAddModule}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>

      <DragOverlay dropAnimation={dropAnimation}>
        {activeItem?.type === 'module' && (
          <ModuleHeaderPreview
            title={activeItem.title}
            lessonCount={activeItem.lessonCount}
          />
        )}
        {activeItem?.type === 'lesson' && (
          <LessonHeaderPreview title={activeItem.title} />
        )}
      </DragOverlay>
    </DndContext>
  );
}

/** Which half of the hovered rect the dragged item's current position falls in. */
function resolveSide(event: DragOverEvent): 'before' | 'after' {
  const activeRect =
    event.active.rect.current.translated ?? event.active.rect.current.initial;
  const overRect = event.over?.rect;
  if (!activeRect || !overRect) return 'after';
  const overCenterY = overRect.top + overRect.height / 2;
  return activeRect.top < overCenterY ? 'before' : 'after';
}

/** Floating drag preview — a condensed, non-interactive copy of the module header. */
function ModuleHeaderPreview({
  title,
  lessonCount,
}: {
  title: string;
  lessonCount: number;
}) {
  return (
    <div className="border-brand-gold bg-card flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-lg">
      <GripVertical className="text-muted-foreground h-4 w-4 shrink-0" />
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-950/10 text-xs font-bold text-blue-950 dark:bg-amber-400/10 dark:text-amber-400">
        {lessonCount}
      </span>
      <p className="text-foreground truncate text-sm font-bold">{title}</p>
    </div>
  );
}
