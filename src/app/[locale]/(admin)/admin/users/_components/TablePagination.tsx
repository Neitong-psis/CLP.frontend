'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button/Button';

interface Props {
  currentPage: number;
  totalPages: number;
  pageStart: number;
  pageEnd: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (page: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  pageStart,
  pageEnd,
  totalCount,
  onPrev,
  onNext,
  onGoTo,
}: Props) {
  return (
    <div className="border-border flex items-center justify-between border-t px-5 py-3">
      <p className="text-muted-foreground text-xs">
        Showing {pageStart}–{pageEnd} of {totalCount} users
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Previous page"
          onClick={onPrev}
          disabled={currentPage === 1}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg disabled:opacity-30"
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            variant="ghost"
            size="icon-xs"
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? 'page' : undefined}
            onClick={() => onGoTo(p)}
            className={cn(
              'rounded-lg text-xs',
              p === currentPage
                ? 'bg-foreground text-background hover:opacity-90'
                : 'text-muted-foreground hover:bg-muted',
            )}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Next page"
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg disabled:opacity-30"
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
