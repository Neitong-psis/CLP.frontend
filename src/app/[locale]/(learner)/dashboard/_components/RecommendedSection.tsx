'use client';

import Link from 'next/link';
import {
  Star,
  Clock,
  BookOpen,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import {
  ALL_COURSES,
  type Course,
  type CourseLevel,
} from '@/constants/learner';
import { useLearnerDashboardT } from '@/i18n';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import { cn } from '@/lib/utils/cn';

const LEVEL_RANK: Record<CourseLevel, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

/** Signal-strength style difficulty indicator — neutral, no color coding. */
function DifficultyMeter({ level }: { level: CourseLevel }) {
  const filled = LEVEL_RANK[level];
  return (
    <span className="flex items-center gap-1.5" title={`${level} level`}>
      <span className="flex items-end gap-[2px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'w-[3px] rounded-full transition-colors duration-200',
              i === 0 ? 'h-1.5' : i === 1 ? 'h-2.5' : 'h-3.5',
              i < filled
                ? 'bg-foreground/70 group-hover:bg-brand-gold'
                : 'bg-border',
            )}
          />
        ))}
      </span>
      <span className="text-muted-foreground text-[10px] font-medium">
        {level}
      </span>
    </span>
  );
}

function getInitials(name: string): string {
  return name
    .replace(/^(Dr|Prof|Mr|Mrs|Ms)\.?\s+/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

interface CourseCardProps {
  course: Course;
  active: boolean;
  delay: number;
}

function CourseCard({ course, active, delay }: CourseCardProps) {
  const lessons = course.lessons ?? course.hours * 2;

  return (
    <div
      className={cn(
        'transition-all duration-500 ease-out',
        entranceClass(active, 'sm'),
      )}
      style={entranceStyle(active, delay)}
    >
      <Link
        href="/explore"
        className="group border-border bg-card hover:border-foreground/15 relative flex h-full flex-col rounded-xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
      >
        {/* Category + difficulty */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-muted-foreground text-[10px] font-semibold tracking-[0.12em] uppercase">
            {course.category}
          </span>
          <DifficultyMeter level={course.level} />
        </div>

        {/* Title */}
        <h4 className="text-foreground mb-3 line-clamp-2 text-[15px] leading-snug font-bold tracking-tight">
          {course.title}
        </h4>

        {/* Author */}
        <div className="mb-4 flex items-center gap-2">
          <span className="bg-muted text-muted-foreground ring-border flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ring-1">
            {getInitials(course.author)}
          </span>
          <span className="text-muted-foreground truncate text-xs font-medium">
            {course.author}
          </span>
        </div>

        {/* Meta footer */}
        <div className="border-border/70 mt-auto flex items-center gap-3 border-t pt-3.5 text-[11px]">
          <span className="text-foreground flex items-center gap-1 font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {course.rating}
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.hours}h
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {lessons}
          </span>
          <ArrowUpRight
            className="text-muted-foreground/50 group-hover:text-brand-gold ml-auto h-4 w-4 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
      </Link>
    </div>
  );
}

export default function RecommendedSection() {
  const t = useLearnerDashboardT();
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const recommended = ALL_COURSES.filter((c) => !c.enrolled).slice(0, 4);

  return (
    <section ref={ref}>
      <div
        className={cn(
          'mb-4 flex items-end justify-between transition-all duration-500 ease-out',
          entranceClass(inView, 'sm'),
        )}
        style={entranceStyle(inView, 0)}
      >
        <div>
          <h3 className="text-foreground text-base font-bold">
            {t('recommendedForYou')}
          </h3>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {t('coursesSelected', { count: recommended.length })}
          </p>
        </div>
        <Link
          href="/explore"
          className="text-muted-foreground hover:text-foreground flex items-center gap-0.5 text-xs font-semibold transition-colors"
        >
          {t('seeAll')} <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {recommended.map((course, i) => (
          <CourseCard
            key={course.id}
            course={course}
            active={inView}
            delay={80 + i * 80}
          />
        ))}
      </div>
    </section>
  );
}
