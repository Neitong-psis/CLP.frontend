import type { JSONContent } from '@tiptap/react';

/** A plain string, or a styled run within a paragraph. */
export type Run = string | { text: string; bold?: boolean; italic?: boolean };

function runNodes(runs: Run[]): JSONContent[] {
  return runs.map((run) =>
    typeof run === 'string'
      ? { type: 'text', text: run }
      : {
          type: 'text',
          text: run.text,
          marks: [
            ...(run.bold ? [{ type: 'bold' }] : []),
            ...(run.italic ? [{ type: 'italic' }] : []),
          ],
        },
  );
}

/** Small builders for hand-authoring Tiptap JSON mock content without deeply
 *  nested literals — used for `DocumentItem.content` (and any other content
 *  block that reuses `RichContentViewer`). */
export const richDoc = {
  doc(...content: JSONContent[]): JSONContent {
    return { type: 'doc', content };
  },
  heading(level: 1 | 2 | 3, ...runs: Run[]): JSONContent {
    return { type: 'heading', attrs: { level }, content: runNodes(runs) };
  },
  paragraph(...runs: Run[]): JSONContent {
    return { type: 'paragraph', content: runNodes(runs) };
  },
  bulletList(items: Run[][]): JSONContent {
    return {
      type: 'bulletList',
      content: items.map((runs) => ({
        type: 'listItem',
        content: [{ type: 'paragraph', content: runNodes(runs) }],
      })),
    };
  },
  blockquote(...runs: Run[]): JSONContent {
    return {
      type: 'blockquote',
      content: [{ type: 'paragraph', content: runNodes(runs) }],
    };
  },
};

/** The pre-rich-text document shape: a plain intro paragraph, an objectives
 *  list, heading+text (+ optional tip) sections, and a takeaways list. */
export interface LegacyDocumentContent {
  intro?: string;
  objectives?: string[];
  sections?: { heading: string; text: string; tip?: string }[];
  takeaways?: string[];
}

/** Converts the legacy plain-string document shape into equivalent Tiptap
 *  JSON, so the large existing course catalog can render through the same
 *  rich-text viewer as newly-authored content without being rewritten. */
export function legacyDocumentToRichDoc(
  item: LegacyDocumentContent,
): JSONContent {
  const nodes: JSONContent[] = [];

  if (item.intro) nodes.push(richDoc.paragraph(item.intro));

  if (item.objectives?.length) {
    nodes.push(richDoc.heading(2, "What You'll Learn"));
    nodes.push(richDoc.bulletList(item.objectives.map((o) => [o])));
  }

  for (const section of item.sections ?? []) {
    nodes.push(richDoc.heading(2, section.heading));
    nodes.push(richDoc.paragraph(section.text));
    if (section.tip) nodes.push(richDoc.blockquote(section.tip));
  }

  if (item.takeaways?.length) {
    nodes.push(richDoc.heading(2, 'Key Takeaways'));
    nodes.push(richDoc.bulletList(item.takeaways.map((t) => [t])));
  }

  return richDoc.doc(...nodes);
}

/** Merges an assignment's separate instructions paragraph + requirements
 *  checklist into one document body, so it reads the same as the Document
 *  content type instead of two disconnected boxed sections. */
export function assignmentToRichDoc(item: {
  instructions: string;
  requirements: string[];
}): JSONContent {
  const nodes: JSONContent[] = [richDoc.paragraph(item.instructions)];
  if (item.requirements.length) {
    nodes.push(richDoc.heading(2, 'Requirements'));
    nodes.push(richDoc.bulletList(item.requirements.map((r) => [r])));
  }
  return richDoc.doc(...nodes);
}
