import { Node, mergeAttributes } from '@tiptap/core';

export const CustomImage = Node.create({
  name: 'image', // Replaces the default Image

  group: 'block',
  content: 'inline*',
  inline: false,
  atom: true,

  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: '' },
      text: { default: 'Your text here...' },
      width: { default: '300px' },
      height: { default: 'auto' },
      alignment: { default: 'left' }
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="enhancedImage"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        'data-type': 'enhancedImage',
        style: `display: flex; align-items: start; justify-content: ${HTMLAttributes.alignment}; position: relative; flex-wrap: wrap; max-width: 100%;`,
      },
      ['img', {
        src: HTMLAttributes.src,
        alt: HTMLAttributes.alt,
        style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height}; margin-right: 10px; max-width: 100%;`,
      }],
      ['div', {
  style: `flex: 1; word-break: break-word; overflow-wrap: break-word; max-width: calc(100% - ${HTMLAttributes.width});`
}, HTMLAttributes.text],

    ];
  },

  addNodeView() {
    return ({ node, getPos, updateAttributes }) => {
      const container = document.createElement('div');
      container.style.display = 'flex';
      container.style.alignItems = 'start';
      container.style.position = 'relative';
      container.style.flexWrap = 'wrap';
      container.style.maxWidth = '100%';

      const image = document.createElement('img');
      image.src = node.attrs.src;
      image.alt = node.attrs.alt;
      image.style.width = node.attrs.width;
      image.style.height = node.attrs.height;
      image.style.marginRight = '10px';
      image.style.maxWidth = '100%';

      const resizeHandle = document.createElement('div');
      resizeHandle.style.width = '8px';
      resizeHandle.style.cursor = 'col-resize';
      resizeHandle.style.position = 'absolute';
      resizeHandle.style.right = '0';
      resizeHandle.style.top = '0';
      resizeHandle.style.bottom = '0';

      resizeHandle.onmousedown = (e) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = image.clientWidth;

        const resize = (moveEvent) => {
          const newWidth = startWidth + (moveEvent.clientX - startX);
          image.style.width = `${Math.max(newWidth, 50)}px`;
          updateAttributes({ width: `${Math.max(newWidth, 50)}px` });
        };

        const stopResize = () => {
          document.removeEventListener('mousemove', resize);
          document.removeEventListener('mouseup', stopResize);
        };

        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
      };

      const text = document.createElement('div');
      text.contentEditable = true;
      text.innerText = node.attrs.text;
      text.style.flex = '1';
      text.style.wordBreak = 'break-word';
      text.style.overflowWrap = 'break-word';
      text.style.maxWidth = `calc(100% - ${node.attrs.width})`;

      text.oninput = (e) => {
        updateAttributes({ text: e.target.innerText });
      };

      container.appendChild(image);
      container.appendChild(resizeHandle); // Make the handle visible
      container.appendChild(text);

      return { dom: container, contentDOM: text };
    };
  }
});
