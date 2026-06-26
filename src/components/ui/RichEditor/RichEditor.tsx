'use client';

import type { CSSProperties } from 'react';
import { EditorContent } from '@tiptap/react';

import { cn } from '@/lib/utils/cn';
import { CharacterCounter } from './CharacterCounter';
import { Toolbar } from './Toolbar';
import { useRichEditor } from './useRichEditor';
import { DEFAULT_MAX_HEIGHT, DEFAULT_MIN_HEIGHT } from './constants';
import type { RichEditorProps } from './types';

export function RichEditor({
  value,
  onChange,
  placeholder = '',
  minHeight = DEFAULT_MIN_HEIGHT,
  maxHeight = DEFAULT_MAX_HEIGHT,
  className,
}: RichEditorProps) {
  const editor = useRichEditor({ value, onChange, placeholder });

  const scrollStyle = {
    '--re-min-h': `${minHeight}px`,
    maxHeight: `${maxHeight}px`,
  } as CSSProperties;

  return (
    <div
      className={cn(
        'group animate-fade-in border-border/50 bg-background focus-within:ring-brand-accent/30 overflow-hidden rounded-lg border transition focus-within:ring-2',
        className,
      )}
    >
      <Toolbar editor={editor} />
      <div className="overflow-y-auto" style={scrollStyle}>
        <EditorContent editor={editor} />
      </div>
      <CharacterCounter editor={editor} />
    </div>
  );
}

export default RichEditor;
