'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

function DropdownMenuContent({
  className,
  sideOffset = 8,
  theme = 'dark',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & {
  theme?: 'dark' | 'light';
}) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-45 overflow-hidden rounded-2xl p-1.5 shadow-lg',
          theme === 'dark'
            ? 'bg-brand-navy dark:bg-[#071225]'
            : 'border-border bg-card border',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label>) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        'text-brand-gold/70 px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  theme = 'dark',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  theme?: 'dark' | 'light';
}) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        'relative flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium outline-none select-none',
        'transition-colors duration-100',
        theme === 'dark'
          ? 'text-white/60 focus:bg-white/10 focus:text-white'
          : 'text-foreground/70 focus:bg-muted focus:text-foreground',
        'data-disabled:pointer-events-none data-disabled:opacity-30',
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn('my-1.5 h-px bg-white/8', className)}
      {...props}
    />
  );
}

function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger>) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 outline-none select-none',
        'transition-colors duration-100 focus:bg-white/10 focus:text-white',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        'bg-brand-navy z-50 min-w-40 overflow-hidden rounded-2xl p-1.5 dark:bg-[#071225]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
};
