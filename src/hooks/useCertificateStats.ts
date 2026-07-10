'use client';

import { useState, useEffect } from 'react';
import {
  fetchCertificateStats,
  type CertificateStats,
} from '@/services/certificates';

interface UseCertificateStatsResult {
  data: CertificateStats | null;
  loading: boolean;
  error: string | null;
}

export function useCertificateStats(): UseCertificateStatsResult {
  const [data, setData] = useState<CertificateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchCertificateStats()
      .then((stats) => {
        if (!cancelled) setData(stats);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(
            err instanceof Error
              ? err.message
              : 'Failed to load certificate stats',
          );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
