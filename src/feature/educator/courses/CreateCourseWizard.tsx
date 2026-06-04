'use client';

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  type DragEvent,
  type KeyboardEvent,
} from 'react';
import {
  useForm,
  Controller,
  type Resolver,
  type SubmitHandler,
  type UseFormRegister,
  type Control,
  type UseFormWatch,
  type UseFormSetValue,
  type FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  X,
  BookOpen,
  Upload,
  Plus,
  Loader2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Eye,
  EyeOff,
  ImageIcon,
  Trash2,
  CheckCircle2,
  Check,
  CheckSquare,
  FileText,
  Video,
  Brain,
  ClipboardList,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/TextArea';
import { Field, FieldLabel as UIFieldLabel } from '@/components/ui/Field';
import { Label } from '@/components/ui/Label';
import {
  courseSchema,
  type CourseFormValues,
  CATEGORIES,
  LEVELS,
  MAX_DESCRIPTION,
} from '@/config/course';

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

// ─── Shared classes ───────────────────────────────────────────────────────────

const LABEL_CLS =
  'text-xs font-semibold tracking-wide text-slate-500 uppercase';
const SELECT_CLS =
  'border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full appearance-none rounded-lg border bg-white px-2.5 py-1 text-sm text-slate-800 outline-none transition-colors focus-visible:ring-3';

// ─── FormField ────────────────────────────────────────────────────────────────

function FormField({
  label,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Field className={cn('flex flex-col gap-1.5', className)}>
      <UIFieldLabel>
        <Label className={LABEL_CLS}>
          {label}
          {required && <span className="text-brand-gold ml-0.5">*</span>}
        </Label>
      </UIFieldLabel>
      {children}
      {error ? (
        <p className="flex items-center gap-1 text-[12px] font-medium text-red-500">
          <AlertTriangle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-[12px] text-slate-400">{hint}</p>
      ) : null}
    </Field>
  );
}

// ─── Tag input ────────────────────────────────────────────────────────────────

function TagInput({
  value,
  onChange,
  hasError,
}: {
  value: string[];
  onChange: (t: string[]) => void;
  hasError?: boolean;
}) {
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const commit = useCallback(
    (raw: string) => {
      const tag = raw.trim().toLowerCase().replace(/\s+/g, '-');
      if (tag && !value.includes(tag) && value.length < 10)
        onChange([...value, tag]);
      setDraft('');
    },
    [value, onChange],
  );
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      commit(draft);
    }
    if (e.key === 'Backspace' && draft === '' && value.length)
      onChange(value.slice(0, -1));
  };
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        'flex min-h-9 cursor-text flex-wrap items-center gap-1.5 rounded-lg border bg-white px-3 py-2 transition-all focus-within:ring-2',
        hasError
          ? 'border-red-300 focus-within:border-red-400 focus-within:ring-red-100'
          : 'focus-within:border-brand-gold focus-within:ring-brand-gold/15 border-slate-200',
      )}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="bg-brand-gold/10 text-brand-gold flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange(value.filter((t) => t !== tag));
            }}
            className="text-brand-gold/60 hover:text-brand-gold ml-0.5 rounded-full transition"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKey}
        onBlur={() => draft && commit(draft)}
        placeholder={value.length === 0 ? 'Type and press Enter…' : ''}
        className="min-w-24 flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
      />
    </div>
  );
}

// ─── Thumbnail upload ─────────────────────────────────────────────────────────

