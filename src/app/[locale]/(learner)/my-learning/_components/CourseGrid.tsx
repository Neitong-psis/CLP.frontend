'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLearnerMyLearningT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import { type Course, ALL_COURSES, EXPLORE_COURSES } from '@/constants/learner';
import CourseCard from './CourseCard';

const LS_ENROLLED = 'qb_enrolled_courses';

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

type Tab = 'all' | 'in-progress' | 'completed';

interface CourseGridProps {
  courses: Course[];
  userName: string;
}

export default function CourseGrid({ courses, userName }: CourseGridProps) {
  const t = useLearnerMyLearningT();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [mounted, setMounted] = useState(false);
  const [allCourses, setAllCourses] = useState<Course[]>(courses);

  useEffect(() => {
    const id = setTimeout(() => {
      const enrolledIds = readEnrolledIds();
      const existingIds = new Set(courses.map((c) => c.id));
      const extra = EXPLORE_LOOKUP.filter(
        (c) => enrolledIds.includes(c.id) && !existingIds.has(c.id),
      ).map((c) => ({ ...c, enrolled: true, progress: 0, completed: false }));
      setAllCourses([...courses, ...extra]);
      setMounted(true);
    }, 60);
    return () => clearTimeout(id);
  }, [courses]);

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

  const tabs: { value: Tab; label: string; count: number }[] = [
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
    { value: 'all', label: t('all'), count: allCourses.length },
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
      <div
        className={cn(
          'transition-all duration-500 ease-out',
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
      >
        <h1 className="text-brand-gold text-2xl font-black sm:text-3xl">
          {t('welcomeBack', { name: userName })}
        </h1>
        <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
          {t('openCourse')}
        </p>
      </div>

      {/* Filter tabs + search on the same row */}
      <div
        className={cn(
          'flex flex-col gap-3 transition-all duration-500 ease-out sm:flex-row sm:items-center sm:justify-between',
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
        style={{ transitionDelay: mounted ? '80ms' : '0ms' }}
      >
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map(({ value, label, count }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-semibold transition-all duration-150',
                activeTab === value
                  ? 'border-brand-gold text-brand-gold bg-brand-gold/5'
                  : 'border-border text-muted-foreground hover:border-brand-gold/50 hover:text-foreground',
              )}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Search field — right-aligned with filters */}
        <div className="border-border bg-card focus-within:border-brand-gold/50 flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors duration-150 sm:w-64 lg:w-72">
          <Search className="text-muted-foreground h-4 w-4 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {/* Course grid or empty state */}
      {filtered.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center text-sm">
          {emptyMessage}
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              labels={labels}
              active={mounted}
              delay={160 + i * 80}
            />
          ))}
        </div>
      )}
    </div>
  );
}
