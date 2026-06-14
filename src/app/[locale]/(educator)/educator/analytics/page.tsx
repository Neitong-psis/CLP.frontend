import EducatorTopBar from '@/components/common/TopBar';
import { AnalyticsHeader } from './_components/AnalyticsHeader';
import { MetricCards } from './_components/MetricCards';
import { WeeklyEnrollmentChart } from './_components/WeeklyEnrollmentChart';
import { CompletionRanges } from './_components/CompletionRanges';
import { CoursePerformanceTable } from './_components/CoursePerformanceTable';

export default function EducatorAnalyticsPage() {
  return (
    <div className="flex min-h-full flex-col bg-slate-50">
      <EducatorTopBar
        role="educator"
        title="Analytics"
        subtitle="Your course performance and learner insights"
      />

      <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up">
          <AnalyticsHeader />
        </div>

        <MetricCards />

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="animate-fade-in-up delay-200 lg:col-span-3">
            <WeeklyEnrollmentChart />
          </div>
          <div className="animate-fade-in-up delay-300 lg:col-span-2">
            <CompletionRanges />
          </div>
        </div>

        <div className="animate-fade-in-up delay-400">
          <CoursePerformanceTable />
        </div>
      </div>
    </div>
  );
}
