'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye, Pencil, Check, Trash2, ClipboardCheck } from 'lucide-react';
import type { AdminCourseRow } from '@/constants/admin';

interface RowContextMenuProps {
  course: AdminCourseRow;
  x: number;
  y: number;
  onView: () => void;
  onEdit: () => void;
  onReview: () => void;
  onPublish: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export function RowContextMenu({
  course,
  x,
  y,
  onView,
  onEdit,
  onReview,
  onPublish,
  onDelete,
  onClose,
}: RowContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setPos({
      x: x + width > window.innerWidth ? x - width : x,
      y: y + height > window.innerHeight ? y - height : y,
    });
  }, [x, y]);

  const item = (
    onClick: () => void,
    className: string,
    icon: React.ReactNode,
    label: string,
  ) => (
    <button
      role="menuitem"
      onClick={() => {
        onClick();
        onClose();
      }}
      className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors focus-visible:outline-none ${className}`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div
      ref={ref}
      role="menu"
      aria-label={`Actions for ${course.title}`}
      className="fixed z-50 min-w-35 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
      style={{ top: pos.y, left: pos.x }}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="truncate px-3 pt-2 pb-1.5 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
        {course.title.length > 26
          ? course.title.slice(0, 26) + '…'
          : course.title}
      </p>
      <div className="mb-1 border-t border-slate-100" />

      {item(
        onView,
        'text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50',
        <Eye className="h-3.5 w-3.5 shrink-0 text-slate-400" />,
        'View',
      )}
      {item(
        onEdit,
        'text-slate-700 hover:bg-slate-50 focus-visible:bg-slate-50',
        <Pencil className="h-3.5 w-3.5 shrink-0 text-slate-400" />,
        'Edit',
      )}

      {course.status === 'Pending' &&
        item(
          onReview,
          'text-brand-gold hover:bg-brand-gold/10 focus-visible:bg-brand-gold/10',
          <ClipboardCheck className="h-3.5 w-3.5 shrink-0" />,
          'Review',
        )}

      {course.status === 'Archive' &&
        item(
          onPublish,
          'text-emerald-600 hover:bg-emerald-50 focus-visible:bg-emerald-50',
          <Check className="h-3.5 w-3.5 shrink-0" />,
          'Publish',
        )}

      <div className="my-1 border-t border-slate-100" />
      {item(
        onDelete,
        'text-rose-500 hover:bg-rose-50 focus-visible:bg-rose-50',
        <Trash2 className="h-3.5 w-3.5 shrink-0" />,
        'Delete',
      )}
    </div>
  );
}
