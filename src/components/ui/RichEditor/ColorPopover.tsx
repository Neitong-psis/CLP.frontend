'use client';

import type { ComponentType } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { cn } from '@/lib/utils/cn';

interface ColorPopoverProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  clearLabel: string;
  colors: readonly string[];
  isActive?: boolean;
  onSelect: (color: string) => void;
  onClear: () => void;
}

/** Shared swatch popover, reused for both text colour and highlight. */
export function ColorPopover({
  icon: Icon,
  label,
  clearLabel,
  colors,
  isActive = false,
  onSelect,
  onClear,
}: ColorPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger
        title={label}
        aria-label={label}
        onMouseDown={(e) => e.preventDefault()}
        className={cn(
          'rounded-md p-1.5 transition-colors',
          isActive
            ? 'bg-brand-accent/15 text-brand-accent'
            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
        )}
      >
        <Icon className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto gap-2 p-2">
        <div className="grid grid-cols-6 gap-1">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              title={color}
              aria-label={color}
              onClick={() => onSelect(color)}
              className="border-border/60 h-5 w-5 rounded-md border transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-muted-foreground hover:text-foreground rounded-md px-1 py-0.5 text-left text-xs transition-colors"
        >
          {clearLabel}
        </button>
      </PopoverContent>
    </Popover>
  );
}
