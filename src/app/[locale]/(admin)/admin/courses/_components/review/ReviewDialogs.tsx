'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
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

// ── Approve ──────────────────────────────────────────────────────────────────

export function ApproveDialog({
  courseTitle,
  onConfirm,
  onClose,
}: {
  courseTitle: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <CenterDialog
      icon={
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        </span>
      }
      title="Approve this course?"
      description={`“${courseTitle}” will be published and visible to learners. You can archive it later from the course list.`}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Approve &amp; publish
          </button>
        </>
      }
      onClose={onClose}
    />
  );
}

// ── Reject ───────────────────────────────────────────────────────────────────

export function RejectDialog({
  courseTitle,
  onConfirm,
  onClose,
}: {
  courseTitle: string;
  onConfirm: (feedback: string) => void;
  onClose: () => void;
}) {
  const [feedback, setFeedback] = useState('');
  const trimmed = feedback.trim();

  return (
    <CenterDialog
      icon={
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50">
          <XCircle className="h-6 w-6 text-rose-500" />
        </span>
      }
      title="Reject this course?"
      description={`Tell the educator what to change before resubmitting “${courseTitle}”.`}
      footer={
        <>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Back
          </button>
          <button
            onClick={() => onConfirm(trimmed)}
            disabled={trimmed.length === 0}
            className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send feedback
          </button>
        </>
      }
      onClose={onClose}
    >
      <div className="mt-4 text-left">
        <label
          htmlFor="reject-feedback"
          className="text-xs font-semibold text-slate-700"
        >
          Feedback for educator
        </label>
        <textarea
          id="reject-feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={3}
          autoFocus
          placeholder="Explain what should be changed before resubmitting…"
          className="focus:border-brand-gold/50 focus:ring-brand-gold/10 mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
        />
        <p className="mt-1.5 text-[11px] text-slate-400">
          This feedback is attached to the course submission.
        </p>
      </div>
    </CenterDialog>
  );
}