function ThumbnailUpload({
  value,
  onChange,
}: {
  value: File | null;
  onChange: (f: File | null) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const preview = useMemo(
    () => (value ? URL.createObjectURL(value) : null),
    [value],
  );
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);
  const accept = (file: File) => {
    if (file.type.startsWith('image/')) onChange(file);
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) accept(f);
  };

  if (preview) {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-slate-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview}
          alt="Thumbnail"
          className="aspect-video w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow transition hover:bg-white"
          >
            <Upload className="h-3 w-3" /> Replace
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex items-center gap-1.5 rounded-lg bg-red-500/90 px-3 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-red-500"
          >
            <Trash2 className="h-3 w-3" /> Remove
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && accept(e.target.files[0])}
        />
      </div>
    );
  }
  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => fileRef.current?.click()}
      className={cn(
        'flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed py-8 text-center transition-all duration-150',
        isDragging
          ? 'border-brand-gold bg-brand-gold/5 scale-[1.01]'
          : 'hover:border-brand-gold hover:bg-brand-gold/5 border-slate-200 bg-slate-50/50',
      )}
    >
      <ImageIcon
        className={cn(
          'h-7 w-7 transition-colors',
          isDragging ? 'text-brand-gold' : 'text-slate-300',
        )}
      />
      <span className="text-xs font-semibold text-slate-500">
        {isDragging ? 'Drop to upload' : 'Click to upload'}
      </span>
      <span className="text-[11px] text-slate-400">16:9 recommended</span>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && accept(e.target.files[0])}
      />
    </div>
  );
}

// ─── Visibility toggle ────────────────────────────────────────────────────────

