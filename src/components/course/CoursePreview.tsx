'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Star,
  Clock,
  Layers,
  BookOpen,
  Award,
  Globe,
  FileText,
  Play,
  ClipboardList,
  ClipboardCheck,
  ChevronDown,
  Lock,
  ArrowRight,
  Share2,
  Check,
  Briefcase,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useCourseCatalogT } from '@/i18n';
import { type Course, type CourseLevel } from '@/constants/learner';
import {
  flattenItems,
  lessonCount,
  type ReviewModule,
  type ReviewItem,
  type ReviewItemKind,
} from '@/app/[locale]/(learner)/learn/[courseId]/_lib/content';
import { getCourseProgressPercent } from '@/lib/utils/courseStorage';
import {
  getInstructorProfile,
  getReviewSummary,
  type InstructorProfile,
  type ReviewSummary,
} from '@/lib/courses/reviewSummary';
import { useInView } from '@/hooks/useInView';
import { entranceClass, entranceStyle } from '@/lib/utils/animation';
import { isEnrolledIn } from '@/lib/utils/enrollment';

const DEFAULT_PRICE = 49;
const DEFAULT_ORIGINAL_PRICE = 99;

const KIND_ICON: Record<ReviewItemKind, typeof Play> = {
  document: FileText,
  video: Play,
  quiz: ClipboardList,
  assignment: ClipboardCheck,
};

const LEVEL_STYLE: Record<CourseLevel, string> = {
  Beginner: 'bg-white/90 text-slate-700 dark:bg-white/10 dark:text-white/80',
  Intermediate:
    'bg-white/90 text-brand-navy dark:bg-white/10 dark:text-white/80',
  Advanced: 'bg-white/90 text-amber-700 dark:bg-white/10 dark:text-white/80',
};

type TFn = ReturnType<typeof useCourseCatalogT>;

function courseDurationLabel(c: Course, t: TFn): string {
  return c.courseType === 'text-image' && c.documents
    ? t('documents', { count: String(c.documents) })
    : t('hours', { count: String(c.hours) });
}

export interface CoursePreviewProps {
  course: Course;
  modules: ReviewModule[];
  mode: 'public' | 'learner';
  checkoutHref: string;
  /** Base course-player path (no query) — `?mode=resume|replay` is appended
   *  internally based on the learner's actual progress. Learner mode only. */
  learnHref?: string;
  previewLessonHref?: string;
  otherCourseHref: (course: Course) => string;
}

