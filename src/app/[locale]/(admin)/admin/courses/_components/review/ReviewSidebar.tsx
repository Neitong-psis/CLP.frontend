'use client';

import {
  ChevronDown,
  FileText,
  Play,
  ClipboardList,
  ClipboardCheck,
  Layers,
  BookOpen,
  Check,
  Clock,
  Lock,
} from 'lucide-react';
import { useAdminReviewOverlayT } from '@/i18n';
import { cn } from '@/lib/utils/cn';
import {
  lessonCount,
  type ReviewItem,
  type ReviewModule,
  type ReviewItemKind,
} from '../../_lib/review';

interface ReviewSidebarProps {
  courseTitle: string;
  modules: ReviewModule[];
  activeItemId: string;
  reviewedCount: number;
  totalCount: number;
  expandedModules: Set<string>;
  onToggleModule: (id: string) => void;
  onSelect: (id: string) => void;
}

const KIND_ICON: Record<ReviewItemKind, typeof Play> = {
  document: FileText,
  video: Play,
  quiz: ClipboardList,
  assignment: ClipboardCheck,
};

export function ReviewSidebar({
  courseTitle,
  modules,
  activeItemId,
  reviewedCount,
  totalCount,
  expandedModules,
  onToggleModule,
  onSelect,
}: ReviewSidebarProps) {
  const t = useAdminReviewOverlayT();
  const moduleCount = modules.length;
  const lessons = modules.reduce((sum, m) => sum + lessonCount(m), 0);
  const progressPct =
    totalCount === 0 ? 0 : Math.round((reviewedCount / totalCount) * 100);

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white xl:w-80">
      {/* Course summary */}
      <div className="border-b border-slate-100 px-5 py-4">
        <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
          {t('courseContent')}
        </p>
        <h2 className="mt-1 text-sm leading-snug font-bold text-slate-900">
          {courseTitle}
        </h2>

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            <Layers className="h-3 w-3" />{' '}
            {t('modules', { count: moduleCount })}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            <BookOpen className="h-3 w-3" /> {t('lessons', { count: lessons })}
          </span>
        </div>

        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="bg-brand-gold h-full rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-slate-400">
            {t('itemsReviewed', { reviewed: reviewedCount, total: totalCount })}
          </p>
        </div>
      </div>

      {/* Modules — tree */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {modules.map((module) => (
          <ModuleTree
            key={module.id}
            module={module}
            isOpen={expandedModules.has(module.id)}
            activeItemId={activeItemId}
            onToggle={() => onToggleModule(module.id)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </aside>
  );
}

// ── ModuleTree (module → items, 2-level) ──────────────────────────────────────

function ModuleTree({
  module,
  isOpen,
  activeItemId,
  onToggle,
  onSelect,
}: {
  module: ReviewModule;
  isOpen: boolean;
  activeItemId: string;
  onToggle: () => void;
  onSelect: (id: string) => void;
}) {
  const items: ReviewItem[] = [
    ...module.documents,
    ...module.videos,
    ...module.quizzes,
    ...module.assignments,
  ];

  return (
    <div className="py-0.5">
      {/* Module row */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-slate-50"
      >
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
        <span className="bg-brand-gold/20 flex size-7 shrink-0 items-center justify-center rounded-full">
          <Layers className="text-brand-gold size-3.5" />
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-900">
          {module.title}
        </span>
      </button>

      {/* Items — animated tree */}
      {items.length > 0 && (
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-200 ease-in-out',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <div className="relative ml-[18px] border-l border-slate-200 pb-1 pl-5">
              {items.map((item) => (
                <AdminTreeItemRow
                  key={item.id}
                  item={item}
                  isActive={item.id === activeItemId}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── AdminTreeItemRow — icon + status overlay ──────────────────────────────────

function AdminTreeItemRow({
  item,
  isActive,
  onSelect,
}: {
  item: ReviewItem;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const Icon = KIND_ICON[item.kind];
  const status = item.kind === 'video' ? null : item.status;

  return (
    <div className="relative py-0.5">
      {/* Horizontal branch connector */}
      <div className="absolute top-[16px] -left-5 h-px w-4 bg-slate-200" />

      <button
        onClick={() => onSelect(item.id)}
        className={cn(
          'flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors',
          isActive ? 'bg-brand-gold/10' : 'hover:bg-slate-50',
        )}
      >
        {/* Icon with status overlay */}
        <div className="relative shrink-0">
          <Icon
            className={cn(
              'size-4',
              isActive ? 'text-brand-gold' : 'text-brand-gold/70',
            )}
          />
          {status && (
            <span className="absolute -top-1.5 -right-1.5">
              {status === 'Ready' && (
                <Check className="size-2.5 text-emerald-500" strokeWidth={3} />
              )}
              {status === 'Submitted' && (
                <Clock className="size-2.5 text-blue-500" />
              )}
              {status === 'Locked' && (
                <Lock className="size-2.5 text-slate-400" />
              )}
            </span>
          )}
        </div>

        <span
          className={cn(
            'min-w-0 flex-1 truncate text-xs font-medium',
            isActive ? 'text-brand-navy font-semibold' : 'text-slate-600',
          )}
        >
          {item.title}
        </span>
      </button>
    </div>
  );
}
