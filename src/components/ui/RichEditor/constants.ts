export const DEFAULT_MIN_HEIGHT = 160;
export const DEFAULT_MAX_HEIGHT = 480;

export interface FontOption {
  label: string;
  /** CSS font-family stored on the textStyle mark; '' clears it. */
  value: string;
}

/** Khmer presets first (glyph shaping needs Hanuman / Battambang), then Latin. */
export const FONT_FAMILIES: readonly FontOption[] = [
  { label: 'Default', value: '' },
  { label: 'ខ្មែរ · Hanuman', value: "'Hanuman', serif" },
  { label: 'ខ្មែរ · Battambang', value: "'Battambang', serif" },
  { label: 'Inter', value: "'Inter', sans-serif" },
  { label: 'Georgia', value: 'Georgia, serif' },
];

/** Small, theme-friendly palettes — kept deliberately limited per design rules. */
export const TEXT_COLORS: readonly string[] = [
  '#0f2044',
  '#e00025',
  '#c9922b',
  '#1d8a5a',
  '#2563eb',
  '#6d28d9',
];

export const HIGHLIGHT_COLORS: readonly string[] = [
  '#fef08a',
  '#bbf7d0',
  '#bfdbfe',
  '#fbcfe8',
  '#fed7aa',
  '#e5e7eb',
];

export const HEADING_LEVELS = [1, 2, 3] as const;

/** Toolbar chrome labels (tooltips / aria) — editor chrome, not page content. */
export const TOOLBAR_LABELS = {
  undo: 'Undo',
  redo: 'Redo',
  paragraph: 'Paragraph',
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  blockquote: 'Quote',
  codeBlock: 'Code block',
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strike: 'Strikethrough',
  code: 'Inline code',
  highlight: 'Highlight',
  textColor: 'Text color',
  fontFamily: 'Font',
  alignLeft: 'Align left',
  alignCenter: 'Align center',
  alignRight: 'Align right',
  alignJustify: 'Justify',
  bulletList: 'Bullet list',
  orderedList: 'Numbered list',
  taskList: 'Task list',
  link: 'Link',
  image: 'Insert image',
  table: 'Insert table',
  clear: 'None',
} as const;
