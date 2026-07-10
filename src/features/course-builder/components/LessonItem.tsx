import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  CheckSquare,
  FileText,
  Video,
  Brain,
  ClipboardList,
  ImageIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel as UIFieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';
import { LABEL_CLS } from './FormField';
import { SectionItem } from './SectionItem';

interface LessonItemProps {
  moduleIndex: number;
  lessonIndex: number;
  totalLessons: number;
  onDelete: () => void;
  onMove: (dir: 'up' | 'down') => void;
}

const SECTION_ICONS = {
  text: FileText,
  image: ImageIcon,
  video: Video,
  quiz: Brain,
  assignment: ClipboardList,
};

const SECTION_LABELS = {
  text: 'Text',
  image: 'Images',
  video: 'Video',
  quiz: 'Quiz',
  assignment: 'Assignment',
};

export function LessonItem({
  moduleIndex,
  lessonIndex,
  totalLessons,
  onDelete,
  onMove,
}: LessonItemProps) {
  const { register, control, watch, setValue } = useFormContext();

  const isExpanded = watch(
    `modules.${moduleIndex}.lessons.${lessonIndex}.expanded`,
  );
  const titleVal = watch(`modules.${moduleIndex}.lessons.${lessonIndex}.title`);

  const {
    fields: sections,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons.${lessonIndex}.sections`,
  });

  const toggleExpand = () => {
    setValue(
      `modules.${moduleIndex}.lessons.${lessonIndex}.expanded`,
      !isExpanded,
    );
  };

  const handleAddSection = (
    type: 'text' | 'image' | 'video' | 'quiz' | 'assignment',
  ) => {
    append({
      id: crypto.randomUUID(),
      type,
      text: '',
      videoTitle: '',
      videoUrl: '',
      question: '',
      answerFormat: 'single',
      options: ['A', 'B', 'C', 'D'].map((char) => ({
        id: crypto.randomUUID(),
        text: `Option ${char}`,
        correct: false,
      })),
      assignmentDesc: '',
      dueDate: '',
      submissionType: '',
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50/70 shadow-sm">
      <div
        className="flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors hover:bg-slate-100/40"
        onClick={toggleExpand}
      >
        <CheckSquare className="text-brand-gold h-4 w-4 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-brand-navy truncate text-[13px] font-semibold">
            Lesson {lessonIndex + 1}: {titleVal || `Lesson ${lessonIndex + 1}`}
          </p>
          <p className="text-[11px] text-slate-400">
            {sections.length} content section{sections.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMove('up');
            }}
            disabled={lessonIndex === 0}
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
            disabled={lessonIndex === totalLessons - 1}
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
        <div className="space-y-4 border-t border-slate-200 bg-white px-4 py-4">
          <Field className="flex flex-col gap-1">
            <UIFieldLabel>
              <Label className={LABEL_CLS}>Lesson title</Label>
            </UIFieldLabel>
            <Input
              {...register(
                `modules.${moduleIndex}.lessons.${lessonIndex}.title`,
              )}
              type="text"
              className="h-9"
            />
          </Field>
          <div className="flex flex-wrap gap-2">
            {(['text', 'image', 'video', 'quiz', 'assignment'] as const).map(
              (type) => {
                const Icon = SECTION_ICONS[type];
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleAddSection(type)}
                    className="hover:border-brand-gold hover:text-brand-gold flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition"
                  >
                    <Icon className="h-3 w-3" /> Add {SECTION_LABELS[type]}
                  </button>
                );
              },
            )}
          </div>
          {sections.length > 0 && (
            <div className="space-y-3">
              {sections.map((section, si) => (
                <SectionItem
                  key={section.id}
                  moduleIndex={moduleIndex}
                  lessonIndex={lessonIndex}
                  sectionIndex={si}
                  onDelete={() => remove(si)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
