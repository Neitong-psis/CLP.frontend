'use client';

import { useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  ImageIcon,
  Plus,
  Star,
  Upload,
  User,
  Users,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { CourseInfo } from '../_lib/types';
import { priceLabel } from '../_lib/builder';
import { FormField, SelectField, inputCls } from './form';

const CATEGORIES = [
  'Web Development',
  'Programming',
  'Data Science',
  'Cloud Computing',
  'DevOps',
  'Design',
];

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const TITLE_MAX = 60;
const SUBTITLE_MAX = 80;
const DESC_MAX = 500;

// ─── Small building blocks ──────────────────────────────────────────────────

function SectionCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6">
      <div className="mb-5">
        <h2 className="text-sm font-bold text-zinc-900">{title}</h2>
        {desc && <p className="text-xs text-zinc-400">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

function CountedLabel({
  label,
  value,
  max,
}: {
  label: string;
  value: string;
  max: number;
}) {
  return (
    <div className="mb-1.5 flex items-center justify-between">
      <label className="text-sm font-semibold text-zinc-700">{label}</label>
      <span
        className={cn(
          'text-[11px] tabular-nums',
          value.length > max ? 'text-rose-500' : 'text-zinc-400',
        )}
      >
        {value.length}/{max}
      </span>
    </div>
  );
}

function InlineAddButton({
  placeholder,
  onAdd,
}: {
  placeholder: string;
  onAdd: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  function confirm() {
    const val = draft.trim();
    if (val) {
      onAdd(val);
      setDraft('');
      setOpen(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex shrink-0 items-center gap-1 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50"
      >
        <Plus className="h-3 w-3" /> Add
      </button>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <input
        autoFocus
        type="text"
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            confirm();
          }
          if (e.key === 'Escape') {
            setDraft('');
            setOpen(false);
          }
        }}
        className="w-24 rounded-lg border border-blue-500 px-2 py-1.75 text-xs text-zinc-700 ring-1 ring-blue-500/20 outline-none"
      />
      <button
        type="button"
        onClick={confirm}
        disabled={!draft.trim()}
        className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-blue-600 transition hover:bg-blue-50 disabled:opacity-30"
      >
        <Check className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => {
          setDraft('');
          setOpen(false);
        }}
        className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:bg-zinc-50"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

// ─── Live preview card (mirrors the learner-facing course card) ──────────────

function LivePreviewCard({
  info,
  onThumbnail,
}: {
  info: CourseInfo;
  onThumbnail: (dataUrl: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function readImage(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => onThumbnail((ev.target?.result as string) ?? '');
    reader.readAsDataURL(file);
  }

  return (
    <div className="lg:sticky lg:top-6">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-[13px] font-semibold text-zinc-800">
            Live preview
          </h2>
          <p className="text-xs text-zinc-400">How learners see your course.</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-medium tracking-wide text-zinc-500 uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <div className="group overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.10)]">
        {/* Cover = drag-and-drop uploader */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            readImage(e.dataTransfer.files?.[0]);
          }}
          className={cn(
            'group/thumb relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden bg-[#f5f5f7] transition outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset',
            dragging && 'ring-2 ring-blue-500 ring-inset',
          )}
        >
          {info.thumbnail ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={info.thumbnail}
                alt="Course thumbnail"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 backdrop-blur-[2px] transition group-hover/thumb:opacity-100">
                <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-medium text-zinc-800 shadow-sm">
                  <Upload className="h-3.5 w-3.5" /> Change
                </span>
              </div>
              <button
                type="button"
                aria-label="Remove thumbnail"
                onClick={(e) => {
                  e.stopPropagation();
                  onThumbnail('');
                }}
                className="absolute top-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-zinc-600 opacity-0 shadow-sm backdrop-blur-sm transition group-hover/thumb:opacity-100 hover:bg-white hover:text-zinc-900"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04]">
                <ImageIcon className="h-5 w-5 text-zinc-400" />
              </div>
              <span className="text-[13px] font-medium text-zinc-600">
                {dragging ? 'Drop to upload' : 'Add a cover image'}
              </span>
              <span className="text-[11px] text-zinc-400">
                Drag &amp; drop or click · 16:9
              </span>
            </div>
          )}

          {/* Level badge — frosted neutral material */}
          {info.level && (
            <span className="absolute top-3 left-3 rounded-full bg-white/75 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-zinc-700 ring-1 ring-black/[0.06] backdrop-blur-md">
              {info.level}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium tracking-[0.14em] text-zinc-400 uppercase">
              {info.category || 'Category'}
            </span>
            <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-zinc-500 uppercase">
              New
            </span>
          </div>

          <h3 className="mt-2 line-clamp-2 text-[17px] leading-snug font-semibold tracking-[-0.01em] text-zinc-900">
            {info.title || 'Your course title'}
          </h3>

          {info.subtitle && (
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-zinc-500">
              {info.subtitle}
            </p>
          )}

          {/* Instructor */}
          <div className="mt-4 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
              <User className="h-3.5 w-3.5" />
            </span>
            <span className="text-[12px] font-medium text-zinc-600">You</span>
            <span className="text-zinc-300">·</span>
            <span className="text-[12px] text-zinc-400">Instructor</span>
          </div>

          {/* Meta */}
          <div className="mt-4 flex items-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> New
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> 0
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Self-paced
            </span>
          </div>

          {/* Footer — price + CTA mirroring the learner card */}
          <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
            <span className="text-[19px] font-semibold tracking-[-0.01em] text-zinc-900">
              {priceLabel(info)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-[12px] font-medium text-white transition-colors group-hover:bg-blue-700">
              Enroll
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={(e) => readImage(e.target.files?.[0])}
      />
      <p className="mt-2.5 text-center text-[11px] text-zinc-400">
        Click the cover to upload · Ratings appear after launch
      </p>
    </div>
  );
}

// ─── Step ────────────────────────────────────────────────────────────────────

export function CourseInfoStep({
  info,
  onChange,
}: {
  info: CourseInfo;
  onChange: (key: keyof CourseInfo, val: string) => void;
}) {
  const [extraCategories, setExtraCategories] = useState<string[]>([]);
  const [extraLevels, setExtraLevels] = useState<string[]>([]);

  const isFree = info.pricingType === 'free';

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      {/* ── Form ───────────────────────────────────────────────── */}
      <div className="space-y-5">
        <SectionCard
          title="Basic Information"
          desc="Title and summary learners will see first."
        >
          <div className="space-y-5">
            <div>
              <CountedLabel
                label="Course title"
                value={info.title}
                max={TITLE_MAX}
              />
              <input
                type="text"
                placeholder="e.g. Modern Web Development with React"
                value={info.title}
                maxLength={TITLE_MAX}
                onChange={(e) => onChange('title', e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <CountedLabel
                label="Subtitle"
                value={info.subtitle}
                max={SUBTITLE_MAX}
              />
              <input
                type="text"
                placeholder="A short, punchy one-liner"
                value={info.subtitle}
                maxLength={SUBTITLE_MAX}
                onChange={(e) => onChange('subtitle', e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <CountedLabel
                label="Description"
                value={info.description}
                max={DESC_MAX}
              />
              <textarea
                rows={4}
                placeholder="What will learners be able to do after this course?"
                value={info.description}
                maxLength={DESC_MAX}
                onChange={(e) => onChange('description', e.target.value)}
                className={cn(inputCls, 'resize-none')}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Category & Level"
          desc="Help the right learners discover your course."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="Category">
              <div className="flex gap-2">
                <SelectField
                  value={info.category}
                  onChange={(v) => onChange('category', v)}
                >
                  <option value="" />
                  {[...CATEGORIES, ...extraCategories].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </SelectField>
                <InlineAddButton
                  placeholder="New category"
                  onAdd={(val) => {
                    setExtraCategories((prev) => [...prev, val]);
                    onChange('category', val);
                  }}
                />
              </div>
            </FormField>

            <FormField label="Level">
              <div className="flex gap-2">
                <SelectField
                  value={info.level}
                  onChange={(v) => onChange('level', v)}
                >
                  <option value="" />
                  {[...LEVELS, ...extraLevels].map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </SelectField>
                <InlineAddButton
                  placeholder="New level"
                  onAdd={(val) => {
                    setExtraLevels((prev) => [...prev, val]);
                    onChange('level', val);
                  }}
                />
              </div>
            </FormField>
          </div>
        </SectionCard>

        <SectionCard
          title="Pricing"
          desc="Set how learners pay for this course."
        >
          {/* Segmented Free / Paid toggle */}
          <div className="grid max-w-xs grid-cols-2 gap-1 rounded-lg bg-zinc-100 p-1">
            {(
              [
                { key: 'free', label: 'Free' },
                { key: 'paid', label: 'Paid' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => onChange('pricingType', opt.key)}
                className={cn(
                  'rounded-md py-2 text-sm font-semibold transition',
                  info.pricingType === opt.key
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {isFree ? (
            <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">
              This course will be free for all learners.
            </p>
          ) : (
            <div className="mt-4 max-w-xs">
              <label className="mb-1.5 block text-sm font-semibold text-zinc-700">
                Price
              </label>
              <div className="flex overflow-hidden rounded-lg border border-zinc-200 bg-white transition focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20">
                <span className="border-r border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-500">
                  $
                </span>
                <input
                  type="number"
                  placeholder="79"
                  min={0}
                  value={info.price}
                  onChange={(e) => onChange('price', e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-zinc-700 outline-none"
                />
              </div>
              <p className="mt-1 text-[11px] text-zinc-400">
                Price shown in USD ($).
              </p>
            </div>
          )}
        </SectionCard>
      </div>

      {/* ── Live preview ───────────────────────────────────────── */}
      <LivePreviewCard
        info={info}
        onThumbnail={(dataUrl) => onChange('thumbnail', dataUrl)}
      />
    </div>
  );
}
