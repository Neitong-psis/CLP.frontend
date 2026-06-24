'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLearnerCertificatesT } from '@/i18n';
import TopBar from '@/components/pages/learner/TopBar';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import { CERTIFICATES, MOCK_USER } from '@/config/learner';
import { cn } from '@/lib/utils/cn';
import {
  readVerifiedCerts,
  readVerifiedCertName,
} from '@/lib/utils/certStorage';
import { CertificateCard } from './_components/CertificateCard';

export default function CertificatesPage() {
  const t = useLearnerCertificatesT();
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);
  // IDs verified in this session or a previous session (persisted in localStorage).
  // Starts empty; populated on mount so SSR/hydration is always consistent.
  const [verifiedIds, setVerifiedIds] = useState<string[]>([]);
  const [verifiedNames, setVerifiedNames] = useState<Record<string, string>>(
    {},
  );

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

  const filtered = CERTIFICATES.filter(
    (c) =>
      c.fullTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.certificateId.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <TopBar
        role="learner"
        title={t('title')}
        subtitle={t('subtitle', { email: MOCK_USER.email })}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Search + stats row */}
          <div
            className={cn(
              'flex flex-wrap items-center gap-4 transition-all duration-500 ease-out',
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            )}
          >
            <div className="border-border bg-card focus-within:border-brand-gold/50 relative w-full max-w-xs rounded-2xl border shadow-sm transition-colors duration-150">
              <Search className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('search')}
                className="text-foreground placeholder:text-muted-foreground w-full rounded-2xl bg-transparent py-2.5 pr-4 pl-10 text-sm outline-none"
              />
            </div>

            <div className="ml-auto" />

            <div className="border-border bg-card flex items-center gap-4 rounded-2xl border px-6 py-3 shadow-sm">
              <p className="text-muted-foreground text-sm font-medium">
                {t('available')}
              </p>
              <p className="text-brand-navy dark:text-foreground text-3xl font-black">
                {CERTIFICATES.length}
              </p>
            </div>
          </div>

          {/* Certificate grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((cert, i) => (
              <CertificateCard
                key={cert.id}
                cert={cert}
                t={t}
                isVerified={cert.verified || verifiedIds.includes(cert.id)}
                verifiedName={verifiedNames[cert.id]}
                active={mounted}
                delay={160 + i * 80}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p
              className={cn(
                'text-muted-foreground py-12 text-center text-sm transition-all duration-500 ease-out',
                mounted ? 'opacity-100' : 'opacity-0',
              )}
            >
              No certificates match your search.
            </p>
          )}
        </div>
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
