'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import TopBar from '@/components/common/TopBar';
import { useToast } from '@/components/ui/toast';

type Tab = 'dashboard' | 'templates' | 'issuance';
type IssuanceStatus = 'Verify' | 'Pending';
type TemplateStatus = 'Active' | 'Draft';

const CERT_STATS = [
  {
    label: 'Total Issued Certificates',
    value: '12,450',
    change: '+9%',
    icon: Award,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    label: 'Verified Claims',
    value: '8,920',
    change: '+14%',
    icon: BadgeCheck,
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    label: 'Active Templates',
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

const ISSUANCE_HISTORY = [
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

function CertPreview({ name, category }: { name: string; category: string }) {
  return (
    <div className="border-border bg-card flex flex-col rounded-xl border p-4 shadow">
      <div className="text-muted-foreground flex items-start justify-between text-[10px] font-bold tracking-wider uppercase">
        <span>CLP</span>
        <span>{category}</span>
      </div>
      <div className="mt-3 text-center">
        <p className="text-brand-gold text-[9px] font-bold tracking-widest uppercase">
          Certificate of Completion
        </p>
        <p className="text-foreground mt-2 text-sm font-bold">Learner Name</p>
        <p className="text-muted-foreground mt-0.5 text-[11px]">Course Title</p>
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

function TemplateCard({
  tpl,
  onEdit,
}: {
  tpl: (typeof CERT_TEMPLATES)[number];
  onEdit: (name: string) => void;
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
          Issued {tpl.issued.toLocaleString()} times
        </p>
        <button
          onClick={() => onEdit(tpl.name)}
          className="border-border text-foreground hover:bg-muted mt-3 w-full rounded-lg border py-1.5 text-xs font-semibold transition-colors"
        >
          Edit Template
        </button>
      </div>
    </div>
  );
}

export default function AdminCertificationsPage() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [histSearch, setHistSearch] = useState('');
  const { toast } = useToast();

  const TABS: { key: Tab; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'templates', label: 'Templates' },
    { key: 'issuance', label: 'Issuance History' },
  ];

  function handleDownload(id: string) {
    toast(`Certificate ${id} downloaded.`, 'success');
  }

  function handleCopyLink(id: string) {
    const url = `https://clp.app/verify/${id}`;
    navigator.clipboard.writeText(url).then(
      () => toast(`Link copied: ${url}`, 'success'),
      () => toast('Could not copy link.', 'error'),
    );
  }

  function handleHistory(recipient: string) {
    toast(`Showing history for ${recipient}.`, 'info');
  }

  return (
    <div className="flex min-h-full flex-col">
      <TopBar
        role="admin"
        title="Certification Center"
        subtitle="Live workspace synced for admin@clp.com"
      />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Tab bar + Create button */}
        <div className="mb-6 flex items-center justify-between">
          <div className="border-border bg-card flex gap-1 rounded-xl border p-1 shadow-sm">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
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
            Create Template
          </button>
        </div>

        {/* Dashboard tab */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {CERT_STATS.map(({ label, value, change, icon: Icon, color }) => {
                const isNegative = change.startsWith('-');
                const ChangeIcon = isNegative ? ArrowDownRight : ArrowUpRight;
                return (
                  <div
                    key={label}
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
                      {label}
                    </p>
                    <p className="text-foreground mt-1 text-2xl font-bold">
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              {/* Recent Issuances */}
              <div className="border-border bg-card rounded-xl border shadow-sm">
                <div className="border-border border-b px-5 py-4">
                  <h3 className="text-foreground text-sm font-bold">
                    Recent Issuances
                  </h3>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    Latest certificates generated for completed courses.
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
                        <p className="truncate text-sm font-semibold text-teal-500">
                          {cert.user}
                        </p>
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
                  Verification Operations
                </h3>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  Credential lifecycle totals from issuance history.
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
                  Open Issuance History
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
                Template Preview
              </h3>
              <p className="text-muted-foreground mt-0.5 text-sm">
                Preview each template design before publishing.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {CERT_TEMPLATES.map((tpl) => (
                  <div key={tpl.name} className="flex flex-col gap-3">
                    <CertPreview name={tpl.name} category={tpl.category} />
                    <button
                      onClick={() =>
                        toast(
                          `Launching Canva Editor for "${tpl.name}"…`,
                          'info',
                        )
                      }
                      className="bg-brand-gold w-full rounded-lg py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                    >
                      Open Canva Editor
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-foreground text-base font-bold">
                Certificate Templates
              </h3>
              <p className="text-muted-foreground mt-0.5 text-sm">
                Preview, edit, and route templates to Canva.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {CERT_TEMPLATES.map((tpl) => (
                  <TemplateCard
                    key={tpl.name}
                    tpl={tpl}
                    onEdit={(name) =>
                      toast(`Opening editor for "${name}"…`, 'info')
                    }
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
                  Issuance History
                </h3>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  Search and filter generated learner credentials.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <input
                    type="search"
                    placeholder="Search student, course, or ID..."
                    value={histSearch}
                    onChange={(e) => setHistSearch(e.target.value)}
                    className="focus:border-brand-gold/50 focus:ring-brand-gold/10 border-border bg-surface text-foreground placeholder:text-muted-foreground h-9 w-64 rounded-lg border pr-3 pl-9 text-sm outline-none focus:ring-2"
                  />
                </div>
                <button
                  onClick={() => toast('Filters coming soon.', 'info')}
                  className="border-border bg-surface text-foreground hover:bg-muted flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-border bg-surface border-b">
                    {(
                      [
                        'CERTIFICATE ID',
                        'RECIPIENT',
                        'COURSE/PROGRAM',
                        'ISSUE DATE',
                        'ACTIONS',
                      ] as const
                    ).map((h) => (
                      <th
                        key={h}
                        className={cn(
                          'text-muted-foreground px-5 py-3.5 text-[11px] font-semibold tracking-wide uppercase',
                          h === 'ACTIONS' ? 'text-right' : 'text-left',
                        )}
                      >
                        {h}
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
                        <span className="text-muted-foreground font-mono text-xs">
                          {row.id}
                        </span>
                      </td>
                      <td className="text-foreground px-5 py-4 font-semibold">
                        {row.recipient}
                      </td>
                      <td className="text-muted-foreground px-5 py-4">
                        {row.course}
                      </td>
                      <td className="text-muted-foreground px-5 py-4">
                        {row.issued}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          <button
                            aria-label="Download"
                            onClick={() => handleDownload(row.id)}
                            className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label="Copy link"
                            onClick={() => handleCopyLink(row.id)}
                            className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded-lg transition-colors"
                          >
                            <Link2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label="History"
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
