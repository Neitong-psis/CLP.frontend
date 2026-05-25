import type { ReactNode } from 'react';

interface HighlightedWordProps {
  children: ReactNode;
}

export function HighlightedWord({ children }: HighlightedWordProps) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="bg-brand-gold/40 absolute bottom-1 left-0 z-0 h-3 w-full rounded-sm"
      />
    </span>
  );
}
