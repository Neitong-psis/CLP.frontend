'use client';

import { ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ContentSection, CourseModule, Lesson } from '../_lib/types';
import { makeLesson, makeSection, moveItem } from '../_lib/builder';
import { FormField, inputCls } from './form';
import { LessonItem } from './LessonItem';
import { RowControls } from './RowControls';

export function ModuleItem({
  mod,
  modIndex,
  totalModules,
  onUpdate,
  onDelete,
  onMove,
}: {
  mod: CourseModule;
  modIndex: number;
  totalModules: number;
  onUpdate: (m: CourseModule) => void;
  onDelete: () => void;
  onMove: (dir: 'up' | 'down') => void;
}) {
  const addLesson = () =>
    onUpdate({
      ...mod,
      lessons: [...mod.lessons, makeLesson(mod.lessons.length + 1)],
    });

  const updateLesson = (i: number, updated: Lesson) =>
    onUpdate({
      ...mod,
      lessons: mod.lessons.map((l, j) => (j === i ? updated : l)),
    });

  const deleteLesson = (i: number) =>
    onUpdate({ ...mod, lessons: mod.lessons.filter((_, j) => j !== i) });

  const moveLesson = (i: number, dir: 'up' | 'down') =>
    onUpdate({ ...mod, lessons: moveItem(mod.lessons, i, dir) });

  const addSection = (lessonIndex: number, type: ContentSection['type']) => {
    const lesson = mod.lessons[lessonIndex];
    updateLesson(lessonIndex, {
      ...lesson,
      sections: [...lesson.sections, makeSection(type)],
    });
  };

  return (
    <div className="animate-fade-in border-border bg-card overflow-hidden rounded-2xl border transition-shadow hover:shadow-sm">
      {/* Module header */}
      <div
        className={cn(
          'flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors',
          mod.expanded ? 'bg-muted/30' : 'hover:bg-muted/30',
        )}
        onClick={() => onUpdate({ ...mod, expanded: !mod.expanded })}
      >
        <ChevronDown
          className={cn(
            'text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200',
            mod.expanded && 'rotate-180',
          )}
        />
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
          {modIndex + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-sm font-bold">
            {mod.title || `Module ${modIndex + 1}`}
          </p>
          <p className="text-muted-foreground text-[11px]">
            {mod.lessons.length} lesson{mod.lessons.length !== 1 ? 's' : ''}
          </p>
        </div>
        <RowControls
          index={modIndex}
          total={totalModules}
          onMove={onMove}
          onDelete={onDelete}
        />
      </div>

      {mod.expanded && (
        <div className="animate-fade-in border-border/50 space-y-4 border-t px-4 py-4">
          <FormField label="Module title">
            <input
              type="text"
              value={mod.title}
              onChange={(e) => onUpdate({ ...mod, title: e.target.value })}
              placeholder="e.g. Getting Started"
              className={inputCls}
            />
          </FormField>

          {mod.lessons.length > 0 && (
            <div className="space-y-3">
              {mod.lessons.map((lesson, li) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  lessonIndex={li}
                  totalLessons={mod.lessons.length}
                  onUpdate={(updated) => updateLesson(li, updated)}
                  onDelete={() => deleteLesson(li)}
                  onMove={(dir) => moveLesson(li, dir)}
                  onAddSection={(type) => addSection(li, type)}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={addLesson}
            className="border-border text-muted-foreground flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-2.5 text-xs font-semibold transition hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-600 active:scale-[0.99]"
          >
            <Plus className="h-3.5 w-3.5" /> Add Lesson
          </button>
        </div>
      )}
    </div>
  );
}
