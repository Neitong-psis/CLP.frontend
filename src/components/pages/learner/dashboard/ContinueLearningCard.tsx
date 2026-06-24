'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Play, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import { CONTINUE_LEARNING } from '@/config/learner';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import { cn } from '@/lib/utils/cn';
import { slugify } from '@/lib/utils/slugify';

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // setTimeout(0) defers the first tick out of the synchronous effect body,
    // avoiding the react-hooks/set-state-in-effect lint rule while still
    // seeding the clock on mount without a 1-second blank.
    const init = setTimeout(() => setNow(new Date()), 0);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => {
      clearTimeout(init);
      clearInterval(id);
    };
  }, []);

  if (!now) return null;

  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="text-right">
      <p className="text-brand-gold flex items-center justify-end gap-1.5 text-sm font-medium">
        <Calendar className="h-3.5 w-3.5" aria-hidden />
        {dateStr}
      </p>
      <p className="text-brand-gold mt-1 text-4xl font-black tracking-tight tabular-nums sm:text-5xl">
        {timeStr}
      </p>
    </div>
  );
}

export default function ContinueLearningCard() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(() => setBarVisible(true), 300);
    return () => clearTimeout(id);
  }, [inView]);

  const { courseTitle, lessonNumber, lessonTitle, progress } =
    CONTINUE_LEARNING;

  return (
    <div
      ref={ref}
      className={cn(
        'bg-brand-navy relative overflow-hidden rounded-2xl p-6 sm:p-8',
        entranceClass(inView, 'md'),
      )}
      style={entranceStyle(inView, 0)}
    >
      {/* Decorative cap — purely visual, intentionally large */}
      <GraduationCap
        aria-hidden
        className="text-brand-gold/20 pointer-events-none absolute -top-5 -right-5 h-44 w-44 select-none"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-10 right-44 hidden h-3.5 w-3.5 rounded-full border border-white/15 sm:block"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        {/* ── Left: course info ── */}
        <div className="min-w-0 flex-1">
          <p className="text-brand-gold mb-1.5 text-sm font-semibold">
            Continue Learning
          </p>
          <h2 className="text-2xl leading-tight font-bold text-white sm:text-3xl">
            {courseTitle}
          </h2>
          <p className="mt-1.5 text-sm text-white/50">
            Lesson {lessonNumber}
            {lessonTitle && <> &middot; {lessonTitle}</>}
            &ensp;|&ensp;{progress}% Complete
          </p>

          {/* Progress bar */}
          <div className="mt-6 flex items-center gap-4">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="bg-brand-gold h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{ width: barVisible ? `${progress}%` : '0%' }}
              />
            </div>
            <span className="shrink-0 text-sm font-bold text-white">
              {progress}%
            </span>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/learn/${slugify(CONTINUE_LEARNING.courseTitle)}?mode=resume`}
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold-dark inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-all duration-150 hover:-translate-y-px hover:shadow-md active:scale-95"
            >
              <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
              Continue Lesson
            </Link>
            <Link
              href="/my-learning"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-px hover:bg-white/10 active:scale-95"
            >
              <BookOpen className="h-3.5 w-3.5" aria-hidden />
              View Lesson
            </Link>
          </div>
        </div>

        {/* ── Right: live clock ── */}
        <div className="shrink-0 sm:pt-1">
          <LiveClock />
        </div>
      </div>
    </div>
  );
}
