'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/react';
import { cn } from '@/lib/utils/cn';
import { buildExtensions } from './extensions';

interface RichContentViewerProps {
  /** Tiptap document content — the same shape `RichEditor` emits from
   *  `editor.getJSON()`, just rendered read-only here. */
  content: JSONContent;
  className?: string;
}

/**
 * Read-only renderer for Tiptap content. Shares the same extension set and
 * `.rich-editor-content` typography as the authoring `RichEditor`, so
 * headings/bold/italic/lists/etc. render identically — but carries none of
 * its editing chrome (toolbar, character counter, onChange wiring).
 */
export function RichContentViewer({
  content,
  className,
}: RichContentViewerProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: buildExtensions(''),
    content,
    editorProps: { attributes: { class: 'rich-editor-content' } },
  });

  return (
    <EditorContent editor={editor} className={cn('cursor-text', className)} />
  );
}