function VisibilityToggle({
  value,
  onChange,
}: {
  value: 'draft' | 'published';
  onChange: (v: 'draft' | 'published') => void;
}) {
  const opts = [
    {
      value: 'draft' as const,
      label: 'Draft',
      icon: EyeOff,
      desc: 'Only visible to you',
    },
    {
      value: 'published' as const,
      label: 'Published',
      icon: Eye,
      desc: 'Visible to everyone',
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {opts.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-150',
              active
                ? 'border-brand-gold bg-brand-gold/5 ring-brand-gold/30 ring-1'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50',
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                active
                  ? 'bg-brand-gold text-white'
                  : 'bg-slate-100 text-slate-400',
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p
                className={cn(
                  'text-sm font-semibold',
                  active ? 'text-brand-navy' : 'text-slate-700',
                )}
              >
                {opt.label}
              </p>
              <p className="text-[11px] text-slate-400">{opt.desc}</p>
            </div>
            {active && (
              <CheckCircle2 className="text-brand-gold ml-auto h-4 w-4 shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Unsaved warning ──────────────────────────────────────────────────────────

function UnsavedWarning({
  onDiscard,
  onKeep,
}: {
  onDiscard: () => void;
  onKeep: () => void;
}) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in-95 mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl duration-150">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Unsaved changes</h3>
        <p className="mt-1.5 text-sm text-slate-500">
          You have unsaved changes. Are you sure you want to close without
          saving?
        </p>
        <div className="mt-5 flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onKeep}>
            Keep editing
          </Button>
          <Button variant="destructive" className="flex-1" onClick={onDiscard}>
            Discard
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Step bar ─────────────────────────────────────────────────────────────────

const STEPS = [
  { title: 'Course Info', desc: 'Details, thumbnail & pricing' },
  { title: 'Course Content', desc: 'Modules & lessons' },
  { title: 'Preview & Publish', desc: 'Review final summary' },
];

function StepBar({ current }: { current: number }) {
  return (
    <div className="grid grid-cols-3 gap-3 border-b border-slate-100 bg-slate-50 px-6 py-4">
      {STEPS.map((step, i) => {
        const n = i + 1;
        const isActive = current === n;
        const isDone = current > n;
        return (
          <div
            key={n}
            className={cn(
              'flex items-center gap-2.5 rounded-xl border p-3 transition-colors',
              isActive
                ? 'border-brand-gold bg-white shadow-sm'
                : 'border-slate-200 bg-white',
            )}
          >
            <div
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                isDone || isActive
                  ? 'bg-brand-gold text-white'
                  : 'bg-slate-100 text-slate-400',
              )}
            >
              {isDone ? <Check className="h-3.5 w-3.5" /> : n}
            </div>
            <div className="min-w-0">
              <p
                className={cn(
                  'truncate text-xs font-bold',
                  isActive ? 'text-brand-navy' : 'text-slate-500',
                )}
              >
                {step.title}
              </p>
              <p className="truncate text-[10px] text-slate-400">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────

type Step1Props = {
  register: UseFormRegister<CourseFormValues>;
  control: Control<CourseFormValues>;
  watch: UseFormWatch<CourseFormValues>;
  setValue: UseFormSetValue<CourseFormValues>;
  errors: FieldErrors<CourseFormValues>;
  thumbnail: File | null;
  setThumbnail: (f: File | null) => void;
  subtitle: string;
  setSubtitle: (s: string) => void;
  pricingType: 'paid' | 'free';
  setPricingType: (t: 'paid' | 'free') => void;
};

function Step1CourseInfo({
  register,
  control,
  watch,
  setValue,
  errors,
  thumbnail,
  setThumbnail,
  subtitle,
  setSubtitle,
  pricingType,
  setPricingType,
}: Step1Props) {
  const descChars = (watch('description') ?? '').length;

  return (
    <div className="grid grid-cols-[1fr_200px] gap-8">
      <div className="space-y-5">
        <FormField label="Course Title" error={errors.title?.message} required>
          <Input
            {...register('title')}
            type="text"
            placeholder="e.g. Complete React & TypeScript Bootcamp"
            autoFocus
            className={cn(
              'h-9',
              errors.title && 'border-red-300 focus-visible:border-red-400',
            )}
          />
        </FormField>

        <Field>
          <UIFieldLabel>
            <Label className={LABEL_CLS}>Subtitle</Label>
          </UIFieldLabel>
          <Input
            type="text"
            placeholder="Course Subtitle"
            value={subtitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSubtitle(e.target.value)
            }
            className="h-9"
          />
        </Field>

        <FormField
          label="Description"
          error={errors.description?.message}
          required
        >
          <div className="relative">
            <Textarea
              {...register('description')}
              rows={4}
              placeholder="What will students learn? Who is this course for?"
              className={cn(
                'resize-none pb-7',
                errors.description && 'border-red-300',
              )}
            />
            <span
              className={cn(
                'absolute right-3 bottom-2.5 text-[11px] font-medium transition-colors',
                descChars > MAX_DESCRIPTION * 0.9
                  ? descChars >= MAX_DESCRIPTION
                    ? 'text-red-500'
                    : 'text-amber-500'
                  : 'text-slate-400',
              )}
            >
              {descChars}/{MAX_DESCRIPTION}
            </span>
          </div>
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Category" error={errors.category?.message} required>
            <div className="relative">
              <select
                {...register('category')}
                className={cn(SELECT_CLS, errors.category && 'border-red-300')}
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </FormField>
          <FormField label="Level" error={errors.level?.message} required>
            <div className="relative">
              <select
                {...register('level')}
                className={cn(SELECT_CLS, errors.level && 'border-red-300')}
              >
                <option value="">Select level</option>
                {LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </FormField>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <p className="mb-3 text-xs font-bold tracking-wide text-slate-500 uppercase">
            Pricing
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <UIFieldLabel>
                <Label className={LABEL_CLS}>Pricing type</Label>
              </UIFieldLabel>
              <div className="relative">
                <select
                  value={pricingType}
                  onChange={(e) => {
                    const t = e.target.value as 'paid' | 'free';
                    setPricingType(t);
                    if (t === 'free') setValue('price', 0);
                  }}
                  className={SELECT_CLS}
                >
                  <option value="paid">Paid / cost</option>
                  <option value="free">Free</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              </div>
            </Field>
            <FormField label="Enter price" error={errors.price?.message}>
              <div
                className={cn(
                  'flex items-center overflow-hidden rounded-lg border bg-white transition-all focus-within:ring-2',
                  errors.price
                    ? 'border-red-300 focus-within:ring-red-100'
                    : 'focus-within:border-brand-gold focus-within:ring-brand-gold/15 border-slate-200',
                )}
              >
                <span className="shrink-0 border-r border-slate-200 bg-slate-50 px-3 py-2 text-slate-400">
                  <DollarSign className="h-3.5 w-3.5" />
                </span>
                <input
                  {...register('price')}
                  type="number"
                  min={0}
                  step={0.01}
                  placeholder="79"
                  disabled={pricingType === 'free'}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none disabled:opacity-40"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Price shown in USD ($).
              </p>
            </FormField>
          </div>
        </div>

        <FormField
          label="Duration"
          error={errors.duration?.message}
          hint={!errors.duration ? 'e.g. 12 hours, 6 weeks' : undefined}
          required
        >
          <Input
            {...register('duration')}
            type="text"
            placeholder="e.g. 12 hours"
            className={cn('h-9', errors.duration && 'border-red-300')}
          />
        </FormField>

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <FormField
              label="Tags"
              error={errors.tags?.message}
              hint={
                !errors.tags
                  ? 'Press Enter or comma to add · max 10 tags'
                  : undefined
              }
            >
              <TagInput
                value={field.value}
                onChange={field.onChange}
                hasError={!!errors.tags}
              />
            </FormField>
          )}
        />
      </div>

      <div className="shrink-0">
        <Field>
          <UIFieldLabel>
            <Label className={LABEL_CLS}>Thumbnail</Label>
          </UIFieldLabel>
          <ThumbnailUpload value={thumbnail} onChange={setThumbnail} />
          <p className="mt-2 text-[11px] text-slate-400">
            PNG or JPG. Shown on the course card.
          </p>
        </Field>
      </div>
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────

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
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
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
            <Input
              type="text"
              placeholder="Text Content"
              value={section.text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdate({ ...section, text: e.target.value })
              }
              className="h-8 text-xs"
            />
            <Textarea
              rows={3}
              placeholder="Write lesson text content..."
              className="resize-none text-xs"
            />
          </div>
        )}
        {section.type === 'image' && (
          <button
            type="button"
            className="hover:border-brand-gold hover:text-brand-gold flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-xs text-slate-400 transition"
          >
            Click to upload lesson image
          </button>
        )}
        {section.type === 'video' && (
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <UIFieldLabel>
                <Label className={LABEL_CLS}>Video Title</Label>
              </UIFieldLabel>
              <Input
                type="text"
                placeholder="Video Title"
                value={section.videoTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onUpdate({ ...section, videoTitle: e.target.value })
                }
                className="h-8 text-xs"
              />
            </Field>
            <Field>
              <UIFieldLabel>
                <Label className={LABEL_CLS}>
                  YouTube, Vimeo, or .mp4 link
                </Label>
              </UIFieldLabel>
              <Input
                type="url"
                placeholder="https://..."
                value={section.videoUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onUpdate({ ...section, videoUrl: e.target.value })
                }
                className="h-8 text-xs"
              />
            </Field>
          </div>
        )}
        {section.type === 'quiz' && (
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Field className="flex-1">
                <UIFieldLabel>
                  <Label className={LABEL_CLS}>Question</Label>
                </UIFieldLabel>
                <Input
                  type="text"
                  placeholder="Ask a question..."
                  value={section.question}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onUpdate({ ...section, question: e.target.value })
                  }
                  className="h-8 text-xs"
                />
              </Field>
              <div className="shrink-0">
                <p className="mb-1.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                  Answer format
                </p>
                <div className="flex overflow-hidden rounded-lg border border-slate-200 text-[11px] font-semibold">
                  {(['single', 'multiple'] as const).map((fmt, i) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() =>
                        onUpdate({ ...section, answerFormat: fmt })
                      }
                      className={cn(
                        'px-3 py-1.5 transition-colors',
                        i > 0 && 'border-l border-slate-200',
                        section.answerFormat === fmt
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
                      className="accent-brand-gold h-3.5 w-3.5"
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
                      className="flex-1 bg-transparent text-xs text-slate-600 placeholder-slate-300 outline-none"
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
                className="text-brand-gold mt-2 flex items-center gap-1 text-xs font-semibold transition hover:opacity-75"
              >
                <Plus className="h-3 w-3" /> Add option
              </button>
            </div>
          </div>
        )}
        {section.type === 'assignment' && (
          <div className="space-y-3">
            <Field>
              <UIFieldLabel>
                <Label className={LABEL_CLS}>Lesson Assignment</Label>
              </UIFieldLabel>
              <Textarea
                rows={3}
                placeholder="Assignment description..."
                value={section.assignmentDesc}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onUpdate({ ...section, assignmentDesc: e.target.value })
                }
                className="resize-none text-xs"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <UIFieldLabel>
                  <Label className={LABEL_CLS}>Due date</Label>
                </UIFieldLabel>
                <Input
                  type="date"
                  value={section.dueDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onUpdate({ ...section, dueDate: e.target.value })
                  }
                  className="h-8 text-xs"
                />
              </Field>
              <Field>
                <UIFieldLabel>
                  <Label className={LABEL_CLS}>Submission type</Label>
                </UIFieldLabel>
                <div className="relative">
                  <select
                    value={section.submissionType}
                    onChange={(e) =>
                      onUpdate({ ...section, submissionType: e.target.value })
                    }
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
      <div
        className="flex cursor-pointer items-center gap-3 px-4 py-2.5"
        onClick={() => onUpdate({ ...lesson, expanded: !lesson.expanded })}
      >
        <CheckSquare className="text-brand-gold h-4 w-4 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-brand-navy truncate text-[13px] font-semibold">
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
          <Field>
            <UIFieldLabel>
              <Label className={LABEL_CLS}>Lesson title</Label>
            </UIFieldLabel>
            <Input
              type="text"
              value={lesson.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdate({ ...lesson, title: e.target.value })
              }
              className="h-9"
            />
          </Field>
          <div className="flex flex-wrap gap-2">
            {(
              [
                'text',
                'image',
                'video',
                'quiz',
                'assignment',
              ] as ContentSection['type'][]
            ).map((type) => {
              const Icon = SECTION_ICONS[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onAddSection(type)}
                  className="hover:border-brand-gold hover:text-brand-gold flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition"
                >
                  <Icon className="h-3 w-3" /> Add {SECTION_LABELS[type]}
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
                  onUpdate={(u) =>
                    onUpdate({
                      ...lesson,
                      sections: lesson.sections.map((s, j) =>
                        j === si ? u : s,
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
  const addLesson = () =>
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
  const updateLesson = (i: number, l: Lesson) =>
    onUpdate({ ...mod, lessons: mod.lessons.map((x, j) => (j === i ? l : x)) });
  const deleteLesson = (i: number) =>
    onUpdate({ ...mod, lessons: mod.lessons.filter((_, j) => j !== i) });
  const moveLesson = (i: number, dir: 'up' | 'down') => {
    const arr = [...mod.lessons];
    const t = dir === 'up' ? i - 1 : i + 1;
    [arr[i], arr[t]] = [arr[t], arr[i]];
    onUpdate({ ...mod, lessons: arr });
  };
  const addSection = (li: number, type: ContentSection['type']) => {
    const lesson = mod.lessons[li];
    updateLesson(li, {
      ...lesson,
      sections: [...lesson.sections, makeSection(type)],
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div
        className="flex cursor-pointer items-center gap-3 bg-slate-50 px-5 py-3.5"
        onClick={() => onUpdate({ ...mod, expanded: !mod.expanded })}
      >
        <BookOpen className="text-brand-gold h-4 w-4 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-brand-navy text-sm font-bold">
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
          <Field>
            <UIFieldLabel>
              <Label className={LABEL_CLS}>Module {modIndex + 1} title</Label>
            </UIFieldLabel>
            <Input
              type="text"
              value={mod.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onUpdate({ ...mod, title: e.target.value })
              }
              placeholder={`Module ${modIndex + 1}`}
              className="h-9"
            />
          </Field>
          <div className="space-y-3">
            {mod.lessons.map((lesson, li) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                lessonIndex={li}
                totalLessons={mod.lessons.length}
                onUpdate={(l) => updateLesson(li, l)}
                onDelete={() => deleteLesson(li)}
                onMove={(dir) => moveLesson(li, dir)}
                onAddSection={(type) => addSection(li, type)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addLesson}
            className="text-brand-gold flex items-center gap-1.5 text-xs font-semibold transition hover:opacity-75"
          >
            <Plus className="h-3.5 w-3.5" /> Add Lesson
          </button>
        </div>
      )}
    </div>
  );
}

function Step2CourseContent({
  modules,
  setModules,
}: {
  modules: CourseModule[];
  setModules: React.Dispatch<React.SetStateAction<CourseModule[]>>;
}) {
  const addModule = () =>
    setModules((p) => [
      ...p,
      {
        id: uid(),
        title: `Module ${p.length + 1}`,
        expanded: true,
        lessons: [],
      },
    ]);
  const updateModule = (i: number, m: CourseModule) =>
    setModules((p) => p.map((x, j) => (j === i ? m : x)));
  const deleteModule = (i: number) =>
    setModules((p) => p.filter((_, j) => j !== i));
  const moveModule = (i: number, dir: 'up' | 'down') =>
    setModules((p) => {
      const arr = [...p];
      const t = dir === 'up' ? i - 1 : i + 1;
      [arr[i], arr[t]] = [arr[t], arr[i]];
      return arr;
    });

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-brand-navy text-base font-bold">
            Course Curriculum
          </h2>
          <p className="text-xs text-slate-400">
            Build a scalable Module / Lesson / Content / Quiz / Assignment
            structure
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="shrink-0 gap-1.5"
          onClick={addModule}
          type="button"
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
              onUpdate={(m) => updateModule(i, m)}
              onDelete={() => deleteModule(i)}
              onMove={(dir) => moveModule(i, dir)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────

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
          <p className="text-brand-navy text-sm font-bold">{title}</p>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 py-5">{children}</div>
      )}
    </div>
  );
}

function Step3Preview({
  watch,
  control,
  thumbnail,
  modules,
}: {
  watch: UseFormWatch<CourseFormValues>;
  control: Control<CourseFormValues>;
  thumbnail: File | null;
  modules: CourseModule[];
}) {
  const title = watch('title');
  const description = watch('description');
  const category = watch('category');
  const level = watch('level');
  const price = watch('price');
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const previewUrl = useMemo(
    () => (thumbnail ? URL.createObjectURL(thumbnail) : null),
    [thumbnail],
  );
  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-brand-navy text-base font-bold">
          Step 3. Preview &amp; Publish
        </h2>
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
          <div className="shrink-0">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Thumbnail"
                className="h-28 w-44 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-28 w-44 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-400">
                No thumbnail
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-brand-navy text-base font-bold">
              {title || 'Course Title'}
            </p>
            <p className="text-xs text-slate-400">
              {description || 'Course Description'}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {category && (
                <span className="rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {category}
                </span>
              )}
              {level && (
                <span className="rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  {level}
                </span>
              )}
              {price === 0 ? (
                <span className="bg-brand-gold/15 text-brand-gold rounded-md px-2.5 py-0.5 text-xs font-semibold">
                  Free
                </span>
              ) : price ? (
                <span className="bg-brand-gold/15 text-brand-gold rounded-md px-2.5 py-0.5 text-xs font-semibold">
                  Paid ${price}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </AccordionSection>
      <AccordionSection
        title="2. Course Contents"
        desc={`${modules.length} module${modules.length !== 1 ? 's' : ''} · ${totalLessons} lesson${totalLessons !== 1 ? 's' : ''}.`}
      >
        {modules.length === 0 ? (
          <p className="text-sm text-slate-400">No modules added.</p>
        ) : (
          <div className="space-y-2">
            {modules.map((mod, i) => (
              <div key={mod.id} className="flex items-center gap-2 text-sm">
                <BookOpen className="text-brand-gold h-4 w-4" />
                <span className="text-brand-navy font-medium">
                  Module {i + 1}: {mod.title}
                </span>
                <span className="text-slate-400">
                  — {mod.lessons.length} lesson
                  {mod.lessons.length !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </AccordionSection>
      <AccordionSection
        title="3. Publish Settings"
        desc="Visibility and final action."
      >
        <Controller
          name="visibility"
          control={control}
          render={({ field }) => (
            <Field>
              <UIFieldLabel>
                <Label className={LABEL_CLS}>Visibility</Label>
              </UIFieldLabel>
              <VisibilityToggle value={field.value} onChange={field.onChange} />
            </Field>
          )}
        />
      </AccordionSection>
    </div>
  );
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

export default function CreateCourseWizard({
  onClose,
}: {
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [subtitle, setSubtitle] = useState('');
  const [pricingType, setPricingType] = useState<'paid' | 'free'>('paid');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema) as Resolver<CourseFormValues>,
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      category: '',
      level: undefined,
      price: 0,
      duration: '',
      tags: [],
      visibility: 'draft',
    },
  });

  const handleClose = useCallback(() => {
    if (isDirty || modules.length > 0) setShowWarning(true);
    else onClose();
  }, [isDirty, modules.length, onClose]);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose]);

  const handleNext = async () => {
    if (step === 1) {
      const valid = await trigger();
      if (!valid) return;
    }
    setStep((s) => s + 1);
  };

  const onSubmit: SubmitHandler<CourseFormValues> = async (data) => {
    await new Promise((r) => setTimeout(r, 1500));
    console.log('Course created:', { ...data, subtitle, thumbnail, modules });
    setSubmitSuccess(true);
    setTimeout(onClose, 800);
  };

  if (submitSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="animate-in fade-in zoom-in-95 flex flex-col items-center gap-4 rounded-2xl bg-white p-10 shadow-2xl duration-200">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900">Course Created!</p>
            <p className="mt-1 text-sm text-slate-500">Redirecting you back…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        onClick={handleClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wizard-title"
        className="animate-in fade-in slide-in-from-bottom-4 fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-8 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl ring-1 shadow-slate-900/10 ring-slate-900/5">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Header */}
            <div className="flex items-start gap-4 border-b border-slate-100 px-6 py-5">
              <div className="bg-brand-gold/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <BookOpen className="text-brand-gold h-5 w-5" />
              </div>
              <div className="flex-1">
                <h2
                  id="wizard-title"
                  className="text-base font-bold text-slate-900"
                >
                  Create New Course
                </h2>
                <p className="mt-0.5 text-[13px] text-slate-500">
                  Step {step} of 3 — {STEPS[step - 1].title}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <StepBar current={step} />

            <div className="px-6 py-6">
              {step === 1 && (
                <Step1CourseInfo
                  register={register}
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  thumbnail={thumbnail}
                  setThumbnail={setThumbnail}
                  subtitle={subtitle}
                  setSubtitle={setSubtitle}
                  pricingType={pricingType}
                  setPricingType={setPricingType}
                />
              )}
              {step === 2 && (
                <Step2CourseContent modules={modules} setModules={setModules} />
              )}
              {step === 3 && (
                <Step3Preview
                  watch={watch}
                  control={control}
                  thumbnail={thumbnail}
                  modules={modules}
                />
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 flex items-center justify-between gap-3 rounded-b-2xl border-t border-slate-100 bg-white/95 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="gap-2"
                    onClick={() => setStep((s) => s - 1)}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                )}
              </div>
              {isDirty && (
                <p className="flex items-center gap-1.5 text-[12px] text-amber-600">
                  <AlertTriangle className="h-3 w-3 shrink-0" /> Unsaved changes
                </p>
              )}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={handleSubmit((data) =>
                    onSubmit({ ...data, visibility: 'draft' }),
                  )}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : null}{' '}
                  Save Draft
                </Button>
                {step < 3 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    className="gap-2"
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    Next <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={isSubmitting}
                    className="min-w-32 gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />{' '}
                        Publishing…
                      </>
                    ) : (
                      <>
                        Submit to Admin <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {showWarning && (
        <UnsavedWarning
          onKeep={() => setShowWarning(false)}
          onDiscard={onClose}
        />
      )}
    </>
  );
}
