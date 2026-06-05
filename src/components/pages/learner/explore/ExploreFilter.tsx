'use client';

import { useState } from 'react';
import { Play, Star, Clock, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
  type Course,
  type CourseLevel,
  EXPLORE_CATEGORIES,
} from '@/constants/learner';

const LEVEL_STYLE: Record<CourseLevel, string> = {
  Beginner: 'bg-white/80 text-slate-600',
  Intermediate: 'bg-white/80 text-brand-navy',
  Advanced: 'bg-white/80 text-brand-gold',
};

export default function ExploreFilter({ courses }: { courses: Course[] }) {
  const [category, setCategory] = useState('All');

  const filtered =
    category === 'All'
      ? courses
      : courses.filter((c) => c.category === category);

  return (
    <div>
      {/* Category pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {EXPLORE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
              cat === category
                ? 'bg-brand-gold text-white'
                : 'hover:text-brand-navy text-slate-600',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
      {/* Thumbnail */}
      <div className="relative flex h-44 shrink-0 items-center justify-center bg-slate-100">
        <Play className="h-10 w-10 stroke-[1.5] text-slate-300" />

        <span
          className={cn(
            'absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
            LEVEL_STYLE[course.level],
          )}
        >
          {course.level}
        </span>

        {course.enrolled && (
          <span className="bg-brand-gold absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white">
            Enrolled
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p
          className={cn(
            'mb-1 text-[11px] font-bold tracking-wide uppercase',
            'text-brand-navy',
          )}
        >
          {course.category}
        </p>

        <p className="text-brand-navy mb-1 text-sm leading-snug font-bold">
          {course.title}
        </p>

        <p className="mb-3 text-xs text-slate-400">by {course.author}</p>

        <div className="mt-auto mb-4 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Star className="fill-brand-gold text-brand-gold h-3.5 w-3.5" />
            <span className="font-semibold text-slate-700">
              {course.rating}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.hours} hours
          </span>
        </div>

        <div className="flex items-center gap-2">
          {course.enrolled ? (
            <button className="bg-brand-gold hover:bg-brand-gold-dark flex-1 rounded-lg py-2 text-sm font-bold text-white transition-colors">
              Continue
            </button>
          ) : (
            <button className="border-brand-navy text-brand-navy hover:bg-brand-navy flex-1 rounded-lg border py-2 text-sm font-semibold transition-colors hover:text-white">
              Enroll
            </button>
          )}

          <button
            onClick={() => setSaved((v) => !v)}
            aria-label={saved ? 'Remove bookmark' : 'Save course'}
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors',
              saved
                ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600',
            )}
          >
            <Bookmark className={cn('h-4 w-4', saved && 'fill-brand-gold')} />
          </button>
        </div>
      </div>
    </div>
  );
}