export default function CoursePreview({
  course,
  modules,
  mode,
  checkoutHref,
  learnHref,
  previewLessonHref,
  otherCourseHref,
}: CoursePreviewProps) {
  const t = useCourseCatalogT();
  const isLearner = mode === 'learner';

  const [enrolled, setEnrolled] = useState(isLearner && course.enrolled);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // localStorage-informed state loads after mount (see courseStorage.ts /
  // ContinueLearningCard for the same pattern) so SSR and the first client
  // render always agree. Public mode never has an enrollment record, so it
  // skips this entirely and always shows the not-enrolled rail.
  useEffect(() => {
    if (!isLearner) return;
    const id = setTimeout(() => {
      const isEnrolled = course.enrolled || isEnrolledIn(course.id);
      setEnrolled(isEnrolled);
      if (isEnrolled) setProgress(getCourseProgressPercent(course.id, modules));
    }, 0);
    return () => clearTimeout(id);
  }, [isLearner, course.id, course.enrolled, modules]);

  function handleShare() {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const price = course.price ?? DEFAULT_PRICE;
  const originalPrice = course.originalPrice ?? DEFAULT_ORIGINAL_PRICE;
  const hasSavings = originalPrice > price;

  const totalModules = modules.length;
  const totalLessons = modules.reduce((sum, m) => sum + lessonCount(m), 0);
  const durationLabel = courseDurationLabel(course, t);

  const instructor = getInstructorProfile(course);
  const reviewSummary = getReviewSummary(
    course,
    modules.map((m) => m.title),
  );

  const isCompleted = progress === 100;

  const learnItems = modules
    .flatMap((m) => m.lessons)
    .slice(0, 8)
    .map((l) => l.title);

  const prereqText =
    course.level === 'Beginner'
      ? t('preview.prereqBeginner')
      : course.level === 'Intermediate'
        ? t('preview.prereqIntermediate', { category: course.category })
        : t('preview.prereqAdvanced', { category: course.category });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      {/* ── Main column ── */}
      <div className="min-w-0 space-y-6">
        {/* Hero */}
        <div className="bg-brand-navy relative overflow-hidden rounded-2xl p-6 sm:p-8">
          <GraduationCap
            aria-hidden
            className="text-brand-gold/15 pointer-events-none absolute -top-4 -right-4 h-40 w-40 select-none"
          />
          <div className="relative space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-brand-gold text-brand-navy rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                {course.category}
              </span>
              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
                  LEVEL_STYLE[course.level],
                )}
              >
                {course.level}
              </span>
              <span className="border-brand-gold/30 text-brand-gold inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold">
                <Award className="size-3" />
                {t('preview.certificateBadge')}
              </span>
            </div>

            <h1 className="text-2xl leading-tight font-bold text-white sm:text-3xl">
              {course.title}
            </h1>

            <p className="max-w-2xl text-sm text-white/60">
              {course.description ??
                t('preview.noDescription', {
                  level: course.level,
                  category: course.category,
                })}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-2.5">
                <span className="bg-brand-gold/20 text-brand-gold flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                  {course.author.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    {course.author}
                  </span>
                  <span className="block text-xs text-white/50">
                    {t('preview.instructorRole', {
                      category: course.category,
                    })}
                  </span>
                </span>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-white">
                <Star className="fill-brand-gold text-brand-gold size-4" />
                {course.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Stat bar */}
        <div className="border-border bg-card divide-border grid grid-cols-2 divide-x divide-y overflow-hidden rounded-2xl border sm:grid-cols-4 sm:divide-y-0">
          <StatCell
            icon={Layers}
            label={t('preview.statModules', { count: totalModules })}
            sub={t('preview.statLessons', { count: totalLessons })}
          />
          <StatCell
            icon={Star}
            label={String(course.rating)}
            sub={t('preview.statRating')}
          />
          <StatCell
            icon={Award}
            label={course.level}
            sub={t('preview.statLevel')}
          />
          <StatCell
            icon={Clock}
            label={durationLabel}
            sub={t('preview.statDuration')}
          />
        </div>

        {/* Outcomes */}
        <section className="border-border bg-card rounded-2xl border p-6">
          <h2 className="text-foreground mb-4 text-lg font-bold">
            {t('preview.learnHeading')}
          </h2>
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {learnItems.map((title) => (
              <li
                key={title}
                className="text-muted-foreground flex gap-2.5 text-sm"
              >
                <span
                  className="bg-brand-gold mt-1.5 size-1.5 shrink-0 rounded-full"
                  aria-hidden
                />
                {title}
              </li>
            ))}
          </ul>
          <div className="bg-muted/40 mt-5 rounded-xl p-4">
            <h3 className="text-foreground/70 mb-1 text-[11px] font-bold tracking-widest uppercase">
              {t('preview.prereqHeading')}
            </h3>
            <p className="text-muted-foreground text-sm">{prereqText}</p>
          </div>
        </section>

        {/* Curriculum */}
        <section>
          <div className="mb-3 flex items-baseline justify-between gap-2">
            <h2 className="text-foreground text-lg font-bold">
              {t('preview.curriculumHeading')}
            </h2>
            <span className="text-muted-foreground text-xs">
              {t('preview.curriculumMeta', {
                modules: totalModules,
                lessons: totalLessons,
              })}
            </span>
          </div>
          <div className="space-y-2">
            {modules.map((mod, i) => (
              <CurriculumModule
                key={mod.id}
                module={mod}
                isFirst={i === 0}
                t={t}
              />
            ))}
          </div>
        </section>

        <InstructorSection
          course={course}
          instructor={instructor}
          t={t}
          otherCourseHref={otherCourseHref}
        />

        <ReviewsSection course={course} reviewSummary={reviewSummary} t={t} />
      </div>

      {/* ── Rail ── */}
      <aside className="lg:sticky lg:top-20">
        <div className="border-border bg-card space-y-4 rounded-2xl border p-5">
          <div className="flex items-baseline gap-2">
            <span className="text-foreground text-3xl font-black">
              ${price}
            </span>
            {hasSavings && (
              <s className="text-muted-foreground text-sm">${originalPrice}</s>
            )}
          </div>

          {enrolled ? (
            <>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-foreground">
                  {t('preview.enrolledFlag')}
                </span>
                <span className="text-brand-gold">
                  {t('preview.progressLabel', { progress })}
                </span>
              </div>
              <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                <div
                  className="bg-brand-gold h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {learnHref && (
                <Link
                  href={`${learnHref}?mode=${isCompleted ? 'replay' : 'resume'}`}
                  className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-colors"
                >
                  {isCompleted ? t('preview.ctaReview') : t('continueCourse')}
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href={checkoutHref}
                className="bg-brand-gold hover:bg-brand-gold/90 text-brand-navy flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-colors"
              >
                {t('enroll')}
                <ArrowRight className="size-4" />
              </Link>
              {previewLessonHref && (
                <Link
                  href={previewLessonHref}
                  className="border-border text-foreground hover:border-brand-gold/40 flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-colors"
                >
                  <Play className="size-3.5" />
                  {t('preview.ctaPreviewLesson')}
                </Link>
              )}
            </>
          )}

          <p className="text-foreground/70 border-border border-t pt-4 text-[11px] font-bold tracking-widest uppercase">
            {t('preview.includesHeading')}
          </p>
          <ul className="space-y-2.5">
            <FactRow
              icon={Layers}
              text={t('preview.statModules', { count: totalModules })}
            />
            <FactRow
              icon={BookOpen}
              text={t('preview.statLessons', { count: totalLessons })}
            />
            <FactRow icon={Clock} text={durationLabel} />
            <FactRow icon={Award} text={t('preview.factCertificate')} />
            <FactRow
              icon={Globe}
              text={t('preview.factLevel', { level: course.level })}
            />
          </ul>

          <p className="text-muted-foreground border-border flex items-center gap-2 border-t pt-4 text-xs">
            <Check className="text-brand-gold size-3.5 shrink-0" />
            {t('preview.reassurance')}
          </p>

          <button
            type="button"
            onClick={handleShare}
            className="text-muted-foreground hover:text-brand-gold flex items-center gap-1.5 text-xs font-semibold transition-colors"
          >
            <Share2 className="size-3.5" />
            {copied ? t('preview.linkCopied') : t('preview.share')}
          </button>
        </div>
      </aside>
    </div>
  );
}

