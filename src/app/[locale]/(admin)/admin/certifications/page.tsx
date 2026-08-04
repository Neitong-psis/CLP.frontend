'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Download,
  Link2,
  Upload,
  ExternalLink,
} from 'lucide-react';
import { useAdminCertificationsT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import TopBar from '@/components/common/TopBar';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { SortableTh } from '@/components/common/table/SortableTh';
import { useColumnSort } from '@/hooks/useColumnSort';
import { parseDateLoose } from '@/lib/utils/sort';
import { exportCertificateToPdf } from '@/lib/utils/certificatePdf';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  type Tab,
  type CertRecord,
  type CertTemplate,
  DEFAULT_INSTRUCTOR,
  CERT_STATS_DATA,
  RECENT_ISSUANCES,
  ISSUANCE_STATUS_STYLE,
  VERIFICATION_OPS,
  CERT_TEMPLATES,
  ISSUANCE_HISTORY,
} from './_lib/data';
import { CertificateModal } from './_components/CertificateModal';
import { CertPreview } from './_components/CertPreview';
import { TemplateCard } from './_components/TemplateCard';
import { UploadTemplateModal } from './_components/UploadTemplateModal';
import { CanvaTemplateModal } from './_components/CanvaTemplateModal';

export default function AdminCertificationsPage() {
  const t = useAdminCertificationsT();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [histSearch, setHistSearch] = useState('');
  const {
    sortKey: histSortKey,
    sortDir: histSortDir,
    toggleSort: toggleHistSort,
  } = useColumnSort<'recipient' | 'course' | 'issued'>();
  const [viewCert, setViewCert] = useState<CertRecord | null>(null);
  const [templates, setTemplates] = useState<CertTemplate[]>(CERT_TEMPLATES);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [canvaModal, setCanvaModal] = useState<{
    mode: 'link' | 'create';
    template?: CertTemplate;
  } | null>(null);
  const { toast } = useToast();

  // Uploaded thumbnails are blob: object URLs — release them when the page
  // unmounts. A ref (not `templates` in the deps array) keeps the cleanup
  // pointed at the latest list instead of a stale first-render snapshot.
  const templatesRef = useRef(templates);
  useEffect(() => {
    templatesRef.current = templates;
  }, [templates]);
  useEffect(() => {
    return () => {
      templatesRef.current.forEach((tpl) => {
        if (tpl.thumbnailUrl) URL.revokeObjectURL(tpl.thumbnailUrl);
      });
    };
  }, []);

  function handleCreateTemplate(template: CertTemplate) {
    setTemplates((prev) => [template, ...prev]);
  }

  function handleOpenCanvaEditor(tpl: CertTemplate) {
    if (tpl.canvaUrl) {
      window.open(tpl.canvaUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setCanvaModal({ mode: 'link', template: tpl });
  }

  function handleSaveCanvaLink(input: {
    url: string;
    name?: string;
    category?: string;
  }) {
    if (canvaModal?.mode === 'create') {
      const newTpl: CertTemplate = {
        name: input.name || 'Untitled template',
        category: input.category || 'Custom',
        status: 'Draft',
        issued: 0,
        canvaUrl: input.url,
      };
      setTemplates((prev) => [newTpl, ...prev]);
      toast(t('canvaTemplateCreated', { name: newTpl.name }), 'success');
    } else if (canvaModal?.template) {
      const targetName = canvaModal.template.name;
      setTemplates((prev) =>
        prev.map((tpl) =>
          tpl.name === targetName ? { ...tpl, canvaUrl: input.url } : tpl,
        ),
      );
      toast(t('canvaLinkSaved', { name: targetName }), 'success');
    }
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'dashboard', label: t('tabDashboard') },
    { key: 'templates', label: t('tabTemplates') },
    { key: 'issuance', label: t('tabIssuance') },
  ];

  function handleDownload(cert: CertRecord) {
    exportCertificateToPdf({
      learnerName: cert.recipient,
      courseTitle: cert.course,
      completedDate: cert.issued,
      instructor: DEFAULT_INSTRUCTOR,
      certificateId: cert.id,
      verifyUrl: `${window.location.origin}/verify/${cert.id}`,
    });
    toast(`Certificate ${cert.id} downloaded.`, 'success');
  }

  function handleCopyLink(url: string) {
    navigator.clipboard.writeText(url).then(
      () => toast(`Link copied: ${url}`, 'success'),
      () => toast('Could not copy link.', 'error'),
    );
  }

  function handleShare(url: string) {
    if (navigator.share) {
      navigator.share({ title: 'Official certificate', url }).catch(() => {});
    } else {
      handleCopyLink(url);
    }
  }

  function openCertFromRecent(cert: (typeof RECENT_ISSUANCES)[number]) {
    const record = ISSUANCE_HISTORY.find((h) => h.recipient === cert.user) ?? {
      id: cert.id.toUpperCase(),
      recipient: cert.user,
      course: cert.course,
      issued: cert.issued,
    };
    setViewCert(record);
  }

  return (
    <div className="flex min-h-full flex-col">
      {viewCert && (
        <CertificateModal
          cert={viewCert}
          onClose={() => setViewCert(null)}
          onDownload={() => handleDownload(viewCert)}
          onCopyLink={handleCopyLink}
          onShare={handleShare}
        />
      )}
      {uploadOpen && (
        <UploadTemplateModal
          onClose={() => setUploadOpen(false)}
          onCreate={handleCreateTemplate}
        />
      )}
      {canvaModal && (
        <CanvaTemplateModal
          mode={canvaModal.mode}
          templateName={canvaModal.template?.name}
          onClose={() => setCanvaModal(null)}
          onSave={handleSaveCanvaLink}
        />
      )}

      <TopBar role="admin" title={t('title')} />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Tab bar + Create button */}
        <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="border-border bg-card scrollbar-none flex gap-1 overflow-x-auto rounded-xl border p-1 shadow-sm">
            {TABS.map(({ key, label }) => (
              <Button
                key={key}
                variant="ghost"
                onClick={() => setTab(key)}
                className={cn(
                  'h-auto shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                  tab === key
                    ? 'border-brand-gold/40 bg-brand-gold/5 text-brand-gold border'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </Button>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-auto gap-2 rounded-xl px-5 py-2.5 shadow">
                <Plus className="h-4 w-4" />
                {t('createTemplate')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent theme="light" align="end">
              <DropdownMenuItem
                theme="light"
                onSelect={() => setUploadOpen(true)}
              >
                <Upload className="h-4 w-4" />
                {t('uploadFile')}
              </DropdownMenuItem>
              <DropdownMenuItem
                theme="light"
                onSelect={() => setCanvaModal({ mode: 'create' })}
              >
                <ExternalLink className="h-4 w-4" />
                {t('designInCanva')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Dashboard tab */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {CERT_STATS_DATA.map(
                ({ labelKey, value, change, icon: Icon, color }) => {
                  const isNegative = change.startsWith('-');
                  const ChangeIcon = isNegative ? ArrowDownRight : ArrowUpRight;
                  return (
                    <div
                      key={labelKey}
                      className="border-border bg-card hover:border-border/60 rounded-xl border p-5 shadow-sm transition-colors"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-full',
                            color,
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={cn(
                            'flex items-center gap-0.5 text-[11px] font-semibold',
                            isNegative ? 'text-rose-500' : 'text-emerald-500',
                          )}
                        >
                          <ChangeIcon className="h-3 w-3" />
                          {change}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs font-medium">
                        {t(labelKey)}
                      </p>
                      <p className="text-foreground mt-1 text-2xl font-bold">
                        {value}
                      </p>
                    </div>
                  );
                },
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              {/* Recent Issuances */}
              <div className="border-border bg-card rounded-xl border shadow-sm">
                <div className="border-border border-b px-5 py-4">
                  <h3 className="text-foreground text-sm font-bold">
                    {t('recentIssuances')}
                  </h3>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    {t('recentSubtitle')}
                  </p>
                </div>
                <ul className="divide-border divide-y">
                  {RECENT_ISSUANCES.map((cert) => (
                    <li
                      key={cert.id}
                      className="hover:bg-muted/50 flex items-center gap-3 px-5 py-3.5 transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                        <Award className="text-brand-gold h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => openCertFromRecent(cert)}
                          className="block w-full text-left"
                        >
                          <p className="truncate text-sm font-semibold text-teal-500 underline-offset-2 hover:underline">
                            {cert.user}
                          </p>
                        </button>
                        <p className="text-muted-foreground truncate text-[11px]">
                          {cert.course}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <p className="text-muted-foreground text-[11px]">
                          {cert.issued}
                        </p>
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                            ISSUANCE_STATUS_STYLE[cert.status],
                          )}
                        >
                          {cert.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verification Operations */}
              <div className="border-border bg-card rounded-xl border p-5 shadow-sm">
                <h3 className="text-foreground text-sm font-bold">
                  {t('verificationOps')}
                </h3>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {t('verificationSubtitle')}
                </p>
                <ul className="mt-5 space-y-3">
                  {VERIFICATION_OPS.map(({ label, count, style }) => (
                    <li
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 text-xs font-semibold',
                          style,
                        )}
                      >
                        {label}
                      </span>
                      <span className="text-foreground text-sm font-bold">
                        {count}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="ghost"
                  onClick={() => setTab('issuance')}
                  className="border-border text-foreground hover:bg-muted mt-5 h-auto w-full rounded-lg border py-2 text-xs font-semibold transition-colors"
                >
                  {t('openIssuanceHistory')}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Templates tab */}
        {tab === 'templates' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-foreground text-base font-bold">
                {t('templatePreview')}
              </h3>
              <p className="text-muted-foreground mt-0.5 text-sm">
                {t('templatePreviewSubtitle')}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {templates.map((tpl) => (
                  <div key={tpl.name} className="flex flex-col gap-3">
                    <CertPreview
                      name={tpl.name}
                      category={tpl.category}
                      certOfCompletion={t('certOfCompletion')}
                      learnerName={t('learnerName')}
                      courseTitle={t('courseTitle')}
                      thumbnailUrl={tpl.thumbnailUrl}
                    />
                    <Button
                      variant="ghost"
                      onClick={() => handleOpenCanvaEditor(tpl)}
                      className="bg-brand-gold h-auto w-full rounded-lg py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    >
                      {t('openCanva')}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-foreground text-base font-bold">
                {t('certTemplates')}
              </h3>
              <p className="text-muted-foreground mt-0.5 text-sm">
                {t('certTemplatesSubtitle')}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {templates.map((tpl) => (
                  <TemplateCard
                    key={tpl.name}
                    tpl={tpl}
                    onEdit={handleOpenCanvaEditor}
                    issuedTimesLabel={t('issuedTimes', {
                      count: tpl.issued.toLocaleString(),
                    })}
                    editTemplateLabel={t('editTemplate')}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Issuance History tab */}
        {tab === 'issuance' && (
          <div className="border-border bg-card rounded-xl border shadow-sm">
            <div className="border-border flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-foreground text-base font-bold">
                  {t('issuanceHistory')}
                </h3>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {t('issuanceSubtitle')}
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <input
                    type="search"
                    placeholder={t('searchPlaceholder')}
                    value={histSearch}
                    onChange={(e) => setHistSearch(e.target.value)}
                    className="focus:border-brand-gold/50 focus:ring-brand-gold/10 border-border bg-surface text-foreground placeholder:text-muted-foreground h-9 w-full rounded-lg border pr-3 pl-9 text-sm outline-none focus:ring-2 sm:w-56"
                  />
                </div>
              </div>
            </div>

            <div className="scrollbar-none overflow-x-auto">
              <Table className="min-w-180">
                <TableHeader>
                  <TableRow className="border-border bg-surface border-b">
                    <TableHead>{t('colCertId')}</TableHead>
                    <SortableTh
                      label={t('colRecipient')}
                      active={histSortKey === 'recipient'}
                      direction={histSortDir}
                      onClick={() => toggleHistSort('recipient')}
                    />
                    <SortableTh
                      label={t('colCourse')}
                      active={histSortKey === 'course'}
                      direction={histSortDir}
                      onClick={() => toggleHistSort('course')}
                    />
                    <SortableTh
                      label={t('colIssueDate')}
                      active={histSortKey === 'issued'}
                      direction={histSortDir}
                      onClick={() => toggleHistSort('issued')}
                    />
                    <TableHead className="text-right">
                      {t('colActions')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ISSUANCE_HISTORY.filter((r) => {
                    if (!histSearch) return true;
                    const s = histSearch.toLowerCase();
                    return (
                      r.recipient.toLowerCase().includes(s) ||
                      r.course.toLowerCase().includes(s) ||
                      r.id.toLowerCase().includes(s)
                    );
                  })
                    .sort((a, b) => {
                      if (!histSortKey) return 0;
                      const cmp =
                        histSortKey === 'recipient'
                          ? a.recipient.localeCompare(b.recipient)
                          : histSortKey === 'course'
                            ? a.course.localeCompare(b.course)
                            : parseDateLoose(a.issued) -
                              parseDateLoose(b.issued);
                      return histSortDir === 'asc' ? cmp : -cmp;
                    })
                    .map((row) => (
                      <TableRow
                        key={row.id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>
                          <span className="text-muted-foreground font-mono text-xs whitespace-nowrap">
                            {row.id}
                          </span>
                        </TableCell>
                        <TableCell>
                          <button
                            type="button"
                            onClick={() => setViewCert(row)}
                            className="text-foreground text-left text-sm font-semibold whitespace-nowrap underline-offset-2 hover:text-teal-500 hover:underline"
                          >
                            {row.recipient}
                          </button>
                        </TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">
                          {row.course}
                        </TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">
                          {row.issued}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              aria-label={t('downloadAriaLabel')}
                              onClick={() => handleDownload(row)}
                              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-xs"
                              aria-label={t('copyLinkAriaLabel')}
                              onClick={() =>
                                handleCopyLink(
                                  `${window.location.origin}/verify/${row.id}`,
                                )
                              }
                              className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg"
                            >
                              <Link2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
