"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Award } from "lucide-react";
import type { Course } from "@/config/learner";
import { CATEGORY_GRADIENT } from "@/config/learner";

type Filter = "all" | "in-progress" | "completed";

export default function MyLearningTabs({ courses }: { courses: Course[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const inProgress  = courses.filter((c) => !c.completed);
  const completed   = courses.filter((c) => c.completed);
  const visible     = filter === "all" ? courses : filter === "in-progress" ? inProgress : completed;

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "in-progress", label: "In Progress", count: inProgress.length },
    { key: "completed",   label: "Completed",   count: completed.length  },
    { key: "all",         label: "All",          count: courses.length    },
  ];

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-6 flex gap-2">
        {tabs.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              filter === key
                ? "bg-[#f4a300] text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((course) => (
          <div key={course.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${CATEGORY_GRADIENT[course.category] ?? "from-slate-600 to-slate-700"}`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Play className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="p-4">
              <span className="mb-2 inline-block rounded-full bg-[#00003e]/5 px-2 py-0.5 text-[10px] font-semibold text-[#00003e]/60">
                {course.category}
              </span>
              <p className="mb-0.5 font-semibold leading-snug text-[#00003e]">{course.title}</p>
              <p className="mb-3 text-xs text-slate-400">by {course.author} · {course.level}</p>

              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Progress</span>
                <span className="font-semibold text-[#00003e]">{course.progress}%</span>
              </div>
              <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${course.completed ? "bg-emerald-500" : "bg-[#f4a300]"}`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              {course.completed ? (
                <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2 text-xs font-bold text-white transition hover:bg-emerald-600">
                  <Award className="h-3.5 w-3.5" /> View Certificate
                </button>
              ) : (
                <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#f4a300] py-2 text-xs font-bold text-white transition hover:bg-[#e09400]">
                  <Play className="h-3 w-3" /> Continue
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
