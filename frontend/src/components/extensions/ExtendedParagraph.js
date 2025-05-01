import { Paragraph } from '@tiptap/extension-paragraph';

export const ExtendedParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        renderHTML: attributes => {
          return attributes.id ? { id: attributes.id } : {};
        },
      },
    };
  },
});



