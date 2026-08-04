'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useAdminReviewOverlayT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import type { ReviewItem } from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import type { ItemDecision } from './CourseReviewOverlay';

interface CenterDialogProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  footer: React.ReactNode;
  onClose: () => void;
}

function CenterDialog({
  icon,
  title,
  description,
  children,
  footer,
  onClose,
}: CenterDialogProps) {
  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center">
          {icon}
        </div>
        <h2 className="mt-3 text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          {description}
        </p>
        {children}
        <div className="mt-5 flex items-center justify-center gap-3">
          {footer}
        </div>
      </div>
    </div>
  );
}

// -- Review summary sheet ------------------------------------------------------

/** One item row inside a feedback group — title + the admin's note (or a
 *  placeholder when a decision carried no note). */
function FeedbackRow({
  item,
  note,
  tone,
}: {
  item: ReviewItem;
  note?: string;
  tone: 'emerald' | 'rose';
}) {
  const t = useAdminReviewOverlayT();
  return (
    <li className="border-border bg-muted/40 rounded-xl border px-3.5 py-3">
      <p className="text-foreground truncate text-sm font-semibold">
        {item.title}
      </p>
      <p
        className={cn(
          'mt-1.5 text-xs leading-relaxed',
          note
            ? 'text-muted-foreground'
            : tone === 'rose'
              ? 'text-rose-500 italic'
              : 'text-muted-foreground italic',
        )}
      >
        {note || t('summarySheet.noNote')}
      </p>
    </li>
  );
}

function FeedbackGroup({
  label,
  items,
  decisions,
  tone,
}: {
  label: string;
  items: ReviewItem[];
  decisions: Record<string, ItemDecision>;
  tone: 'emerald' | 'rose';
}) {
  if (items.length === 0) return null;
  return (
    <div className="mb-5">
      <p
        className={cn(
          'mb-2 text-[11px] font-bold tracking-wide uppercase',
          tone === 'rose' ? 'text-rose-500' : 'text-emerald-500',
        )}
      >
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <FeedbackRow
            key={item.id}
            item={item}
            note={decisions[item.id]?.note}
            tone={tone}
          />
        ))}
      </ul>
    </div>
  );
}

/**
 * Collects every per-item decision into one review — mirrors the educator's
 * own feedback sheet (same Sheet component, same list-of-items shape) so the
 * admin sees exactly what the educator will see before it's sent.
 */
export function ReviewSummarySheet({
  open,
  courseTitle,
  items,
  decisions,
  onConfirm,
  onClose,
}: {
  open: boolean;
  courseTitle: string;
  items: ReviewItem[];
  decisions: Record<string, ItemDecision>;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const t = useAdminReviewOverlayT();
  const approved = items.filter((i) => decisions[i.id]?.status === 'approved');
  const rejected = items.filter((i) => decisions[i.id]?.status === 'rejected');
  const isApprove = rejected.length === 0;

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('summarySheet.title')}</SheetTitle>
          <SheetDescription>
            {isApprove
              ? t('summarySheet.descriptionApprove', { title: courseTitle })
              : t('summarySheet.descriptionReject', {
                  count: rejected.length,
                })}
          </SheetDescription>
        </SheetHeader>

        <div className="scrollbar-none flex-1 overflow-y-auto px-5 py-4">
          <div
            className={cn(
              'mb-4 flex items-center gap-2.5 rounded-xl border px-3.5 py-3',
              isApprove
                ? 'border-emerald-400/30 bg-emerald-500/10'
                : 'border-rose-400/30 bg-rose-500/10',
            )}
          >
            {isApprove ? (
              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-500" />
            ) : (
              <XCircle className="h-4.5 w-4.5 shrink-0 text-rose-500" />
            )}
            <p
              className={cn(
                'text-sm font-bold',
                isApprove
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-rose-700 dark:text-rose-400',
              )}
            >
              {isApprove
                ? t('summarySheet.approveTitle')
                : t('summarySheet.rejectTitle')}
            </p>
          </div>

          <FeedbackGroup
            label={t('summarySheet.rejectedSection', {
              count: rejected.length,
            })}
            items={rejected}
            decisions={decisions}
            tone="rose"
          />
          <FeedbackGroup
            label={t('summarySheet.approvedSection', {
              count: approved.length,
            })}
            items={approved}
            decisions={decisions}
            tone="emerald"
          />
        </div>

        <SheetFooter>
          <button
            onClick={onClose}
            className="border-border text-foreground/70 hover:bg-muted flex-1 rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            {t('summarySheet.back')}
          </button>
          <button
            onClick={onConfirm}
            className={cn(
              'flex-1 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors',
              isApprove
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : 'bg-rose-500 hover:bg-rose-600',
            )}
          >
            {isApprove
              ? t('summarySheet.confirmApprove')
              : t('summarySheet.confirmReject')}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// -- Per-item approve -----------------------------------------------------------

export function ItemApproveDialog({
  itemTitle,
  initialNote,
  onConfirm,
  onClose,
}: {
  itemTitle: string;
  initialNote?: string;
  onConfirm: (note?: string) => void;
  onClose: () => void;
}) {
  const t = useAdminReviewOverlayT();
  const [note, setNote] = useState(initialNote ?? '');
  return (
    <CenterDialog
      icon={
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        </span>
      }
      title={t('itemApproveDialog.title', { title: itemTitle })}
      description={t('itemApproveDialog.description')}
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            {t('itemApproveDialog.cancel')}
          </button>
          <button
            onClick={() => onConfirm(note.trim() || undefined)}
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            {t('itemApproveDialog.confirm')}
          </button>
        </>
      }
    >
      <textarea
        autoFocus
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={t('itemApproveDialog.notePlaceholder')}
        className="mt-4 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
      />
    </CenterDialog>
  );
}

// -- Per-item reject --------------------------------------------------------------

export function ItemRejectDialog({
  itemTitle,
  initialNote,
  onConfirm,
  onClose,
}: {
  itemTitle: string;
  initialNote?: string;
  onConfirm: (note: string) => void;
  onClose: () => void;
}) {
  const t = useAdminReviewOverlayT();
  const [note, setNote] = useState(initialNote ?? '');
  const trimmed = note.trim();
  return (
    <CenterDialog
      icon={
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
          <XCircle className="h-6 w-6 text-rose-500" />
        </span>
      }
      title={t('itemRejectDialog.title', { title: itemTitle })}
      description={t('itemRejectDialog.description')}
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            {t('itemRejectDialog.cancel')}
          </button>
          <button
            onClick={() => trimmed && onConfirm(trimmed)}
            disabled={!trimmed}
            className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('itemRejectDialog.confirm')}
          </button>
        </>
      }
    >
      <textarea
        autoFocus
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder={t('itemRejectDialog.notePlaceholder')}
        className="mt-4 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
      />
    </CenterDialog>
  );
}
