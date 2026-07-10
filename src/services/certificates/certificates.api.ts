import { z } from 'zod';
import { http } from '@/lib/api/http';
import { normalizeError } from '@/lib/api/errors';

const CERTIFICATES_ENDPOINT = '/certificates';

const certificateStatsSchema = z.object({
  total: z.number(),
  trend: z.number(),
});

export type CertificateStats = z.infer<typeof certificateStatsSchema>;

export async function fetchCertificateStats(): Promise<CertificateStats> {
  try {
    const { data } = await http.get<unknown>(`${CERTIFICATES_ENDPOINT}/stats`);
    return certificateStatsSchema.parse(data);
  } catch (error) {
    throw normalizeError(error);
  }
}
