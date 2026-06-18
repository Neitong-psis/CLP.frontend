'use client';

import { useRef } from 'react';
import {
  Brain,
  ClipboardList,
  FileText,
  ImageIcon,
  Plus,
  Trash2,
  Video,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { ContentSection, QuizOption, SectionType } from '../_lib/types';
import { uid } from '../_lib/builder';
import { SelectField, inputCls } from './form';

export const SECTION_ICONS: Record<SectionType, React.ElementType> = {
  text: FileText,
  image: ImageIcon,
  video: Video,
  quiz: Brain,
  assignment: ClipboardList,
};

export const SECTION_LABELS: Record<SectionType, string> = {
  text: 'Text',
  image: 'Image',
  video: 'Video',
  quiz: 'Quiz',
  assignment: 'Assignment',
};

function MiniLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground mb-1 text-[11px] font-semibold">
      {children}
    </p>
  );
}

export function SectionItem({
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
    <div className="animate-fade-in border-border/50 bg-card overflow-hidden rounded-lg border">
      <div className="border-border/50 flex items-center gap-2 border-b px-4 py-2.5">
        <Icon className="text-muted-foreground h-3.5 w-3.5" />
        <span className="text-foreground/80 text-xs font-semibold">
          {SECTION_LABELS[section.type]}
        </span>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Remove ${SECTION_LABELS[section.type]} section`}
          className="text-muted-foreground/40 ml-auto transition hover:text-rose-500"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="p-4">
        {section.type === 'text' && (
          <textarea
            rows={4}
            placeholder="Write the lesson text content…"
            value={section.text}
            onChange={(e) => onUpdate({ ...section, text: e.target.value })}
            className={cn(inputCls, 'resize-y text-xs')}
          />
        )}

        {section.type === 'image' && (
          <ImageBlock section={section} onUpdate={onUpdate} />
        )}

        {section.type === 'video' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <MiniLabel>Video Title</MiniLabel>
              <input
                type="text"
                placeholder="Video Title"
                value={section.videoTitle}
                onChange={(e) =>
                  onUpdate({ ...section, videoTitle: e.target.value })
                }
                className={cn(inputCls, 'text-xs')}
              />
            </div>
            <div>
              <MiniLabel>YouTube, Vimeo, or .mp4 link</MiniLabel>
              <input
                type="url"
                placeholder="https://..."
                value={section.videoUrl}
                onChange={(e) =>
                  onUpdate({ ...section, videoUrl: e.target.value })
                }
                className={cn(inputCls, 'text-xs')}
              />
            </div>
          </div>
        )}

        {section.type === 'quiz' && (
          <QuizEditor section={section} onUpdate={onUpdate} />
        )}

        {section.type === 'assignment' && (
          <AssignmentEditor section={section} onUpdate={onUpdate} />
        )}
      </div>
    </div>
  );
}

function ImageBlock({
  section,
  onUpdate,
}: {
  section: ContentSection;
  onUpdate: (s: ContentSection) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function readImage(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      onUpdate({ ...section, imageUrl: (ev.target?.result as string) ?? '' });
    reader.readAsDataURL(file);
  }

  return (
    <>
      {section.imageUrl ? (
        <div className="group/img border-border relative overflow-hidden rounded-lg border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={section.imageUrl}
            alt="Lesson"
            className="max-h-52 w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/30 opacity-0 backdrop-blur-[1px] transition group-hover/img:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-zinc-800 shadow-sm transition hover:bg-white"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onUpdate({ ...section, imageUrl: '' })}
              className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-rose-600 shadow-sm transition hover:bg-white"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="border-border text-muted-foreground flex h-24 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-xs transition hover:border-blue-400 hover:text-blue-600"
        >
          <ImageIcon className="h-5 w-5" />
          Click to upload lesson image
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => readImage(e.target.files?.[0])}
      />
    </>
  );
}

function QuizEditor({
  section,
  onUpdate,
}: {
  section: ContentSection;
  onUpdate: (s: ContentSection) => void;
}) {
  const isSingle = section.answerFormat === 'single';

  function setFormat(fmt: ContentSection['answerFormat']) {
    let options = section.options;
    if (fmt === 'single') {
      let kept = false;
      options = section.options.map((o) => {
        if (o.correct && !kept) {
          kept = true;
          return o;
        }
        return o.correct ? { ...o, correct: false } : o;
      });
    }
    onUpdate({ ...section, answerFormat: fmt, options });
  }

  function setCorrect(index: number, checked: boolean) {
    const options: QuizOption[] = section.options.map((o, j) => {
      if (isSingle) return { ...o, correct: j === index };
      return j === index ? { ...o, correct: checked } : o;
    });
    onUpdate({ ...section, options });
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <div className="w-full flex-1">
          <MiniLabel>Question</MiniLabel>
          <input
            type="text"
            placeholder="Ask a question..."
            value={section.question}
            onChange={(e) => onUpdate({ ...section, question: e.target.value })}
            className={cn(inputCls, 'text-xs')}
          />
        </div>
        <div className="shrink-0">
          <MiniLabel>Answer format</MiniLabel>
          <div className="border-border flex overflow-hidden rounded-lg border text-[11px] font-semibold">
            {(['single', 'multiple'] as const).map((fmt, i) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={cn(
                  'px-3 py-1.5 transition-colors',
                  i > 0 && 'border-border border-l',
                  section.answerFormat === fmt
                    ? 'bg-blue-600 text-white'
                    : 'text-muted-foreground hover:bg-muted/40',
                )}
              >
                {fmt === 'single' ? 'Single Choice' : 'Multiple Choice'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <p className="text-muted-foreground mb-2 text-[11px] font-semibold">
          {isSingle
            ? 'Select the correct answer'
            : 'Select all correct answers'}
        </p>
        <div className="space-y-2">
          {section.options.map((opt, i) => (
            <div
              key={opt.id}
              className={cn(
                'animate-fade-in flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors',
                opt.correct
                  ? 'border-blue-200 bg-blue-50/50'
                  : 'border-border/50 focus-within:border-border',
              )}
            >
              <input
                type={isSingle ? 'radio' : 'checkbox'}
                name={isSingle ? `correct-${section.id}` : undefined}
                checked={opt.correct}
                onChange={(e) => setCorrect(i, e.target.checked)}
                className="h-3.5 w-3.5 accent-blue-600"
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
                className="text-foreground placeholder:text-muted-foreground/40 flex-1 bg-transparent text-xs outline-none"
              />
              {section.options.length > 2 && (
                <button
                  type="button"
                  onClick={() =>
                    onUpdate({
                      ...section,
                      options: section.options.filter((_, j) => j !== i),
                    })
                  }
                  aria-label="Remove option"
                  className="text-muted-foreground/40 transition hover:text-rose-500"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
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
          className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 transition hover:opacity-75"
        >
          <Plus className="h-3 w-3" /> Add option
        </button>
        <p className="text-muted-foreground mt-2 text-[10px]">
          {isSingle
            ? 'Single choice — learners pick exactly one correct answer.'
            : 'Multiple choice — learners can select more than one correct answer.'}
        </p>
      </div>
    </div>
  );
}

function AssignmentEditor({
  section,
  onUpdate,
}: {
  section: ContentSection;
  onUpdate: (s: ContentSection) => void;
}) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-3">
      <div>
        <MiniLabel>Lesson Assignment</MiniLabel>
        <textarea
          rows={3}
          placeholder="Assignment description, expected outcome, and submission requirements..."
          value={section.assignmentDesc}
          onChange={(e) =>
            onUpdate({ ...section, assignmentDesc: e.target.value })
          }
          className={cn(inputCls, 'resize-y text-xs')}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <MiniLabel>Due date</MiniLabel>
          <input
            type="date"
            min={today}
            value={section.dueDate}
            onChange={(e) => onUpdate({ ...section, dueDate: e.target.value })}
            className={cn(inputCls, 'text-xs')}
          />
        </div>
        <div>
          <MiniLabel>Submission type</MiniLabel>
          <SelectField
            value={section.submissionType}
            onChange={(v) => onUpdate({ ...section, submissionType: v })}
            className="text-xs"
          >
            <option value="">Select...</option>
            <option>File upload</option>
            <option>Text submission</option>
            <option>URL link</option>
          </SelectField>
        </div>
      </div>
    </div>
  );
}
