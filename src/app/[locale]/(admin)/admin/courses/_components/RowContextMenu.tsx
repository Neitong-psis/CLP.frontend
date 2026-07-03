'use client';

import { useEffect, useRef, useState } from 'react';
import { useAdminCoursesContextMenuT } from '@/i18n';
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
  const t = useAdminCoursesContextMenuT();
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
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none ${className}`}
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
      className="border-border bg-card fixed z-50 min-w-35 overflow-hidden rounded-2xl border p-1.5 shadow-lg"
      style={{ top: pos.y, left: pos.x }}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-muted-foreground truncate px-3 pt-1.5 pb-1.5 text-[10px] font-semibold tracking-widest uppercase">
        {course.title.length > 26
          ? course.title.slice(0, 26) + '…'
          : course.title}
      </p>
      <div className="border-border mx-1.5 mb-1 border-t" />

      {item(
        onView,
        'text-foreground hover:bg-muted focus-visible:bg-muted',
        <Eye className="text-muted-foreground h-3.5 w-3.5 shrink-0" />,
        t('view'),
      )}
      {item(
        onEdit,
        'text-foreground hover:bg-muted focus-visible:bg-muted',
        <Pencil className="text-muted-foreground h-3.5 w-3.5 shrink-0" />,
        t('edit'),
      )}

      {course.status === 'Pending' &&
        item(
          onReview,
          'text-brand-gold hover:bg-brand-gold/10 focus-visible:bg-brand-gold/10',
          <ClipboardCheck className="h-3.5 w-3.5 shrink-0" />,
          t('review'),
        )}

      {course.status === 'Archive' &&
        item(
          onPublish,
          'text-emerald-500 hover:bg-emerald-500/10 focus-visible:bg-emerald-500/10',
          <Check className="h-3.5 w-3.5 shrink-0" />,
          t('publish'),
        )}

      <div className="border-border mx-1.5 my-1 border-t" />
      {item(
        onDelete,
        'text-rose-500 hover:bg-rose-500/10 focus-visible:bg-rose-500/10',
        <Trash2 className="h-3.5 w-3.5 shrink-0" />,
        t('delete'),
      )}
    </div>
  );
}
