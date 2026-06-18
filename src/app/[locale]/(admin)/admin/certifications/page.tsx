'use client';

import { useEffect, useState } from 'react';
import {
  BadgeCheck,
  Award,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Filter,
  Download,
  Link2,
  Clock,
  X,
  Printer,
  Share2,
  Copy,
} from 'lucide-react';
import { useAdminCertificationsT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import TopBar from '@/components/common/TopBar';
import { useToast } from '@/components/ui/toast';

type Tab = 'dashboard' | 'templates' | 'issuance';
type IssuanceStatus = 'Verify' | 'Pending';
type TemplateStatus = 'Active' | 'Draft';

type CertRecord = {
  id: string;
  recipient: string;
  course: string;
  issued: string;
};

const CERT_STATS_DATA = [
  {
    labelKey: 'statTotalIssued' as const,
    value: '12,450',
    change: '+9%',
    icon: Award,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    labelKey: 'statVerifiedClaims' as const,
    value: '8,920',
    change: '+14%',
    icon: BadgeCheck,
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    labelKey: 'statActiveTemplates' as const,
    value: '14',
    change: '+2',
    icon: FileText,
    color: 'bg-amber-500/10 text-amber-500',
  },
];

const RECENT_ISSUANCES: {
  id: string;
  user: string;
  course: string;
  issued: string;
  status: IssuanceStatus;
}[] = [
  {
    id: 'r1',
    user: 'Sarah Jenkins',
    course: 'Advanced Data Science',
    issued: 'May 12, 2026',
    status: 'Verify',
  },
  {
    id: 'r2',
    user: 'Michael Chang',
    course: 'Leadership in Tech',
    issued: 'May 11, 2026',
    status: 'Verify',
  },
  {
    id: 'r3',
    user: 'Elena Rodriguez',
    course: 'Cloud Architecture',
    issued: 'May 10, 2026',
    status: 'Pending',
  },
  {
    id: 'r4',
    user: 'David Smith',
    course: 'UI/UX Design Masterclass',
    issued: 'May 09, 2026',
    status: 'Verify',
  },
];

const ISSUANCE_STATUS_STYLE: Record<IssuanceStatus, string> = {
  Verify: 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  Pending: 'border border-amber-500/20 bg-amber-500/10 text-amber-500',
};

const VERIFICATION_OPS = [
  {
    label: 'Verify',
    count: 3,
    style: 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  },
  {
    label: 'Pending',
    count: 1,
    style: 'border border-amber-500/20 bg-amber-500/10 text-amber-500',
  },
  {
    label: 'Terminate',
    count: 0,
    style: 'border border-rose-500/20 bg-rose-500/10 text-rose-500',
  },
];

const CERT_TEMPLATES: {
  name: string;
  category: string;
  status: TemplateStatus;
  issued: number;
}[] = [
  {
    name: 'Corporate Bootcamp',
    category: 'Corporate',
    status: 'Draft',
    issued: 0,
  },
  {
    name: 'Technical Mastery',
    category: 'Specialized',
    status: 'Active',
    issued: 850,
  },
  {
    name: 'Executive Completion',
    category: 'Standard',
    status: 'Active',
    issued: 1240,
  },
];

const TEMPLATE_STATUS_STYLE: Record<TemplateStatus, string> = {
  Active: 'text-emerald-500',
  Draft: 'text-amber-500',
};

const ISSUANCE_HISTORY: CertRecord[] = [
  {
    id: 'CERT-99A81B',
    recipient: 'Sarah Jenkins',
    course: 'Advanced Data Science',
    issued: 'May 12, 2026',
  },
  {
    id: 'CERT-44B92C',
    recipient: 'Michael Chang',
    course: 'Leadership in Tech',
    issued: 'May 11, 2026',
  },
  {
    id: 'CERT-11X75Y',
    recipient: 'Elena Rodriguez',
    course: 'Cloud Architecture',
    issued: 'May 10, 2026',
  },
  {
    id: 'CERT-88M22P',
    recipient: 'David Smith',
    course: 'UI/UX Design Masterclass',
    issued: 'May 09, 2026',
  },
];

// ─── QR code mockup ───────────────────────────────────────────────────────────

function QRMockup() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 13 13"
      className="rounded border border-gray-200"
    >
      {/* Finder TL */}
      <rect x="0" y="0" width="4" height="4" fill="#0f2044" />
      <rect x="1" y="1" width="2" height="2" fill="white" />
      {/* Finder TR */}
      <rect x="9" y="0" width="4" height="4" fill="#0f2044" />
      <rect x="10" y="1" width="2" height="2" fill="white" />
      {/* Finder BL */}
      <rect x="0" y="9" width="4" height="4" fill="#0f2044" />
      <rect x="1" y="10" width="2" height="2" fill="white" />
      {/* Data modules */}
      <rect x="5" y="0" width="1" height="1" fill="#0f2044" />
      <rect x="7" y="1" width="1" height="1" fill="#0f2044" />
      <rect x="5" y="2" width="2" height="1" fill="#0f2044" />
      <rect x="5" y="4" width="3" height="1" fill="#0f2044" />
      <rect x="0" y="5" width="1" height="2" fill="#0f2044" />
      <rect x="3" y="5" width="1" height="1" fill="#0f2044" />
      <rect x="5" y="5" width="1" height="1" fill="#0f2044" />
      <rect x="8" y="5" width="1" height="1" fill="#0f2044" />
      <rect x="10" y="5" width="2" height="1" fill="#0f2044" />
      <rect x="4" y="7" width="2" height="1" fill="#0f2044" />
      <rect x="8" y="7" width="1" height="2" fill="#0f2044" />
      <rect x="5" y="9" width="1" height="2" fill="#0f2044" />
      <rect x="7" y="9" width="2" height="1" fill="#0f2044" />
      <rect x="11" y="9" width="2" height="2" fill="#0f2044" />
      <rect x="9" y="11" width="1" height="2" fill="#0f2044" />
    </svg>
  );
}

