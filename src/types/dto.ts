export interface UserProfileDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;
  readonly avatarInitials: string;
}

export interface DashboardStatsDto {
  readonly enrolledCourses: number;
  readonly enrolledLabel: string;
  readonly hoursLearnedThisWeek: number;
  readonly hoursLearnedLabel: string;
  readonly streakDays: number;
  readonly streakPersonalBestDays: number;
  readonly certificatesEarned: number;
  readonly certificatesLabel: string;
}

export interface CourseSummaryDto {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly instructor: string;
  readonly progressPercent: number;
}

export interface WeeklyActivityDto {
  readonly dayShort: string;
  readonly minutes: number;
}

export interface SkillProgressDto {
  readonly skill: string;
  readonly progressPercent: number;
}
