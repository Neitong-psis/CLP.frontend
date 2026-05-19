"use client";

import { useState } from "react";
import { Play, Star, Clock, Bookmark } from "lucide-react";
import type { Course } from "@/config/learner";
import { EXPLORE_CATEGORIES, CATEGORY_GRADIENT } from "@/config/learner";

export default function ExploreFilter({ courses }: { courses: Course[] }) {
  const [active, setActive] = useState("All");

  const visible = active === "All" ? courses : courses.filter((c) => c.category === active);

  return (
    <>
      {/* Category pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {EXPLORE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              active === cat
                ? "bg-[#00003e] text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((course) => (
          <div key={course.id} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            {/* Thumbnail */}
            <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${CATEGORY_GRADIENT[course.category] ?? "from-slate-600 to-slate-700"}`}>
              <span className="absolute left-2.5 top-2.5 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                {course.level}
              </span>
              {course.enrolled && (
                <span className="absolute right-2.5 top-2.5 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  Enrolled
                </span>
              )}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Play className="h-5 w-5 text-white" />
              </div>
              <button className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-[#00003e]">
                <Bookmark className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <span className="mb-1.5 inline-block text-[10px] font-semibold uppercase tracking-wide text-[#f4a300]">
                {course.category}
              </span>
              <p className="mb-0.5 font-semibold leading-snug text-[#00003e]">{course.title}</p>
              <p className="mb-3 text-xs text-slate-400">by {course.author}</p>

              <div className="mb-3 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-[#f4a300] text-[#f4a300]" />
                  {course.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {course.hours}h
                </span>
              </div>

              {course.enrolled ? (
                <button className="w-full rounded-lg bg-[#f4a300] py-2 text-xs font-bold text-white transition hover:bg-[#e09400]">
                  Continue
                </button>
              ) : (
                <button className="w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-[#00003e] transition hover:border-[#f4a300] hover:text-[#f4a300]">
                  Enroll
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
