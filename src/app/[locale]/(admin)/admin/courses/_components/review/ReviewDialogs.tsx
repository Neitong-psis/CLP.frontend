'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useAdminReviewOverlayT } from '@/i18n';

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

// -- Approve ------------------------------------------------------------------

export function ApproveDialog({
  courseTitle,
  onConfirm,
  onClose,
}: {
  courseTitle: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const t = useAdminReviewOverlayT();
  return (
    <CenterDialog
      icon={
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        </span>
      }
      title={t('approveDialog.title')}
      description={t('approveDialog.description', { title: courseTitle })}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            {t('approveDialog.cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            {t('approveDialog.confirm')}
          </button>
        </>
      }
      onClose={onClose}
    />
  );
}

// -- Reject -------------------------------------------------------------------

/** Confirms submitting a rejection — per-item notes are already captured via
 *  the item-level dialogs as the admin reviews each piece of content, so
 *  this is just a final summary + confirm. */
export function RejectDialog({
  flaggedCount,
  onConfirm,
  onClose,
}: {
  flaggedCount: number;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const t = useAdminReviewOverlayT();
  return (
    <CenterDialog
      icon={
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
          <XCircle className="h-6 w-6 text-rose-500" />
        </span>
      }
      title={t('rejectDialog.title')}
      description={t('rejectDialog.description', { count: flaggedCount })}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            {t('rejectDialog.back')}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
          >
            {t('rejectDialog.sendFeedback')}
          </button>
        </>
      }
      onClose={onClose}
    />
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
