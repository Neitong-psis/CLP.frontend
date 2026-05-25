import { BadgeCheck, ArrowUpRight } from 'lucide-react';
import AdminTopBar from '@/components/pages/admin/AdminTopBar';

const CERT_STATS = [
  { label: 'Total Issued', value: '12,450', change: '+14%' },
  { label: 'Verified Claims', value: '8,920', change: '+14%' },
  { label: 'Active Templates', value: '14', change: '+6%' },
  { label: 'Pending Review', value: '38', change: '-2%' },
];

const RECENT_CERTS = [
  {
    user: 'Alex Johnson',
    course: 'Complete Python Bootcamp',
    issued: 'May 22, 2026',
    id: 'CLP-20260522-001',
  },
  {
    user: 'Sopheaktra Meng',
    course: 'Machine Learning A-Z',
    issued: 'May 21, 2026',
    id: 'CLP-20260521-002',
  },
  {
    user: 'John Doe',
    course: 'The Complete JavaScript Course',
    issued: 'May 20, 2026',
    id: 'CLP-20260520-003',
  },
  {
    user: 'Alex Johnson',
    course: 'React – The Complete Guide',
    issued: 'May 18, 2026',
    id: 'CLP-20260518-004',
  },
  {
    user: 'Jane Smith',
    course: 'AWS Certified Solutions Architect',
    issued: 'May 17, 2026',
    id: 'CLP-20260517-005',
  },
];

export default function AdminCertificationsPage() {
  return (
    <div className="flex min-h-full flex-col">
      <AdminTopBar
        title="Certifications"
        subtitle="Manage certificates, templates, and verified claims"
      />

      <div className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {CERT_STATS.map(({ label, value, change }) => (
            <div
              key={label}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                <BadgeCheck className="h-4 w-4" />
              </div>
              <p className="text-[11px] text-white/40">{label}</p>
              <p className="mt-0.5 text-xl font-bold text-white">{value}</p>
              <p className="mt-1 flex items-center gap-0.5 text-[11px] font-semibold text-emerald-400">
                <ArrowUpRight className="h-3 w-3" />
                {change}
              </p>
            </div>
          ))}
        </div>

        {/* Recent certificates table */}
        <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03]">
          <div className="border-b border-white/[0.07] px-5 py-4">
            <h3 className="text-sm font-bold text-white">
              Recently Issued Certificates
            </h3>
            <p className="mt-0.5 text-[11px] text-white/35">
              Certificates issued in the last 30 days
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {['Recipient', 'Course', 'Issued', 'Certificate ID'].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-[11px] font-semibold tracking-wide text-white/35 uppercase"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {RECENT_CERTS.map((cert) => (
                  <tr
                    key={cert.id}
                    className="border-b border-white/[0.04] transition hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 font-medium text-white">
                      {cert.user}
                    </td>
                    <td className="px-5 py-3.5 text-white/55">{cert.course}</td>
                    <td className="px-5 py-3.5 text-white/35">{cert.issued}</td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-white/50">
                        {cert.id}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
