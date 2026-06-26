'use client';

import type { ComponentType } from 'react';
import { cn } from '@/lib/utils/cn';

interface ToolbarButtonProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  isActive = false,
  disabled = false,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      // Keep the editor selection while clicking the toolbar.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={isActive}
      className={cn(
        'rounded-md p-1.5 transition-colors disabled:cursor-not-allowed disabled:opacity-40',
        isActive
          ? 'bg-brand-accent/15 text-brand-accent'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
