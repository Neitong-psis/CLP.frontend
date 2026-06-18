import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
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
    <div className="border-border bg-card rounded-2xl border p-6 transition-shadow duration-200 hover:shadow-md">
      <h3 className="text-foreground mb-5 text-sm font-bold">{title}</h3>
      {children}
    </div>
  );
}

const RANK_STYLES = [
  'bg-brand-gold text-white',
  'bg-brand-navy text-white',
  'bg-muted text-muted-foreground',
];

function TopCourseRow({ course, rank }: { course: TopCourse; rank: number }) {
  return (
    <li className="group hover:bg-muted -mx-2 flex items-center justify-between gap-4 rounded-lg px-2 py-1.5 transition-colors">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
            RANK_STYLES[rank] ?? RANK_STYLES[2],
          )}
        >
          {rank + 1}
        </span>
        <div className="min-w-0">
          <p className="text-foreground truncate text-sm font-semibold">
            {course.title}
          </p>
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            {course.students.toLocaleString()} students
          </p>
        </div>
      </div>
      <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-[11px] font-semibold">
        <Star className="fill-brand-gold text-brand-gold h-3 w-3" />
        {course.rating}
      </span>
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
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-foreground text-sm font-semibold">{item.title}</p>
        <span className="text-brand-gold text-sm font-bold">{item.rate}%</span>
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
        <ul className="max-h-65 overflow-x-hidden overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {topCourses.map((course, i) => (
            <TopCourseRow key={course.title} course={course} rank={i} />
          ))}
        </ul>
      </InsightCard>

      <InsightCard title="Completion Rates">
        <ul className="max-h-65 space-y-4 overflow-x-hidden overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {completionRates.map((item, i) => (
            <CompletionRateRow key={item.title} item={item} index={i} />
          ))}
        </ul>
      </InsightCard>
    </div>
  );
}
