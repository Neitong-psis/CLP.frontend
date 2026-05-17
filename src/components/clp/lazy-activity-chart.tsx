"use client";

import dynamic from "next/dynamic";
import type { WeeklyActivityDto } from "@/types/dto";

const ActivityChartLazy = dynamic(
  async () => {
    const mod = await import("@/components/clp/activity-chart");
    return { default: mod.ActivityChart };
  },
  {
    ssr: false,
    loading: () => (
      <div
        className="h-64 w-full animate-pulse rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm"
        aria-hidden
      />
    ),
  },
);

interface LazyActivityChartProps {
  readonly data: readonly WeeklyActivityDto[];
}

export function LazyActivityChart({ data }: LazyActivityChartProps) {
  return <ActivityChartLazy data={data} />;
}
