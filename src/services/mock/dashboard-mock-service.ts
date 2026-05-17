import { cache } from "react";
import { sleep } from "@/lib/sleep";
import type { ApiResponse } from "@/types/api";
import type {
  CourseSummaryDto,
  DashboardStatsDto,
  SkillProgressDto,
  UserProfileDto,
  WeeklyActivityDto,
} from "@/types/dto";
import {
  mockContinueLearningCourses,
  mockDashboardStats,
  mockSkills,
  mockUserProfile,
  mockWeeklyActivity,
} from "@/services/mock/mock-data";

const MOCK_LATENCY_MS = 220;

async function simulateNetwork<T>(value: T): Promise<T> {
  await sleep(MOCK_LATENCY_MS);
  return value;
}

export async function getMockUserProfile(): Promise<
  ApiResponse<UserProfileDto>
> {
  return simulateNetwork({ success: true, data: mockUserProfile });
}

export async function getMockDashboardStats(): Promise<
  ApiResponse<DashboardStatsDto>
> {
  return simulateNetwork({ success: true, data: mockDashboardStats });
}

export async function getMockContinueLearning(): Promise<
  ApiResponse<readonly CourseSummaryDto[]>
> {
  return simulateNetwork({
    success: true,
    data: mockContinueLearningCourses,
  });
}

export async function getMockWeeklyActivity(): Promise<
  ApiResponse<readonly WeeklyActivityDto[]>
> {
  return simulateNetwork({
    success: true,
    data: mockWeeklyActivity,
  });
}

export async function getMockSkillProgress(): Promise<
  ApiResponse<readonly SkillProgressDto[]>
> {
  return simulateNetwork({
    success: true,
    data: mockSkills,
  });
}

export interface DashboardOverviewPayload {
  readonly profile: UserProfileDto;
  readonly stats: DashboardStatsDto;
  readonly continueLearning: readonly CourseSummaryDto[];
  readonly weeklyActivity: readonly WeeklyActivityDto[];
  readonly skills: readonly SkillProgressDto[];
}

export async function getMockDashboardOverview(): Promise<
  ApiResponse<DashboardOverviewPayload>
> {
  await sleep(MOCK_LATENCY_MS);
  return {
    success: true,
    data: {
      profile: mockUserProfile,
      stats: mockDashboardStats,
      continueLearning: mockContinueLearningCourses,
      weeklyActivity: mockWeeklyActivity,
      skills: mockSkills,
    },
  };
}

/** De-duplicates mock overview requests within a single RSC render pass. */
export const getCachedMockDashboardOverview = cache(getMockDashboardOverview);
