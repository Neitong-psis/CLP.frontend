import { cn } from "@/lib/cn";

interface SkeletonBlockProps {
  readonly className?: string;
}

export function SkeletonBlock({ className }: SkeletonBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-xl bg-[#E2E8F0]/80", className)}
    />
  );
}
