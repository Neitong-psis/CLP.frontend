import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface PageHeroProps {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function PageHero({
  title,
  description,
  action,
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-start justify-between gap-4',
        className,
      )}
    >
      <div>
        <h1 className="text-brand-gold text-2xl font-black sm:text-3xl">
          {title}
        </h1>
        <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
