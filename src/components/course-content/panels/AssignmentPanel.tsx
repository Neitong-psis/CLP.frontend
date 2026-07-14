import type { ReactNode } from 'react';
import { CalendarDays } from 'lucide-react';
import { RichContentViewer } from '@/components/ui/RichEditor/RichContentViewer';
import { assignmentToRichDoc } from '@/lib/utils/richDoc';
import type { AssignmentItem } from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import { ContentHeader } from './ContentHeader';
import type { PanelRole } from './types';

interface AssignmentPanelProps {
  item: AssignmentItem;
  role: PanelRole;
  /** Learner only — the file upload/drop-zone UI, owned by the caller since
   *  it's learner-specific submission state. Admin/educator can't submit an
   *  assignment at all, so this never renders for `role="review"`. */
  submissionSlot?: ReactNode;
}

/** Instructions and Requirements merge into one document body — same visual
 *  treatment as the Document content type — instead of two separate boxed
 *  sections. */
export function AssignmentPanel({
  item,
  role,
  submissionSlot,
}: AssignmentPanelProps) {
  const content = assignmentToRichDoc(item);

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <ContentHeader
        kindLabel="Assignment"
        title={item.title}
        meta={
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <CalendarDays className="h-3.5 w-3.5" />
            Due {item.dueDate}
          </span>
        }
      />

      <div className="space-y-5 px-6 py-6">
        {/* Meta row */}
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Lesson', value: item.forLesson },
            { label: 'Due date', value: `Due ${item.dueDate}` },
            { label: 'Submission', value: item.submission },
          ].map(({ label, value }) => (
            <div key={label} className="border-border rounded-xl border p-4">
              <p className="text-muted-foreground text-xs">{label}</p>
              <p className="text-foreground mt-1 text-sm font-semibold">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Instructions + Requirements — one document body. Keyed by item id
            since Tiptap's `useEditor` only applies `content` at creation. */}
        <div className="border-border rounded-xl border">
          <RichContentViewer key={item.id} content={content} />
        </div>

        {/* Submission — learner only */}
        {role === 'learner' && submissionSlot}
      </div>
    </div>
  );
}
