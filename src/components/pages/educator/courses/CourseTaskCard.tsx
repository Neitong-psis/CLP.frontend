'use client';

import React from 'react';
import {
  Users,
  DollarSign,
  Star,
  Clock,
  Sparkles,
  Code2,
  Server,
  BarChart3,
  Palette,
  Terminal,
  Database,
  ShieldCheck,
  Cloud,
  Layers,
  Megaphone,
  GraduationCap,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { EducatorTask } from '@/constants/educator/tasks';
import { TaskDetailsButton } from './TaskDetailsButton';
import { EditTaskButton } from './EditTaskButton';
import { DeleteTaskButton } from './DeleteTaskButton';
import { ReviewTaskButton } from './ReviewTaskButton';

interface CourseTaskCardProps {
  task: EducatorTask;
  onViewDetails?: (task: EducatorTask) => void;
}

// ── Thumbnail — category-tinted placeholder (no real cover art yet) ─────────

const CATEGORY_THUMB: Record<string, { icon: LucideIcon; cls: string }> = {
  AI: {
    icon: Sparkles,
    cls: 'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  },
  'Web Dev': {
    icon: Code2,
    cls: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
  },
  DevOps: {
    icon: Server,
    cls: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400',
  },
  'Data Science': {
    icon: BarChart3,
    cls: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  },
  Design: {
    icon: Palette,
    cls: 'bg-pink-500/15 text-pink-600 dark:text-pink-400',
  },
  Programming: {
    icon: Terminal,
    cls: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400',
  },
  Databases: {
    icon: Database,
    cls: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  },
  Security: {
    icon: ShieldCheck,
    cls: 'bg-red-500/15 text-red-600 dark:text-red-400',
  },
  Cloud: { icon: Cloud, cls: 'bg-sky-500/15 text-sky-600 dark:text-sky-400' },
  Product: {
    icon: Layers,
    cls: 'bg-orange-500/15 text-orange-600 dark:text-orange-400',
  },
  Marketing: {
    icon: Megaphone,
    cls: 'bg-teal-500/15 text-teal-600 dark:text-teal-400',
  },
  Teaching: { icon: GraduationCap, cls: 'bg-brand-gold/15 text-brand-gold' },
};

const DEFAULT_THUMB = {
  icon: BookOpen,
  cls: 'bg-brand-gold/15 text-brand-gold',
};

function getThumb(category: string) {
  return CATEGORY_THUMB[category] ?? DEFAULT_THUMB;
}

const getPriorityBadgeStyle = (priority: string) => {
  switch (priority) {
    case 'High':
      return 'border-red-400/30 bg-red-500/10 text-red-600 dark:text-red-400';
    case 'Medium':
      return 'border-amber-400/30 bg-amber-500/10 text-amber-600 dark:text-amber-400';
    case 'Low':
      return 'border-blue-400/30 bg-blue-500/10 text-blue-600 dark:text-blue-400';
    default:
      return 'border-border bg-muted text-muted-foreground';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'todo':
      return 'To Do';
    case 'writing':
      return 'In Writing';
    case 'review':
      return 'Under Review';
    case 'published':
      return 'Published';
    case 'archived':
      return 'Archived';
    default:
      return status;
  }
};

const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'writing':
      return 'border-blue-400/30 bg-blue-500/10 text-blue-600 dark:text-blue-400';
    case 'review':
      return 'border-amber-400/30 bg-amber-500/10 text-amber-600 dark:text-amber-400';
    case 'published':
      return 'border-emerald-400/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
    case 'todo':
    case 'archived':
    default:
      return 'border-border bg-muted text-muted-foreground';
  }
};

