'use client';

import {
  ChevronDown,
  FileText,
  Play,
  ClipboardList,
  ClipboardCheck,
  Layers,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import {
  REVIEW_STATUS_STYLE,
  lessonCount,
  type ReviewItem,
  type ReviewItemKind,
  type ReviewModule,
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
  const moduleCount = modules.length;
  const lessons = modules.reduce((sum, m) => sum + lessonCount(m), 0);
  const progressPct =
    totalCount === 0 ? 0 : Math.round((reviewedCount / totalCount) * 100);

  return (
    <aside className="flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white xl:w-80">
      {/* Course summary */}
      <div className="border-b border-slate-100 px-5 py-4">
        <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
          Course Content
        </p>
        <h2 className="mt-1 text-sm leading-snug font-bold text-slate-900">
          {courseTitle}
        </h2>

        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            <Layers className="h-3 w-3" /> {moduleCount} Modules
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
            <BookOpen className="h-3 w-3" /> {lessons} Lessons
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
            {reviewedCount} of {totalCount} items reviewed
          </p>
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 overflow-y-auto">
        {modules.map((module) => {
          const isOpen = expandedModules.has(module.id);
          return (
            <div key={module.id} className="border-b border-slate-100">
              <button
                onClick={() => onToggleModule(module.id)}
                className="flex w-full items-start justify-between gap-2 px-5 py-3.5 text-left transition-colors hover:bg-slate-50"
                aria-expanded={isOpen}
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900">
                    {module.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    {lessonCount(module)} lessons created by educator
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    'mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <div className="pb-2">
                  <ItemGroup
                    label="Text/Image Lessons"
                    items={module.documents}
                    activeItemId={activeItemId}
                    onSelect={onSelect}
                  />
                  <ItemGroup
                    label="Video Lessons"
                    items={module.videos}
                    activeItemId={activeItemId}
                    onSelect={onSelect}
                  />
                  <ItemGroup
                    label="Quiz"
                    items={module.quizzes}
                    activeItemId={activeItemId}
                    onSelect={onSelect}
                  />
                  <ItemGroup
                    label="Assignment"
                    items={module.assignments}
                    activeItemId={activeItemId}
                    onSelect={onSelect}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function ItemGroup({
  label,
  items,
  activeItemId,
  onSelect,
}: {
  label: string;
  items: ReviewItem[];
  activeItemId: string;
  onSelect: (id: string) => void;
}) {
  if (items.length === 0) return null;

  return (
    <div className="mt-1">
      <p className="px-5 py-1.5 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
        {label}
      </p>
      <ul>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            isActive={item.id === activeItemId}
            onSelect={() => onSelect(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function ItemRow({
  item,
  isActive,
  onSelect,
}: {
  item: ReviewItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = KIND_ICON[item.kind];
  const status =
    item.kind === 'quiz' || item.kind === 'assignment' ? item.status : null;

  return (
    <li>
      <button
        onClick={onSelect}
        className={cn(
          'flex w-full items-center gap-2.5 px-5 py-2 text-left transition-colors',
          isActive
            ? 'bg-brand-gold/10 border-brand-gold border-l-2'
            : 'border-l-2 border-transparent hover:bg-slate-50',
        )}
      >
        <Icon
          className={cn(
            'h-3.5 w-3.5 shrink-0',
            isActive ? 'text-brand-gold' : 'text-slate-400',
          )}
        />
        <span
          className={cn(
            'min-w-0 flex-1 truncate text-xs font-medium',
            isActive ? 'text-brand-navy' : 'text-slate-600',
          )}
        >
          {item.title}
        </span>
        {status && (
          <span
            className={cn(
              'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold',
              REVIEW_STATUS_STYLE[status],
            )}
          >
            {status}
          </span>
        )}
      </button>
    </li>
  );
}
