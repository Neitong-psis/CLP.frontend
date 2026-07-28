'use client';

import {
  createResourceStore,
  useResourceStore,
} from '@/lib/cache/createResourceStore';
import {
  fetchCertificateStats,
  type CertificateStats,
} from '@/services/certificates';

interface UseCertificateStatsResult {
  data: CertificateStats | null;
  loading: boolean;
  error: string | null;
}

const certificateStatsStore = createResourceStore<CertificateStats>(
  fetchCertificateStats,
);

export function useCertificateStats(): UseCertificateStatsResult {
  return useResourceStore(certificateStatsStore);
}
