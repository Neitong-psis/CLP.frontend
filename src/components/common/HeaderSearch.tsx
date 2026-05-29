'use client';

import { memo } from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { cn } from '@/utils/cn';

interface HeaderSearchProps {
  compact?: boolean;
  className?: string;
}

export const HeaderSearch = memo(function HeaderSearch({
  compact = false,
  className,
}: HeaderSearchProps) {
  const { query, handleChange } = useSearch();

  return (
    <div
      className={cn(
        'border-brand-navy/10 bg-brand-navy/4 focus-within:border-brand-gold/50 focus-within:ring-brand-gold/15 hover:border-brand-navy/20 hover:bg-brand-navy/7 flex w-full items-center gap-2 rounded-full border transition-all duration-200 focus-within:bg-white focus-within:ring-2',
        compact ? 'max-w-56 py-1 pr-1 pl-3' : 'max-w-md py-1.5 pr-1.5 pl-4',
        className,
      )}
    >
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={compact ? 'Search…' : 'Search courses, programs…'}
        aria-label="Search"
        className={cn(
          'text-brand-navy placeholder:text-brand-navy/40 min-w-0 flex-1 bg-transparent outline-none',
          compact ? 'py-0.5 text-xs' : 'py-1 text-sm',
        )}
      />
      <button
        type="button"
        aria-label="Submit search"
        className={cn(
          'group bg-brand-gold text-brand-navy hover:bg-brand-gold-dark hover:ring-brand-gold/25 flex shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:ring-4',
          compact ? 'h-6 w-6' : 'h-8 w-8',
        )}
      >
        <Search
          aria-hidden
          className={cn(
            'transition-[rotate] duration-300 ease-out group-hover:rotate-12',
            compact ? 'h-3 w-3' : 'h-4 w-4',
          )}
        />
      </button>
    </div>
  );
});
