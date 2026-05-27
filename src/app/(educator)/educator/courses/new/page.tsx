'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Check,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  BookOpen,
  CheckSquare,
  FileText,
  Video,
  Brain,
  ClipboardList,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  ArrowRight,
  X,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
}

interface ContentSection {
  id: string;
  type: 'text' | 'image' | 'video' | 'quiz' | 'assignment';
  text: string;
  videoTitle: string;
  videoUrl: string;
  question: string;
  answerFormat: 'single' | 'multiple';
  options: QuizOption[];
  assignmentDesc: string;
  dueDate: string;
  submissionType: string;
}

interface Lesson {
  id: string;
  title: string;
  expanded: boolean;
  sections: ContentSection[];
}

interface CourseModule {
  id: string;
  title: string;
  expanded: boolean;
  lessons: Lesson[];
}

interface CourseInfo {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  pricingType: string;
  price: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

let _seq = 0;
const uid = () => String(++_seq);

function makeSection(type: ContentSection['type']): ContentSection {
  return {
    id: uid(),
    type,
    text: '',
    videoTitle: '',
    videoUrl: '',
    question: '',
    answerFormat: 'single',
    options: ['A', 'B', 'C', 'D'].map((l) => ({
      id: uid(),
      text: `Option ${l}`,
      correct: false,
    })),
    assignmentDesc: '',
    dueDate: '',
    submissionType: '',
  };
}

// ─── Shared input styles ──────────────────────────────────────────────────────

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none transition focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20';

const selectCls = cn(inputCls, 'appearance-none cursor-pointer pr-8');

const labelCls = 'mb-1.5 block text-sm font-semibold text-slate-700';

function FormField({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { title: 'Course Info', desc: 'Details, thumbnail & pricing' },
  { title: 'Course Content', desc: 'Modules & lessons' },
  { title: 'Preview & Publish', desc: 'Review final summary' },
];

function StepBar({ current }: { current: number }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {STEPS.map((step, i) => {
        const n = i + 1;
        const isActive = current === n;
        const isDone = current > n;
        return (
          <div
            key={n}
            className={cn(
              'flex items-center gap-3 rounded-xl border p-4 transition-colors',
              isActive ? 'border-brand-gold bg-white' : 'border-slate-200 bg-white',
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                isDone || isActive
                  ? 'bg-brand-gold text-white'
                  : 'bg-slate-100 text-slate-400',
              )}
            >
              {isDone ? <Check className="h-4 w-4" /> : n}
            </div>
            <div className="min-w-0">
              <p
                className={cn(
                  'text-sm font-bold',
                  isActive ? 'text-brand-navy' : 'text-slate-500',
                )}
              >
                {step.title}
              </p>
              <p className="truncate text-[11px] text-slate-400">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Course Info ──────────────────────────────────────────────────────

function CourseInfoStep({
  info,
  onChange,
}: {
  info: CourseInfo;
  onChange: (key: keyof CourseInfo, val: string) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="grid grid-cols-[1fr_220px] gap-8">
        {/* Main fields */}
        <div className="space-y-5">
          <FormField label="Course title">
            <input
              type="text"
              placeholder="Course Title"
              value={info.title}
              onChange={(e) => onChange('title', e.target.value)}
              className={inputCls}
            />
          </FormField>

          <FormField label="Subtitle">
            <input
              type="text"
              placeholder="Course Subtitle"
              value={info.subtitle}
              onChange={(e) => onChange('subtitle', e.target.value)}
              className={inputCls}
            />
          </FormField>

          <FormField label="Description">
            <textarea
              rows={5}
              placeholder="Course Description"
              value={info.description}
              onChange={(e) => onChange('description', e.target.value)}
              className={cn(inputCls, 'resize-none')}
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select
                    value={info.category}
                    onChange={(e) => onChange('category', e.target.value)}
                    className={selectCls}
                  >
                    <option value="" />
                    <option>Web Development</option>
                    <option>Programming</option>
                    <option>Data Science</option>
                    <option>Cloud Computing</option>
                    <option>DevOps</option>
                    <option>Design</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
                <button
                  type="button"
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
            </FormField>

            <FormField label="Level">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <select
                    value={info.level}
                    onChange={(e) => onChange('level', e.target.value)}
                    className={selectCls}
                  >
                    <option value="" />
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
                <button
                  type="button"
                  className="flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
            </FormField>
          </div>

          {/* Pricing box */}
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="mb-3 text-sm font-bold text-slate-800">Pricing</p>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Pricing type">
                <div className="relative">
                  <select
                    value={info.pricingType}
                    onChange={(e) => onChange('pricingType', e.target.value)}
                    className={selectCls}
                  >
                    <option value="paid">Paid/cost</option>
                    <option value="free">Free</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                </div>
              </FormField>

              <FormField label="Enter price">
                <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-brand-gold focus-within:ring-1 focus-within:ring-brand-gold/20">
                  <span className="border-r border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="79"
                    min={0}
                    value={info.price}
                    onChange={(e) => onChange('price', e.target.value)}
                    disabled={info.pricingType === 'free'}
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-700 outline-none disabled:opacity-40"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">Price shown in USD ($).</p>
              </FormField>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className={labelCls}>Thumbnail</label>
          <button
            type="button"
            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 p-8 text-center transition hover:border-brand-gold hover:bg-brand-gold/5"
          >
            <ImageIcon className="h-7 w-7 text-slate-300" />
            <span className="text-xs font-semibold text-slate-500">Click to upload</span>
            <span className="text-[11px] text-slate-400">16:9 recommended</span>
          </button>
          <p className="mt-2 text-[11px] text-slate-400">
            PNG or JPG. Shown on the course card.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Course Content ───────────────────────────────────────────────────

const SECTION_ICONS: Record<ContentSection['type'], React.ElementType> = {
  text: FileText,
  image: ImageIcon,
  video: Video,
  quiz: Brain,
  assignment: ClipboardList,
};

const SECTION_LABELS: Record<ContentSection['type'], string> = {
  text: 'Text',
  image: 'Images',
  video: 'Video',
  quiz: 'Quiz',
  assignment: 'Assignment',
};

function SectionItem({
  section,
  onUpdate,
  onDelete,
}: {
  section: ContentSection;
  onUpdate: (s: ContentSection) => void;
  onDelete: () => void;
}) {
  const Icon = SECTION_ICONS[section.type];

  return (
    <div className="overflow-hidden rounded-lg border border-slate-100 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Icon className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-xs font-semibold text-slate-600">
          {SECTION_LABELS[section.type]}
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
        {section.type === 'text' && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Text Content"
              value={section.text}
              onChange={(e) => onUpdate({ ...section, text: e.target.value })}
              className={cn(inputCls, 'text-xs')}
            />
            <textarea
              rows={3}
              placeholder="Write lesson text content..."
              className={cn(inputCls, 'resize-none text-xs')}
            />
          </div>
        )}

        {section.type === 'image' && (
          <button
            type="button"
            className="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-xs text-slate-400 transition hover:border-brand-gold hover:text-brand-gold"
          >
            Click to upload lesson image
          </button>
        )}

        {section.type === 'video' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="mb-1 text-[11px] font-semibold text-slate-500">Video Title</p>
              <input
                type="text"
                placeholder="Video Title"
                value={section.videoTitle}
                onChange={(e) => onUpdate({ ...section, videoTitle: e.target.value })}
                className={cn(inputCls, 'text-xs')}
              />
            </div>
            <div>
              <p className="mb-1 text-[11px] font-semibold text-slate-500">
                YouTube, Vimeo, or .mp4 link
              </p>
              <input
                type="url"
                placeholder="https://..."
                value={section.videoUrl}
                onChange={(e) => onUpdate({ ...section, videoUrl: e.target.value })}
                className={cn(inputCls, 'text-xs')}
              />
            </div>
          </div>
        )}

        {section.type === 'quiz' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">New Quiz module</p>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="mb-1 text-[11px] font-semibold text-slate-500">Question</p>
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={section.question}
                  onChange={(e) => onUpdate({ ...section, question: e.target.value })}
                  className={cn(inputCls, 'text-xs')}
                />
              </div>
              <div className="shrink-0">
                <p className="mb-1 text-[11px] font-semibold text-slate-500">Answer format</p>
                <div className="flex overflow-hidden rounded-lg border border-slate-200 text-[11px] font-semibold">
                  {(['single', 'multiple'] as const).map((fmt, i) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => onUpdate({ ...section, answerFormat: fmt })}
                      className={cn(
                        'px-3 py-1.5 transition-colors',
                        i > 0 && 'border-l border-slate-200',
                        section.answerFormat === fmt
                          ? 'bg-brand-gold/15 text-brand-gold'
                          : 'text-slate-400 hover:bg-slate-50',
                      )}
                    >
                      {fmt === 'single' ? 'Single Choice' : 'Multiple choice'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-semibold text-slate-500">
                Select Correct Answer
              </p>
              <div className="space-y-2">
                {section.options.map((opt, i) => (
                  <div
                    key={opt.id}
                    className="flex items-center gap-2.5 rounded-lg border border-slate-100 px-3 py-2"
                  >
                    <input
                      type="checkbox"
                      checked={opt.correct}
                      onChange={(e) =>
                        onUpdate({
                          ...section,
                          options: section.options.map((o, j) =>
                            j === i ? { ...o, correct: e.target.checked } : o,
                          ),
                        })
                      }
                      className="h-3.5 w-3.5 accent-brand-gold"
                    />
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) =>
                        onUpdate({
                          ...section,
                          options: section.options.map((o, j) =>
                            j === i ? { ...o, text: e.target.value } : o,
                          ),
                        })
                      }
                      placeholder={`Option ${String.fromCharCode(65 + i)}`}
                      className="flex-1 bg-transparent text-xs text-slate-600 outline-none placeholder-slate-300"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onUpdate({
                          ...section,
                          options: section.options.filter((_, j) => j !== i),
                        })
                      }
                      className="text-slate-300 transition hover:text-slate-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  onUpdate({
                    ...section,
                    options: [
                      ...section.options,
                      { id: uid(), text: '', correct: false },
                    ],
                  })
                }
                className="mt-2 flex items-center gap-1 text-xs font-semibold text-brand-gold transition hover:opacity-75"
              >
                <Plus className="h-3 w-3" /> Add option
              </button>
              <p className="mt-2 text-[10px] text-slate-400">
                One checked answer creates a Single Choice question. Two or more checked answers
                create a Multiple Choice question.
              </p>
            </div>
          </div>
        )}

        {section.type === 'assignment' && (
          <div className="space-y-3">
            <div>
              <p className="mb-1 text-[11px] font-semibold text-slate-500">Lesson Assignment</p>
              <textarea
                rows={3}
                placeholder="Assignment description, expected outcome, and submission requirements..."
                value={section.assignmentDesc}
                onChange={(e) => onUpdate({ ...section, assignmentDesc: e.target.value })}
                className={cn(inputCls, 'resize-none text-xs')}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1 text-[11px] font-semibold text-slate-500">Due date</p>
                <input
                  type="date"
                  value={section.dueDate}
                  onChange={(e) => onUpdate({ ...section, dueDate: e.target.value })}
                  className={cn(inputCls, 'text-xs')}
                />
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold text-slate-500">Submission type</p>
                <div className="relative">
                  <select
                    value={section.submissionType}
                    onChange={(e) =>
                      onUpdate({ ...section, submissionType: e.target.value })
                    }
                    className={cn(selectCls, 'text-xs')}
                  >
                    <option value="">Select...</option>
                    <option>File upload</option>
                    <option>Text submission</option>
                    <option>URL link</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3 w-3 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LessonItem({
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
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50/70">
      {/* Header */}
      <div
        className="flex cursor-pointer items-center gap-3 px-4 py-2.5"
        onClick={() => onUpdate({ ...lesson, expanded: !lesson.expanded })}
      >
        <CheckSquare className="h-4 w-4 shrink-0 text-brand-gold" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-brand-navy">
            Lesson {lessonIndex + 1}: {lesson.title}
          </p>
          <p className="text-[11px] text-slate-400">
            {lesson.sections.length} content section
            {lesson.sections.length !== 1 ? 's' : ''}
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

      {lesson.expanded && (
        <div className="space-y-4 border-t border-slate-200 bg-white px-4 py-4">
          <FormField label="Lesson title">
            <input
              type="text"
              value={lesson.title}
              onChange={(e) => onUpdate({ ...lesson, title: e.target.value })}
              className={inputCls}
            />
          </FormField>

          {/* Add content buttons */}
          <div className="flex flex-wrap gap-2">
            {(
              ['text', 'image', 'video', 'quiz', 'assignment'] as ContentSection['type'][]
            ).map((type) => {
              const Icon = SECTION_ICONS[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onAddSection(type)}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-brand-gold hover:text-brand-gold"
                >
                  <Icon className="h-3 w-3" />
                  Add {SECTION_LABELS[type]}
                </button>
              );
            })}
          </div>

          {lesson.sections.length > 0 && (
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
          )}
        </div>
      )}
    </div>
  );
}

function ModuleItem({
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
  const addLesson = () => {
    onUpdate({
      ...mod,
      lessons: [
        ...mod.lessons,
        {
          id: uid(),
          title: `Lesson ${mod.lessons.length + 1}`,
          expanded: true,
          sections: [],
        },
      ],
    });
  };

  const updateLesson = (i: number, updated: Lesson) =>
    onUpdate({ ...mod, lessons: mod.lessons.map((l, j) => (j === i ? updated : l)) });

  const deleteLesson = (i: number) =>
    onUpdate({ ...mod, lessons: mod.lessons.filter((_, j) => j !== i) });

  const moveLesson = (i: number, dir: 'up' | 'down') => {
    const arr = [...mod.lessons];
    const t = dir === 'up' ? i - 1 : i + 1;
    [arr[i], arr[t]] = [arr[t], arr[i]];
    onUpdate({ ...mod, lessons: arr });
  };

  const addSection = (lessonIndex: number, type: ContentSection['type']) => {
    const lesson = mod.lessons[lessonIndex];
    updateLesson(lessonIndex, {
      ...lesson,
      sections: [...lesson.sections, makeSection(type)],
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Module header */}
      <div
        className="flex cursor-pointer items-center gap-3 bg-slate-50 px-5 py-3.5"
        onClick={() => onUpdate({ ...mod, expanded: !mod.expanded })}
      >
        <BookOpen className="h-4.5 w-4.5 shrink-0 text-brand-gold" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-brand-navy">
            Module {modIndex + 1} ({mod.lessons.length} Lesson
            {mod.lessons.length !== 1 ? 's' : ''})
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

      {mod.expanded && (
        <div className="space-y-4 px-5 py-4">
          <FormField label={`Module ${modIndex + 1}`}>
            <input
              type="text"
              value={mod.title}
              onChange={(e) => onUpdate({ ...mod, title: e.target.value })}
              placeholder={`Module ${modIndex + 1}`}
              className={inputCls}
            />
          </FormField>

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

          <button
            type="button"
            onClick={addLesson}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-gold transition hover:opacity-75"
          >
            <Plus className="h-3.5 w-3.5" /> Add Lesson
          </button>
        </div>
      )}
    </div>
  );
}

function CourseContentStep({
  modules,
  setModules,
}: {
  modules: CourseModule[];
  setModules: React.Dispatch<React.SetStateAction<CourseModule[]>>;
}) {
  const addModule = () =>
    setModules((prev) => [
      ...prev,
      {
        id: uid(),
        title: `Module ${prev.length + 1}`,
        expanded: true,
        lessons: [],
      },
    ]);

  const updateModule = (i: number, updated: CourseModule) =>
    setModules((prev) => prev.map((m, j) => (j === i ? updated : m)));

  const deleteModule = (i: number) =>
    setModules((prev) => prev.filter((_, j) => j !== i));

  const moveModule = (i: number, dir: 'up' | 'down') =>
    setModules((prev) => {
      const arr = [...prev];
      const t = dir === 'up' ? i - 1 : i + 1;
      [arr[i], arr[t]] = [arr[t], arr[i]];
      return arr;
    });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-brand-navy">Course Curriculum</h2>
          <p className="text-xs text-slate-400">
            Build a scalable Course / Module / Lesson / Content / Quiz / Assignment structure
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="shrink-0 gap-1.5"
          onClick={addModule}
        >
          <Plus className="h-3.5 w-3.5" /> Add Module
        </Button>
      </div>

      {modules.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white py-16 text-center">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-slate-200" />
          <p className="text-sm font-semibold text-slate-400">No modules yet</p>
          <p className="mt-1 text-xs text-slate-300">
            Click &ldquo;Add Module&rdquo; to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {modules.map((mod, i) => (
            <ModuleItem
              key={mod.id}
              mod={mod}
              modIndex={i}
              totalModules={modules.length}
              onUpdate={(updated) => updateModule(i, updated)}
              onDelete={() => deleteModule(i)}
              onMove={(dir) => moveModule(i, dir)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Step 3: Preview & Publish ────────────────────────────────────────────────

function AccordionSection({
  title,
  desc,
  defaultOpen = false,
  children,
}: {
  title: string;
  desc: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div>
          <p className="text-sm font-bold text-brand-navy">{title}</p>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>
      {open && <div className="border-t border-slate-100 px-5 py-5">{children}</div>}
    </div>
  );
}

function PreviewPublishStep({
  info,
  modules,
}: {
  info: CourseInfo;
  modules: CourseModule[];
}) {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-brand-navy">Step 3. Preview &amp; Publish</h2>
        <p className="text-sm text-slate-400">
          Review each section, fix missing details, then save or publish.
        </p>
      </div>

      <AccordionSection
        title="1. Course Info"
        desc="Thumbnail, title, badges, and description."
        defaultOpen
      >
        <div className="flex gap-5">
          <div className="flex h-28 w-44 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-400">
            No thumbnail uploaded
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-base font-bold text-brand-navy">
              {info.title || 'Course Title'}
            </p>
            <p className="text-sm text-slate-500">{info.subtitle || 'Course Subtitle'}</p>
            <p className="text-xs text-slate-400">{info.description || 'Course Description'}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {info.category && (
                <span className="rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {info.category}
                </span>
              )}
              {info.level && (
                <span className="rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {info.level}
                </span>
              )}
              {info.pricingType === 'free' ? (
                <span className="rounded-md bg-brand-gold/15 px-2.5 py-0.5 text-xs font-semibold text-brand-gold">
                  Free
                </span>
              ) : info.price ? (
                <span className="rounded-md bg-brand-gold/15 px-2.5 py-0.5 text-xs font-semibold text-brand-gold">
                  Paid ${info.price}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection
        title="2. Course Contents"
        desc={`${modules.length} module${modules.length !== 1 ? 's' : ''} and ${totalLessons} lesson${totalLessons !== 1 ? 's' : ''}.`}
      >
        {modules.length === 0 ? (
          <p className="text-sm text-slate-400">No modules added.</p>
        ) : (
          <div className="space-y-2">
            {modules.map((mod, i) => (
              <div key={mod.id} className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-brand-gold" />
                <span className="font-medium text-brand-navy">
                  Module {i + 1}: {mod.title}
                </span>
                <span className="text-slate-400">
                  — {mod.lessons.length} lesson{mod.lessons.length !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </AccordionSection>

      <AccordionSection
        title="3. Publish Settings"
        desc="Visibility, draft behavior, and final action."
      >
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Visibility">
            <div className="relative">
              <select className={cn(selectCls)}>
                <option>Public</option>
                <option>Private</option>
                <option>Unlisted</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </FormField>
          <FormField label="Draft behavior">
            <div className="flex items-center gap-3 pt-1.5">
              <button
                type="button"
                className="relative h-5 w-9 rounded-full bg-brand-gold"
              >
                <span className="absolute top-0.5 left-0.5 h-4 w-4 translate-x-4 rounded-full bg-white shadow transition-transform" />
              </button>
              <span className="text-xs text-slate-500">Keep as draft until submitted</span>
            </div>
          </FormField>
        </div>
      </AccordionSection>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewCoursePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState<CourseInfo>({
    title: '',
    subtitle: '',
    description: '',
    category: '',
    level: '',
    pricingType: 'paid',
    price: '',
  });
  const [modules, setModules] = useState<CourseModule[]>([]);

  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <div className="flex-1 px-6 py-6 lg:px-8">
        <p className="text-xs font-medium text-slate-400">New course</p>
        <h1 className="mb-6 mt-0.5 text-2xl font-bold text-brand-navy">Create a Course</h1>

        <StepBar current={step} />

        <div className="mt-6">
          {step === 1 && (
            <CourseInfoStep
              info={info}
              onChange={(k, v) => setInfo((p) => ({ ...p, [k]: v }))}
            />
          )}
          {step === 2 && (
            <CourseContentStep modules={modules} setModules={setModules} />
          )}
          {step === 3 && <PreviewPublishStep info={info} modules={modules} />}
        </div>
      </div>

      {/* Sticky footer */}
      <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() =>
              step === 1 ? router.push('/educator/courses') : setStep((s) => s - 1)
            }
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Save draft
            </Button>
            {step < 3 ? (
              <Button
                variant="secondary"
                className="gap-2"
                onClick={() => setStep((s) => s + 1)}
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="secondary" className="gap-2">
                Submit to Admin
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
