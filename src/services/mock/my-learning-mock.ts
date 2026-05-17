export type LearningEnrollmentStatus = "In progress" | "Completed" | "Not started";

export interface LearningEnrollmentRow {
  readonly id: string;
  readonly course: string;
  readonly instructor: string;
  readonly status: LearningEnrollmentStatus;
  readonly progressPercent: number;
  readonly lastActivity: string;
}

export const mockLearningEnrollments: readonly LearningEnrollmentRow[] = [
  {
    id: "e1",
    course: "Complete Web Development Bootcamp",
    instructor: "Sarah Chen",
    status: "In progress",
    progressPercent: 65,
    lastActivity: "Today",
  },
  {
    id: "e2",
    course: "Data Science Fundamentals",
    instructor: "Alex Rivera",
    status: "In progress",
    progressPercent: 42,
    lastActivity: "Yesterday",
  },
  {
    id: "e3",
    course: "Cloud Computing Essentials",
    instructor: "Priya Patel",
    status: "In progress",
    progressPercent: 28,
    lastActivity: "3 days ago",
  },
  {
    id: "e4",
    course: "Product Management Basics",
    instructor: "Jordan Lee",
    status: "Completed",
    progressPercent: 100,
    lastActivity: "Last week",
  },
  {
    id: "e5",
    course: "UX Research Methods",
    instructor: "Morgan Blake",
    status: "Not started",
    progressPercent: 0,
    lastActivity: "—",
  },
  {
    id: "e6",
    course: "SQL for Analysts",
    instructor: "Samir Khan",
    status: "In progress",
    progressPercent: 12,
    lastActivity: "Today",
  },
];
