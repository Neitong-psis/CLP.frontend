export const COURSE_STATUS_STYLE: Record<string, string> = {
  Public: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  Pending: 'border border-amber-200 bg-amber-50 text-amber-600',
  Archive: 'border border-slate-200 bg-slate-50 text-slate-500',
  'In writing': 'border border-blue-200 bg-blue-50 text-blue-600',
  Achieved: 'border border-slate-200 bg-slate-50 text-slate-500',
};

export const CATEGORY_STYLE: Record<string, string> = {
  'Khmer Literature': 'border border-blue-200 bg-blue-50 text-blue-600',
  'Child Development': 'border border-teal-200 bg-teal-50 text-teal-600',
  Leadership: 'border border-emerald-200 bg-emerald-50 text-emerald-600',
  'Leadership Development':
    'border border-orange-200 bg-orange-50 text-orange-600',
  'Innovative Learning':
    'border border-violet-200 bg-violet-50 text-violet-600',
};

export const ALL_CATEGORIES = [
  'Khmer Literature',
  'Leadership',
  'Child Development',
  'Leadership Development',
  'Innovative Learning',
];

export const ALL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
