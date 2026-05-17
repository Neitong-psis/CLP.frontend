import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type StatsCardTone =
  | "navy"
  | "gold"
  | "green"
  | "orange"
  | "secondary";

interface StatsCardProps {
  readonly title: string;
  readonly subtitle: string;
  readonly icon: LucideIcon;
  readonly tone: StatsCardTone;
}

const toneStyles: Record<StatsCardTone, { iconBg: string; iconFg: string }> = {
  navy: {
    iconBg: "bg-[#0F172A]",
    iconFg: "text-white",
  },
  secondary: {
    iconBg: "bg-[#1E3A5F]",
    iconFg: "text-white",
  },
  gold: {
    iconBg: "bg-[#E6A23C]/15",
    iconFg: "text-[#E6A23C]",
  },
  green: {
    iconBg: "bg-emerald-500/15",
    iconFg: "text-emerald-600",
  },
  orange: {
    iconBg: "bg-orange-500/15",
    iconFg: "text-orange-600",
  },
};

export function StatsCard({ title, subtitle, icon: Icon, tone }: StatsCardProps) {
  const styles = toneStyles[tone];

  return (
    <article
      className={cn(
        "rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm",
        "transition-transform duration-200 will-change-transform",
        "hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            styles.iconBg,
          )}
        >
          <Icon className={cn("h-6 w-6", styles.iconFg)} aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-semibold tracking-tight text-[#0F172A]">{title}</p>
          <p className="mt-1 text-sm text-[#64748B]">{subtitle}</p>
        </div>
      </div>
    </article>
  );
}
