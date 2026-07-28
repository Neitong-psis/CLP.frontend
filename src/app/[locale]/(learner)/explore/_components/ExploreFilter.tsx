'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Clock, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useLearnerExploreT } from '@/i18n';
import {
  type Course,
  type CourseLevel,
  DEFAULT_COURSE_THUMBNAIL,
  EXPLORE_CATEGORIES,
} from '@/constants/learner';
import { slugify } from '@/lib/utils/slugify';
import { SortMenu, type SortOption } from '@/components/common/list/SortMenu';
import { SearchInput } from '@/components/common/list/SearchInput';
import { Pagination } from '@/components/common/list/Pagination';
import { PillTabs, type PillTab } from '@/components/common/list/PillTabs';

// ── Sorting ─────────────────────────────────────────────────────────────────

type SortKey =
  'recommended' | 'rating' | 'price-low' | 'price-high' | 'title-az';

const DEFAULT_PRICE = 49;

function sortCourses(list: Course[], sort: SortKey): Course[] {
  if (sort === 'recommended') return list;
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return (a.price ?? DEFAULT_PRICE) - (b.price ?? DEFAULT_PRICE);
      case 'price-high':
        return (b.price ?? DEFAULT_PRICE) - (a.price ?? DEFAULT_PRICE);
      case 'title-az':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
}

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

// ── Level + type styling ──────────────────────────────────────────────────────

const LEVEL_STYLE: Record<CourseLevel, string> = {
  Beginner: 'bg-white/90 text-slate-700 dark:bg-white/10 dark:text-white/80',
  Intermediate:
    'bg-white/90 text-brand-navy dark:bg-white/10 dark:text-white/80',
  Advanced: 'bg-white/90 text-amber-700 dark:bg-white/10 dark:text-white/80',
};

