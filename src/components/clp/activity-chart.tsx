"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeeklyActivityDto } from "@/types/dto";

interface ActivityChartProps {
  readonly data: readonly WeeklyActivityDto[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const chartData = data.map((d) => ({
    day: d.dayShort,
    minutes: d.minutes,
  }));

  return (
    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[#0F172A]">Weekly Learning Activity</h2>
        <p className="mt-1 text-sm text-[#64748B]">Minutes per day this week</p>
      </header>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={{ stroke: "#E2E8F0" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickCount={5}
            />
            <Tooltip
              cursor={{ fill: "rgba(15, 23, 42, 0.04)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
              }}
              labelStyle={{ color: "#0F172A", fontWeight: 600 }}
              formatter={(value) => [`${Number(value)} min`, "Time"]}
            />
            <Bar
              dataKey="minutes"
              fill="#E6A23C"
              radius={[10, 10, 6, 6]}
              maxBarSize={26}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
