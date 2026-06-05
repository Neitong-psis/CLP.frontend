'use client';

import { useEffect, useMemo, useState } from 'react';
import { X, ArrowLeft, Check } from 'lucide-react';
import type { AdminCourseRow } from '@/constants/admin';
import { COURSE_REVIEW_MODULES, flattenItems } from '../../_lib/review';
import { ReviewSidebar } from './ReviewSidebar';
import { ReviewPanel } from './ReviewPanel';
import { ApproveDialog, RejectDialog } from './ReviewDialogs';

interface CourseReviewOverlayProps {
  course: AdminCourseRow;
  onApprove: (course: AdminCourseRow) => void;
  onReject: (course: AdminCourseRow, feedback: string) => void;
  onClose: () => void;
}

type DialogKind = 'approve' | 'reject' | null;

export function CourseReviewOverlay({
  course,
  onApprove,
  onReject,
  onClose,
}: CourseReviewOverlayProps) {
  const modules = COURSE_REVIEW_MODULES;
  const items = useMemo(() => flattenItems(modules), [modules]);

  const [activeItemId, setActiveItemId] = useState(items[0]?.id ?? '');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    () => new Set(modules.map((m) => m.id)),
  );
  const [viewedIds, setViewedIds] = useState<Set<string>>(
    () => new Set([items[0]?.id]),
  );
  const [dialog, setDialog] = useState<DialogKind>(null);

  const activeItem = items.find((i) => i.id === activeItemId) ?? items[0];

  // Lock background scroll while the overlay is open; close on Escape.
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (dialog) setDialog(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [dialog, onClose]);

  function handleSelect(id: string) {
    setActiveItemId(id);
    setViewedIds((prev) => new Set(prev).add(id));
  }

  function toggleModule(id: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-100"
      role="dialog"
      aria-modal="true"
      aria-label={`Review ${course.title}`}
    >
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
        <button
          onClick={onClose}
          aria-label="Close review"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-brand-navy truncate text-base font-bold sm:text-lg">
            Course Review
          </h1>
          <p className="truncate text-[11px] text-slate-400">
            {course.title} · submitted by {course.instructor}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full border border-amber-200 bg-amber-50 px-3 py-0.5 text-xs font-semibold text-amber-600 sm:inline-flex">
          Pending review
        </span>
        <button
          onClick={onClose}
          aria-label="Close review"
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="size-4" />
        </button>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        <div className="hidden md:flex">
          <ReviewSidebar
            courseTitle={course.title}
            modules={modules}
            activeItemId={activeItemId}
            reviewedCount={viewedIds.size}
            totalCount={items.length}
            expandedModules={expandedModules}
            onToggleModule={toggleModule}
            onSelect={handleSelect}
          />
        </div>

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
            {activeItem && <ReviewPanel item={activeItem} />}
          </div>
        </main>
      </div>

      {/* Footer / decision bar */}
      <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDialog('reject')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50"
          >
            <X className="h-4 w-4" /> Reject
          </button>
          <button
            onClick={() => setDialog('approve')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            <Check className="h-4 w-4" /> Approve
          </button>
        </div>
      </footer>

      {dialog === 'approve' && (
        <ApproveDialog
          courseTitle={course.title}
          onConfirm={() => onApprove(course)}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog === 'reject' && (
        <RejectDialog
          courseTitle={course.title}
          onConfirm={(feedback) => onReject(course, feedback)}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  );
}
