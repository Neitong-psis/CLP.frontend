'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Shared numbered pagination control for learner list pages (My Learning,
 * Certificates, Explore). Renders nothing when there's only one page.
 */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={cn('flex items-center justify-center gap-1.5', className)}>
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="Previous page"
        className="border-border text-muted-foreground hover:border-brand-gold/50 hover:text-foreground flex size-9 shrink-0 items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft className="size-4" />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold transition-colors',
            p === page
              ? 'bg-brand-gold text-brand-navy'
              : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
          )}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
        className="border-border text-muted-foreground hover:border-brand-gold/50 hover:text-foreground flex size-9 shrink-0 items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
