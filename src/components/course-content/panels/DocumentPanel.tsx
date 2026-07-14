import { Clock } from 'lucide-react';
import { RichContentViewer } from '@/components/ui/RichEditor/RichContentViewer';
import { legacyDocumentToRichDoc } from '@/lib/utils/richDoc';
import type { DocumentItem } from '@/app/[locale]/(educator)/educator/courses/[id]/_lib/content';
import { ContentHeader } from './ContentHeader';

/** One continuous, Word/Docs-style document — real headings, bold, italic,
 *  lists — instead of separate boxed intro/objectives/sections/takeaways
 *  cards. Renders `item.content` (Tiptap JSON) when present; falls back to
 *  converting the legacy plain-string shape so the existing course catalog
 *  doesn't need rewriting. */
export function DocumentPanel({ item }: { item: DocumentItem }) {
  const content = item.content ?? legacyDocumentToRichDoc(item);

  return (
    <div className="border-border bg-card overflow-hidden rounded-2xl border">
      <ContentHeader
        kindLabel="Document"
        title={item.title}
        meta={
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Clock className="h-3.5 w-3.5" />
            {item.readTime}
          </span>
        }
      />
      <div className="px-6 py-6">
        {/* Keyed by item id: Tiptap's `useEditor` only applies `content` at
            creation, so without a key change, navigating straight from one
            document to another would keep showing the previous one. */}
        <RichContentViewer key={item.id} content={content} />
      </div>
    </div>
  );
}
