"use client";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CourseSummaryDto } from "@/types/dto";
import { ProgressBar } from "@/components/clp/progress-bar";
import { cn } from "@/lib/cn";

interface CourseCardProps {
  readonly course: CourseSummaryDto;
  readonly href?: string;
}

export function CourseCard({ course, href = "#" }: CourseCardProps) {
  const labelId = `course-title-${course.id}`;

  return (
    <motion.article
      layout
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={cn(
        "flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm",
        "transition-shadow duration-200 hover:shadow-md",
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0F172A] text-white shadow-sm">
          <Play className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-flex rounded-full bg-[#F1F5F9] px-2.5 py-1 text-xs font-semibold text-[#475569]">
            {course.category}
          </span>
          <h3 id={labelId} className="mt-2 line-clamp-2 text-base font-semibold text-[#0F172A]">
            {course.title}
          </h3>
          <p className="mt-1 text-sm text-[#64748B]">{course.instructor}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm font-medium">
          <span id={`${course.id}-progress-label`} className="text-[#64748B]">
            Progress
          </span>
          <span className="text-[#0F172A]">{course.progressPercent}%</span>
        </div>
        <ProgressBar
          value={course.progressPercent}
          ariaLabelledBy={`${course.id}-progress-label ${labelId}`}
        />
      </div>

      <Link
        href={href}
        aria-label={`Continue learning ${course.title}`}
        className={cn(
          "mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
          "bg-[#E6A23C] text-[#0F172A]",
          "shadow-sm ring-1 ring-[#F5D595]/60 transition duration-150",
          "hover:brightness-[1.03] hover:shadow-md active:brightness-[0.98]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6A23C]",
        )}
      >
        Continue Learning
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </motion.article>
  );
}
