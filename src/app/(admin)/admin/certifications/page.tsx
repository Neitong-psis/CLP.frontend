'use client';

import { useState } from 'react';
import {
  BadgeCheck,
  Award,
  FileText,
  ArrowUpRight,
  Plus,
  Search,
  Filter,
  Download,
  Link2,
  Clock,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import TopBar from '@/components/common/TopBar';

type Tab = 'dashboard' | 'templates' | 'issuance';
type IssuanceStatus = 'Verify' | 'Pending';
type TemplateStatus = 'Active' | 'Draft';

const CERT_STATS = [
  {
    label: 'Total Issued Certificates',
    value: '12,450',
    change: '+9%',
    icon: Award,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Verified Claims',
    value: '8,920',
    change: '+14%',
    icon: BadgeCheck,
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    label: 'Active Templates',
    value: '14',
    change: '+2',
    icon: FileText,
    color: 'bg-amber-100 text-amber-600',
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
  Verify: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Pending: 'border border-amber-200 bg-amber-50 text-amber-600',
};

const VERIFICATION_OPS = [
  {
    label: 'Verify',
    count: 3,
    style: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  },
  {
    label: 'Pending',
    count: 1,
    style: 'border border-amber-200 bg-amber-50 text-amber-600',
  },
  {
    label: 'Terminate',
    count: 0,
    style: 'border border-rose-200 bg-rose-50 text-rose-600',
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
  Active: 'text-emerald-600',
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

function CertPreview() {
  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow">
      <div className="flex items-start justify-between text-[10px] font-bold tracking-wider text-slate-400 uppercase">
        <span>CLP</span>
        <span>Standard</span>
      </div>
      <div className="mt-3 text-center">
        <p className="text-brand-gold text-[9px] font-bold tracking-widest uppercase">
          Certificate of Completion
        </p>
        <p className="mt-2 text-sm font-bold text-slate-900">Learner Name</p>
        <p className="mt-0.5 text-[11px] text-slate-500">Course Title</p>
      </div>
      <div className="mt-4 flex items-end justify-between text-[10px] text-slate-400">
        <span>Date</span>
        <span>Signature</span>
      </div>
    </div>
  );
}

function TemplateCard({ tpl }: { tpl: (typeof CERT_TEMPLATES)[number] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow">
      <div className="bg-slate-50 p-5">
        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
          <Award className="h-4 w-4 text-blue-500" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-slate-200" />
          <div className="h-2 w-4/5 rounded-full bg-slate-200" />
          <div className="h-2 w-3/5 rounded-full bg-blue-200" />
          <div className="h-2 w-full rounded-full bg-slate-200" />
          <div className="h-2 w-2/3 rounded-full bg-slate-200" />
        </div>
        <div className="mt-3 h-1.5 w-1/3 rounded-full bg-slate-200" />
      </div>
      <div className="border-t border-slate-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-900">{tpl.name}</p>
          <span
            className={cn(
              'text-xs font-semibold',
              TEMPLATE_STATUS_STYLE[tpl.status],
            )}
          >
            {tpl.status}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] text-slate-400">{tpl.category}</p>
        <p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-400">
          <FileText className="h-3 w-3" />
          Issued {tpl.issued.toLocaleString()} times
        </p>
      </div>
    </div>
  );
}

export default function AdminCertificationsPage() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [histSearch, setHistSearch] = useState('');

  const TABS: { key: Tab; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'templates', label: 'Templates' },
    { key: 'issuance', label: 'Issuance History' },
  ];

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
          <div className="flex gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                  tab === key
                    ? 'border-brand-gold/40 bg-brand-gold/5 text-brand-gold border'
                    : 'text-slate-500 hover:text-slate-700',
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <button className="bg-brand-gold hover:bg-brand-gold-dark flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow transition-colors">
            <Plus className="h-4 w-4" />
            Create Template
          </button>
        </div>

        {/* Dashboard tab */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {CERT_STATS.map(({ label, value, change, icon: Icon, color }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow"
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
                    <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                      <ArrowUpRight className="h-3 w-3" />
                      {change}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500">{label}</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              {/* Recent Issuances */}
              <div className="rounded-xl border border-slate-200 bg-white shadow">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Recent Issuances
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Latest certificates generated for completed courses.
                  </p>
                </div>
                <ul className="divide-y divide-slate-100">
                  {RECENT_ISSUANCES.map((cert) => (
                    <li
                      key={cert.id}
                      className="flex items-center gap-3 px-5 py-3.5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50">
                        <Award className="text-brand-gold h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-teal-600">
                          {cert.user}
                        </p>
                        <p className="truncate text-[11px] text-slate-400">
                          {cert.course}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <p className="text-[11px] text-slate-400">
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
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow">
                <h3 className="text-sm font-bold text-slate-900">
                  Verification Operations
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
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
                      <span className="text-sm font-bold text-slate-900">
                        {count}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setTab('issuance')}
                  className="mt-5 w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
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
              <h3 className="text-base font-bold text-slate-900">
                Template Preview
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                Executive Completion
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <CertPreview />
                    <button className="bg-brand-gold w-full rounded-lg py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90">
                      Open Canva Editor
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Certificate Templates
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                Preview, edit, and route templates to Canva.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {CERT_TEMPLATES.map((tpl) => (
                  <TemplateCard key={tpl.name} tpl={tpl} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Issuance History tab */}
        {tab === 'issuance' && (
          <div className="rounded-xl border border-slate-200 bg-white shadow">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Issuance History
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Search and filter generated learner credentials.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search student, course, or ID..."
                    value={histSearch}
                    onChange={(e) => setHistSearch(e.target.value)}
                    className="focus:border-brand-gold/50 focus:ring-brand-gold/10 h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pr-3 pl-9 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2"
                  />
                </div>
                <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
                  <Filter className="h-3.5 w-3.5" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
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
                          'px-5 py-3.5 text-[11px] font-semibold tracking-wide text-slate-400 uppercase',
                          h === 'ACTIONS' ? 'text-right' : 'text-left',
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
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
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-slate-400">
                          {row.id}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {row.recipient}
                      </td>
                      <td className="px-5 py-4 text-slate-500">{row.course}</td>
                      <td className="px-5 py-4 text-slate-500">{row.issued}</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          <button
                            aria-label="Download"
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label="Copy link"
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                          >
                            <Link2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            aria-label="History"
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
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
