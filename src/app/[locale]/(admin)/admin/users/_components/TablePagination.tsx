'use client';

import { useAdminUsersT, useAdminCommonT } from '@/i18n';
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
  const t = useAdminUsersT();
  const tCommon = useAdminCommonT();
  return (
    <div className="border-border flex items-center justify-between border-t px-5 py-3">
      <p className="text-muted-foreground text-xs">
        {t('showingOf', { from: pageStart, to: pageEnd, total: totalCount })}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={tCommon('previousPage')}
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
            aria-label={tCommon('page', { n: p })}
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
          aria-label={tCommon('nextPage')}
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
