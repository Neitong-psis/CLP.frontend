'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Play, BookOpen, GraduationCap, Calendar } from 'lucide-react';
import { CONTINUE_LEARNING } from '@/config/learner';
import { useLearnerDashboardT } from '@/i18n';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import { cn } from '@/lib/utils/cn';
import { slugify } from '@/lib/utils/slugify';

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
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
    <div className="shrink-0 text-right">
      <p className="text-brand-gold flex items-center justify-end gap-1.5 text-[11px] font-medium opacity-80">
        <Calendar className="h-3 w-3" aria-hidden />
        {dateStr}
      </p>
      <p className="text-brand-gold mt-0.5 text-2xl font-black tracking-tight tabular-nums sm:text-3xl">
        {timeStr}
      </p>
    </div>
  );
}

export default function ContinueLearningCard() {
  const t = useLearnerDashboardT();
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
      {/* Decorative cap */}
      <GraduationCap
        aria-hidden
        className="text-brand-gold/15 pointer-events-none absolute -top-4 -right-4 h-40 w-40 select-none"
      />

      <div className="relative space-y-5">
        {/* ── Header: label + clock side-by-side ── */}
        <div className="flex items-start justify-between gap-4">
          <p className="text-brand-gold pt-1 text-sm font-semibold">
            {t('continueLearning')}
          </p>
          <LiveClock />
        </div>

        {/* ── Course info ── */}
        <div>
          <h2 className="text-2xl leading-tight font-bold text-white sm:text-3xl">
            {courseTitle}
          </h2>
          <p className="mt-1.5 text-sm text-white/50">
            {t('lessonLabel', { number: lessonNumber })}
            {lessonTitle && <> &middot; {lessonTitle}</>}
            &ensp;|&ensp;{t('percentComplete', { progress })}
          </p>
        </div>

        {/* ── Progress bar ── */}
        <div className="flex items-center gap-4">
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

        {/* ── Actions ── */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/learn/${slugify(CONTINUE_LEARNING.courseTitle)}?mode=resume`}
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold-dark inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow-sm transition-all duration-150 hover:-translate-y-px hover:shadow-md active:scale-95"
          >
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
            {t('continueLesson')}
          </Link>
          <Link
            href="/my-learning"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-px hover:bg-white/10 active:scale-95"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden />
            {t('viewLesson')}
          </Link>
        </div>
      </div>
    </div>
  );
}