export function CourseTaskCard({ task, onViewDetails }: CourseTaskCardProps) {
  const statusLabel = getStatusLabel(task.status);
  const thumb = getThumb(task.category);
  const ThumbIcon = thumb.icon;

  const renderActions = (isMobile?: boolean) => {
    const btnClass = isMobile ? 'w-full' : '';
    switch (task.status) {
      case 'todo':
        return (
          <TaskDetailsButton
            onClick={() => onViewDetails?.(task)}
            className={btnClass}
          />
        );
      case 'writing':
      case 'archived':
        return (
          <div
            className={
              isMobile
                ? 'flex w-full items-center gap-2'
                : 'flex items-center gap-2'
            }
          >
            <EditTaskButton
              onClick={() => console.log('Editing task:', task.id)}
              className={isMobile ? 'flex-1' : ''}
            />
            <DeleteTaskButton
              onClick={() => console.log('Deleting task:', task.id)}
              className={isMobile ? 'flex-1' : ''}
            />
          </div>
        );
      case 'review':
        return (
          <ReviewTaskButton
            onClick={() => console.log('Reviewing task:', task.id)}
            className={btnClass}
          />
        );
      case 'published':
      default:
        return null;
    }
  };

  const renderDetailsStrip = () => {
    switch (task.status) {
      case 'todo':
        return (
          <div className="border-border bg-muted/40 flex flex-col gap-2 rounded-lg border p-2.5 text-xs sm:flex-row sm:items-center sm:gap-3">
            <div className="flex shrink-0 flex-wrap gap-1.5">
              {task.priority && task.priority !== 'None' && (
                <span
                  className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${getPriorityBadgeStyle(task.priority)}`}
                >
                  Priority: {task.priority}
                </span>
              )}
              {task.type && (
                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold text-blue-600 dark:text-blue-400">
                  {task.type}
                </span>
              )}
              {task.dueDate && (
                <span className="border-border bg-muted text-muted-foreground rounded-full border px-2 py-0.5 text-[9px] font-bold">
                  Due {task.dueDate}
                </span>
              )}
            </div>
            {task.notes && (
              <span className="text-muted-foreground text-xs leading-none font-semibold">
                {task.notes}
              </span>
            )}
          </div>
        );
      case 'writing':
        return (
          <div className="border-border bg-muted/40 text-muted-foreground rounded-lg border p-2.5 text-xs font-medium">
            <span className="text-foreground font-bold">Draft:</span>{' '}
            {task.notes
              ? task.notes.replace(/^Draft:\s*/, '')
              : 'no students, revenue, completion, or progress tracking until Admin publishes the course. Auto-save ready.'}
          </div>
        );
      case 'review':
        return (
          <div className="border-border bg-muted/40 text-muted-foreground rounded-lg border p-2.5 text-xs font-medium">
            <span className="text-foreground font-bold">Review:</span>{' '}
            {task.notes
              ? task.notes.replace(/^Review:\s*/, '')
              : 'submitted. Admin feedback: No revision notes yet.'}
          </div>
        );
      case 'published':
        return (
          <div className="border-border bg-muted/40 text-muted-foreground flex flex-row flex-wrap items-center gap-4 rounded-lg border p-2.5 text-xs font-medium sm:gap-6">
            <div className="flex items-center gap-1.5">
              <Users className="text-muted-foreground/70 size-3.5" />
              <span>{task.students || '0'} students</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="size-3.5 text-emerald-500" />
              <span>{task.revenue || '$0'} revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="size-3.5 fill-amber-500 text-amber-500" />
              <span>{task.rating || '0.0'} rating</span>
            </div>
            <div className="text-muted-foreground/70 flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>{task.updatedAt || 'Updated recently'}</span>
            </div>
          </div>
        );
      case 'archived':
        return (
          <div className="border-border bg-muted/40 text-muted-foreground rounded-lg border p-2.5 text-xs font-medium">
            <span className="text-foreground font-bold">Archived:</span>{' '}
            {task.notes
              ? task.notes.replace(/^Archived:\s*/, '')
              : 'no price, public visibility, or progress tracking. Content remains editable for future resubmission.'}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border-border bg-card hover:border-brand-gold/30 flex flex-col gap-4 rounded-2xl border p-5 transition-colors sm:flex-row sm:items-start">
      {/* Category-tinted thumbnail — stands in for real cover art */}
      <div
        className={cn(
          'flex size-16 shrink-0 items-center justify-center rounded-2xl sm:size-20',
          thumb.cls,
        )}
      >
        <ThumbIcon className="size-7 sm:size-8" />
      </div>

      {/* Main content area */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {/* Row 1: Title and Status Badge */}
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-foreground text-sm leading-snug font-bold sm:text-base">
            {task.title}
          </h4>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadgeStyle(task.status)}`}
          >
            {statusLabel}
          </span>
        </div>

        {/* Row 2: Description (subtitle) */}
        <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed">
          {task.description}
        </p>

        {/* Row 3: Primary tags, assignment metadata, and action buttons (inline on desktop) */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-foreground/80 flex flex-wrap items-center gap-2 text-[10px] font-semibold">
            <span className="bg-muted rounded px-2 py-0.5">
              {task.category}
            </span>
            {task.price && (
              <span className="bg-muted rounded px-2 py-0.5">{task.price}</span>
            )}
            <span className="text-muted-foreground ml-1 font-medium">
              {task.status === 'todo' ? (
                <>
                  Assigned by{' '}
                  <span className="text-foreground/80 font-semibold">
                    {task.assignedBy}
                  </span>
                </>
              ) : (
                <span className="text-foreground/80 font-semibold">
                  {task.assignedBy}
                </span>
              )}
            </span>
          </div>

          {/* Desktop action buttons */}
          <div className="hidden items-center gap-2 sm:flex">
            {renderActions()}
          </div>
        </div>

        {/* Row 4: Details strip bottom line */}
        {renderDetailsStrip()}

        {/* Mobile action buttons (rendered at bottom of card content) */}
        {task.status !== 'published' && (
          <div className="mt-1.5 flex w-full sm:hidden">
            {renderActions(true)}
          </div>
        )}
      </div>
    </div>
  );
}
