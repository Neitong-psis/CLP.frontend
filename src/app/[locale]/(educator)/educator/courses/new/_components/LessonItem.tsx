'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCreateCourseT } from '@/i18n';
import type { ContentSection, Lesson, SectionType } from '../_lib/types';
import { FormField, inputCls } from './form';
import { RowControls } from './RowControls';
import { SECTION_ICONS, SectionItem } from './SectionItem';

const SECTION_TYPES: SectionType[] = [
  'text',
  'image',
  'video',
  'quiz',
  'assignment',
];

export function LessonItem({
  lesson,
  lessonIndex,
  totalLessons,
  onUpdate,
  onDelete,
  onMove,
  onAddSection,
}: {
  lesson: Lesson;
  lessonIndex: number;
  totalLessons: number;
  onUpdate: (l: Lesson) => void;
  onDelete: () => void;
  onMove: (dir: 'up' | 'down') => void;
  onAddSection: (type: ContentSection['type']) => void;
}) {
  const t = useCreateCourseT();

  const sectionCount = lesson.sections.length;
  const sectionCountLabel =
    sectionCount === 1
      ? t('content.lesson.sectionCountOne', { count: sectionCount })
      : t('content.lesson.sectionCountOther', { count: sectionCount });

  return (
    <div className="animate-fade-in border-border bg-muted/20 overflow-hidden rounded-xl border">
      <div
        className="group/head hover:bg-muted/40 flex cursor-pointer items-center gap-2.5 px-3.5 py-2.5 transition-colors"
        onClick={() => onUpdate({ ...lesson, expanded: !lesson.expanded })}
      >
        <ChevronDown
          className={cn(
            'text-muted-foreground h-3.5 w-3.5 shrink-0 transition-transform duration-200',
            lesson.expanded && 'rotate-180',
          )}
        />
        <span className="bg-card text-muted-foreground ring-border flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold ring-1">
          {lessonIndex + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-foreground truncate text-[13px] font-semibold">
            {lesson.title ||
              t('content.lesson.defaultTitle', { n: lessonIndex + 1 })}
          </p>
          <p className="text-muted-foreground text-[11px]">
            {sectionCountLabel}
          </p>
        </div>
        <RowControls
          index={lessonIndex}
          total={totalLessons}
          onMove={onMove}
          onDelete={onDelete}
          className="opacity-0 transition-opacity duration-200 group-hover/head:opacity-100 focus-within:opacity-100"
        />
      </div>

      {lesson.expanded && (
        <div className="animate-fade-in border-border bg-card space-y-4 border-t px-4 py-4">
          <FormField label={t('content.lesson.titleLabel')}>
            <input
              type="text"
              value={lesson.title}
              onChange={(e) => onUpdate({ ...lesson, title: e.target.value })}
              placeholder={t('content.lesson.titlePlaceholder')}
              className={inputCls}
            />
          </FormField>

          <div>
            <p className="text-muted-foreground mb-2 text-[11px] font-semibold">
              {t('content.lesson.addContent')}
            </p>
            <div className="flex flex-wrap gap-2">
              {SECTION_TYPES.map((type) => {
                const Icon = SECTION_ICONS[type];
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onAddSection(type)}
                    className="border-border bg-card text-muted-foreground flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:border-blue-900 hover:text-blue-950 active:scale-95 dark:hover:border-amber-400 dark:hover:text-amber-400"
                  >
                    <Icon className="h-3 w-3" />
                    {t(`content.section.${type}`)}
                  </button>
                );
              })}
            </div>
          </div>

          {lesson.sections.length > 0 ? (
            <div className="space-y-3">
              {lesson.sections.map((section, si) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  onUpdate={(updated) =>
                    onUpdate({
                      ...lesson,
                      sections: lesson.sections.map((s, j) =>
                        j === si ? updated : s,
                      ),
                    })
                  }
                  onDelete={() =>
                    onUpdate({
                      ...lesson,
                      sections: lesson.sections.filter((_, j) => j !== si),
                    })
                  }
                />
              ))}
            </div>
          ) : (
            <p className="border-border text-muted-foreground rounded-lg border border-dashed py-4 text-center text-[11px]">
              {t('content.lesson.noContent')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
