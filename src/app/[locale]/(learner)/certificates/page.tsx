'use client';

import { useState, useEffect } from 'react';
import { useLearnerCertificatesT } from '@/i18n';
import TopBar from '@/components/pages/learner/TopBar';
import { PageHero } from '@/components/common/PageHero';
import { SortMenu, type SortOption } from '@/components/common/list/SortMenu';
import { SearchInput } from '@/components/common/list/SearchInput';
import { Pagination } from '@/components/common/list/Pagination';
import { PillTabs, type PillTab } from '@/components/common/list/PillTabs';
import FooterBottomBar from '@/components/common/footer/FooterBottomBar';
import { CERTIFICATES, type Certificate } from '@/config/learner';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cn } from '@/lib/utils/cn';
import {
  readVerifiedCerts,
  readVerifiedCertName,
} from '@/lib/utils/certStorage';
import { CertificateCard } from './_components/CertificateCard';

const PAGE_SIZE = 6;

type StatusFilter = 'all' | 'verify' | 'view';
type SortKey = 'recent' | 'title-az' | 'title-za' | 'status';

function sortCertificates(
  list: Certificate[],
  sort: SortKey,
  verifiedIds: string[],
): Certificate[] {
  if (sort === 'recent') return list;
  return [...list].sort((a, b) => {
    switch (sort) {
      case 'title-az':
        return a.fullTitle.localeCompare(b.fullTitle);
      case 'title-za':
        return b.fullTitle.localeCompare(a.fullTitle);
      case 'status': {
        // Unverified (still actionable) certificates first.
        const av = a.verified || verifiedIds.includes(a.id);
        const bv = b.verified || verifiedIds.includes(b.id);
        return Number(av) - Number(bv);
      }
      default:
        return 0;
    }
  });
}

export default function CertificatesPage() {
  const t = useLearnerCertificatesT();
  const { firstName, email } = useCurrentUser();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<SortKey>('recent');
  const [page, setPage] = useState(1);
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

  const filtered = CERTIFICATES.filter((c) => {
    const matchSearch =
      c.fullTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.certificateId.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;

    const isVerified = c.verified || verifiedIds.includes(c.id);
    if (statusFilter === 'verify') return !isVerified;
    if (statusFilter === 'view') return isVerified;
    return true;
  });

  const sorted = sortCertificates(filtered, sort, verifiedIds);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const verifiedCount = CERTIFICATES.filter(
    (c) => c.verified || verifiedIds.includes(c.id),
  ).length;

  const STATUS_TABS: PillTab<StatusFilter>[] = [
    { value: 'all', label: t('filterAll'), count: CERTIFICATES.length },
    {
      value: 'verify',
      label: t('filterVerify'),
      count: CERTIFICATES.length - verifiedCount,
    },
    { value: 'view', label: t('filterView'), count: verifiedCount },
  ];

  const SORT_OPTIONS: readonly SortOption<SortKey>[] = [
    { value: 'recent', label: t('sortRecent') },
    { value: 'title-az', label: t('sortTitleAz') },
    { value: 'title-za', label: t('sortTitleZa') },
    { value: 'status', label: t('sortStatus') },
  ];

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <TopBar
        role="learner"
        title={t('title')}
        subtitle={t('subtitle', { email })}
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <PageHero
          className="mb-6"
          title={t('heroTitle', { name: firstName })}
          description={t('heroDesc')}
        />

        <div className="space-y-6">
          {/* Toolbar: status tabs · count + sort + search */}
          <div
            className={cn(
              'flex flex-col gap-3 transition-all duration-500 ease-out sm:flex-row sm:items-center sm:justify-between',
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
            )}
          >
            {/* Status filter tabs */}
            <PillTabs
              tabs={STATUS_TABS}
              value={statusFilter}
              onChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
              ariaLabel={t('title')}
            />

            {/* Count · sort · search */}
            <div className="flex items-center gap-2">
              <span className="text-foreground shrink-0 text-sm font-bold">
                {t('resultCount', { count: sorted.length })}
              </span>
              <SortMenu
                options={SORT_OPTIONS}
                value={sort}
                onChange={(v) => {
                  setSort(v);
                  setPage(1);
                }}
                ariaLabel={t('sortAria')}
                defaultValue="recent"
              />
              <SearchInput
                value={search}
                onChange={(v) => {
                  setSearch(v);
                  setPage(1);
                }}
                placeholder={t('search')}
                ariaLabel={t('search')}
                className="w-full sm:w-64 lg:w-72"
              />
            </div>
          </div>

          {/* Certificate grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((cert, i) => (
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

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />

          {sorted.length === 0 && (
            <p
              className={cn(
                'text-muted-foreground py-12 text-center text-sm transition-all duration-500 ease-out',
                mounted ? 'opacity-100' : 'opacity-0',
              )}
            >
              {t('noResults')}
            </p>
          )}
        </div>
      </div>

      <FooterBottomBar theme="light" />
    </div>
  );
}
