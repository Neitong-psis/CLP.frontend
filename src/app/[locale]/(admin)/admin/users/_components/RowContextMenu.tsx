'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye, Pencil, ShieldCheck, ShieldOff, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { AdminUserRow } from '@/constants/admin';

export interface ContextMenuState {
  user: AdminUserRow;
  x: number;
  y: number;
}

interface Props {
  user: AdminUserRow;
  x: number;
  y: number;
  onView: () => void;
  onEdit: () => void;
  onSuspend: () => void;
  onActivate: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const itemBase =
  'flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors focus-visible:outline-none';

export function RowContextMenu({
  user,
  x,
  y,
  onView,
  onEdit,
  onSuspend,
  onActivate,
  onDelete,
  onClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });

  // Clamp to viewport after first render so the menu never clips off-screen
  useEffect(() => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setPos({
      x: x + width > window.innerWidth ? x - width : x,
      y: y + height > window.innerHeight ? y - height : y,
    });
  }, [x, y]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('click', onClose);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('click', onClose);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="menu"
      aria-label={`Actions for ${user.name}`}
      className="border-border bg-card fixed z-50 min-w-35 overflow-hidden rounded-xl border py-1 shadow-lg"
      style={{ top: pos.y, left: pos.x }}
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-muted-foreground truncate px-3 pt-2 pb-1.5 text-[10px] font-semibold tracking-widest uppercase">
        {user.name.length > 26 ? `${user.name.slice(0, 26)}…` : user.name}
      </p>
      <div className="border-border mb-1 border-t" />

      <button
        role="menuitem"
        onClick={() => {
          onView();
          onClose();
        }}
        className={cn(
          itemBase,
          'text-foreground hover:bg-muted focus-visible:bg-muted',
        )}
      >
        <Eye className="text-muted-foreground h-3.5 w-3.5 shrink-0" /> View
      </button>
      <button
        role="menuitem"
        onClick={() => {
          onEdit();
          onClose();
        }}
        className={cn(
          itemBase,
          'text-foreground hover:bg-muted focus-visible:bg-muted',
        )}
      >
        <Pencil className="text-muted-foreground h-3.5 w-3.5 shrink-0" /> Edit
      </button>

      {user.status !== 'Suspended' ? (
        <button
          role="menuitem"
          onClick={() => {
            onSuspend();
            onClose();
          }}
          className={cn(
            itemBase,
            'text-amber-500 hover:bg-amber-500/10 focus-visible:bg-amber-500/10',
          )}
        >
          <ShieldOff className="h-3.5 w-3.5 shrink-0" /> Suspend
        </button>
      ) : (
        <button
          role="menuitem"
          onClick={() => {
            onActivate();
            onClose();
          }}
          className={cn(
            itemBase,
            'text-emerald-500 hover:bg-emerald-500/10 focus-visible:bg-emerald-500/10',
          )}
        >
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> Activate
        </button>
      )}

      <div className="border-border my-1 border-t" />

      <button
        role="menuitem"
        onClick={() => {
          onDelete();
          onClose();
        }}
        className={cn(
          itemBase,
          'text-rose-500 hover:bg-rose-500/10 focus-visible:bg-rose-500/10',
        )}
      >
        <Trash2 className="h-3.5 w-3.5 shrink-0" /> Delete
      </button>
    </div>
  );
}
