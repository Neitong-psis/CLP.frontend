import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { BookOpen, Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel as UIFieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';
import { LABEL_CLS } from './FormField';
import { LessonItem } from './LessonItem';

interface ModuleItemProps {
  modIndex: number;
  totalModules: number;
  onDelete: () => void;
  onMove: (dir: 'up' | 'down') => void;
}

export function ModuleItem({
  modIndex,
  totalModules,
  onDelete,
  onMove,
}: ModuleItemProps) {
  const { register, control, watch, setValue } = useFormContext();

  const isExpanded = watch(`modules.${modIndex}.expanded`);

  const {
    fields: lessons,
    append,
    remove,
    move,
  } = useFieldArray({
    control,
    name: `modules.${modIndex}.lessons`,
  });

  const toggleExpand = () => {
    setValue(`modules.${modIndex}.expanded`, !isExpanded);
  };

  const handleAddLesson = () => {
    append({
      id: crypto.randomUUID(),
      title: `Lesson ${lessons.length + 1}`,
      expanded: true,
      sections: [],
    });
  };

  const handleMoveLesson = (index: number, dir: 'up' | 'down') => {
    const targetIndex = dir === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < lessons.length) {
      move(index, targetIndex);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div
        className="flex cursor-pointer items-center gap-3 bg-slate-50 px-5 py-3.5 transition-colors hover:bg-slate-100/40"
        onClick={toggleExpand}
      >
        <BookOpen className="text-brand-gold h-4 w-4 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-brand-navy text-sm font-bold">
            Module {modIndex + 1} ({lessons.length} Lesson
            {lessons.length !== 1 ? 's' : ''})
          </p>
          <p className="text-[11px] text-slate-400">Course module</p>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMove('up');
            }}
            disabled={modIndex === 0}
            className="flex h-6 w-6 items-center justify-center rounded text-slate-300 transition hover:text-slate-500 disabled:opacity-30"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMove('down');
            }}
            disabled={modIndex === totalModules - 1}
            className="flex h-6 w-6 items-center justify-center rounded text-slate-300 transition hover:text-slate-500 disabled:opacity-30"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex h-6 w-6 items-center justify-center rounded text-slate-300 transition hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="space-y-4 border-t border-slate-100 bg-white px-5 py-4">
          <Field className="flex flex-col gap-1">
            <UIFieldLabel>
              <Label className={LABEL_CLS}>Module {modIndex + 1} title</Label>
            </UIFieldLabel>
            <Input
              {...register(`modules.${modIndex}.title`)}
              type="text"
              placeholder={`Module ${modIndex + 1}`}
              className="h-9"
            />
          </Field>
          <div className="space-y-3">
            {lessons.map((lesson, li) => (
              <LessonItem
                key={lesson.id}
                moduleIndex={modIndex}
                lessonIndex={li}
                totalLessons={lessons.length}
                onDelete={() => remove(li)}
                onMove={(dir) => handleMoveLesson(li, dir)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddLesson}
            className="text-brand-gold flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-75"
          >
            <Plus className="h-3.5 w-3.5" /> Add Lesson
          </button>
        </div>
      )}
    </div>
  );
}
