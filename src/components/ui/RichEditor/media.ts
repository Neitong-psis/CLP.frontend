import type { Editor } from '@tiptap/react';

/** Reads image files via FileReader and inserts each as a base64 image node. */
export function insertImageFiles(editor: Editor, files: readonly File[]): void {
  files
    .filter((file) => file.type.startsWith('image/'))
    .forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          editor.chain().focus().setImage({ src: reader.result }).run();
        }
      };
      reader.readAsDataURL(file);
    });
}
