'use client';

import { useCallback, useRef } from 'react';
import { ModuleItem } from './ModuleItem';
import { useRovingFocus } from './hooks/useRovingFocus';
import type { ModuleMeta } from './selectors';
import type {
  ContentItem,
  CourseModule,
  CourseSidebarLabels,
  Lesson,
} from './types';

interface ModuleAccordionProps {
  readonly modules: readonly CourseModule[];
  /** Header metadata derived from the course, keyed by module id. */
  readonly moduleMeta: ReadonlyMap<string, ModuleMeta>;
  readonly currentItemId: string | null;
  readonly expandedId: string | null;
  readonly onToggleModule: (moduleId: string) => void;
  readonly onExpandModule: (moduleId: string) => void;
  readonly labels: CourseSidebarLabels;
  readonly onSelectItem: (
    item: ContentItem,
    lesson: Lesson,
    module: CourseModule,
  ) => void;
  readonly onLockedItem: (
    item: ContentItem,
    lesson: Lesson,
    module: CourseModule,
  ) => void;
}

export function ModuleAccordion({
  modules,
  moduleMeta,
  currentItemId,
  expandedId,
  onToggleModule,
  onExpandModule,
  labels,
  onSelectItem,
  onLockedItem,
}: ModuleAccordionProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const handleCollapse = useCallback(
    (moduleId: string) => {
      if (expandedId === moduleId) onToggleModule(moduleId);
    },
    [expandedId, onToggleModule],
  );

  const onKeyDown = useRovingFocus(listRef, {
    onExpand: onExpandModule,
    onCollapse: handleCollapse,
  });

  return (
    <ul
      ref={listRef}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-1.5 px-2 pb-2"
    >
      {modules.map((module) => {
        const meta = moduleMeta.get(module.id);
        if (!meta) return null;

        return (
          <ModuleItem
            key={module.id}
            module={module}
            index={meta.index}
            state={meta.state}
            progress={meta.progress}
            isExpanded={expandedId === module.id}
            onToggle={onToggleModule}
            currentItemId={currentItemId}
            labels={labels}
            onSelectItem={onSelectItem}
            onLockedItem={onLockedItem}
          />
        );
      })}
    </ul>
  );
}
