import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ContentHeaderProps {
  kindLabel: string;
  title: string;
  /** Right-aligned slot next to the kind badge — a duration/read-time chip,
   *  or (Quiz) the timer. Never a subtitle/description — every content type
   *  shares this exact header shape, title only. */
  meta?: ReactNode;
  /** Optional row directly under the title — still inside the header's own
   *  padding, so a caller (e.g. Quiz's "Question 3 of 6 · Single Choice"
   *  pills) doesn't have to stack a second full-padding block below it. */
  subRow?: ReactNode;
  className?: string;
}

/** The one header shape every content type shares: a kind badge + optional
 *  right-side meta, the title, then a divider before the type-specific body. */
export function ContentHeader({
  kindLabel,
  title,
  meta,
  subRow,
  className,
}: ContentHeaderProps) {
  return (
    <div
      className={cn('border-border/60 border-b px-6 pt-5 pb-3.5', className)}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="border-border bg-muted/40 text-foreground/70 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
          {kindLabel}
        </span>
        {meta}
      </div>
      <h2 className="text-foreground mt-2.5 text-xl font-bold sm:text-2xl">
        {title}
      </h2>
      {subRow && <div className="mt-2.5">{subRow}</div>}
    </div>
  );
}
