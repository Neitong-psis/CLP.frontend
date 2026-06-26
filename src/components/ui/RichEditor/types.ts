export interface RichEditorProps {
  /** Tiptap document serialised as a JSON string. Empty string = blank doc. */
  value: string;
  /** Called with the serialised Tiptap JSON whenever the document changes. */
  onChange: (json: string) => void;
  placeholder?: string;
  /** Minimum height of the editable area, in px (default 160). */
  minHeight?: number;
  /** Maximum height before the editable area scrolls, in px (default 480). */
  maxHeight?: number;
  className?: string;
}
