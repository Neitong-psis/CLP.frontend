import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ProgressRingProps {
  /** 0–100. */
  readonly percent: number;
  readonly size?: number;
  readonly strokeWidth?: number;
  readonly tone?: 'accent' | 'done' | 'muted';
  readonly className?: string;
  readonly children?: ReactNode;
}

const TONE_CLASS: Record<NonNullable<ProgressRingProps['tone']>, string> = {
  accent: 'text-course-accent',
  done: 'text-course-done',
  muted: 'text-muted-foreground/50',
};

/**
 * The completion ring that wraps a module number in the mini rail.
 *
 * Uses `pathLength={100}` so the dash values are literally the percentage —
 * no circumference arithmetic that has to be kept in sync with `size`.
 */
export function ProgressRing({
  percent,
  size = 36,
  strokeWidth = 2,
  tone = 'accent',
  className,
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        aria-hidden
        width={size}
        height={size}
        // Rotate so the arc starts at 12 o'clock instead of 3 o'clock.
        className={cn('-rotate-90', TONE_CLASS[tone])}
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-border"
        />
        {percent > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke="currentColor"
            pathLength={100}
            strokeDasharray={`${percent} ${100 - percent}`}
            className="transition-[stroke-dasharray] duration-300 ease-out"
          />
        )}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        {children}
      </span>
    </span>
  );
}
