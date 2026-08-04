'use client';

import { useEffect, useState } from 'react';
import {
  readVerifiedCerts,
  readVerifiedCertName,
} from '@/lib/utils/certStorage';

/**
 * Certificates verified in this session or a previous one (persisted in
 * localStorage). `verifiedIds`/`verifiedNames` start empty and are populated
 * on mount so SSR and the first client render always agree; `mounted` flips
 * once that load completes.
 */
export function useVerifiedCertificates() {
  const [verifiedIds, setVerifiedIds] = useState<string[]>([]);
  const [verifiedNames, setVerifiedNames] = useState<Record<string, string>>(
    {},
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      const ids = readVerifiedCerts();
      const names: Record<string, string> = {};
      ids.forEach((certId) => {
        const n = readVerifiedCertName(certId);
        if (n) names[certId] = n;
      });
      setVerifiedIds(ids);
      setVerifiedNames(names);
      setMounted(true);
    }, 60);
    return () => clearTimeout(id);
  }, []);

  return { verifiedIds, verifiedNames, mounted };
}
