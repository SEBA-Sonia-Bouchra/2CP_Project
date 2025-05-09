import { Mark, mergeAttributes } from '@tiptap/core'

export const FontSize = Mark.create({
  name: 'fontSize',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: element => element.style.fontSize.replace('px', ''),
        renderHTML: attributes => {
          if (!attributes.size) return {}
          return {
            style: `font-size: ${attributes.size}px`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        style: 'font-size',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setFontSize:
        size =>
        ({ commands }) => {
          return commands.setMark('fontSize', { size })
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.unsetMark('fontSize')
        },
    }
  },
})
