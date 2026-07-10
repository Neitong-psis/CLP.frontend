import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { CONTENT_TYPE_ICON } from './constants';
import type { ContentItemType, ItemState } from './types';

interface ItemStatusProps {
  readonly state: ItemState;
  readonly type: ContentItemType;
  readonly className?: string;
}

/**
 * The 20px status token at the head of every content-item row.
 *
 * Each state gets a distinct *shape*, not just a distinct colour — a filled
 * check, a lock, a ringed type-icon, an outlined type-icon. Colour alone would
 * fail for the ~8% of learners with a colour-vision deficiency.
 */
const STATE_CLASS: Record<ItemState, string> = {
  completed: 'border-transparent bg-course-done text-white',
  current: 'border-course-accent bg-course-accent/10 text-course-accent',
  'in-progress': 'border-course-accent/40 bg-transparent text-course-accent',
  'not-started': 'border-border bg-transparent text-muted-foreground',
  locked: 'border-transparent bg-muted text-muted-foreground/60',
};

export function ItemStatus({ state, type, className }: ItemStatusProps) {
  const TypeIcon = CONTENT_TYPE_ICON[type];

  return (
    <span
      aria-hidden
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-full border',
        'transition-colors duration-150',
        STATE_CLASS[state],
        className,
      )}
    >
      {state === 'completed' ? (
        <Check className="size-3" strokeWidth={3} />
      ) : state === 'locked' ? (
        <Lock className="size-2.5" />
      ) : (
        <TypeIcon className="size-3" strokeWidth={2.25} />
      )}
    </span>
  );
}
