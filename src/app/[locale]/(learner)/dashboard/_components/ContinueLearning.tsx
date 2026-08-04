import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import { ENROLLED_COURSES } from '@/constants/learner';
import { slugify } from '@/lib/utils/slugify';

export default function ContinueLearning() {
  const inProgress = ENROLLED_COURSES.filter((c) => !c.completed).slice(0, 3);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-brand-navy text-base font-bold">
            Continue Learning
          </h2>
        </div>
        <Link
          href="/my-learning"
          className="text-brand-gold flex items-center gap-1 text-xs font-semibold hover:underline"
        >
          View all <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inProgress.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white"
          >
            <div className="bg-brand-navy relative flex h-36 items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Play className="h-6 w-6 text-white" />
              </div>
              <span className="absolute bottom-2 left-3 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                {course.category}
              </span>
            </div>
            <div className="p-4">
              <p className="text-brand-navy mb-0.5 leading-snug font-semibold">
                {course.title}
              </p>
              <p className="mb-3 text-xs text-slate-400">{course.author}</p>
              <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                <span>Progress</span>
                <span className="text-brand-navy font-semibold">
                  {course.progress}%
                </span>
              </div>
              <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-brand-gold h-full rounded-full"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <Link
                href={`/learn/${slugify(course.title)}?mode=resume`}
                className="bg-brand-gold hover:bg-brand-gold-dark flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold text-white transition-colors"
              >
                <Play className="h-3 w-3" /> Continue
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
