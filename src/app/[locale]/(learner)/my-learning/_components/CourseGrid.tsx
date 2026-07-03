'use client';

import { useState, useMemo, useSyncExternalStore } from 'react';
import { Search } from 'lucide-react';
import { useLearnerMyLearningT } from '@/i18n';
import { type Course, ALL_COURSES, EXPLORE_COURSES } from '@/constants/learner';
import {
  COURSE_MODULES_MAP,
  flattenItems,
} from '@/app/[locale]/(learner)/learn/[courseId]/_lib/content';
import { readCourseProgress } from '@/lib/utils/courseStorage';
import { Pagination } from '@/components/common/list/Pagination';
import { PillTabs, type PillTab } from '@/components/common/list/PillTabs';
import CourseCard from './CourseCard';
import CourseCardSkeleton from './CourseCardSkeleton';

const LS_ENROLLED = 'qb_enrolled_courses';
const PAGE_SIZE = 6;

function readEnrolledIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_ENROLLED) ?? '[]') as string[];
  } catch {
    return [];
  }
}

// All possible courses a learner could have enrolled in via the Explore page
const EXPLORE_LOOKUP: Course[] = [...ALL_COURSES, ...EXPLORE_COURSES];

// Detects "we've hydrated on the client" without an effect + setState —
// localStorage snapshots differ between the server render and the client,
// so useSyncExternalStore is used to bridge the two without a mismatch.
const noopSubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// Replaces the mock `progress`/`completed` fields with the learner's actual
// progress, computed from the items they have marked viewed in the course
// player (persisted in localStorage — see lib/utils/courseStorage.ts).
function withRealProgress(course: Course): Course {
  const modules = COURSE_MODULES_MAP[course.id];
  const total = modules ? flattenItems(modules).length : 0;
  const viewed = readCourseProgress(course.id).length;
  const progress = total === 0 ? 0 : Math.round((viewed / total) * 100);
  return { ...course, progress, completed: progress === 100 };
}

type Tab = 'all' | 'in-progress' | 'completed';

interface CourseGridProps {
  courses: Course[];
  userName: string;
}

export default function CourseGrid({ courses, userName }: CourseGridProps) {
  const t = useLearnerMyLearningT();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [page, setPage] = useState(1);
  const mounted = useSyncExternalStore(
    noopSubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const allCourses = useMemo<Course[]>(() => {
    if (!mounted) return courses;
    const enrolledIds = readEnrolledIds();
    const existingIds = new Set(courses.map((c) => c.id));
    const extra = EXPLORE_LOOKUP.filter(
      (c) => enrolledIds.includes(c.id) && !existingIds.has(c.id),
    ).map((c) => ({ ...c, enrolled: true }));
    return [...courses, ...extra].map(withRealProgress);
  }, [mounted, courses]);

  const inProgressCourses = allCourses.filter((c) => !c.completed);
  const completedCourses = allCourses.filter((c) => c.completed);

  const tabSource =
    activeTab === 'in-progress'
      ? inProgressCourses
      : activeTab === 'completed'
        ? completedCourses
        : allCourses;

  const filtered = search.trim()
    ? tabSource.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.author.toLowerCase().includes(search.toLowerCase()),
      )
    : tabSource;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const tabs: PillTab<Tab>[] = [
    { value: 'all', label: t('all'), count: allCourses.length },
    {
      value: 'in-progress',
      label: t('inProgress'),
      count: inProgressCourses.length,
    },
    {
      value: 'completed',
      label: t('completed'),
      count: completedCourses.length,
    },
  ];

  const emptyMessage = search.trim()
    ? t('noResults')
    : activeTab === 'in-progress'
      ? t('noInProgress')
      : activeTab === 'completed'
        ? t('noCompleted')
        : t('noResults');

  const labels = {
    courseType: t('courseType'),
    modules: (n: number) => t('modules', { count: n }),
    lessons: (n: number) => t('lessons', { count: n }),
    resumeCourse: t('resumeCourse'),
    replayCourse: t('replayCourse'),
    by: 'by',
  };

  return (
    <div className="space-y-5">
      {/* Welcome heading */}
      <div>
        <h1 className="text-brand-gold text-2xl font-black sm:text-3xl">
          {t('welcomeBack', { name: userName })}
        </h1>
        <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
          {t('openCourse')}
        </p>
      </div>

      {/* Filter tabs + search on the same row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <PillTabs
          tabs={tabs}
          value={activeTab}
          onChange={(v) => {
            setActiveTab(v);
            setPage(1);
          }}
          ariaLabel={t('welcomeBack', { name: userName })}
        />

        {/* Search field — right-aligned with filters */}
        <div className="border-border bg-card focus-within:border-brand-gold/50 flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors duration-150 sm:w-64 lg:w-72">
          <Search className="text-muted-foreground h-4 w-4 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={t('searchPlaceholder')}
            className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* Course grid, loading skeleton, or empty state */}
      {!mounted ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center text-sm">
          {emptyMessage}
        </p>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((course) => (
              <CourseCard key={course.id} course={course} labels={labels} />
            ))}
          </div>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mt-2"
          />
        </>
      )}
    </div>
  );
}
