'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCourseCatalogT } from '@/i18n';
import {
  type Course,
  type CourseLevel,
  DEFAULT_COURSE_THUMBNAIL,
} from '@/constants/learner';

const DEFAULT_PRICE = 49;
const DEFAULT_ORIGINAL_PRICE = 99;

const LEVEL_STYLE: Record<CourseLevel, string> = {
  Beginner: 'bg-white/90 text-slate-700 dark:bg-white/10 dark:text-white/80',
  Intermediate:
    'bg-white/90 text-brand-navy dark:bg-white/10 dark:text-white/80',
  Advanced: 'bg-white/90 text-amber-700 dark:bg-white/10 dark:text-white/80',
};

export type CourseCardAction =
  | { kind: 'link'; href: string }
  | { kind: 'enroll'; onEnroll: () => void }
  | { kind: 'continue'; href: string };

export interface CourseCardProps {
  course: Course;
  href: string;
  action: CourseCardAction;
  showEnrolledBadge?: boolean;
  bookmark?: { saved: boolean; onToggle: () => void };
  animation?: { active: boolean; delayMs: number };
}

export default function CourseCard({
  course,
  href,
  action,
  showEnrolledBadge = false,
  bookmark,
  animation,
}: CourseCardProps) {
  const t = useCourseCatalogT();
  const isMixed = course.courseType !== 'text-image';
  const price = course.price ?? DEFAULT_PRICE;
  const originalPrice = course.originalPrice ?? DEFAULT_ORIGINAL_PRICE;
  const savings = originalPrice - price;

  return (
    <div
      className={cn(
        'group bg-card border-border flex flex-col overflow-hidden rounded-2xl border shadow-sm',
        'transition-all duration-500 ease-out',
        'hover:border-brand-gold/25 hover:-translate-y-1.5 hover:shadow-xl',
        !animation || animation.active
          ? 'translate-y-0 opacity-100'
          : 'translate-y-6 opacity-0',
      )}
      style={
        animation
          ? {
              transitionDelay: animation.active
                ? `${animation.delayMs}ms`
                : '0ms',
            }
          : undefined
      }
    >
      {/* Thumbnail — links through to the course's preview/enrollment page */}
      <Link
        href={href}
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
        {showEnrolledBadge && (
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
          href={href}
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
          {action.kind === 'continue' ? (
            <Link
              href={action.href}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex-1 rounded-xl py-2 text-center text-sm font-bold transition-all duration-150 hover:scale-[1.02] hover:shadow-md active:scale-95 sm:py-2.5"
            >
              {t('continueCourse')}
            </Link>
          ) : action.kind === 'link' ? (
            <Link
              href={action.href}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex-1 rounded-xl py-2 text-center text-sm font-bold transition-all duration-150 hover:scale-[1.02] hover:shadow-md active:scale-95 sm:py-2.5"
            >
              {t('enroll')}
            </Link>
          ) : (
            <button
              onClick={action.onEnroll}
              className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex-1 rounded-xl py-2 text-sm font-bold transition-all duration-150 hover:scale-[1.02] hover:shadow-md active:scale-95 sm:py-2.5"
            >
              {t('enroll')}
            </button>
          )}
          {bookmark && (
            <button
              onClick={bookmark.onToggle}
              aria-label={bookmark.saved ? 'Remove bookmark' : 'Save course'}
              className={cn(
                'flex size-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-150 hover:scale-110 active:scale-95 sm:size-10',
                bookmark.saved
                  ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                  : 'border-border text-muted-foreground hover:border-brand-gold/50 hover:text-brand-gold',
              )}
            >
              <Bookmark
                className={cn('size-4', bookmark.saved && 'fill-brand-gold')}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
