'use client';

import { useId } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  /** Accessible label for the input (visually hidden). */
  ariaLabel: string;
  className?: string;
}

/**
 * Canonical search field for learner list toolbars. Standardises the search
 * box styling shared across Explore and Certificates behind one component.
 */
export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
}: SearchInputProps) {
  const id = useId();

  return (
    <div className={cn('relative', className)}>
      <label htmlFor={id} className="sr-only">
        {ariaLabel}
      </label>
      <Search
        className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="focus:border-brand-gold/50 focus:ring-brand-gold/10 border-border bg-card text-foreground placeholder:text-muted-foreground h-10 w-full rounded-xl border pr-4 pl-10 text-sm outline-none focus:ring-2"
      />
    </div>
  );
}
