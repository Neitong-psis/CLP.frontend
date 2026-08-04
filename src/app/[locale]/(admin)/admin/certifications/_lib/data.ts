import { BadgeCheck, Award, FileText } from 'lucide-react';

export const CANVA_URL_PATTERN = /^https:\/\/(www\.)?canva\.com\//i;

export type Tab = 'dashboard' | 'templates' | 'issuance';
export type IssuanceStatus = 'Verify' | 'Pending';
export type TemplateStatus = 'Active' | 'Draft';

export type CertRecord = {
  id: string;
  recipient: string;
  course: string;
  issued: string;
};

/** This admin view has no per-record instructor in its mock data — the
 *  on-screen certificate and the downloaded PDF share this one value so
 *  they can't silently drift apart. */
export const DEFAULT_INSTRUCTOR = 'Dr. Sopheak Chan';

export const CERT_STATS_DATA = [
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
  Verify: 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500',
  Pending: 'border border-amber-500/20 bg-amber-500/10 text-amber-500',
};

export const VERIFICATION_OPS = [
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

export interface CertTemplate {
  name: string;
  category: string;
  status: TemplateStatus;
  issued: number;
  /** Set when the template was created from an uploaded image — renders as
   *  the card's real preview instead of the placeholder mockup. */
  thumbnailUrl?: string;
  /** Set when the uploaded file wasn't an image (e.g. a PDF) — there's no
   *  thumbnail to show, but the card can still name the attached file. */
  fileName?: string;
  /** Canva design link for this template. When present, "Open Canva
   *  Editor" / "Edit Template" jump straight to it; otherwise they prompt
   *  the admin to link one. */
  canvaUrl?: string;
}

export const CERT_TEMPLATES: CertTemplate[] = [
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
  Active: 'text-emerald-500',
  Draft: 'text-amber-500',
};

export const ISSUANCE_HISTORY: CertRecord[] = [
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
