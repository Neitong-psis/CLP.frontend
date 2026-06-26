import { useEffect, useMemo, useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import type { Editor, JSONContent } from '@tiptap/react';
import type { EditorView } from '@tiptap/pm/view';

import { buildExtensions } from './extensions';
import { insertImageFiles } from './media';

interface UseRichEditorParams {
  value: string;
  onChange: (json: string) => void;
  placeholder: string;
}

const EDITOR_ATTRIBUTES = {
  class: 'rich-editor-content',
  spellcheck: 'true',
};

/** Parses stored value into Tiptap content, tolerating legacy plain text. */
function parseContent(value: string): JSONContent | string {
  if (!value) return '';
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? (parsed as JSONContent) : '';
  } catch {
    // Legacy plain-text section content → wrap in a paragraph (no data loss).
    return {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: value }] },
      ],
    };
  }
}

/** Embeds any image files from a clipboard/drag event as base64 nodes. */
function handleImageEvent(
  editor: Editor,
  files: FileList | null | undefined,
  event: ClipboardEvent | DragEvent,
): boolean {
  const images = Array.from(files ?? []).filter((file) =>
    file.type.startsWith('image/'),
  );
  if (images.length === 0) return false;
  event.preventDefault();
  insertImageFiles(editor, images);
  return true;
}

/**
 * Wraps `useEditor` with a stable onChange, legacy-tolerant parsing,
 * clipboard/drag image embedding, and guarded external value sync (so our own
 * emitted updates never loop back through `setContent`).
 */
export function useRichEditor({
  value,
  onChange,
  placeholder,
}: UseRichEditorParams): Editor | null {
  const onChangeRef = useRef(onChange);
  const lastEmitted = useRef<string>(value);
  const [initialContent] = useState<JSONContent | string>(() =>
    parseContent(value),
  );
  const extensions = useMemo(() => buildExtensions(placeholder), [placeholder]);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: initialContent,
    editorProps: { attributes: EDITOR_ATTRIBUTES },
    onUpdate: ({ editor }) => {
      const json = JSON.stringify(editor.getJSON());
      lastEmitted.current = json;
      onChangeRef.current(json);
    },
  });

  // Attach clipboard/drag image handlers once the editor exists (closing over
  // the real instance keeps refs out of the render path).
  useEffect(() => {
    if (!editor) return;
    editor.setOptions({
      editorProps: {
        attributes: EDITOR_ATTRIBUTES,
        handlePaste: (_view: EditorView, event: ClipboardEvent) =>
          handleImageEvent(editor, event.clipboardData?.files, event),
        handleDrop: (_view: EditorView, event: DragEvent) =>
          handleImageEvent(editor, event.dataTransfer?.files, event),
      },
    });
  }, [editor]);

  // Apply genuinely external value changes; ignore our own echoed updates.
  useEffect(() => {
    if (!editor || value === lastEmitted.current) return;
    lastEmitted.current = value;
    editor.commands.setContent(parseContent(value), { emitUpdate: false });
  }, [value, editor]);

  return editor;
}