// ─── Certificate modal ────────────────────────────────────────────────────────

function CertificateModal({
  cert,
  onClose,
  onDownload,
  onCopyLink,
}: {
  cert: CertRecord;
  onClose: () => void;
  onDownload: () => void;
  onCopyLink: (url: string) => void;
}) {
  const verifyUrl = `http://127.0.0.1:5173/verify/${cert.id}`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="ring-border bg-card max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl shadow-2xl ring-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4">
          <div>
            <h2 className="text-foreground text-sm font-bold">
              Official certificate
            </h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Your verified credential is ready to download, print, or share.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-muted ml-4 shrink-0 rounded-lg p-1.5 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Certificate body — always white regardless of app theme */}
        <div
          className="mx-6 overflow-hidden rounded-xl"
          style={{ border: '1px solid #e5e7eb', backgroundColor: '#ffffff' }}
        >
          <div className="bg-white px-8 pt-7 pb-8">
            {/* Logo + QR row */}
            <div className="mb-8 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#dde3eb] bg-[#f0f4f8]">
                  <Award className="h-6 w-6 text-[#0f2044]" />
                </div>
                <div>
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: '#0f2044' }}
                  >
                    Content Learning Platform
                  </p>
                  <p
                    className="mt-0.5 text-[10px]"
                    style={{ color: '#6b7280' }}
                  >
                    Excellence in Education
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <QRMockup />
                <p
                  className="text-[9px] font-semibold tracking-wider uppercase"
                  style={{ color: '#6b7280' }}
                >
                  VERIFY: {cert.id.slice(-1)}
                </p>
              </div>
            </div>

            {/* Main text */}
            <div className="text-center">
              <h1
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: '#0f2044',
                  lineHeight: 1.2,
                }}
              >
                Certificate of Completion
              </h1>

              <p
                className="mt-3 text-[11px] font-bold tracking-widest uppercase"
                style={{ color: '#c9922b' }}
              >
                This Certifies That
              </p>

              <p
                className="mx-10 mt-4 border-b pb-3"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '1.875rem',
                  color: '#0f2044',
                  borderColor: '#d1d5db',
                }}
              >
                {cert.recipient}
              </p>

              <p
                className="mt-4 text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: '#6b7280' }}
              >
                Has Completed The Course
              </p>

              <p
                className="mt-2 text-lg font-bold"
                style={{ color: '#0f2044' }}
              >
                {cert.course}
              </p>
            </div>

            {/* Signature row */}
            <div className="mt-9 grid grid-cols-2 gap-8 px-2">
              <div
                className="border-t pt-2"
                style={{ borderColor: 'rgba(15, 32, 68, 0.2)' }}
              >
                <p className="text-sm" style={{ color: '#0f2044' }}>
                  {cert.issued}
                </p>
                <p
                  className="mt-0.5 text-[9px] font-semibold tracking-widest uppercase"
                  style={{ color: '#9ca3af' }}
                >
                  Date of Issue
                </p>
              </div>
              <div
                className="border-t pt-2 text-right"
                style={{ borderColor: 'rgba(15, 32, 68, 0.2)' }}
              >
                <p
                  className="text-[11px] font-medium"
                  style={{ color: '#0f2044' }}
                >
                  Dr. Angela Yu, Lead Instructor
                </p>
                <p
                  className="mt-0.5 text-[9px] font-semibold tracking-widest uppercase"
                  style={{ color: '#9ca3af' }}
                >
                  Lead Instructor
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Download / share section */}
        <div className="px-6 pt-4 pb-6">
          <p className="text-foreground text-sm font-bold">
            Download or share your certificate
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            These actions unlock after verification is submitted successfully.
          </p>

          {/* URL strip */}
          <div className="border-border bg-surface mt-3 flex items-center gap-2 rounded-lg border px-3 py-2.5">
            <span className="text-muted-foreground flex-1 truncate font-mono text-xs">
              {verifyUrl}
            </span>
            <button
              onClick={() => onCopyLink(verifyUrl)}
              className="text-foreground hover:text-brand-gold flex shrink-0 items-center gap-1.5 text-xs font-semibold transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy Link
            </button>
          </div>

          {/* Action buttons */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button
              onClick={onDownload}
              className="bg-brand-navy flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              <Download className="h-3.5 w-3.5" />
              Download Official PDF
            </button>
            <button
              onClick={() => window.print()}
              className="border-border text-foreground hover:bg-muted flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              Print Certificate
            </button>
            <button
              onClick={() => onCopyLink(verifyUrl)}
              className="border-border text-foreground hover:bg-muted flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-semibold transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Cert preview (templates tab) ────────────────────────────────────────────

function CertPreview({
  name,
  category,
  certOfCompletion,
  learnerName,
  courseTitle,
}: {
  name: string;
  category: string;
  certOfCompletion: string;
  learnerName: string;
  courseTitle: string;
}) {
  return (
    <div className="border-border bg-card flex flex-col rounded-xl border p-4 shadow">
      <div className="text-muted-foreground flex items-start justify-between text-[10px] font-bold tracking-wider uppercase">
        <span>CLP</span>
        <span>{category}</span>
      </div>
      <div className="mt-3 text-center">
        <p className="text-brand-gold text-[9px] font-bold tracking-widest uppercase">
          {certOfCompletion}
        </p>
        <p className="text-foreground mt-2 text-sm font-bold">{learnerName}</p>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          {courseTitle}
        </p>
      </div>
      <div className="mt-3 text-center">
        <p className="text-muted-foreground text-[10px] font-semibold">
          {name}
        </p>
      </div>
      <div className="text-muted-foreground mt-3 flex items-end justify-between text-[10px]">
        <span>Date</span>
        <span>Signature</span>
      </div>
    </div>
  );
}

// ─── Template card ────────────────────────────────────────────────────────────

function TemplateCard({
  tpl,
  onEdit,
  issuedTimesLabel,
  editTemplateLabel,
}: {
  tpl: (typeof CERT_TEMPLATES)[number];
  onEdit: (name: string) => void;
  issuedTimesLabel: string;
  editTemplateLabel: string;
}) {
  return (
    <div className="border-border bg-card hover:border-border/80 overflow-hidden rounded-xl border shadow transition-colors">
      <div className="bg-surface p-5">
        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10">
          <Award className="h-4 w-4 text-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="bg-muted h-2 w-full rounded-full" />
          <div className="bg-muted h-2 w-4/5 rounded-full" />
          <div className="h-2 w-3/5 rounded-full bg-blue-500/20" />
          <div className="bg-muted h-2 w-full rounded-full" />
          <div className="bg-muted h-2 w-2/3 rounded-full" />
        </div>
        <div className="bg-muted mt-3 h-1.5 w-1/3 rounded-full" />
      </div>
      <div className="border-border border-t px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-foreground text-sm font-bold">{tpl.name}</p>
          <span
            className={cn(
              'text-xs font-semibold',
              TEMPLATE_STATUS_STYLE[tpl.status],
            )}
          >
            {tpl.status}
          </span>
        </div>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          {tpl.category}
        </p>
        <p className="text-muted-foreground mt-1.5 flex items-center gap-1 text-[11px]">
          <FileText className="h-3 w-3" />
          {issuedTimesLabel}
        </p>
        <button
          onClick={() => onEdit(tpl.name)}
          className="border-border text-foreground hover:bg-muted mt-3 w-full rounded-lg border py-1.5 text-xs font-semibold transition-colors"
        >
          {editTemplateLabel}
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminCertificationsPage() {
  const t = useAdminCertificationsT();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [histSearch, setHistSearch] = useState('');
  const [viewCert, setViewCert] = useState<CertRecord | null>(null);
  const { toast } = useToast();

  const TABS: { key: Tab; label: string }[] = [
    { key: 'dashboard', label: t('tabDashboard') },
    { key: 'templates', label: t('tabTemplates') },
    { key: 'issuance', label: t('tabIssuance') },
  ];

  function handleDownload(id: string) {
    toast(`Certificate ${id} downloaded.`, 'success');
  }

  function handleCopyLink(url: string) {
    navigator.clipboard.writeText(url).then(
      () => toast(`Link copied: ${url}`, 'success'),
      () => toast('Could not copy link.', 'error'),
    );
  }

  function handleHistory(recipient: string) {
    toast(`Showing history for ${recipient}.`, 'info');
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
          onDownload={() => handleDownload(viewCert.id)}
          onCopyLink={handleCopyLink}
        />
      )}

      <TopBar role="admin" title={t('title')} subtitle={t('subtitle')} />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Tab bar + Create button */}
        <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="border-border bg-card flex gap-1 overflow-x-auto rounded-xl border p-1 shadow-sm">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  'shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                  tab === key
                    ? 'border-brand-gold/40 bg-brand-gold/5 text-brand-gold border'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => toast('Template creation coming soon.', 'info')}
            className="bg-brand-gold hover:bg-brand-gold-dark flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow transition-colors"
          >
            <Plus className="h-4 w-4" />
            {t('createTemplate')}
          </button>
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
                <button
                  onClick={() => setTab('issuance')}
                  className="border-border text-foreground hover:bg-muted mt-5 w-full rounded-lg border py-2 text-xs font-semibold transition-colors"
                >
                  {t('openIssuanceHistory')}
                </button>
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
                {CERT_TEMPLATES.map((tpl) => (
                  <div key={tpl.name} className="flex flex-col gap-3">
                    <CertPreview
                      name={tpl.name}
                      category={tpl.category}
                      certOfCompletion={t('certOfCompletion')}
                      learnerName={t('learnerName')}
                      courseTitle={t('courseTitle')}
                    />
                    <button
                      onClick={() =>
                        toast(
                          `Launching Canva Editor for "${tpl.name}"…`,
                          'info',
                        )
                      }
                      className="bg-brand-gold w-full rounded-lg py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    >
                      {t('openCanva')}
                    </button>
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
                {CERT_TEMPLATES.map((tpl) => (
                  <TemplateCard
                    key={tpl.name}
                    tpl={tpl}
                    onEdit={(name) =>
                      toast(`Opening editor for "${name}"…`, 'info')
                    }
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
                <button
                  onClick={() => toast('Filters coming soon.', 'info')}
                  className="border-border bg-surface text-foreground hover:bg-muted flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  <Filter className="h-3.5 w-3.5" />
                  {t('filter')}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border bg-surface border-b">
                    {(
                      [
                        { key: 'colCertId', isRight: false, hide: '' },
                        { key: 'colRecipient', isRight: false, hide: '' },
                        {
                          key: 'colCourse',
                          isRight: false,
                          hide: 'hidden sm:table-cell',
                        },
                        {
                          key: 'colIssueDate',
                          isRight: false,
                          hide: 'hidden md:table-cell',
                        },
                        { key: 'colActions', isRight: true, hide: '' },
                      ] as const
                    ).map(({ key, isRight, hide }) => (
                      <th
                        key={key}
                        className={cn(
                          'text-muted-foreground px-5 py-3.5 text-[11px] font-semibold tracking-wide whitespace-nowrap uppercase',
                          isRight ? 'text-right' : 'text-left',
                          hide,
                        )}
                      >
                        {t(key)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {ISSUANCE_HISTORY.filter((r) => {
                    if (!histSearch) return true;
                    const s = histSearch.toLowerCase();
                    return (
                      r.recipient.toLowerCase().includes(s) ||
                      r.course.toLowerCase().includes(s) ||
                      r.id.toLowerCase().includes(s)
                    );
                  }).map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <span className="text-muted-foreground font-mono text-xs whitespace-nowrap">
                          {row.id}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => setViewCert(row)}
                          className="text-foreground text-left text-sm font-semibold whitespace-nowrap underline-offset-2 hover:text-teal-500 hover:underline"
                        >
                          {row.recipient}
                        </button>
                      </td>
                      <td className="text-muted-foreground hidden px-5 py-4 sm:table-cell">
                        {row.course}
                      </td>
                      <td className="text-muted-foreground hidden px-5 py-4 whitespace-nowrap md:table-cell">
                        {row.issued}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          <button
                            aria-label={t('downloadAriaLabel')}
                            onClick={() => handleDownload(row.id)}
                            className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label={t('copyLinkAriaLabel')}
                            onClick={() =>
                              handleCopyLink(
                                `http://127.0.0.1:5173/verify/${row.id}`,
                              )
                            }
                            className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                          >
                            <Link2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label={t('historyAriaLabel')}
                            onClick={() => handleHistory(row.recipient)}
                            className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                          >
                            <Clock className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