const PAGE_SIZE = 9;

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
  const previewHref = `/explore/${slugify(course.title)}`;

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
      {/* Thumbnail — links through to the course's preview/enrollment page */}
      <Link
        href={previewHref}
        className="relative flex aspect-video shrink-0 flex-col items-center justify-center overflow-hidden"
      >
        {/* Cover image — falls back to the default poster when a course
            doesn't set its own thumbnail. */}
        <Image
          src={course.thumbnail || DEFAULT_COURSE_THUMBNAIL}
          alt={course.title}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {/* Flat tint so badges stay legible over any cover photo */}
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />

        {/* Level badge */}
        <span
          className={cn(
            'absolute top-3 left-3 z-10 rounded-full border border-black/5 px-2.5 py-0.5 text-[11px] font-semibold dark:border-white/10',
            LEVEL_STYLE[course.level],
          )}
        >
          {course.level}
        </span>

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
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        {/* Meta row */}
        <div className="mb-2 flex items-center gap-2 text-xs">
          <span className="border-border text-muted-foreground hidden rounded-full border px-2.5 py-0.5 text-[11px] font-medium sm:inline-block">
            {course.category}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="text-foreground font-semibold">
              {course.rating}
            </span>
          </span>
          <span className="text-muted-foreground flex min-w-0 items-center gap-1">
            <Clock className="size-3.5 shrink-0" />
            <span className="truncate">
              {course.courseType === 'text-image' && course.documents
                ? t('documents', { count: String(course.documents) })
                : t('hours', { count: String(course.hours) })}
            </span>
          </span>
        </div>

        {/* Title */}
        <Link
          href={previewHref}
          className="text-foreground group-hover:text-brand-gold mb-1 line-clamp-2 text-sm leading-snug font-bold transition-colors duration-200"
        >
          {course.title}
        </Link>

        {/* Description */}
        {course.description && (
          <p className="text-muted-foreground mb-2 hidden text-xs leading-relaxed sm:line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Author */}
        <p className="text-muted-foreground mb-4 truncate text-xs">
          {t('writtenBy', { name: course.author })}
        </p>

        {/* Price row */}
        <div className="mt-auto mb-4 flex items-center gap-2">
          <span className="text-muted-foreground text-xs line-through">
            ${originalPrice}
          </span>
          <span className="bg-brand-gold/15 text-brand-gold hidden rounded-full px-2 py-0.5 text-[11px] font-semibold sm:inline-block">
            {t('save', { amount: String(savings) })}
          </span>
          <span className="text-foreground ml-auto text-base font-black">
            ${price}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {isEnrolled ? (
            <button
              onClick={() => (window.location.href = '/my-learning')}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex-1 rounded-xl py-2 text-sm font-bold transition-all duration-150 hover:scale-[1.02] hover:shadow-md active:scale-95 sm:py-2.5"
            >
              {t('continueCourse')}
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course)}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex-1 rounded-xl py-2 text-sm font-bold transition-all duration-150 hover:scale-[1.02] hover:shadow-md active:scale-95 sm:py-2.5"
            >
              {t('enroll')}
            </button>
          )}
          <button
            onClick={() => onSave(course.id)}
            aria-label={isSaved ? 'Remove bookmark' : 'Save course'}
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-150 hover:scale-110 active:scale-95 sm:size-10',
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
  const router = useRouter();

  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('recommended');
  const [showSaved, setShowSaved] = useState(false);
  // Start empty so the first client render matches SSR; localStorage-derived
  // lists are only loaded after mount (see effect below).
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [page, setPage] = useState(1);

  // Avoid SSR/CSR mismatch: the saved count is only known after mount.
  const savedCount = mounted ? saved.length : 0;

  useEffect(() => {
    const id = setTimeout(() => {
      setEnrolled(readList(LS_ENROLLED));
      setSaved(readList(LS_SAVED));
      setMounted(true);
    }, 60);
    return () => clearTimeout(id);
  }, []);

  const handleEnroll = useCallback(
    (course: Course) => {
      router.push(`/checkout/${slugify(course.title)}`);
    },
    [router],
  );

  const handleSave = useCallback((courseId: string) => {
    const next = toggleInList(LS_SAVED, courseId);
    setSaved(next);
  }, []);

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.author.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q);
    if (!matchSearch) return false;
    // Saved view is a cross-category collection, so it ignores the category filter.
    if (showSaved) return saved.includes(c.id);
    return category === 'All' || c.category === category;
  });

  const sorted = sortCourses(filtered, sort);

  const SORT_OPTIONS: readonly SortOption<SortKey>[] = [
    { value: 'recommended', label: t('sortRecommended') },
    { value: 'rating', label: t('sortRating') },
    { value: 'price-low', label: t('sortPriceLow') },
    { value: 'price-high', label: t('sortPriceHigh') },
    { value: 'title-az', label: t('sortTitleAz') },
  ];

  const CATEGORY_TABS: PillTab<string>[] = EXPLORE_CATEGORIES.map((cat) => ({
    value: cat,
    label: cat === 'All' ? t('all') : cat,
  }));

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <>
      {/* Category tabs (left) · Saved + Sort + Search (right) — one aligned row */}
      <div
        className={cn(
          'mb-5 flex flex-col gap-3 transition-all duration-500 ease-out sm:flex-row sm:items-center sm:justify-between',
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
        style={{ transitionDelay: mounted ? '60ms' : '0ms' }}
      >
        {/* Category tabs — scrollable on mobile */}
        <PillTabs
          tabs={CATEGORY_TABS}
          value={category}
          onChange={(v) => {
            setCategory(v);
            setPage(1);
          }}
          ariaLabel={t('title')}
          className="w-auto min-w-0 flex-1"
        />

        {/* Saved + Sort + Search grouped on the right */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setShowSaved((v) => !v);
              setPage(1);
            }}
            aria-pressed={showSaved}
            className={cn(
              'flex h-10 shrink-0 items-center gap-1.5 rounded-xl border px-3 text-sm font-semibold transition-all duration-150',
              showSaved
                ? 'border-brand-gold text-brand-gold bg-brand-gold/5'
                : 'border-border bg-card text-muted-foreground hover:border-brand-gold/50 hover:text-foreground',
            )}
          >
            <Bookmark
              className={cn('size-4', showSaved && 'fill-brand-gold')}
            />
            <span className="hidden sm:inline">{t('saved')}</span>
            {savedCount > 0 && (
              <span
                className={cn(
                  'rounded-full px-1.5 text-xs font-bold tabular-nums',
                  showSaved
                    ? 'bg-brand-gold/15 text-brand-gold'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                {savedCount}
              </span>
            )}
          </button>

          <SortMenu
            options={SORT_OPTIONS}
            value={sort}
            onChange={(v) => {
              setSort(v);
              setPage(1);
            }}
            ariaLabel={t('sortAria')}
            defaultValue="recommended"
          />
          <SearchInput
            value={search}
            onChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            placeholder={t('searchPlaceholder')}
            ariaLabel={t('searchPlaceholder')}
            className="w-full sm:w-56 lg:w-64"
          />
        </div>
      </div>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {paginated.map((course, i) => (
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
        <p className="text-muted-foreground mx-auto max-w-md py-16 text-center text-sm">
          {showSaved && !search.trim() ? t('noSaved') : t('noResults')}
        </p>
      )}

      {/* Pagination */}
      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
        className="mt-6"
      />
    </>
  );
}
