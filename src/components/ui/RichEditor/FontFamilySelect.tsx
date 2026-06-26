'use client';

import { ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils/cn';
import { FONT_FAMILIES } from './constants';

interface FontFamilySelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function FontFamilySelect({
  value,
  onChange,
  label,
}: FontFamilySelectProps) {
  const current =
    FONT_FAMILIES.find((f) => f.value === value) ?? FONT_FAMILIES[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        aria-label={label}
        title={label}
        onMouseDown={(e) => e.preventDefault()}
        className={cn(
          'text-muted-foreground hover:text-foreground focus:text-foreground',
          'inline-flex h-7 max-w-36 cursor-pointer items-center gap-1 truncate',
          'rounded-md px-1.5 text-xs transition-colors outline-none',
          'hover:bg-muted/60 data-[state=open]:bg-muted/60',
        )}
      >
        <span className="truncate">{current.label}</span>
        <ChevronDown className="h-3 w-3 shrink-0 opacity-60" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={4}
          align="start"
          className={cn(
            'z-50 min-w-36 rounded-lg border p-1 shadow-md',
            'bg-popover text-popover-foreground border-border',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
        >
          {FONT_FAMILIES.map((font) => (
            <DropdownMenu.Item
              key={font.label}
              onSelect={() => onChange(font.value)}
              className={cn(
                'flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm outline-none select-none',
                'hover:bg-accent hover:text-accent-foreground transition-colors',
                'focus:bg-accent focus:text-accent-foreground',
                font.value === value && 'bg-brand-accent/15 text-brand-accent',
              )}
              style={{ fontFamily: font.value || undefined }}
            >
              {font.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
