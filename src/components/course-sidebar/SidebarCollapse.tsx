'use client';

import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SidebarCollapseProps {
  readonly isMini: boolean;
  readonly onToggle: () => void;
  readonly collapseLabel: string;
  readonly expandLabel: string;
  readonly className?: string;
}

const BUTTON_CLASS = cn(
  'flex size-7 shrink-0 items-center justify-center rounded-md',
  'text-muted-foreground hover:text-foreground hover:bg-muted',
  'transition-colors duration-150 outline-none',
  'focus-visible:ring-course-accent focus-visible:ring-2',
);

/** Width toggle: 320px column ⇄ 72px rail. Desktop only. */
export function SidebarCollapse({
  isMini,
  onToggle,
  collapseLabel,
  expandLabel,
  className,
}: SidebarCollapseProps) {
  const Icon = isMini ? PanelLeftOpen : PanelLeftClose;
  const label = isMini ? expandLabel : collapseLabel;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={cn(BUTTON_CLASS, className)}
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}

interface DrawerCloseProps {
  readonly onClose: () => void;
  readonly label: string;
}

/** The drawer's dismiss affordance. Shares the toggle's hit-target and styling. */
export function DrawerClose({ onClose, label }: DrawerCloseProps) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={label}
      className={BUTTON_CLASS}
    >
      <X aria-hidden className="size-4" />
    </button>
  );
}
