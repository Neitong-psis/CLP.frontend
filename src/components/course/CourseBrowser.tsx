'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCourseCatalogT } from '@/i18n';
import { type Course } from '@/constants/learner';
import { SortMenu, type SortOption } from '@/components/common/list/SortMenu';
import { SearchInput } from '@/components/common/list/SearchInput';
import { Pagination } from '@/components/common/list/Pagination';
import { PillTabs, type PillTab } from '@/components/common/list/PillTabs';
import CourseCard from '@/components/course/CourseCard';

// ── Sorting ─────────────────────────────────────────────────────────────────

type SortKey =
  | 'recommended'
  | 'rating'
  | 'price-low'
  | 'price-high'
  | 'title-az';

const DEFAULT_PRICE = 49;

function sortCourses(list: readonly Course[], sort: SortKey): Course[] {
  if (sort === 'recommended') return [...list];
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

// ── LocalStorage (learner mode only) ─────────────────────────────────────────

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

const DEFAULT_PAGE_SIZE = 9;

export interface CourseBrowserProps {
  courses: readonly Course[];
  categories: readonly string[];
  mode: 'public' | 'learner';
  previewHref: (course: Course) => string;
  checkoutHref: (course: Course) => string;
  pageSize?: number;
}

export default function CourseBrowser({
  courses,
  categories,
  mode,
  previewHref,
  checkoutHref,
  pageSize = DEFAULT_PAGE_SIZE,
}: CourseBrowserProps) {
  const t = useCourseCatalogT();
  const router = useRouter();
  const isLearner = mode === 'learner';

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
      if (isLearner) {
        setEnrolled(readList(LS_ENROLLED));
        setSaved(readList(LS_SAVED));
      }
      setMounted(true);
    }, 60);
    return () => clearTimeout(id);
  }, [isLearner]);

  const handleEnroll = useCallback(
    (course: Course) => {
      router.push(checkoutHref(course));
    },
    [router, checkoutHref],
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
    if (isLearner && showSaved) return saved.includes(c.id);
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

  const CATEGORY_TABS: PillTab<string>[] = categories.map((cat) => ({
    value: cat,
    label: cat === 'All' ? t('all') : cat,
  }));

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
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
          {isLearner && (
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
          )}

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
          {paginated.map((course, i) => {
            const isEnrolled =
              isLearner && (course.enrolled || enrolled.includes(course.id));
            return (
              <CourseCard
                key={course.id}
                course={course}
                href={previewHref(course)}
                showEnrolledBadge={isEnrolled}
                action={
                  isEnrolled
                    ? { kind: 'continue', href: '/my-learning' }
                    : isLearner
                      ? { kind: 'enroll', onEnroll: () => handleEnroll(course) }
                      : { kind: 'link', href: checkoutHref(course) }
                }
                bookmark={
                  isLearner
                    ? {
                        saved: saved.includes(course.id),
                        onToggle: () => handleSave(course.id),
                      }
                    : undefined
                }
                animation={{
                  active: mounted,
                  delayMs: 200 + Math.min(i, 5) * 70,
                }}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground mx-auto max-w-md py-16 text-center text-sm">
          {isLearner && showSaved && !search.trim()
            ? t('noSaved')
            : t('noResults')}
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
