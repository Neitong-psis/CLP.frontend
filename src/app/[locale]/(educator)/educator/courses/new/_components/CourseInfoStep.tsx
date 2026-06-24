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
import { useCreateCourseT } from '@/i18n';
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
    <section className="border-border bg-card rounded-2xl border p-6">
      <div className="mb-5">
        <h2 className="text-foreground text-sm font-bold">{title}</h2>
        {desc && <p className="text-muted-foreground text-xs">{desc}</p>}
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
      <label className="text-foreground/80 text-sm font-semibold">
        {label}
      </label>
      <span
        className={cn(
          'text-[11px] tabular-nums',
          value.length > max ? 'text-rose-500' : 'text-muted-foreground',
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
  const t = useCreateCourseT();
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
        className="border-border text-muted-foreground hover:bg-muted/40 flex shrink-0 items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold transition"
      >
        <Plus className="h-3 w-3" /> {t('info.add')}
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
        className="text-foreground/80 w-24 rounded-lg border border-blue-500 px-2 py-1.75 text-xs ring-1 ring-blue-500/20 outline-none"
      />
      <button
        type="button"
        onClick={confirm}
        disabled={!draft.trim()}
        className="border-border flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border text-blue-600 transition hover:bg-blue-500/10 disabled:opacity-30"
      >
        <Check className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => {
          setDraft('');
          setOpen(false);
        }}
        className="border-border text-muted-foreground hover:bg-muted flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border transition"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function LivePreviewCard({
  info,
  onThumbnail,
}: {
  info: CourseInfo;
  onThumbnail: (dataUrl: string) => void;
}) {
  const t = useCreateCourseT();
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
          <h2 className="text-foreground/90 text-[13px] font-semibold">
            {t('info.livePreview')}
          </h2>
          <p className="text-muted-foreground text-xs">
            {t('info.livePreviewDesc')}
          </p>
        </div>
        <span className="bg-muted text-muted-foreground flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          {t('info.live')}
        </span>
      </div>

      <div className="group bg-card overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.10)] dark:ring-white/8 dark:hover:shadow-none">
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
            'group/thumb bg-muted/50 relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden transition outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset',
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
                  <Upload className="h-3.5 w-3.5" /> {t('info.change')}
                </span>
              </div>
              <button
                type="button"
                aria-label={t('info.removeThumbnail')}
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
              <div className="bg-card flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ring-1 ring-black/[0.04]">
                <ImageIcon className="text-muted-foreground h-5 w-5" />
              </div>
              <span className="text-foreground/80 text-[13px] font-medium">
                {dragging ? t('info.dropToUpload') : t('info.addCoverImage')}
              </span>
              <span className="text-muted-foreground text-[11px]">
                {t('info.dragDropHint')}
              </span>
            </div>
          )}

          {info.level && (
            <span className="absolute top-3 left-3 rounded-full bg-white/75 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-zinc-700 ring-1 ring-black/[0.06] backdrop-blur-md">
              {info.level}
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-[11px] font-medium tracking-[0.14em] uppercase">
              {info.category || t('info.categoryPlaceholder')}
            </span>
            <span className="bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase">
              {t('info.newBadge')}
            </span>
          </div>

          <h3 className="text-foreground mt-2 line-clamp-2 text-[17px] leading-snug font-semibold tracking-[-0.01em]">
            {info.title || t('info.courseTitlePreview')}
          </h3>

          {info.subtitle && (
            <p className="text-muted-foreground mt-1.5 line-clamp-2 text-[13px] leading-relaxed">
              {info.subtitle}
            </p>
          )}

          <div className="mt-4 flex items-center gap-2">
            <span className="bg-muted text-muted-foreground flex h-7 w-7 items-center justify-center rounded-full">
              <User className="h-3.5 w-3.5" />
            </span>
            <span className="text-foreground/80 text-[12px] font-medium">
              {t('info.you')}
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-muted-foreground text-[12px]">
              {t('info.instructor')}
            </span>
          </div>

          <div className="text-muted-foreground mt-4 flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> {t('info.newBadge')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> 0
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {t('info.selfPaced')}
            </span>
          </div>

          <div className="border-border/50 mt-5 flex items-center justify-between border-t pt-4">
            <span className="text-foreground text-[19px] font-semibold tracking-[-0.01em]">
              {priceLabel(info)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-[12px] font-medium text-white transition-colors group-hover:bg-blue-700">
              {t('info.enroll')}
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
      <p className="text-muted-foreground mt-2.5 text-center text-[11px]">
        {t('info.uploadHint')}
      </p>
    </div>
  );
}

export function CourseInfoStep({
  info,
  onChange,
}: {
  info: CourseInfo;
  onChange: (key: keyof CourseInfo, val: string) => void;
}) {
  const t = useCreateCourseT();
  const [extraCategories, setExtraCategories] = useState<string[]>([]);
  const [extraLevels, setExtraLevels] = useState<string[]>([]);

  const isFree = info.pricingType === 'free';

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
      <div className="space-y-5">
        <SectionCard title={t('info.basicInfo')} desc={t('info.basicInfoDesc')}>
          <div className="space-y-5">
            <div>
              <CountedLabel
                label={t('info.courseTitle')}
                value={info.title}
                max={TITLE_MAX}
              />
              <input
                type="text"
                placeholder={t('info.courseTitlePlaceholder')}
                value={info.title}
                maxLength={TITLE_MAX}
                onChange={(e) => onChange('title', e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <CountedLabel
                label={t('info.subtitle')}
                value={info.subtitle}
                max={SUBTITLE_MAX}
              />
              <input
                type="text"
                placeholder={t('info.subtitlePlaceholder')}
                value={info.subtitle}
                maxLength={SUBTITLE_MAX}
                onChange={(e) => onChange('subtitle', e.target.value)}
                className={inputCls}
              />
            </div>

            <div>
              <CountedLabel
                label={t('info.description')}
                value={info.description}
                max={DESC_MAX}
              />
              <textarea
                rows={4}
                placeholder={t('info.descriptionPlaceholder')}
                value={info.description}
                maxLength={DESC_MAX}
                onChange={(e) => onChange('description', e.target.value)}
                className={cn(inputCls, 'resize-none')}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title={t('info.categoryLevel')}
          desc={t('info.categoryLevelDesc')}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label={t('info.category')}>
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
                  placeholder={t('info.newCategory')}
                  onAdd={(val) => {
                    setExtraCategories((prev) => [...prev, val]);
                    onChange('category', val);
                  }}
                />
              </div>
            </FormField>

            <FormField label={t('info.level')}>
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
                  placeholder={t('info.newLevel')}
                  onAdd={(val) => {
                    setExtraLevels((prev) => [...prev, val]);
                    onChange('level', val);
                  }}
                />
              </div>
            </FormField>
          </div>
        </SectionCard>

        <SectionCard title={t('info.pricing')} desc={t('info.pricingDesc')}>
          <div className="bg-muted/60 grid max-w-xs grid-cols-2 gap-1 rounded-lg p-1">
            {(
              [
                { key: 'free', label: t('info.free') },
                { key: 'paid', label: t('info.paid') },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => onChange('pricingType', opt.key)}
                className={cn(
                  'rounded-md py-2 text-sm font-semibold transition',
                  info.pricingType === opt.key
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {isFree ? (
            <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              {t('info.freeCourseNote')}
            </p>
          ) : (
            <div className="mt-4 max-w-xs">
              <label className="text-foreground/80 mb-1.5 block text-sm font-semibold">
                {t('info.price')}
              </label>
              <div className="border-border bg-card flex overflow-hidden rounded-lg border transition focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20">
                <span className="border-border bg-muted/40 text-muted-foreground border-r px-3 py-2 text-sm">
                  $
                </span>
                <input
                  type="number"
                  placeholder="79"
                  min={0}
                  value={info.price}
                  onChange={(e) => onChange('price', e.target.value)}
                  className="text-foreground flex-1 bg-transparent px-3 py-2 text-sm outline-none"
                />
              </div>
              <p className="text-muted-foreground mt-1 text-[11px]">
                {t('info.priceNote')}
              </p>
            </div>
          )}
        </SectionCard>
      </div>

      <LivePreviewCard
        info={info}
        onThumbnail={(dataUrl) => onChange('thumbnail', dataUrl)}
      />
    </div>
  );
}
