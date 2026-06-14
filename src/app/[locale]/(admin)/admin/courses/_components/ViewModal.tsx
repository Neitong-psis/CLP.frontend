import { Pencil, Star, Users, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { AdminCourseRow } from '@/constants/admin';
import { Button } from '@/components/ui/button/Button';
import { Modal } from './Modal';
import { STATUS_STYLE, CATEGORY_STYLE } from '../_lib/constants';

interface ViewModalProps {
  course: AdminCourseRow;
  onClose: () => void;
  onEdit: () => void;
}

export function ViewModal({ course, onClose, onEdit }: ViewModalProps) {
  return (
    <Modal
      title="Course Details"
      onClose={onClose}
      footer={
        <>
          <Button
            variant="ghost"
            className="border-border text-foreground hover:bg-muted rounded-xl border px-5"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="secondary"
            className="rounded-xl px-5"
            onClick={onEdit}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit course
          </Button>
        </>
      }
    >
      <div className="mb-4 flex items-center gap-2">
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
            STATUS_STYLE[course.status],
          )}
        >
          {course.status}
        </span>
        <span
          className={cn(
            'rounded-full px-2.5 py-0.5 text-[11px] font-semibold',
            CATEGORY_STYLE[course.category] ??
              'border-border bg-muted text-muted-foreground border',
          )}
        >
          {course.category}
        </span>
      </div>

      <p className="text-foreground text-sm leading-snug font-bold">
        {course.title}
      </p>
      <p className="text-muted-foreground mt-0.5 text-xs">
        {course.instructor}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          {
            label: 'Enrollments',
            value: course.enrolled.toLocaleString(),
            icon: <Users className="text-muted-foreground h-4 w-4" />,
          },
          {
            label: 'Rating',
            value: course.rating > 0 ? course.rating.toFixed(1) : '—',
            icon: <Star className="h-4 w-4 fill-amber-400 text-amber-400" />,
          },
          {
            label: 'Level',
            value: course.level,
            icon: <BarChart2 className="text-muted-foreground h-4 w-4" />,
          },
        ].map(({ label, value, icon }) => (
          <div
            key={label}
            className="border-border bg-surface flex flex-col items-center gap-1 rounded-xl border py-3"
          >
            {icon}
            <p className="text-foreground text-sm font-bold">{value}</p>
            <span className="text-muted-foreground text-[11px] font-medium">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="divide-border border-border mt-4 divide-y rounded-xl border">
        {[
          ['Educator', course.instructor],
          ['Category', course.category],
          ['Created', course.createdAt],
        ].map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="text-muted-foreground text-xs font-semibold">
              {label}
            </span>
            <span className="text-foreground text-xs font-medium">{value}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}
