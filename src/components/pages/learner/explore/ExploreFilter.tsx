'use client';

import { useState, useCallback, useEffect } from 'react';
import { Search, Star, Clock, FileText, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useLearnerExploreT } from '@/i18n';
import {
  type Course,
  type CourseLevel,
  EXPLORE_CATEGORIES,
} from '@/constants/learner';
import { PaymentModal } from './PaymentModal';

// ── LocalStorage ──────────────────────────────────────────────────────────────

const LS_ENROLLED = 'qb_enrolled_courses';
const LS_SAVED = 'qb_saved_courses';

function readList(key: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(key) ?? '[]');
  } catch {
    return [];
  }
}

function toggleInList(key: string, id: string): string[] {
  const list = readList(key);
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

function addToList(key: string, id: string): string[] {
  const list = readList(key);
  if (list.includes(id)) return list;
  const next = [...list, id];
  localStorage.setItem(key, JSON.stringify(next));
  return next;
}

// ── Level + type styling ──────────────────────────────────────────────────────

const LEVEL_STYLE: Record<CourseLevel, string> = {
  Beginner: 'bg-white/90 text-slate-700 dark:bg-white/10 dark:text-white/80',
  Intermediate:
    'bg-white/90 text-brand-navy dark:bg-white/10 dark:text-white/80',
  Advanced: 'bg-white/90 text-amber-700 dark:bg-white/10 dark:text-white/80',
};

const MIXED_BG =
  'from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700';
const TEXT_BG =
  'from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900';

// ── Course card ───────────────────────────────────────────────────────────────

interface CourseCardProps {
  course: Course;
  isEnrolled: boolean;
  isSaved: boolean;
  onEnroll: (course: Course) => void;
  onSave: (courseId: string) => void;
  t: ReturnType<typeof useLearnerExploreT>;
  active: boolean;
  delay: number;
}

function CourseCard({
  course,
  isEnrolled,
  isSaved,
  onEnroll,
  onSave,
  t,
  active,
  delay,
}: CourseCardProps) {
  const isMixed = course.courseType !== 'text-image';
  const price = course.price ?? 49;
  const originalPrice = course.originalPrice ?? 99;
  const savings = originalPrice - price;

  return (
    <div
      className={cn(
        'group bg-card border-border flex flex-col overflow-hidden rounded-2xl border shadow-sm',
        'transition-all duration-500 ease-out',
        'hover:border-brand-gold/25 hover:-translate-y-1.5 hover:shadow-xl',
        active ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
      )}
      style={{ transitionDelay: active ? `${delay}ms` : '0ms' }}
    >
      {/* Thumbnail */}
      <div className="relative flex h-44 shrink-0 flex-col items-center justify-center overflow-hidden">
        {/* Scaleable bg gradient */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-out group-hover:scale-[1.04]',
            isMixed ? MIXED_BG : TEXT_BG,
          )}
        />

        {/* Vignette on hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/8" />

        {/* Level badge */}
        <span
          className={cn(
            'absolute top-3 left-3 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
            LEVEL_STYLE[course.level],
          )}
        >
          {course.level}
        </span>

        {/* Center icon */}
        {isMixed ? (
          <div className="relative z-10 text-slate-300 transition-transform duration-300 group-hover:scale-110 dark:text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        ) : (
          <FileText
            className="relative z-10 size-12 text-emerald-400 transition-transform duration-300 group-hover:scale-110 dark:text-emerald-500"
            strokeWidth={1}
          />
        )}

        {/* Course type badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-bold text-white',
              isMixed ? 'bg-blue-500' : 'bg-emerald-500',
            )}
          >
            {isMixed ? t('mixedCourse') : t('textImageCourse')}
          </span>
        </div>

        {/* Enrolled badge */}
        {isEnrolled && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-brand-gold rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white">
              {t('enrolled')}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Meta row */}
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="border-border text-muted-foreground rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
            {course.category}
          </span>
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="text-foreground font-semibold">
              {course.rating}
            </span>
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="size-3.5" />
            {course.courseType === 'text-image' && course.documents
              ? t('documents', { count: String(course.documents) })
              : t('hours', { count: String(course.hours) })}
          </span>
        </div>

        {/* Title */}
        <p className="text-foreground group-hover:text-brand-gold mb-1 text-sm leading-snug font-bold transition-colors duration-200">
          {course.title}
        </p>

        {/* Description */}
        {course.description && (
          <p className="text-muted-foreground mb-2 line-clamp-2 text-xs leading-relaxed">
            {course.description}
          </p>
        )}

        {/* Author */}
        <p className="text-muted-foreground mb-4 text-xs">
          {t('writtenBy', { name: course.author })}
        </p>

        {/* Price row */}
        <div className="mt-auto mb-4 flex items-center gap-2">
          <span className="text-muted-foreground text-xs line-through">
            ${originalPrice}
          </span>
          <span className="bg-brand-gold/15 text-brand-gold rounded-full px-2 py-0.5 text-[11px] font-semibold">
            {t('save', { amount: String(savings) })}
          </span>
          <span className="text-foreground ml-auto text-base font-black">
            ${price}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isEnrolled ? (
            <button
              onClick={() => (window.location.href = '/my-learning')}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex-1 rounded-xl py-2.5 text-sm font-bold transition-all duration-150 hover:scale-[1.02] hover:shadow-md active:scale-95"
            >
              {t('continueCourse')}
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course)}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex-1 rounded-xl py-2.5 text-sm font-bold transition-all duration-150 hover:scale-[1.02] hover:shadow-md active:scale-95"
            >
              {t('enroll')}
            </button>
          )}
          <button
            onClick={() => onSave(course.id)}
            aria-label={isSaved ? 'Remove bookmark' : 'Save course'}
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-150 hover:scale-110 active:scale-95',
              isSaved
                ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                : 'border-border text-muted-foreground hover:border-brand-gold/50 hover:text-brand-gold',
            )}
          >
            <Bookmark className={cn('size-4', isSaved && 'fill-brand-gold')} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ExploreFilter({ courses }: { courses: Course[] }) {
  const t = useLearnerExploreT();

  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [enrolled, setEnrolled] = useState<string[]>(() =>
    readList(LS_ENROLLED),
  );
  const [saved, setSaved] = useState<string[]>(() => readList(LS_SAVED));
  const [enrollingCourse, setEnrollingCourse] = useState<Course | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  const handleEnroll = useCallback((course: Course) => {
    setEnrollingCourse(course);
  }, []);

  const handlePaymentSuccess = useCallback((courseId: string) => {
    const next = addToList(LS_ENROLLED, courseId);
    setEnrolled(next);
  }, []);

  const handleSave = useCallback((courseId: string) => {
    const next = toggleInList(LS_SAVED, courseId);
    setSaved(next);
  }, []);

  const filtered = courses.filter((c) => {
    const matchCat = category === 'All' || c.category === category;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.author.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Search bar */}
      <div
        className={cn(
          'border-border bg-card focus-within:border-brand-gold/50 mb-5 flex items-center gap-2 rounded-2xl border px-4 py-2.5 shadow-sm transition-all duration-500 ease-out',
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
      >
        <Search className="text-muted-foreground size-4 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="text-foreground placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      {/* Category filter */}
      <div
        className={cn(
          'mb-6 flex flex-wrap gap-2 transition-all duration-500 ease-out',
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
        style={{ transitionDelay: mounted ? '80ms' : '0ms' }}
      >
        {EXPLORE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-150',
              cat === category
                ? 'bg-brand-gold text-brand-navy scale-105'
                : 'text-muted-foreground hover:text-foreground hover:scale-105',
            )}
          >
            {cat === 'All' ? t('all') : cat}
          </button>
        ))}
      </div>

      {/* Section header */}
      <div
        className={cn(
          'mb-4 transition-all duration-500 ease-out',
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
        style={{ transitionDelay: mounted ? '140ms' : '0ms' }}
      >
        <h2 className="text-foreground text-base font-bold">
          {t('availableTitle')}
        </h2>
        <p className="text-muted-foreground text-sm">{t('availableDesc')}</p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              isEnrolled={course.enrolled || enrolled.includes(course.id)}
              isSaved={saved.includes(course.id)}
              onEnroll={handleEnroll}
              onSave={handleSave}
              t={t}
              active={mounted}
              delay={200 + Math.min(i, 5) * 70}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground py-16 text-center text-sm">
          {t('noResults')}
        </p>
      )}

      {/* Payment modal */}
      {enrollingCourse && (
        <PaymentModal
          course={enrollingCourse}
          onClose={() => setEnrollingCourse(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}
