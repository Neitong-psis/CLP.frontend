'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ContentSection, Lesson, SectionType } from '../_lib/types';
import { FormField, inputCls } from './form';
import { RowControls } from './RowControls';
import { SECTION_ICONS, SECTION_LABELS, SectionItem } from './SectionItem';

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
  return (
    <div className="animate-fade-in overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/70">
      {/* Header */}
      <div
        className="flex cursor-pointer items-center gap-2.5 px-3.5 py-2.5 transition-colors hover:bg-zinc-100/60"
        onClick={() => onUpdate({ ...lesson, expanded: !lesson.expanded })}
      >
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform duration-200',
            lesson.expanded && 'rotate-180',
          )}
        />
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white text-[10px] font-bold text-zinc-500 ring-1 ring-zinc-200">
          {lessonIndex + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-zinc-900">
            {lesson.title || `Lesson ${lessonIndex + 1}`}
          </p>
          <p className="text-[11px] text-zinc-400">
            {lesson.sections.length} section
            {lesson.sections.length !== 1 ? 's' : ''}
          </p>
        </div>
        <RowControls
          index={lessonIndex}
          total={totalLessons}
          onMove={onMove}
          onDelete={onDelete}
        />
      </div>

      {lesson.expanded && (
        <div className="animate-fade-in space-y-4 border-t border-zinc-200 bg-white px-4 py-4">
          <FormField label="Lesson title">
            <input
              type="text"
              value={lesson.title}
              onChange={(e) => onUpdate({ ...lesson, title: e.target.value })}
              placeholder="e.g. Setting up your environment"
              className={inputCls}
            />
          </FormField>

          {/* Add content buttons */}
          <div>
            <p className="mb-2 text-[11px] font-semibold text-zinc-500">
              Add content
            </p>
            <div className="flex flex-wrap gap-2">
              {SECTION_TYPES.map((type) => {
                const Icon = SECTION_ICONS[type];
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onAddSection(type)}
                    className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:border-blue-400 hover:text-blue-600 active:scale-95"
                  >
                    <Icon className="h-3 w-3" />
                    {SECTION_LABELS[type]}
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
            <p className="rounded-lg border border-dashed border-zinc-200 py-4 text-center text-[11px] text-zinc-400">
              No content yet — add a block above to build this lesson.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
