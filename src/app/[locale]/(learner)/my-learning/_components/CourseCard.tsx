'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { slugify } from '@/lib/utils/slugify';
import { type Course } from '@/constants/learner';

interface CourseCardProps {
  course: Course;
  labels: {
    courseType: string;
    modules: (n: number) => string;
    lessons: (n: number) => string;
    resumeCourse: string;
    replayCourse: string;
    by: string;
  };
}

export default function CourseCard({ course, labels }: CourseCardProps) {
  const isCompleted = course.progress === 100;
  const ActionIcon = isCompleted ? RotateCcw : ArrowRight;

  return (
    <div
      className={cn(
        'group border-border cursor-default overflow-hidden rounded-xl border transition-all duration-300 ease-out',
        'hover:border-brand-gold/25 hover:-translate-y-1.5 hover:shadow-xl',
      )}
    >
      {/* ── Thumbnail ────────────────────────────────────────────────── */}
      <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden">
        {course.thumbnail ? (
          <>
            {/* Cover image — zooms in on hover */}
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />

            {/* Flat tint so the badge + progress stay legible over any cover photo */}
            <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
          </>
        ) : (
          /* Navy placeholder for courses without a cover image */
          <div className="bg-brand-navy absolute inset-0 dark:bg-[#071225]" />
        )}

        {/* Top-left badge */}
        <span className="absolute top-3 left-3 z-10 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          {labels.courseType}
        </span>

        {/* Bottom-right progress circle — lifts on hover */}
        <div className="absolute right-3 bottom-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 group-hover:scale-110">
          <span className="text-brand-navy text-sm font-black">
            {course.progress}%
          </span>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="bg-card p-5">
        {/* Title */}
        <p className="text-foreground group-hover:text-brand-gold line-clamp-2 text-base leading-snug font-bold transition-colors duration-200">
          {course.title}
        </p>

        {/* Meta */}
        <p className="text-muted-foreground mt-1 text-xs">
          {labels.by} {course.author}
          {course.modules !== undefined
            ? ` · ${labels.modules(course.modules)}`
            : ''}
          {course.lessons !== undefined
            ? ` · ${labels.lessons(course.lessons)}`
            : ''}
        </p>

        {/* Progress bar */}
        <div className="bg-muted mt-4 h-1.5 overflow-hidden rounded-full">
          <div
            className={cn(
              'h-full rounded-full',
              isCompleted ? 'bg-foreground' : 'bg-brand-gold',
            )}
            style={{ width: `${course.progress}%` }}
          />
        </div>

        {/* Divider + action link */}
        <div className="border-border mt-4 border-t pt-4 text-center">
          <Link
            href={
              isCompleted
                ? `/learn/${slugify(course.title)}?mode=replay`
                : `/learn/${slugify(course.title)}?mode=resume`
            }
            className="text-brand-gold group/link inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-150 hover:gap-2.5"
          >
            {isCompleted ? labels.replayCourse : labels.resumeCourse}
            <ActionIcon className="h-4 w-4 transition-transform duration-150 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
