import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  readonly title: string;
  readonly description: string;
  readonly icon?: LucideIcon;
  readonly action?: ReactNode;
  readonly className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-10 text-center shadow-sm",
        className,
      )}
    >
      {Icon ? (
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#0F172A]">
          <Icon className="h-7 w-7" aria-hidden />
        </div>
      ) : null}
      <h2 className="mt-4 text-lg font-semibold text-[#0F172A]">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">{description}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
