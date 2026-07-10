import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  X,
  Trash2,
  Plus,
  FileText,
  Video,
  Brain,
  ClipboardList,
  ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/TextArea';
import { Field, FieldLabel as UIFieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';
import { LABEL_CLS, SELECT_CLS } from './FormField';

interface SectionItemProps {
  moduleIndex: number;
  lessonIndex: number;
  sectionIndex: number;
  onDelete: () => void;
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

export function SectionItem({
  moduleIndex,
  lessonIndex,
  sectionIndex,
  onDelete,
}: SectionItemProps) {
  const { register, control, watch, setValue } = useFormContext();

  const sectionType = watch(
    `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.type`,
  ) as 'text' | 'image' | 'video' | 'quiz' | 'assignment';

  const answerFormat = watch(
    `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.answerFormat`,
  );

  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.options`,
  });

  const Icon = SECTION_ICONS[sectionType] || FileText;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <Icon className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-xs font-semibold text-slate-600">
          {SECTION_LABELS[sectionType]}
        </span>
        <button
          type="button"
          onClick={onDelete}
          className="ml-auto text-slate-300 transition hover:text-slate-500"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="p-4">
        {sectionType === 'text' && (
          <div className="space-y-2">
            <Input
              {...register(
                `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.text`,
              )}
              type="text"
              placeholder="Text Content Title"
              className="h-8 text-xs"
            />
            <Textarea
              rows={3}
              placeholder="Write lesson text content..."
              className="resize-none text-xs"
            />
          </div>
        )}
        {sectionType === 'image' && (
          <button
            type="button"
            className="hover:border-brand-gold hover:text-brand-gold flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-xs text-slate-400 transition"
          >
            Click to upload lesson image
          </button>
        )}
        {sectionType === 'video' && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Field className="flex flex-col gap-1">
              <UIFieldLabel>
                <Label className={LABEL_CLS}>Video Title</Label>
              </UIFieldLabel>
              <Input
                {...register(
                  `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.videoTitle`,
                )}
                type="text"
                placeholder="Video Title"
                className="h-8 text-xs"
              />
            </Field>
            <Field className="flex flex-col gap-1">
              <UIFieldLabel>
                <Label className={LABEL_CLS}>
                  YouTube, Vimeo, or .mp4 link
                </Label>
              </UIFieldLabel>
              <Input
                {...register(
                  `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.videoUrl`,
                )}
                type="url"
                placeholder="https://..."
                className="h-8 text-xs"
              />
            </Field>
          </div>
        )}
        {sectionType === 'quiz' && (
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-4 md:flex-row">
              <Field className="flex w-full flex-1 flex-col gap-1">
                <UIFieldLabel>
                  <Label className={LABEL_CLS}>Question</Label>
                </UIFieldLabel>
                <Input
                  {...register(
                    `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.question`,
                  )}
                  type="text"
                  placeholder="Ask a question..."
                  className="h-8 text-xs"
                />
              </Field>
              <div className="w-full shrink-0 md:w-auto">
                <p className="mb-1.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  Answer format
                </p>
                <div className="flex w-fit overflow-hidden rounded-lg border border-slate-200 bg-white text-[11px] font-semibold">
                  <input
                    type="hidden"
                    {...register(
                      `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.answerFormat`,
                    )}
                  />
                  {(['single', 'multiple'] as const).map((fmt, i) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() =>
                        setValue(
                          `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.answerFormat`,
                          fmt,
                        )
                      }
                      className={cn(
                        'px-3 py-1.5 transition-colors',
                        i > 0 && 'border-l border-slate-200',
                        answerFormat === fmt
                          ? 'bg-brand-gold/15 text-brand-gold'
                          : 'text-slate-400 hover:bg-slate-50',
                      )}
                    >
                      {fmt === 'single' ? 'Single' : 'Multiple'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                Select Correct Answer
              </p>
              <div className="space-y-2">
                {options.map((opt, i) => (
                  <div
                    key={opt.id}
                    className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      {...register(
                        `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.options.${i}.correct`,
                      )}
                      className="accent-brand-gold h-3.5 w-3.5 cursor-pointer"
                    />
                    <input
                      type="text"
                      {...register(
                        `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.options.${i}.text`,
                      )}
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      className="flex-1 bg-transparent text-xs text-slate-600 placeholder-slate-300 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      className="text-slate-300 transition hover:text-slate-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => append({ text: '', correct: false })}
                className="text-brand-gold mt-2 flex items-center gap-1 text-xs font-semibold transition hover:opacity-75"
              >
                <Plus className="h-3 w-3" /> Add option
              </button>
            </div>
          </div>
        )}
        {sectionType === 'assignment' && (
          <div className="space-y-3">
            <Field className="flex flex-col gap-1">
              <UIFieldLabel>
                <Label className={LABEL_CLS}>Lesson Assignment</Label>
              </UIFieldLabel>
              <Textarea
                {...register(
                  `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.assignmentDesc`,
                )}
                rows={3}
                placeholder="Assignment description..."
                className="resize-none text-xs"
              />
            </Field>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field className="flex flex-col gap-1">
                <UIFieldLabel>
                  <Label className={LABEL_CLS}>Due date</Label>
                </UIFieldLabel>
                <Input
                  {...register(
                    `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.dueDate`,
                  )}
                  type="date"
                  className="h-8 text-xs"
                />
              </Field>
              <Field className="flex flex-col gap-1">
                <UIFieldLabel>
                  <Label className={LABEL_CLS}>Submission type</Label>
                </UIFieldLabel>
                <div className="relative">
                  <select
                    {...register(
                      `modules.${moduleIndex}.lessons.${lessonIndex}.sections.${sectionIndex}.submissionType`,
                    )}
                    className={cn(SELECT_CLS, 'h-8 text-xs')}
                  >
                    <option value="">Select...</option>
                    <option>File upload</option>
                    <option>Text submission</option>
                    <option>URL link</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3 w-3 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple internal helper for select dropdown chevron rendering
function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
