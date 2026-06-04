import { TrendingUp, DollarSign, Users, BookOpen } from 'lucide-react';
import { DASHBOARD_STATS, MONTHLY_REVENUE } from '@/constants/admin';
import { StatCard } from './StatCard';

const stat = (label: string) => DASHBOARD_STATS.find((s) => s.label === label)!;

export function DashboardStatGrid() {
  const enrollments = stat('Total Enrollments');
  const revenue = stat('Monthly Revenue');
  const users = stat('Total Users');
  const courses = stat('Active Courses');

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        // variant="accent"
        label={enrollments.label}
        value={enrollments.value}
        change={enrollments.change}
        icon={TrendingUp}
      />
      <StatCard
        label={revenue.label}
        value={revenue.value}
        change={revenue.change}
        icon={DollarSign}
        spark={MONTHLY_REVENUE.map((m) => m.amount)}
      />
      <StatCard
        label={users.label}
        value={users.value}
        change={users.change}
        icon={Users}
      />
      <StatCard
        label={courses.label}
        value={courses.value}
        change={courses.change}
        icon={BookOpen}
      />
    </div>
  );
}
