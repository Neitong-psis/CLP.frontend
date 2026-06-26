'use client';

import { useEditorState } from '@tiptap/react';
import type { Editor } from '@tiptap/react';

interface CharacterCountStorage {
  characters: () => number;
}

/** Subtle live character count shown in the editor footer. */
export function CharacterCounter({ editor }: { editor: Editor | null }) {
  const characters = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return 0;
      const storage = editor.storage.characterCount as
        | CharacterCountStorage
        | undefined;
      return storage?.characters() ?? 0;
    },
  });

  return (
    <div className="text-muted-foreground/70 border-border/40 border-t px-3 py-1 text-right text-[10px] tabular-nums">
      {characters ?? 0} chars
    </div>
  );
}
