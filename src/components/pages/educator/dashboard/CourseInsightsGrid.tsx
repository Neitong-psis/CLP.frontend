import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { DASHBOARD_TOP_COURSES, COMPLETION_RATES } from '@/constants/educator';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TopCourse {
  id: string;
  title: string;
  students: number;
  rating: number;
}

interface CompletionRate {
  id: string;
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
    <div className="border-border bg-card rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-md">
      <h3 className="text-foreground mb-5 text-sm font-bold">{title}</h3>
      {children}
    </div>
  );
}

function TopCourseRow({ course }: { course: TopCourse }) {
  return (
    <li className="border-border border-b last:border-0">
      <Link
        href={`/educator/courses/${course.id}`}
        className="hover:bg-muted/50 -mx-2 flex items-center justify-between gap-4 rounded-lg px-2 py-3 transition-colors"
      >
        <div className="min-w-0">
          <p className="text-foreground text-sm font-semibold">
            {course.title}
          </p>
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            {course.students.toLocaleString()} students
          </p>
        </div>
        <span className="text-muted-foreground shrink-0 text-[11px] font-medium">
          {course.rating} rating
        </span>
      </Link>
    </li>
  );
}

function CompletionRateRow({
  item,
  index,
}: {
  item: CompletionRate;
  index: number;
}) {
  return (
    <li>
      <Link
        href={`/educator/courses/${item.id}`}
        className="hover:bg-muted/50 -mx-2 block rounded-lg px-2 py-1.5 transition-colors"
      >
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-foreground text-sm font-semibold">{item.title}</p>
          <span className="text-brand-gold text-sm font-bold">
            {item.rate}%
          </span>
        </div>
        <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
          <div
            className="bg-brand-gold animate-highlight-in h-full rounded-full"
            style={{
              width: `${item.rate}%`,
              animationDelay: `${0.4 + index * 0.12}s`,
            }}
          />
        </div>
      </Link>
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
        <ul>
          {topCourses.slice(0, 4).map((course) => (
            <TopCourseRow key={course.id} course={course} />
          ))}
        </ul>
      </InsightCard>

      <InsightCard title="Completion Rates">
        <ul className="space-y-4">
          {completionRates.slice(0, 4).map((item, i) => (
            <CompletionRateRow key={item.id} item={item} index={i} />
          ))}
        </ul>
      </InsightCard>
    </div>
  );
}
