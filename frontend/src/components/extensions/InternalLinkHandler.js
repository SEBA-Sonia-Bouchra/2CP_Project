import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

export const InternalLinkHandler = Extension.create({
  name: 'internalLinkHandler',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleClick(view, pos, event) {
            const target = event.target;
            if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
              event.preventDefault(); 
              const targetId = target.getAttribute('href').slice(1);
              const el = document.getElementById(targetId);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
              return true;
            }
            return false;
          }
        }
      })
    ];
  }
});
