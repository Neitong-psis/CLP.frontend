import StarterKit from '@tiptap/starter-kit';
import { CharacterCount } from '@tiptap/extension-character-count';
import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Color, FontFamily, TextStyle } from '@tiptap/extension-text-style';
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from '@tiptap/extension-table';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import type { Extensions } from '@tiptap/react';

import { HEADING_LEVELS } from './constants';

/**
 * Builds the editor extension set.
 *
 * Underline and Link ship inside StarterKit v3, so they are configured through
 * StarterKit options rather than added separately (avoids duplicate-extension
 * registration). Color / FontFamily build on TextStyle and must follow it.
 */
export function buildExtensions(placeholder: string): Extensions {
  return [
    StarterKit.configure({
      heading: { levels: [...HEADING_LEVELS] },
      link: {
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer nofollow',
          target: '_blank',
        },
      },
    }),
    TextStyle,
    Color,
    FontFamily,
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Image.configure({ inline: false, allowBase64: true }),
    Typography,
    TaskList,
    TaskItem.configure({ nested: true }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    Placeholder.configure({ placeholder }),
    CharacterCount,
  ];
}
