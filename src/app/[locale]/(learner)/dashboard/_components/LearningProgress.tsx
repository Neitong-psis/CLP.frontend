import Link from 'next/link';
import {
  BookOpen,
  Clock,
  ArrowRight,
  ChevronRight,
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
import { ENROLLED_COURSES } from '@/config/learner';
import type { Course } from '@/config/learner';

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

function courseMeta(course: Course): Meta {
  return CATEGORY_META[course.category] ?? FALLBACK_META;
}

export default function LearningProgress() {
  const inProgress = ENROLLED_COURSES.filter(
    (c) => !c.completed && c.progress > 0,
  );
  const visible = inProgress.slice(0, 3);
  const hasMore = inProgress.length > 3;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-brand-navy text-base font-bold">
            Continue Learning
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Pick up where you left off
          </p>
        </div>
        <Link
          href="/my-learning"
          className="text-brand-gold flex items-center gap-0.5 text-xs font-semibold hover:underline"
        >
          See All <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {visible.map((course) => {
          const { icon: Icon, bg, fg } = courseMeta(course);
          const totalLessons = course.hours * 2;
          const doneLessons = Math.round(
            (course.progress / 100) * totalLessons,
          );
          const hoursLeft = Math.max(
            1,
            Math.round(((100 - course.progress) / 100) * course.hours),
          );

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
              <p className="text-brand-navy mb-4 text-sm leading-snug font-bold">
                {course.title}
              </p>

              {/* Progress label + bar */}
              <div className="mb-1.5 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Progress</span>
                <span className="text-brand-navy font-bold">
                  {course.progress}%
                </span>
              </div>
              <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-brand-gold h-full rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              {/* Stats */}
              <div className="mb-5 flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  {doneLessons}/{totalLessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {hoursLeft}h left
                </span>
              </div>

              {/* CTA */}
              <Link
                href="/my-learning"
                className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy mt-auto inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold transition-colors"
              >
                Resume Course
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          );
        })}

        {hasMore && (
          <Link
            href="/my-learning"
            className="hover:border-brand-gold/40 hover:bg-brand-gold/[0.03] flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 p-4 text-center transition-colors"
          >
            <span className="text-brand-navy text-sm font-bold">
              +{inProgress.length - 3} more
            </span>
            <span className="mt-1 text-[11px] text-slate-400">
              View all courses
            </span>
            <ChevronRight className="text-brand-gold mt-2 h-4 w-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
