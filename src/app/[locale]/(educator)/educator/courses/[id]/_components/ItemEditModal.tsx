'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEducatorReviewT } from '@/i18n';
import { KIND_ICON } from '@/components/course-content/types';
import type {
  AssignmentItem,
  DocumentItem,
  QuizItem,
  QuizQuestion,
  ReviewItem,
  VideoItem,
} from '../_lib/content';

// Lazy + client-only: keeps the Tiptap bundle out of the initial page load
// and sidesteps SSR for the editor entirely — same pattern as the wizard's
// SectionItem.tsx.
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

type TFn = ReturnType<typeof useEducatorReviewT>;

const inputCls =
  'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-blue-900 dark:focus:border-amber-400 focus:ring-1 focus:ring-blue-900/20 dark:focus:ring-amber-400/20';
const labelCls = 'mb-1.5 block text-sm font-semibold text-foreground/80';

const EMPTY_DOC = { type: 'doc', content: [{ type: 'paragraph' }] };

/** Focused, single-item editor opened from Course Review's "Edit this item"
 *  action. Saves to local session state only — Course Review's content is a
 *  shared demo dataset with no per-course storage of its own (see
 *  `_lib/content.ts`), so there's nowhere real to persist this beyond the
 *  current viewing session. Back and Save both just close the modal, which
 *  is all "return to Course Review at the same point" requires since this
 *  is an overlay on top of the still-mounted page underneath. */
export function ItemEditModal({
  item,
  onSave,
  onClose,
}: {
  item: ReviewItem;
  onSave: (updated: ReviewItem) => void;
  onClose: () => void;
}) {
  const t = useEducatorReviewT();
  const [draft, setDraft] = useState<ReviewItem>(item);
  const Icon = KIND_ICON[item.kind];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm duration-150"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('editModal.editing', { title: item.title })}
        className="animate-in fade-in-0 zoom-in-95 bg-card flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl shadow-2xl duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-border flex items-center justify-between gap-3 border-b px-6 py-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
              <Icon className="text-muted-foreground h-4.5 w-4.5" />
            </span>
            <h2 className="text-foreground truncate text-base font-bold">
              {t('editModal.editing', { title: item.title })}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('editModal.back')}
            className="text-muted-foreground hover:bg-muted hover:text-foreground shrink-0 rounded-lg p-1.5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          {draft.kind === 'document' && (
            <DocumentFields draft={draft} onChange={setDraft} t={t} />
          )}
          {draft.kind === 'video' && (
            <VideoFields draft={draft} onChange={setDraft} t={t} />
          )}
          {draft.kind === 'quiz' && (
            <QuizFields draft={draft} onChange={setDraft} t={t} />
          )}
          {draft.kind === 'assignment' && (
            <AssignmentFields draft={draft} onChange={setDraft} t={t} />
          )}
        </div>

        <div className="border-border flex items-center justify-end gap-2.5 border-t px-6 py-4">
          <Button variant="outline" onClick={onClose}>
            {t('editModal.back')}
          </Button>
          <Button onClick={() => onSave(draft)}>{t('editModal.save')}</Button>
        </div>
      </div>
    </div>
  );
}

// ── Shared field bits ────────────────────────────────────────────────────────

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input
        type="text"
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <textarea
        rows={4}
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function StringListEditor({
  label,
  items,
  onChange,
  addLabel,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="space-y-2">
        {items.map((value, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              className={inputCls}
              value={value}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-muted-foreground shrink-0 rounded-lg p-2 transition-colors hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="text-brand-navy mt-2 inline-flex items-center gap-1 text-xs font-semibold dark:text-amber-400"
      >
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </div>
  );
}

// ── Document ─────────────────────────────────────────────────────────────────

function DocumentFields({
  draft,
  onChange,
  t,
}: {
  draft: DocumentItem;
  onChange: (v: DocumentItem) => void;
  t: TFn;
}) {
  const jsonValue = JSON.stringify(draft.content ?? EMPTY_DOC);
  return (
    <>
      <TextField
        label={t('editModal.fields.title')}
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <TextField
        label={t('editModal.fields.readTime')}
        value={draft.readTime}
        onChange={(readTime) => onChange({ ...draft, readTime })}
      />
      <div>
        <label className={labelCls}>{t('editModal.fields.content')}</label>
        <RichEditor
          value={jsonValue}
          onChange={(json) => onChange({ ...draft, content: JSON.parse(json) })}
          minHeight={220}
          maxHeight={420}
        />
      </div>
    </>
  );
}

// ── Video ────────────────────────────────────────────────────────────────────

function VideoFields({
  draft,
  onChange,
  t,
}: {
  draft: VideoItem;
  onChange: (v: VideoItem) => void;
  t: TFn;
}) {
  return (
    <>
      <TextField
        label={t('editModal.fields.title')}
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label={t('editModal.fields.duration')}
          value={draft.duration}
          onChange={(duration) => onChange({ ...draft, duration })}
        />
        <TextField
          label={t('editModal.fields.youtubeId')}
          value={draft.youtubeId ?? ''}
          onChange={(youtubeId) => onChange({ ...draft, youtubeId })}
        />
      </div>
      <TextAreaField
        label={t('editModal.fields.intro')}
        value={draft.intro}
        onChange={(intro) => onChange({ ...draft, intro })}
      />
      <StringListEditor
        label={t('editModal.fields.topics')}
        items={draft.topics}
        onChange={(topics) => onChange({ ...draft, topics })}
        addLabel={t('editModal.addTopic')}
      />
      <div>
        <label className={labelCls}>{t('editModal.fields.moments')}</label>
        <div className="space-y-2">
          {draft.moments.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                className={`${inputCls} w-24 shrink-0`}
                value={m.time}
                onChange={(e) => {
                  const next = [...draft.moments];
                  next[i] = { ...next[i], time: e.target.value };
                  onChange({ ...draft, moments: next });
                }}
              />
              <input
                type="text"
                className={inputCls}
                value={m.label}
                onChange={(e) => {
                  const next = [...draft.moments];
                  next[i] = { ...next[i], label: e.target.value };
                  onChange({ ...draft, moments: next });
                }}
              />
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...draft,
                    moments: draft.moments.filter((_, j) => j !== i),
                  })
                }
                className="text-muted-foreground shrink-0 rounded-lg p-2 transition-colors hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...draft,
              moments: [...draft.moments, { time: '', label: '' }],
            })
          }
          className="text-brand-navy mt-2 inline-flex items-center gap-1 text-xs font-semibold dark:text-amber-400"
        >
          <Plus className="h-3.5 w-3.5" /> {t('editModal.addMoment')}
        </button>
      </div>
    </>
  );
}

