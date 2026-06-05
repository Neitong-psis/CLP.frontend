import type { ComponentType } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'enrollment' | 'accreditation';

interface FloatingBadgeProps {
  eyebrow: string;
  value: string;
  icon?: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  variant: Variant;
  ariaLabel?: string;
  className?: string;
}

const BASE_CLASSES = 'absolute flex items-center gap-2.5 rounded-lg px-4 py-3';

const VARIANT_CLASSES: Record<
  Variant,
  { container: string; eyebrow: string; icon: string }
> = {
  enrollment: {
    container: '-top-5 -right-3 bg-brand-gold sm:-right-5',
    eyebrow: 'text-brand-navy',
    icon: '',
  },
  accreditation: {
    container:
      '-bottom-5 -left-3 border border-brand-navy/10 bg-white sm:-left-5',
    eyebrow: 'text-brand-navy',
    icon: 'h-5 w-5 text-brand-navy',
  },
};

export function FloatingBadge({
  eyebrow,
  value,
  icon: Icon,
  variant,
  ariaLabel,
  className,
}: FloatingBadgeProps) {
  const styles = VARIANT_CLASSES[variant];

  return (
    <div
      aria-label={ariaLabel}
      className={cn(BASE_CLASSES, styles.container, className)}
    >
      {Icon && (
        <span className="shrink-0">
          <Icon aria-hidden className={styles.icon} />
        </span>
      )}
      <div>
        <p
          className={cn(
            'text-[9px] font-bold tracking-widest uppercase',
            styles.eyebrow,
          )}
        >
          {eyebrow}
        </p>
        <p className="text-brand-navy text-sm font-bold">{value}</p>
      </div>
    </div>
  );
}
