import type {
  CourseSummaryDto,
  DashboardStatsDto,
  SkillProgressDto,
  UserProfileDto,
  WeeklyActivityDto,
} from "@/types/dto";
import { UserRole } from "@/constants/roles";

export const mockUserProfile: UserProfileDto = {
  id: "user_learner_1",
  name: "John Doe",
  email: "learner@clp.com",
  role: UserRole.Learner,
  avatarInitials: "JD",
};

export const mockDashboardStats: DashboardStatsDto = {
  enrolledCourses: 5,
  enrolledLabel: "Active courses",
  hoursLearnedThisWeek: 7,
  hoursLearnedLabel: "This week",
  streakDays: 7,
  streakPersonalBestDays: 12,
  certificatesEarned: 2,
  certificatesLabel: "Earned so far",
};

export const mockContinueLearningCourses: readonly CourseSummaryDto[] = [
  {
    id: "c_web_101",
    title: "Complete Web Development Bootcamp",
    category: "Web Development",
    instructor: "Sarah Chen",
    progressPercent: 65,
  },
  {
    id: "c_ds_202",
    title: "Data Science Fundamentals",
    category: "Data Science",
    instructor: "Alex Rivera",
    progressPercent: 42,
  },
  {
    id: "c_cloud_305",
    title: "Cloud Computing Essentials",
    category: "Cloud Computing",
    instructor: "Priya Patel",
    progressPercent: 28,
  },
];

export const mockWeeklyActivity: readonly WeeklyActivityDto[] = [
  { dayShort: "Mon", minutes: 45 },
  { dayShort: "Tue", minutes: 30 },
  { dayShort: "Wed", minutes: 60 },
  { dayShort: "Thu", minutes: 25 },
  { dayShort: "Fri", minutes: 80 },
  { dayShort: "Sat", minutes: 110 },
  { dayShort: "Sun", minutes: 40 },
];

export const mockSkills: readonly SkillProgressDto[] = [
  { skill: "JavaScript", progressPercent: 78 },
  { skill: "React", progressPercent: 62 },
  { skill: "Node.js", progressPercent: 45 },
  { skill: "Python", progressPercent: 32 },
];
