import Link from 'next/link';
import {
  Star,
  Clock,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Users,
  Lightbulb,
  MessageCircle,
  Calculator,
  BookMarked,
  Baby,
  TrendingUp,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ALL_COURSES } from '@/constants/learner';
import type { Course, CourseLevel } from '@/constants/learner';

type Meta = { icon: React.ElementType; bg: string; fg: string };

const CATEGORY_META: Record<string, Meta> = {
  Leadership: { icon: Users, bg: 'bg-brand-gold/10', fg: 'text-brand-gold' },
  'Critical Thinking': {
    icon: Lightbulb,
    bg: 'bg-brand-navy/10',
    fg: 'text-brand-navy',
  },
  Communication: {
    icon: MessageCircle,
    bg: 'bg-brand-gold/10',
    fg: 'text-brand-gold',
  },
  STEM: { icon: Calculator, bg: 'bg-brand-navy/10', fg: 'text-brand-navy' },
  'Khmer Literature': {
    icon: BookMarked,
    bg: 'bg-brand-navy/10',
    fg: 'text-brand-navy',
  },
  'Child Development': {
    icon: Baby,
    bg: 'bg-brand-navy/10',
    fg: 'text-brand-navy',
  },
  'Leadership Development': {
    icon: TrendingUp,
    bg: 'bg-brand-navy/10',
    fg: 'text-brand-navy',
  },
  'Innovative Learning': {
    icon: Sparkles,
    bg: 'bg-brand-navy/10',
    fg: 'text-brand-navy',
  },
  Innovation: { icon: Zap, bg: 'bg-brand-gold/10', fg: 'text-brand-gold' },
};
const FALLBACK_META: Meta = {
  icon: BookOpen,
  bg: 'bg-brand-navy/10',
  fg: 'text-brand-navy',
};

const LEVEL_BADGE: Record<CourseLevel, string> = {
  Beginner: 'bg-brand-gold/10 text-brand-gold',
  Intermediate: 'bg-brand-navy/10 text-brand-navy',
  Advanced: 'bg-brand-red/10 text-brand-red',
};

function courseMeta(course: Course): Meta {
  return CATEGORY_META[course.category] ?? FALLBACK_META;
}

export default function RecommendedCourses() {
  const recommended = ALL_COURSES.filter((c) => !c.enrolled).slice(0, 2);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-brand-navy text-base font-bold">
            Recommended for You
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Courses matched to your learning path
          </p>
        </div>
        <Link
          href="/explore"
          className="text-brand-gold flex items-center gap-0.5 text-xs font-semibold hover:underline"
        >
          Explore All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {recommended.map((course) => {
          const { icon: Icon, bg, fg } = courseMeta(course);

          return (
            <div
              key={course.id}
              className="flex flex-col rounded-lg border border-slate-200 bg-white p-4"
            >
              {/* Icon + category */}
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bg}`}
                >
                  <Icon className={`h-5 w-5 ${fg}`} />
                </div>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  {course.category}
                </span>
              </div>

              {/* Title */}
              <p className="text-brand-navy mb-1 text-sm leading-snug font-bold">
                {course.title}
              </p>

              {/* Author */}
              <p className="mb-4 text-[11px] text-slate-400">
                by{' '}
                <span className="font-medium text-slate-500">
                  {course.author}
                </span>
              </p>

              {/* Meta badges */}
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${LEVEL_BADGE[course.level]}`}
                >
                  {course.level}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] text-slate-400">
                  <Star className="fill-brand-gold text-brand-gold h-3 w-3" />
                  {course.rating}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  {course.hours}h
                </span>
              </div>

              {/* CTA */}
              <Link
                href="/explore"
                className="border-brand-navy text-brand-navy hover:bg-brand-navy mt-auto inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-bold transition-colors hover:text-white"
              >
                Start Learning
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