// ── Quiz ─────────────────────────────────────────────────────────────────────

function QuizFields({
  draft,
  onChange,
  t,
}: {
  draft: QuizItem;
  onChange: (v: QuizItem) => void;
  t: TFn;
}) {
  function updateQuestion(i: number, patch: Partial<QuizQuestion>) {
    const next = [...draft.questions];
    next[i] = { ...next[i], ...patch };
    onChange({ ...draft, questions: next, totalQuestions: next.length });
  }

  return (
    <>
      <TextField
        label={t('editModal.fields.title')}
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <TextAreaField
        label={t('editModal.fields.description')}
        value={draft.description}
        onChange={(description) => onChange({ ...draft, description })}
      />

      <div>
        <label className={labelCls}>{t('editModal.fields.questions')}</label>
        <div className="space-y-4">
          {draft.questions.map((q, qi) => (
            <div
              key={qi}
              className="border-border space-y-2.5 rounded-xl border p-3.5"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className={inputCls}
                  value={q.question}
                  placeholder={t('editModal.questionPlaceholder', {
                    n: qi + 1,
                  })}
                  onChange={(e) =>
                    updateQuestion(qi, { question: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...draft,
                      questions: draft.questions.filter((_, j) => j !== qi),
                      totalQuestions: draft.questions.length - 1,
                    })
                  }
                  className="text-muted-foreground shrink-0 rounded-lg p-2 transition-colors hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-1.5 pl-1">
                {q.options.map((opt, oi) => (
                  <div key={oi} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${qi}`}
                      checked={q.correctIndex === oi}
                      onChange={() => updateQuestion(qi, { correctIndex: oi })}
                      className="accent-brand-navy h-3.5 w-3.5 shrink-0"
                    />
                    <input
                      type="text"
                      className={inputCls}
                      value={opt}
                      onChange={(e) => {
                        const options = [...q.options];
                        options[oi] = e.target.value;
                        updateQuestion(qi, { options });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        updateQuestion(qi, {
                          options: q.options.filter((_, j) => j !== oi),
                          correctIndex:
                            q.correctIndex >= oi
                              ? Math.max(0, q.correctIndex - 1)
                              : q.correctIndex,
                        })
                      }
                      className="text-muted-foreground shrink-0 rounded-lg p-1.5 transition-colors hover:text-red-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateQuestion(qi, { options: [...q.options, ''] })
                  }
                  className="text-brand-navy inline-flex items-center gap-1 text-xs font-semibold dark:text-amber-400"
                >
                  <Plus className="h-3.5 w-3.5" /> {t('editModal.addOption')}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...draft,
              questions: [
                ...draft.questions,
                { question: '', options: ['', ''], correctIndex: 0 },
              ],
              totalQuestions: draft.questions.length + 1,
            })
          }
          className="text-brand-navy mt-3 inline-flex items-center gap-1 text-xs font-semibold dark:text-amber-400"
        >
          <Plus className="h-3.5 w-3.5" /> {t('editModal.addQuestion')}
        </button>
      </div>
    </>
  );
}

// ── Assignment ───────────────────────────────────────────────────────────────

function AssignmentFields({
  draft,
  onChange,
  t,
}: {
  draft: AssignmentItem;
  onChange: (v: AssignmentItem) => void;
  t: TFn;
}) {
  return (
    <>
      <TextField
        label={t('editModal.fields.title')}
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          label={t('editModal.fields.dueDate')}
          value={draft.dueDate}
          onChange={(dueDate) => onChange({ ...draft, dueDate })}
        />
        <TextField
          label={t('editModal.fields.submission')}
          value={draft.submission}
          onChange={(submission) => onChange({ ...draft, submission })}
        />
      </div>
      <TextAreaField
        label={t('editModal.fields.instructions')}
        value={draft.instructions}
        onChange={(instructions) => onChange({ ...draft, instructions })}
      />
      <StringListEditor
        label={t('editModal.fields.requirements')}
        items={draft.requirements}
        onChange={(requirements) => onChange({ ...draft, requirements })}
        addLabel={t('editModal.addRequirement')}
      />
    </>
  );
}
