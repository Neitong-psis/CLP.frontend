import { cn } from '@/utils/cn';
import { DASHBOARD_TOP_COURSES, COMPLETION_RATES } from '@/constants/educator';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TopCourse {
  title: string;
  students: number;
  rating: number;
}

interface CompletionRate {
  title: string;
  rate: number;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InsightCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="text-brand-navy mb-5 text-sm font-bold">{title}</h3>
      {children}
    </div>
  );
}

function TopCourseRow({ course }: { course: TopCourse }) {
  return (
    <li className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-brand-navy truncate text-sm font-semibold">
          {course.title}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-400">
          {course.students.toLocaleString()} students
        </p>
      </div>
      <span className="shrink-0 text-[11px] font-semibold text-slate-500">
        {course.rating} rating
      </span>
    </li>
  );
}

function CompletionRateRow({ item }: { item: CompletionRate }) {
  return (
    <li>
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-brand-navy text-sm font-semibold">{item.title}</p>
        <span className="text-brand-gold text-sm font-bold">{item.rate}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="bg-brand-gold h-full rounded-full transition-[width] duration-500"
          style={{ width: `${item.rate}%` }}
        />
      </div>
    </li>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface CourseInsightsGridProps {
  topCourses?: TopCourse[];
  completionRates?: CompletionRate[];
  className?: string;
}

export function CourseInsightsGrid({
  topCourses = DASHBOARD_TOP_COURSES,
  completionRates = COMPLETION_RATES,
  className,
}: CourseInsightsGridProps) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-2', className)}>
      <InsightCard title="Top Courses">
        <ul className="space-y-5">
          {topCourses.map((course) => (
            <TopCourseRow key={course.title} course={course} />
          ))}
        </ul>
      </InsightCard>

      <InsightCard title="Completion Rates">
        <ul className="space-y-4">
          {completionRates.map((item) => (
            <CompletionRateRow key={item.title} item={item} />
          ))}
        </ul>
      </InsightCard>
    </div>
  );
}
