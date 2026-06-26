'use client';

import { useCallback, useRef } from 'react';
import type { ComponentType } from 'react';
import { useEditorState } from '@tiptap/react';
import type { Editor } from '@tiptap/react';
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListChecks,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  SquareCode,
  Strikethrough,
  Table2,
  Underline,
  Undo2,
} from 'lucide-react';

import { ColorPopover } from './ColorPopover';
import { FontFamilySelect } from './FontFamilySelect';
import { ToolbarButton } from './ToolbarButton';
import { insertImageFiles } from './media';
import {
  HIGHLIGHT_COLORS,
  TEXT_COLORS,
  TOOLBAR_LABELS as L,
} from './constants';

interface ToolbarItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  run: () => void;
}

function Divider() {
  return (
    <span aria-hidden className="bg-border/70 mx-0.5 h-5 w-px self-center" />
  );
}

export function Toolbar({ editor }: { editor: Editor | null }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const state = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;
      const { color, fontFamily } = editor.getAttributes('textStyle');
      return {
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        underline: editor.isActive('underline'),
        strike: editor.isActive('strike'),
        code: editor.isActive('code'),
        highlight: editor.isActive('highlight'),
        hasColor: typeof color === 'string',
        paragraph: editor.isActive('paragraph'),
        heading1: editor.isActive('heading', { level: 1 }),
        heading2: editor.isActive('heading', { level: 2 }),
        heading3: editor.isActive('heading', { level: 3 }),
        blockquote: editor.isActive('blockquote'),
        codeBlock: editor.isActive('codeBlock'),
        bulletList: editor.isActive('bulletList'),
        orderedList: editor.isActive('orderedList'),
        taskList: editor.isActive('taskList'),
        alignLeft: editor.isActive({ textAlign: 'left' }),
        alignCenter: editor.isActive({ textAlign: 'center' }),
        alignRight: editor.isActive({ textAlign: 'right' }),
        alignJustify: editor.isActive({ textAlign: 'justify' }),
        link: editor.isActive('link'),
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
        fontFamily: typeof fontFamily === 'string' ? fontFamily : '',
      };
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const url = window.prompt(`${L.link} URL`)?.trim();
    if (url) editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  const onFilesPicked = useCallback(
    (files: FileList | null) => {
      if (editor && files) insertImageFiles(editor, Array.from(files));
    },
    [editor],
  );

  if (!editor || !state) {
    return <div className="border-border/50 h-10 border-b" aria-hidden />;
  }

  const chain = () => editor.chain().focus();

  const blocks: ToolbarItem[] = [
    {
      icon: Pilcrow,
      label: L.paragraph,
      isActive: state.paragraph,
      run: () => chain().setParagraph().run(),
    },
    {
      icon: Heading1,
      label: L.heading1,
      isActive: state.heading1,
      run: () => chain().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: Heading2,
      label: L.heading2,
      isActive: state.heading2,
      run: () => chain().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: Heading3,
      label: L.heading3,
      isActive: state.heading3,
      run: () => chain().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: Quote,
      label: L.blockquote,
      isActive: state.blockquote,
      run: () => chain().toggleBlockquote().run(),
    },
    {
      icon: SquareCode,
      label: L.codeBlock,
      isActive: state.codeBlock,
      run: () => chain().toggleCodeBlock().run(),
    },
  ];

  const inlineMarks: ToolbarItem[] = [
    {
      icon: Bold,
      label: L.bold,
      isActive: state.bold,
      run: () => chain().toggleBold().run(),
    },
    {
      icon: Italic,
      label: L.italic,
      isActive: state.italic,
      run: () => chain().toggleItalic().run(),
    },
    {
      icon: Underline,
      label: L.underline,
      isActive: state.underline,
      run: () => chain().toggleUnderline().run(),
    },
    {
      icon: Strikethrough,
      label: L.strike,
      isActive: state.strike,
      run: () => chain().toggleStrike().run(),
    },
    {
      icon: Code,
      label: L.code,
      isActive: state.code,
      run: () => chain().toggleCode().run(),
    },
  ];

  const aligns: ToolbarItem[] = [
    {
      icon: AlignLeft,
      label: L.alignLeft,
      isActive: state.alignLeft,
      run: () => chain().setTextAlign('left').run(),
    },
    {
      icon: AlignCenter,
      label: L.alignCenter,
      isActive: state.alignCenter,
      run: () => chain().setTextAlign('center').run(),
    },
    {
      icon: AlignRight,
      label: L.alignRight,
      isActive: state.alignRight,
      run: () => chain().setTextAlign('right').run(),
    },
    {
      icon: AlignJustify,
      label: L.alignJustify,
      isActive: state.alignJustify,
      run: () => chain().setTextAlign('justify').run(),
    },
  ];

  const lists: ToolbarItem[] = [
    {
      icon: List,
      label: L.bulletList,
      isActive: state.bulletList,
      run: () => chain().toggleBulletList().run(),
    },
    {
      icon: ListOrdered,
      label: L.orderedList,
      isActive: state.orderedList,
      run: () => chain().toggleOrderedList().run(),
    },
    {
      icon: ListChecks,
      label: L.taskList,
      isActive: state.taskList,
      run: () => chain().toggleTaskList().run(),
    },
  ];

  const renderGroup = (items: ToolbarItem[]) =>
    items.map((item) => (
      <ToolbarButton
        key={item.label}
        icon={item.icon}
        label={item.label}
        isActive={item.isActive}
        onClick={item.run}
      />
    ));

  return (
    <div className="border-border/50 bg-card flex flex-wrap items-center gap-0.5 border-b px-1.5 py-1 opacity-80 transition-opacity duration-150 group-focus-within:opacity-100">
      <ToolbarButton
        icon={Undo2}
        label={L.undo}
        onClick={() => chain().undo().run()}
        disabled={!state.canUndo}
      />
      <ToolbarButton
        icon={Redo2}
        label={L.redo}
        onClick={() => chain().redo().run()}
        disabled={!state.canRedo}
      />
      <Divider />

      <FontFamilySelect
        label={L.fontFamily}
        value={state.fontFamily}
        onChange={(value) =>
          value
            ? chain().setFontFamily(value).run()
            : chain().unsetFontFamily().run()
        }
      />
      <Divider />

      {renderGroup(blocks)}
      <Divider />

      {renderGroup(inlineMarks)}
      <ColorPopover
        icon={Baseline}
        label={L.textColor}
        clearLabel={L.clear}
        colors={TEXT_COLORS}
        isActive={state.hasColor}
        onSelect={(color) => chain().setColor(color).run()}
        onClear={() => chain().unsetColor().run()}
      />
      <ColorPopover
        icon={Highlighter}
        label={L.highlight}
        clearLabel={L.clear}
        colors={HIGHLIGHT_COLORS}
        isActive={state.highlight}
        onSelect={(color) => chain().toggleHighlight({ color }).run()}
        onClear={() => chain().unsetHighlight().run()}
      />
      <Divider />

      {renderGroup(aligns)}
      <Divider />

      {renderGroup(lists)}
      <Divider />

      <ToolbarButton
        icon={Link2}
        label={L.link}
        isActive={state.link}
        onClick={setLink}
      />
      <ToolbarButton
        icon={ImagePlus}
        label={L.image}
        onClick={() => fileInputRef.current?.click()}
      />
      <ToolbarButton
        icon={Table2}
        label={L.table}
        onClick={() =>
          chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          onFilesPicked(e.target.files);
          e.target.value = '';
        }}
      />
    </div>
  );
}
