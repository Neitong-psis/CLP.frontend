import { z } from 'zod';
import { http } from '@/lib/api/http';
import { normalizeError } from '@/lib/api/errors';

const ENROLLMENTS_ENDPOINT = '/enrollments';

const enrollmentStatsSchema = z.object({
  total: z.number(),
  trend: z.number(),
  monthlyRevenue: z.object({
    value: z.number(),
    trend: z.number(),
    month: z.string(),
  }),
});

export type EnrollmentStats = z.infer<typeof enrollmentStatsSchema>;

const enrollmentAnalyticsSchema = z.object({
  months: z.array(z.string()),
  growth: z.array(z.number()),
});

export type EnrollmentAnalytics = z.infer<typeof enrollmentAnalyticsSchema>;

export async function fetchEnrollmentStats(): Promise<EnrollmentStats> {
  try {
    const { data } = await http.get<unknown>(`${ENROLLMENTS_ENDPOINT}/stats`);
    return enrollmentStatsSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function fetchEnrollmentAnalytics(): Promise<EnrollmentAnalytics> {
  try {
    const { data } = await http.get<unknown>(
      `${ENROLLMENTS_ENDPOINT}/analytics`,
    );
    return enrollmentAnalyticsSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}