// ── Stat cell ─────────────────────────────────────────────────────────────────

function StatCell({
  icon: Icon,
  label,
  sub,
}: {
  icon: typeof Star;
  label: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 p-4 text-center">
      <Icon className="text-brand-gold size-4" aria-hidden />
      <span className="text-foreground text-sm font-bold">{label}</span>
      <span className="text-muted-foreground text-xs">{sub}</span>
    </div>
  );
}

// ── Fact row (rail feature list) ─────────────────────────────────────────────

function FactRow({ icon: Icon, text }: { icon: typeof Star; text: string }) {
  return (
    <li className="text-muted-foreground flex items-center gap-2.5 text-sm">
      <Icon className="text-brand-gold size-4 shrink-0" aria-hidden />
      {text}
    </li>
  );
}

// ── Instructor stat ──────────────────────────────────────────────────────────

function InstructorStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="group flex flex-col">
      <span className="text-foreground group-hover:text-brand-gold text-xl font-black transition-colors">
        {value}
      </span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}

// ── Instructor section ───────────────────────────────────────────────────────

const CREDENTIAL_ICONS = [GraduationCap, Briefcase, Users] as const;
const INSTRUCTOR_STAGGER_MS = 90;

function InstructorSection({
  course,
  instructor,
  t,
  otherCourseHref,
}: {
  course: Course;
  instructor: InstructorProfile;
  t: TFn;
  otherCourseHref: (course: Course) => string;
}) {
  const [ref, active] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref}>
      <h3
        className={cn(
          'text-brand-gold mb-1 text-[11px] font-bold tracking-widest uppercase',
          entranceClass(active, 'sm'),
        )}
      >
        {t('preview.instructorLabel')}
      </h3>
      <h2
        className={cn(
          'text-foreground mb-3 text-lg font-bold',
          entranceClass(active, 'sm'),
        )}
        style={entranceStyle(active, INSTRUCTOR_STAGGER_MS)}
      >
        {t('preview.instructorHeading', { name: course.author })}
      </h2>
      <div className="border-border bg-card hover:border-brand-gold/30 rounded-2xl border p-6 transition-colors duration-300">
        <div
          className={cn(
            'flex flex-wrap items-center gap-4',
            entranceClass(active),
          )}
          style={entranceStyle(active, INSTRUCTOR_STAGGER_MS * 2)}
        >
          <span className="border-brand-gold/40 text-brand-gold flex size-14 shrink-0 cursor-default items-center justify-center rounded-full border-2 text-lg font-bold transition-transform duration-300 hover:scale-110">
            {course.author.charAt(0)}
          </span>
          <div>
            <p className="text-foreground text-base font-bold">
              {course.author}
            </p>
            <p className="text-muted-foreground text-sm">
              {t('preview.instructorRole', { category: course.category })}
            </p>
          </div>
        </div>

        <div
          className={cn('mt-4 flex flex-wrap gap-2', entranceClass(active))}
          style={entranceStyle(active, INSTRUCTOR_STAGGER_MS * 3)}
        >
          {instructor.credentialKeys.map((key, i) => {
            const Icon = CREDENTIAL_ICONS[i];
            return (
              <span
                key={key}
                className="border-border text-muted-foreground hover:border-brand-gold/50 hover:text-foreground flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors"
              >
                <Icon
                  className="text-brand-gold size-3.5 shrink-0"
                  aria-hidden
                />
                {t(`preview.${key}`, {
                  category: course.category,
                  years: instructor.years,
                })}
              </span>
            );
          })}
        </div>

        <p
          className={cn(
            'text-muted-foreground mt-4 text-sm leading-relaxed',
            entranceClass(active),
          )}
          style={entranceStyle(active, INSTRUCTOR_STAGGER_MS * 4)}
        >
          {t('preview.instructorBio', {
            name: course.author,
            category: course.category,
          })}
        </p>

        <div
          className={cn(
            'border-border mt-5 flex gap-8 border-t pt-4',
            entranceClass(active),
          )}
          style={entranceStyle(active, INSTRUCTOR_STAGGER_MS * 5)}
        >
          <InstructorStat
            value={String(instructor.coursesCount)}
            label={t('preview.instructorStatCourses')}
          />
          <InstructorStat
            value={instructor.learnersCount.toLocaleString()}
            label={t('preview.instructorStatLearners')}
          />
          <InstructorStat
            value={String(instructor.avgRating)}
            label={t('preview.instructorStatRating')}
          />
        </div>

        {instructor.otherCourses.length > 0 && (
          <div
            className={cn(
              'border-border mt-5 grid gap-3 border-t pt-5 sm:grid-cols-2',
              entranceClass(active),
            )}
            style={entranceStyle(active, INSTRUCTOR_STAGGER_MS * 6)}
          >
            {instructor.otherCourses.map((oc) => (
              <Link
                key={oc.id}
                href={otherCourseHref(oc)}
                className="border-border hover:border-brand-gold/50 hover:bg-muted/30 group rounded-xl border p-4 transition-colors"
              >
                <p className="text-foreground group-hover:text-brand-gold text-sm font-bold transition-colors">
                  {oc.title}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {oc.level} · {courseDurationLabel(oc, t)} · ★ {oc.rating}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Reviews / social proof section ──────────────────────────────────────────

const REVIEW_CARD_STAGGER_MS = 100;

function ReviewsSection({
  course,
  reviewSummary,
  t,
}: {
  course: Course;
  reviewSummary: ReviewSummary;
  t: TFn;
}) {
  const [ref, active] = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section ref={ref}>
      <div
        className={cn(
          'mb-3 flex flex-wrap items-end justify-between gap-2',
          entranceClass(active, 'sm'),
        )}
      >
        <div>
          <h3 className="text-brand-gold mb-1 text-[11px] font-bold tracking-widest uppercase">
            {t('preview.reviewsLabel')}
          </h3>
          <h2 className="text-foreground text-lg font-bold">
            {t('preview.reviewsHeading')}
          </h2>
        </div>
        <span className="text-muted-foreground text-xs">
          {t('preview.reviewsWrittenCount', {
            count: reviewSummary.writtenReviewsCount,
          })}
        </span>
      </div>

      <div
        className={cn(
          'border-border bg-card grid gap-6 rounded-2xl border p-6 sm:grid-cols-[auto_1fr]',
          entranceClass(active),
        )}
        style={entranceStyle(active, 80)}
      >
        <div className="sm:border-border flex shrink-0 cursor-default flex-col items-center justify-center gap-1 transition-transform duration-300 hover:scale-105 sm:border-r sm:pr-6">
          <span className="text-foreground text-4xl font-black">
            {course.rating}
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'size-3.5 transition-transform duration-200 hover:scale-125',
                  i < Math.round(course.rating)
                    ? 'fill-brand-gold text-brand-gold'
                    : 'text-muted-foreground/30',
                )}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-xs">
            {t('preview.reviewsRatingsCount', {
              count: reviewSummary.ratingsCount,
            })}
          </span>
        </div>

        <div className="flex flex-col justify-center gap-1.5">
          {reviewSummary.breakdown.map((row, i) => {
            const count = Math.round(
              (reviewSummary.ratingsCount * row.percent) / 100,
            );
            return (
              <div
                key={row.stars}
                className="group flex items-center gap-2 text-xs"
              >
                <span className="text-muted-foreground w-6 shrink-0">
                  {row.stars}★
                </span>
                <div
                  className="bg-muted h-1.5 flex-1 overflow-hidden rounded-full"
                  title={t('preview.reviewsRatingsCount', { count })}
                >
                  <div
                    className="bg-brand-gold h-full rounded-full transition-[width,filter] duration-700 ease-out group-hover:brightness-110"
                    style={{
                      width: active ? `${row.percent}%` : '0%',
                      transitionDelay: active ? `${i * 80}ms` : '0ms',
                    }}
                  />
                </div>
                <span className="text-muted-foreground w-8 shrink-0 text-right">
                  {row.percent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {reviewSummary.testimonials.map((rev, i) => (
          <figure
            key={i}
            className={cn(
              'border-border bg-card hover:border-brand-gold/40 flex flex-col gap-3 rounded-2xl border p-5 transition-colors',
              entranceClass(active, 'sm'),
            )}
            style={entranceStyle(active, 120 + i * REVIEW_CARD_STAGGER_MS)}
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={cn(
                    'size-3.5',
                    j < rev.stars
                      ? 'fill-brand-gold text-brand-gold'
                      : 'text-muted-foreground/30',
                  )}
                />
              ))}
            </div>
            <blockquote className="text-foreground/80 flex-1 text-sm leading-relaxed">
              &ldquo;
              {t(`preview.${rev.templateKey}`, {
                module: rev.moduleTitle,
                category: course.category,
              })}
              &rdquo;
            </blockquote>
            <figcaption className="border-border flex items-center gap-3 border-t pt-3">
              <span className="bg-brand-gold/15 text-brand-gold flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                {rev.name.charAt(0)}
              </span>
              <span className="min-w-0">
                <span
                  className="text-foreground block truncate text-xs font-bold"
                  title={rev.role}
                >
                  {rev.name}
                </span>
                <span className="text-muted-foreground block truncate text-[11px]">
                  {t('preview.reviewSince', { date: rev.date })}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

// ── Curriculum module accordion ──────────────────────────────────────────────

function CurriculumModule({
  module,
  isFirst,
  t,
}: {
  module: ReviewModule;
  isFirst: boolean;
  t: TFn;
}) {
  const [open, setOpen] = useState(isFirst);
  const items = flattenItems([module]);

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="hover:bg-muted/40 flex w-full items-center gap-3 px-4 py-3 text-left transition-colors sm:px-5"
      >
        <span className="bg-brand-gold/15 text-brand-gold flex size-9 shrink-0 items-center justify-center rounded-full">
          <Layers className="size-4" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="text-foreground block truncate text-sm font-bold">
            {module.title}
          </span>
          <span className="text-muted-foreground block text-xs">
            {t('preview.curriculumMeta', {
              modules: module.lessons.length,
              lessons: items.length,
            })}
          </span>
        </span>
        {isFirst && (
          <span className="bg-brand-gold/15 text-brand-gold hidden shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold sm:inline-block">
            {t('preview.previewChip')}
          </span>
        )}
        <ChevronDown
          className={cn(
            'text-muted-foreground size-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-in-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <ul className="border-border divide-border divide-y border-t px-4 sm:px-5">
            {items.map((item) => (
              <CurriculumItemRow
                key={item.id}
                item={item}
                locked={!isFirst}
                t={t}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CurriculumItemRow({
  item,
  locked,
  t,
}: {
  item: ReviewItem;
  locked: boolean;
  t: TFn;
}) {
  const Icon = KIND_ICON[item.kind];
  return (
    <li className="flex items-center gap-2.5 py-2.5 text-sm">
      <Icon className="text-muted-foreground size-4 shrink-0" aria-hidden />
      <span className="text-foreground min-w-0 flex-1 truncate">
        {item.title}
      </span>
      {locked ? (
        <span className="text-muted-foreground/60 flex shrink-0 items-center gap-1 text-xs">
          <Lock className="size-3" />
          <span className="hidden sm:inline">{t('preview.lockedChip')}</span>
        </span>
      ) : (
        <span className="text-brand-gold shrink-0 text-xs font-semibold">
          {t('preview.previewChip')}
        </span>
      )}
    </li>
  );
}
