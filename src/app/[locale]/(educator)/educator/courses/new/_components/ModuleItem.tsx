'use client';

import { ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCreateCourseT } from '@/i18n';
import type { ContentSection, CourseModule, Lesson } from '../_lib/types';
import { makeLesson, makeSection, moveItem } from '../_lib/builder';
import { FormField, inputCls } from './form';
import { LessonItem } from './LessonItem';
import { RowControls } from './RowControls';

export function ModuleItem({
  module,
  moduleIndex,
  totalModules,
  onUpdate,
  onDelete,
  onMove,
}: {
  module: CourseModule;
  moduleIndex: number;
  totalModules: number;
  onUpdate: (m: CourseModule) => void;
  onDelete: () => void;
  onMove: (dir: 'up' | 'down') => void;
}) {
  const t = useCreateCourseT();

  const addLesson = () =>
    onUpdate({
      ...module,
      lessons: [...module.lessons, makeLesson(module.lessons.length + 1)],
    });

  const updateLesson = (i: number, updated: Lesson) =>
    onUpdate({
      ...module,
      lessons: module.lessons.map((l, j) => (j === i ? updated : l)),
    });

  const deleteLesson = (i: number) =>
    onUpdate({ ...module, lessons: module.lessons.filter((_, j) => j !== i) });

  const moveLesson = (i: number, dir: 'up' | 'down') =>
    onUpdate({ ...module, lessons: moveItem(module.lessons, i, dir) });

  const addSection = (lessonIndex: number, type: ContentSection['type']) => {
    const lesson = module.lessons[lessonIndex];
    updateLesson(lessonIndex, {
      ...lesson,
      sections: [...lesson.sections, makeSection(type)],
    });
  };

  const lessonCount = module.lessons.length;
  const lessonCountLabel =
    lessonCount === 1
      ? t('content.module.lessonCountOne', { count: lessonCount })
      : t('content.module.lessonCountOther', { count: lessonCount });

  return (
    <div className="animate-fade-in border-border bg-card overflow-hidden rounded-2xl border transition-shadow hover:shadow-sm">
      <div
        className={cn(
          'flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors',
          module.expanded ? 'bg-muted/30' : 'hover:bg-muted/30',
        )}
        onClick={() => onUpdate({ ...module, expanded: !module.expanded })}
      >
        <ChevronDown
          className={cn(
            'text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200',
            module.expanded && 'rotate-180',
          )}
        />
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-950/10 text-xs font-bold text-blue-950 dark:bg-amber-400/10 dark:text-amber-400">
          {moduleIndex + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-sm font-bold">
            {module.title ||
              t('content.module.defaultTitle', { n: moduleIndex + 1 })}
          </p>
          <p className="text-muted-foreground text-[11px]">
            {lessonCountLabel}
          </p>
        </div>
        <RowControls
          index={moduleIndex}
          total={totalModules}
          onMove={onMove}
          onDelete={onDelete}
        />
      </div>

      {module.expanded && (
        <div className="animate-fade-in border-border/50 space-y-4 border-t px-4 py-4">
          <FormField label={t('content.module.titleLabel')}>
            <input
              type="text"
              value={module.title}
              onChange={(e) => onUpdate({ ...module, title: e.target.value })}
              placeholder={t('content.module.titlePlaceholder')}
              className={inputCls}
            />
          </FormField>

          {module.lessons.length > 0 && (
            <div className="space-y-3">
              {module.lessons.map((lesson, li) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  lessonIndex={li}
                  totalLessons={module.lessons.length}
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
            className="border-border text-muted-foreground flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed py-2.5 text-xs font-semibold transition hover:border-blue-900 hover:bg-blue-950/10 hover:text-blue-950 active:scale-[0.99] dark:hover:border-amber-400 dark:hover:bg-amber-400/10 dark:hover:text-amber-400"
          >
            <Plus className="h-3.5 w-3.5" /> {t('content.module.addLesson')}
          </button>
        </div>
      )}
    </div>
  );
}
