'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Copy,
  ImageIcon,
  Maximize2,
  RefreshCw,
  Star,
  Upload,
  User,
  Users,
  X,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/utils/cn';
import { useCreateCourseT } from '@/i18n';
import { useToast } from '@/components/ui/toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { CourseInfo } from '../_lib/types';
import { priceLabel, formatThousands } from '../_lib/builder';
import { FormField, SelectField, inputCls } from './form';
import { PromoCodeQrModal } from './PromoCodeQrModal';

const PROMO_CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous 0/O, 1/I

function generatePromoCode(): string {
  let code = '';
  for (let i = 0; i < 8; i++) {
    code +=
      PROMO_CODE_CHARS[Math.floor(Math.random() * PROMO_CODE_CHARS.length)];
  }
  return code;
}

// Flag emoji don't render consistently across platforms (some show bare
// country-code text), so currency flags are drawn as inline SVGs instead.
function FlagUS({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden>
      <rect width="20" height="14" fill="#B22234" />
      <g fill="#fff">
        <rect y="1.08" width="20" height="1.08" />
        <rect y="3.23" width="20" height="1.08" />
        <rect y="5.38" width="20" height="1.08" />
        <rect y="7.54" width="20" height="1.08" />
        <rect y="9.69" width="20" height="1.08" />
        <rect y="11.85" width="20" height="1.08" />
      </g>
      <rect width="8" height="7.54" fill="#3C3B6E" />
    </svg>
  );
}

function FlagKH({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden>
      <rect width="20" height="14" fill="#032EA1" />
      <rect y="3.5" width="20" height="7" fill="#E00025" />
      <rect x="7.5" y="4.5" width="5" height="5" rx="0.5" fill="#fff" />
    </svg>
  );
}

const CURRENCIES = [
  { code: 'USD', Flag: FlagUS, placeholder: '0' },
  { code: 'KHR', Flag: FlagKH, placeholder: '0' },
] as const;

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
            'group/thumb bg-muted/50 relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden transition outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-inset dark:focus-visible:ring-amber-400',
            dragging && 'ring-2 ring-blue-950 ring-inset dark:ring-amber-400',
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-950 px-4 py-2 text-[12px] font-medium text-white transition-colors group-hover:bg-blue-900 dark:bg-amber-400 dark:text-gray-900 dark:group-hover:bg-amber-300">
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
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const isFree = info.pricingType === 'free';
  const currency =
    CURRENCIES.find((c) => c.code === info.currency) ?? CURRENCIES[0];

  // A free course always has a redeemable code — generate one the moment
  // "Free" is selected (or if a draft was seeded without one).
  useEffect(() => {
    if (isFree && !info.promoCode) {
      onChange('promoCode', generatePromoCode());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFree, info.promoCode]);

  function handleGenerateCode() {
    setSpinning(true);
    onChange('promoCode', generatePromoCode());
    setTimeout(() => setSpinning(false), 500);
  }

  function handleCopyCode() {
    if (!info.promoCode) return;
    navigator.clipboard?.writeText(info.promoCode).catch(() => {});
    toast(t('info.codeCopied'), 'success');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const redeemUrl =
    typeof window !== 'undefined' && info.promoCode
      ? `${window.location.origin}/explore?redeem=${info.promoCode}`
      : '';

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
              <SelectField
                value={info.category}
                onChange={(v) => onChange('category', v)}
              >
                <option value="" />
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </SelectField>
            </FormField>

            <FormField label={t('info.level')}>
              <SelectField
                value={info.level}
                onChange={(v) => onChange('level', v)}
              >
                <option value="" />
                {LEVELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </SelectField>
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
            <div className="mt-4 max-w-md space-y-3">
              <div>
                <label className="text-foreground/80 mb-1 block text-sm font-semibold">
                  {t('info.promoCode')}
                </label>
                <p className="text-muted-foreground mb-2 text-[11px]">
                  {t('info.promoCodeNote')}
                </p>

                <div className="border-border bg-card flex flex-col gap-4 rounded-lg border p-3 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center justify-between gap-2">
                    <span
                      key={info.promoCode}
                      className="text-foreground animate-in fade-in zoom-in-95 font-mono text-base font-semibold tracking-[0.2em] duration-300"
                    >
                      {info.promoCode || '········'}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={handleCopyCode}
                        title={t('info.copyCode')}
                        className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                      >
                        {copied ? (
                          <Check className="animate-in zoom-in h-4 w-4 text-emerald-500 duration-200" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleGenerateCode}
                        title={t('info.regenerateCode')}
                        className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                      >
                        <RefreshCw
                          className={cn(
                            'h-4 w-4 transition-transform',
                            spinning && 'animate-spin',
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  {/* QR — scan to open the redeem flow pre-filled with this code */}
                  <div className="border-border flex shrink-0 flex-col items-center gap-1.5 border-t pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                    <button
                      type="button"
                      onClick={() => setShowQrModal(true)}
                      title={t('info.expandQr')}
                      className="group/qr relative rounded-md bg-white p-1.5 transition-transform hover:scale-105"
                    >
                      <QRCodeSVG value={redeemUrl || ' '} size={72} />
                      <span className="absolute inset-0 flex items-center justify-center rounded-md bg-black/0 opacity-0 transition-all group-hover/qr:bg-black/40 group-hover/qr:opacity-100">
                        <Maximize2 className="size-5 text-white" />
                      </span>
                    </button>
                    <span className="text-muted-foreground text-[10px] font-medium whitespace-nowrap">
                      {t('info.scanToRedeem')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 max-w-xs">
              <label className="text-foreground/80 mb-1.5 block text-sm font-semibold">
                {t('info.price')}
              </label>
              <div className="border-border bg-card flex overflow-hidden rounded-lg border transition focus-within:border-blue-900 focus-within:ring-1 focus-within:ring-blue-900/20 dark:focus-within:border-amber-400 dark:focus-within:ring-amber-400/20">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="border-border bg-muted/40 text-foreground hover:bg-muted flex shrink-0 items-center gap-1.5 border-r px-3 py-2 text-sm font-semibold transition-colors"
                    >
                      <currency.Flag className="h-3 w-4 shrink-0 rounded-[2px]" />
                      {currency.code}
                      <ChevronDown className="text-muted-foreground h-3.5 w-3.5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    theme="light"
                    align="start"
                    className="min-w-28 shadow-md"
                  >
                    {CURRENCIES.map((c) => (
                      <DropdownMenuItem
                        key={c.code}
                        theme="light"
                        onSelect={() => onChange('currency', c.code)}
                        className={cn(
                          'gap-2',
                          c.code === currency.code &&
                            'text-brand-gold font-semibold',
                        )}
                      >
                        <c.Flag className="h-3 w-4 shrink-0 rounded-[2px]" />
                        {c.code}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={currency.placeholder}
                  value={formatThousands(info.price, ' ')}
                  onChange={(e) =>
                    onChange('price', e.target.value.replace(/\D/g, ''))
                  }
                  className="text-foreground flex-1 bg-transparent px-3 py-2 text-sm outline-none"
                />
              </div>
              <p className="text-muted-foreground mt-1 text-[11px]">
                {t('info.priceNote', { currency: currency.code })}
              </p>
            </div>
          )}
        </SectionCard>
      </div>

      <LivePreviewCard
        info={info}
        onThumbnail={(dataUrl) => onChange('thumbnail', dataUrl)}
      />

      {showQrModal && (
        <PromoCodeQrModal
          code={info.promoCode}
          redeemUrl={redeemUrl}
          onClose={() => setShowQrModal(false)}
        />
      )}
    </div>
  );
}
