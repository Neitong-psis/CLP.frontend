'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Brain,
  CheckCircle2,
  ClipboardList,
  FileText,
  FileVideo,
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
  UploadCloud,
  Video,
  X,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCreateCourseT } from '@/i18n';
import type { ContentSection, QuizQuestion, SectionType } from '../_lib/types';
import {
  uid,
  makeQuizQuestion,
  deriveAnswerFormat,
  moveItem,
} from '../_lib/builder';
import { inputCls } from './form';
import { RowControls } from './RowControls';
import { DatePicker } from '@/components/ui/DatePicker';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// Lazy + client-only: keeps the Tiptap bundle out of the initial wizard load
// and sidesteps SSR for the editor entirely.
const RichEditor = dynamic(
  () =>
    import('@/components/ui/RichEditor/RichEditor').then((m) => m.RichEditor),
  {
    ssr: false,
    loading: () => (
      <div className="border-border/50 bg-background h-40 animate-pulse rounded-lg border" />
    ),
  },
);

export const SECTION_ICONS: Record<SectionType, React.ElementType> = {
  text: FileText,
  image: ImageIcon,
  video: Video,
  quiz: Brain,
  assignment: ClipboardList,
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
  const t = useCreateCourseT();
  const Icon = SECTION_ICONS[section.type];
  const typeLabel = t(`content.section.${section.type}`);

  return (
    <div className="animate-fade-in border-border/50 bg-card rounded-lg border">
      <div className="border-border/50 flex items-center gap-2 border-b px-4 py-2.5">
        <Icon className="text-muted-foreground h-3.5 w-3.5" />
        <span className="text-foreground/80 text-xs font-semibold">
          {typeLabel}
        </span>
        <button
          type="button"
          onClick={onDelete}
          aria-label={t('content.section.removeAriaLabel', { type: typeLabel })}
          className="text-muted-foreground/40 ml-auto transition hover:text-rose-500"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="p-4">
        {section.type === 'text' && (
          <RichEditor
            value={section.text}
            onChange={(json) => onUpdate({ ...section, text: json })}
            placeholder={t('content.section.textPlaceholder')}
          />
        )}

        {section.type === 'image' && (
          <ImageBlock section={section} onUpdate={onUpdate} />
        )}

        {section.type === 'video' && (
          <VideoBlock section={section} onUpdate={onUpdate} />
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
  const t = useCreateCourseT();
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
              {t('content.section.imageReplace')}
            </button>
            <button
              type="button"
              onClick={() => onUpdate({ ...section, imageUrl: '' })}
              className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-rose-600 shadow-sm transition hover:bg-white"
            >
              {t('content.section.imageRemove')}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="border-border text-muted-foreground flex h-24 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-xs transition hover:border-blue-900 hover:text-blue-950 dark:hover:border-amber-400 dark:hover:text-amber-400"
        >
          <ImageIcon className="h-5 w-5" />
          {t('content.section.imageClickUpload')}
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

// ── Video block ───────────────────────────────────────────────────────────────

const VIDEO_URL_PATTERNS = [
  /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/i,
  /^https?:\/\/(www\.)?vimeo\.com\//i,
  /\.(mp4|webm|mov|m4v)(\?.*)?$/i,
];

function isValidVideoUrl(url: string): boolean {
  const trimmed = url.trim();
  return trimmed !== '' && VIDEO_URL_PATTERNS.some((p) => p.test(trimmed));
}

const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const MAX_VIDEO_MB = 500;

type UrlStatus = 'idle' | 'checking' | 'valid' | 'invalid';

function VideoBlock({
  section,
  onUpdate,
}: {
  section: ContentSection;
  onUpdate: (s: ContentSection) => void;
}) {
  const t = useCreateCourseT();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const [verifiedUrl, setVerifiedUrl] = useState(section.videoUrl);
  const [verifiedResult, setVerifiedResult] = useState(() =>
    isValidVideoUrl(section.videoUrl),
  );

  useEffect(() => {
    if (section.videoFileName || !section.videoUrl.trim()) return;
    if (section.videoUrl === verifiedUrl) return;
    const timer = setTimeout(() => {
      setVerifiedUrl(section.videoUrl);
      setVerifiedResult(isValidVideoUrl(section.videoUrl));
    }, 600);
    return () => clearTimeout(timer);
  }, [section.videoUrl, section.videoFileName, verifiedUrl]);

  const displayStatus: UrlStatus =
    section.videoFileName || !section.videoUrl.trim()
      ? 'idle'
      : section.videoUrl === verifiedUrl
        ? verifiedResult
          ? 'valid'
          : 'invalid'
        : 'checking';

  function acceptFile(file: File | undefined) {
    if (!file) return;
    if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      setFileError(t('content.section.videoFileTypeError'));
      return;
    }
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      setFileError(t('content.section.videoFileSizeError'));
      return;
    }
    setFileError(null);
    onUpdate({
      ...section,
      videoUrl: URL.createObjectURL(file),
      videoFileName: file.name,
    });
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <MiniLabel>{t('content.section.videoTitle')}</MiniLabel>
          <input
            type="text"
            placeholder={t('content.section.videoTitlePlaceholder')}
            value={section.videoTitle}
            onChange={(e) =>
              onUpdate({ ...section, videoTitle: e.target.value })
            }
            className={cn(inputCls, 'text-xs')}
          />
        </div>

        <div>
          <MiniLabel>{t('content.section.videoLink')}</MiniLabel>
          <div className="relative">
            <input
              type="url"
              placeholder={t('content.section.videoLinkPlaceholder')}
              value={section.videoFileName ? '' : section.videoUrl}
              disabled={Boolean(section.videoFileName)}
              onChange={(e) =>
                onUpdate({ ...section, videoUrl: e.target.value })
              }
              className={cn(
                inputCls,
                'pr-8 text-xs transition-colors',
                displayStatus === 'valid' &&
                  'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20',
                displayStatus === 'invalid' &&
                  'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
                section.videoFileName && 'cursor-not-allowed opacity-50',
              )}
            />
            <span className="absolute top-1/2 right-2.5 -translate-y-1/2">
              {displayStatus === 'checking' && (
                <Loader2 className="text-muted-foreground h-3.5 w-3.5 animate-spin" />
              )}
              {displayStatus === 'valid' && (
                <CheckCircle2 className="animate-in zoom-in h-3.5 w-3.5 text-emerald-500 duration-200" />
              )}
              {displayStatus === 'invalid' && (
                <XCircle className="animate-in zoom-in h-3.5 w-3.5 text-rose-500 duration-200" />
              )}
            </span>
          </div>
          {displayStatus === 'invalid' && (
            <p className="animate-in fade-in mt-1 text-[10px] text-rose-500">
              {t('content.section.videoLinkInvalid')}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-border h-px flex-1" />
        <span className="text-muted-foreground/60 text-[10px] font-semibold uppercase">
          {t('content.section.videoOr')}
        </span>
        <div className="bg-border h-px flex-1" />
      </div>

      {section.videoFileName ? (
        <div className="animate-in fade-in zoom-in-95 flex items-center gap-3 rounded-lg border border-emerald-500/30 bg-emerald-50 px-3 py-2.5 duration-200 dark:bg-emerald-500/10">
          <FileVideo className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="text-foreground min-w-0 flex-1 truncate text-xs font-medium">
            {section.videoFileName}
          </span>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-[11px] font-semibold text-blue-950 transition hover:opacity-75 dark:text-amber-400"
          >
            {t('content.section.videoReplace')}
          </button>
          <button
            type="button"
            onClick={() =>
              onUpdate({ ...section, videoUrl: '', videoFileName: '' })
            }
            aria-label={t('content.section.videoRemove')}
            className="text-muted-foreground/40 shrink-0 transition hover:text-rose-500"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            acceptFile(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed py-6 text-xs transition-all duration-200',
            dragActive
              ? 'scale-[1.01] border-blue-900 bg-blue-950/5 dark:border-amber-400 dark:bg-amber-400/10'
              : 'border-border text-muted-foreground hover:text-foreground hover:border-blue-900/50 dark:hover:border-amber-400/50',
          )}
        >
          <UploadCloud
            className={cn(
              'h-6 w-6 transition-transform duration-200',
              dragActive && '-translate-y-0.5 scale-110',
            )}
          />
          <span className="font-medium">
            {t('content.section.videoDropHint')}
          </span>
          <span className="text-muted-foreground/70 text-[10px]">
            {t('content.section.videoFileHint')}
          </span>
        </button>
      )}
      {fileError && (
        <p className="animate-in fade-in text-[10px] text-rose-500">
          {fileError}
        </p>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_VIDEO_TYPES.join(',')}
        className="hidden"
        onChange={(e) => acceptFile(e.target.files?.[0])}
      />

      <div>
        <MiniLabel>{t('content.section.videoDescription')}</MiniLabel>
        <RichEditor
          value={section.videoDescription}
          onChange={(json) => onUpdate({ ...section, videoDescription: json })}
          placeholder={t('content.section.videoDescriptionPlaceholder')}
        />
      </div>
    </div>
  );
}

function QuizQuestionCard({
  question,
  index,
  total,
  onUpdate,
  onMove,
  onDelete,
}: {
  question: QuizQuestion;
  index: number;
  total: number;
  onUpdate: (q: QuizQuestion) => void;
  onMove: (dir: 'up' | 'down') => void;
  onDelete: () => void;
}) {
  const t = useCreateCourseT();
  const format = deriveAnswerFormat(question.options);

  function toggleCorrect(index2: number, checked: boolean) {
    onUpdate({
      ...question,
      options: question.options.map((o, j) =>
        j === index2 ? { ...o, correct: checked } : o,
      ),
    });
  }

  return (
    <div className="group/question border-border/60 bg-background rounded-lg border p-3.5 transition-colors hover:border-blue-900/30 dark:hover:border-amber-400/30">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-950/10 text-[11px] font-bold text-blue-950 dark:bg-amber-400/10 dark:text-amber-400">
          {index + 1}
        </span>
        <input
          type="text"
          placeholder={t('content.section.quizQuestionPlaceholder')}
          value={question.question}
          onChange={(e) => onUpdate({ ...question, question: e.target.value })}
          className={cn(inputCls, 'flex-1 text-xs')}
        />
        <RowControls
          index={index}
          total={total}
          onMove={onMove}
          onDelete={onDelete}
          className="opacity-0 transition-opacity duration-200 group-hover/question:opacity-100 focus-within:opacity-100"
        />
      </div>

      <p className="text-muted-foreground mb-2 text-[11px] font-semibold">
        {t('content.section.quizSelectCorrect')}
      </p>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <div
            key={opt.id}
            className={cn(
              'animate-fade-in flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors',
              opt.correct
                ? 'border-blue-900/40 bg-blue-950/10 dark:border-amber-400/40 dark:bg-amber-400/10'
                : 'border-border/50 focus-within:border-border',
            )}
          >
            <input
              type="checkbox"
              checked={opt.correct}
              onChange={(e) => toggleCorrect(i, e.target.checked)}
              className="h-3.5 w-3.5 rounded accent-blue-950 dark:accent-amber-400"
            />
            <input
              type="text"
              value={opt.text}
              onChange={(e) =>
                onUpdate({
                  ...question,
                  options: question.options.map((o, j) =>
                    j === i ? { ...o, text: e.target.value } : o,
                  ),
                })
              }
              placeholder={t('content.section.quizOptionPlaceholder', {
                letter: String.fromCharCode(65 + i),
              })}
              className="text-foreground placeholder:text-muted-foreground/40 flex-1 bg-transparent text-xs outline-none"
            />
            {question.options.length > 2 && (
              <button
                type="button"
                onClick={() =>
                  onUpdate({
                    ...question,
                    options: question.options.filter((_, j) => j !== i),
                  })
                }
                aria-label={t('content.section.quizRemoveOption')}
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
            ...question,
            options: [
              ...question.options,
              { id: uid(), text: '', correct: false },
            ],
          })
        }
        className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-950 transition hover:opacity-75 dark:text-amber-400"
      >
        <Plus className="h-3 w-3" /> {t('content.section.quizAddOption')}
      </button>
      <p className="text-muted-foreground mt-2 text-[10px]">
        {format === undefined
          ? t('content.section.quizSelectPrompt')
          : format === 'single'
            ? t('content.section.quizSingleHint')
            : t('content.section.quizMultipleHint')}
      </p>
    </div>
  );
}

function QuizEditor({
  section,
  onUpdate,
}: {
  section: ContentSection;
  onUpdate: (s: ContentSection) => void;
}) {
  const t = useCreateCourseT();
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const questions = section.quizQuestions;

  function updateQuestion(i: number, updated: QuizQuestion) {
    onUpdate({
      ...section,
      quizQuestions: questions.map((q, j) => (j === i ? updated : q)),
    });
  }

  function moveQuestion(i: number, dir: 'up' | 'down') {
    onUpdate({ ...section, quizQuestions: moveItem(questions, i, dir) });
  }

  function deleteQuestion(i: number) {
    onUpdate({
      ...section,
      quizQuestions: questions.filter((_, j) => j !== i),
    });
  }

  function addQuestion() {
    onUpdate({ ...section, quizQuestions: [...questions, makeQuizQuestion()] });
  }

  function jumpTo(id: string) {
    questionRefs.current[id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_130px]">
      <div className="min-w-0 space-y-3">
        {questions.map((q, i) => (
          <div
            key={q.id}
            ref={(el) => {
              questionRefs.current[q.id] = el;
            }}
          >
            <QuizQuestionCard
              question={q}
              index={i}
              total={questions.length}
              onUpdate={(updated) => updateQuestion(i, updated)}
              onMove={(dir) => moveQuestion(i, dir)}
              onDelete={() => deleteQuestion(i)}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="border-border text-muted-foreground flex w-full items-center justify-center gap-1.5 rounded-lg border-2 border-dashed py-2.5 text-xs font-semibold transition hover:border-blue-900/50 hover:text-blue-950 dark:hover:border-amber-400/50 dark:hover:text-amber-400"
        >
          <Plus className="h-3.5 w-3.5" />{' '}
          {t('content.section.quizAddQuestion')}
        </button>
      </div>

      {/* Sticky question navigator — scoped to this quiz block only */}
      <div className="hidden lg:block">
        <div className="border-border bg-card sticky top-20 z-5 rounded-lg border p-2.5">
          <p className="text-muted-foreground mb-1.5 px-1 text-[10px] font-semibold tracking-wide uppercase">
            {t('content.section.quizQuestionsNav')}
          </p>
          {questions.length === 0 ? (
            <div className="flex flex-col items-center gap-1.5 px-2 py-4 text-center">
              <Brain className="text-muted-foreground/40 h-4 w-4" />
              <p className="text-muted-foreground text-[11px]">
                {t('content.section.quizNavEmpty')}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => jumpTo(q.id)}
                  className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-medium transition-colors"
                >
                  <span className="bg-muted text-foreground/70 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    {q.question ||
                      t('content.section.quizUntitled', { n: i + 1 })}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const SUBMISSION_TYPES = [
  { value: 'file', labelKey: 'content.section.submissionFileUpload' },
  { value: 'text', labelKey: 'content.section.submissionText' },
  { value: 'url', labelKey: 'content.section.submissionUrl' },
] as const;

function AssignmentEditor({
  section,
  onUpdate,
}: {
  section: ContentSection;
  onUpdate: (s: ContentSection) => void;
}) {
  const t = useCreateCourseT();
  const thisYear = new Date().getFullYear();

  return (
    <div className="space-y-3">
      <div>
        <MiniLabel>{t('content.section.assignmentTitle')}</MiniLabel>
        <textarea
          rows={3}
          placeholder={t('content.section.assignmentPlaceholder')}
          value={section.assignmentDesc}
          onChange={(e) =>
            onUpdate({ ...section, assignmentDesc: e.target.value })
          }
          className={cn(inputCls, 'resize-y text-xs')}
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <MiniLabel>{t('content.section.dueDate')}</MiniLabel>
          <DatePicker
            value={section.dueDate}
            onChange={(v) => onUpdate({ ...section, dueDate: v })}
            placeholder={t('content.section.dueDatePlaceholder')}
            clearLabel={t('content.section.dueDateClear')}
            todayLabel={t('content.section.dueDateToday')}
            disableFuture={false}
            disablePast
            fromYear={thisYear}
            toYear={thisYear + 5}
            className="h-9 text-xs"
          />
        </div>
        <div>
          <MiniLabel>{t('content.section.submissionType')}</MiniLabel>
          <Select
            items={Object.fromEntries(
              SUBMISSION_TYPES.map(({ value, labelKey }) => [
                value,
                t(labelKey),
              ]),
            )}
            value={section.submissionType}
            onValueChange={(v) =>
              onUpdate({ ...section, submissionType: v ?? '' })
            }
          >
            <SelectTrigger className="h-9 w-full rounded-lg text-xs">
              <SelectValue
                placeholder={t('content.section.submissionTypeSelect')}
              />
            </SelectTrigger>
            <SelectContent
              align="start"
              alignItemWithTrigger={false}
              className="w-full min-w-[var(--anchor-width)]"
            >
              {SUBMISSION_TYPES.map(({ value, labelKey }) => (
                <SelectItem key={value} value={value}>
                  {t(labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
