import { cn } from '@/lib/utils/cn';

interface ProgressBarProps {
  /** 0–100. */
  readonly percent: number;
  readonly className?: string;
  /** Completed bars go green; everything else uses the accent. */
  readonly tone?: 'accent' | 'done' | 'muted';
}

const TONE_CLASS: Record<NonNullable<ProgressBarProps['tone']>, string> = {
  accent: 'bg-course-accent',
  done: 'bg-course-done',
  muted: 'bg-muted-foreground/40',
};

/**
 * A 2px hairline bar. Presentational only — the accessible progress value is
 * announced by the labelled text next to it, so this is hidden from AT to avoid
 * reading the same number twice.
 */
export function ProgressBar({
  percent,
  className,
  tone = 'accent',
}: ProgressBarProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'bg-border/70 h-0.5 w-full overflow-hidden rounded-full',
        className,
      )}
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-300 ease-out',
          TONE_CLASS[tone],
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
