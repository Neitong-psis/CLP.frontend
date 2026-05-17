import { cn } from "@/lib/cn";

export type ProgressBarVariant = "default" | "thick";

interface ProgressBarProps {
  readonly value: number;
  readonly className?: string;
  readonly trackClassName?: string;
  readonly fillClassName?: string;
  readonly variant?: ProgressBarVariant;
  readonly ariaLabelledBy?: string;
}

export function ProgressBar({
  value,
  className,
  trackClassName,
  fillClassName,
  variant = "default",
  ariaLabelledBy,
}: ProgressBarProps) {
  const safe = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  const thickness = variant === "thick" ? "h-2.5" : "h-1.5";

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full rounded-full bg-[#EEF2FF]",
          thickness,
          trackClassName,
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(safe)}
        {...(ariaLabelledBy ? { "aria-labelledby": ariaLabelledBy } : { "aria-label": "Progress" })}
      >
        <div
          className={cn(
            "h-full rounded-full bg-[#E6A23C] transition-[width] duration-500 ease-out",
            fillClassName,
          )}
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  );
}
