import type { CSSProperties, ReactNode } from 'react';

interface HighlightedWordProps {
  children: ReactNode;
  /** ms delay before the slide-up reveal begins */
  delay?: number;
}

export function HighlightedWord({ children, delay = 0 }: HighlightedWordProps) {
  const slideStyle: CSSProperties = { animationDelay: `${delay}ms` };
  const highlightStyle: CSSProperties = { animationDelay: `${delay + 450}ms` };

  return (
    <span className="group/hl relative inline-flex overflow-hidden pb-2 align-bottom">
      <span
        style={slideStyle}
        className="motion-safe:animate-slide-up relative inline-block"
      >
        <span className="text-brand-navy group-hover/hl:text-brand-navy relative z-10 transition-colors duration-500">
          {children}
        </span>
      </span>
      <span
        aria-hidden
        style={highlightStyle}
        className="bg-brand-gold/40 motion-safe:animate-highlight-in group-hover/hl:bg-brand-gold/55 absolute right-0 bottom-2 left-0 z-0 h-3 origin-left rounded-sm transition-[height,bottom,background-color] duration-500 ease-out group-hover/hl:bottom-1 group-hover/hl:h-[calc(100%-0.5rem)]"
      />
    </span>
  );
}
