import { z } from 'zod';
import { http } from '@/lib/api/http';
import { normalizeError } from '@/lib/api/errors';

const REVENUE_ENDPOINT = '/revenue';

const revenueStatsSchema = z.object({
  annualRevenue: z.number(),
  annualRevenueTrend: z.number(),
  thisMonth: z.number(),
  thisMonthTrend: z.number(),
  monthlyRecurringRevenue: z.number(),
  monthlyRecurringRevenueTrend: z.number(),
  averageOrderValue: z.number(),
  averageOrderValueTrend: z.number(),
});

export type RevenueStats = z.infer<typeof revenueStatsSchema>;

const revenueMonthlySchema = z.object({
  months: z.array(z.string()),
  amounts: z.array(z.number()),
});

export type RevenueMonthly = z.infer<typeof revenueMonthlySchema>;

export async function fetchRevenueStats(): Promise<RevenueStats> {
  try {
    const { data } = await http.get<unknown>(`${REVENUE_ENDPOINT}/stats`);
    return revenueStatsSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function fetchRevenueMonthly(): Promise<RevenueMonthly> {
  try {
    const { data } = await http.get<unknown>(`${REVENUE_ENDPOINT}/monthly`);
    return revenueMonthlySchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}
