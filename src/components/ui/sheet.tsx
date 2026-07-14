'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

/** Shared with SheetContent so the backdrop and panel move in lockstep — same
 *  easing the rest of the app's Motion-driven surfaces use (course-sidebar's
 *  `EASE`), so this doesn't feel like a different animation vocabulary. */
const SHEET_EASE = '[animation-timing-function:cubic-bezier(0.32,0.72,0,1)]';

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:duration-200 data-[state=open]:duration-300',
        SHEET_EASE,
        className,
      )}
      {...props}
    />
  );
}

type SheetSide = 'top' | 'right' | 'bottom' | 'left';

const SIDE_CLASSES: Record<SheetSide, string> = {
  right:
    'inset-y-0 right-0 h-full w-full border-l sm:max-w-md ' +
    'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
  left:
    'inset-y-0 left-0 h-full w-full border-r sm:max-w-md ' +
    'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
  top:
    'inset-x-0 top-0 border-b ' +
    'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
  bottom:
    'inset-x-0 bottom-0 border-t ' +
    'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
};

function SheetContent({
  className,
  children,
  side = 'right',
  showClose = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: SheetSide;
  showClose?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          'bg-card fixed z-50 flex flex-col shadow-2xl',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:duration-200 data-[state=open]:duration-300',
          SHEET_EASE,
          'border-border',
          SIDE_CLASSES[side],
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <SheetPrimitive.Close className="text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-brand-gold absolute top-4 right-4 flex size-8 items-center justify-center rounded-lg transition-colors outline-none focus-visible:ring-2">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        'border-border flex shrink-0 flex-col gap-1 border-b px-5 py-4',
        className,
      )}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        'border-border mt-auto flex shrink-0 items-center gap-2 border-t px-5 py-4',
        className,
      )}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground text-base font-bold', className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-xs', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
