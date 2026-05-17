import { z } from "zod";

export const userProfileDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  avatarInitials: z.string(),
});

export type UserProfileDtoInferred = z.infer<typeof userProfileDtoSchema>;

export const dashboardStatsDtoSchema = z.object({
  enrolledCourses: z.number(),
  enrolledLabel: z.string(),
  hoursLearnedThisWeek: z.number(),
  hoursLearnedLabel: z.string(),
  streakDays: z.number(),
  streakPersonalBestDays: z.number(),
  certificatesEarned: z.number(),
  certificatesLabel: z.string(),
});

export const courseSummaryDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  instructor: z.string(),
  progressPercent: z.number().min(0).max(100),
});

export const weeklyActivityDtoSchema = z.object({
  dayShort: z.string(),
  minutes: z.number().min(0),
});

export const skillProgressDtoSchema = z.object({
  skill: z.string(),
  progressPercent: z.number().min(0).max(100),
});
