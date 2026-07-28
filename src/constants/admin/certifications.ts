import { Award, BadgeCheck, FileText } from 'lucide-react';

export type IssuanceStatus = 'Verify' | 'Pending';
export type TemplateStatus = 'Active' | 'Draft';

export const CERT_STATS = [
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

export const RECENT_ISSUANCES: {
  id: string;
  user: string;
  course: string;
  issued: string;
  status: IssuanceStatus;
}[] = [
  {
    id: 'r1',
    user: 'Sarah Jenkins',
    course: 'Advanced Khmer Literature',
    issued: 'May 12, 2026',
    status: 'Verify',
  },
  {
    id: 'r2',
    user: 'Michael Chang',
    course: 'Leadership in Practice',
    issued: 'May 11, 2026',
    status: 'Verify',
  },
  {
    id: 'r3',
    user: 'Elena Rodriguez',
    course: 'Leadership Development Certification',
    issued: 'May 10, 2026',
    status: 'Pending',
  },
  {
    id: 'r4',
    user: 'David Smith',
    course: 'Innovative Learning Masterclass',
    issued: 'May 09, 2026',
    status: 'Verify',
  },
];

export const ISSUANCE_STATUS_STYLE: Record<IssuanceStatus, string> = {
  Verify: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Pending: 'border border-amber-200 bg-amber-50 text-amber-600',
};

export const VERIFICATION_OPS = [
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

export const CERT_TEMPLATES: {
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

export const TEMPLATE_STATUS_STYLE: Record<TemplateStatus, string> = {
  Active: 'text-emerald-600',
  Draft: 'text-amber-500',
};

export const ISSUANCE_HISTORY = [
  {
    id: 'CERT-99A81B',
    recipient: 'Sarah Jenkins',
    course: 'Advanced Khmer Literature',
    issued: 'May 12, 2026',
  },
  {
    id: 'CERT-44B92C',
    recipient: 'Michael Chang',
    course: 'Leadership in Practice',
    issued: 'May 11, 2026',
  },
  {
    id: 'CERT-11X75Y',
    recipient: 'Elena Rodriguez',
    course: 'Leadership Development Certification',
    issued: 'May 10, 2026',
  },
  {
    id: 'CERT-88M22P',
    recipient: 'David Smith',
    course: 'Innovative Learning Masterclass',
    issued: 'May 09, 2026',
  },
];
