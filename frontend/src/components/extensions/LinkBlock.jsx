import { Node, mergeAttributes, ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { useState } from 'react';

export function LinkBlockComponent({ editor, getPos }) {
  const [title, setTitle] = useState('');
  const [href, setHref] = useState('');

  const handleAddLink = () => {
    if (!title.trim() || !href.trim()) return;
    editor.chain().focus().insertContent([
    { type: 'text', text: title, marks: [{ type: 'link', attrs: { href, target: '_blank' } }] },
    { type: 'text', text: ' ' }, // a space to move the cursor out of the link
  ]).run();
    // To delete the link node (the one containing title and link) after the link is added
    const pos = getPos();
    if (typeof pos === 'number') {
      editor.commands.deleteRange({ from: pos, to: pos + 1 });
    }
  };

  return (
    <NodeViewWrapper className="p-4 bg-white shadow rounded flex flex-col gap-2 w-96 font-montserral">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Link title" className="border border-black px-2 py-1 
      focus:border-[#2345AB] rounded-md outline-none focus:border-2"/>
      <input type="url" value={href} onChange={(e) => setHref(e.target.value)} placeholder="https://example.com" className="border px-2 py-1 border-black
      focus:border-[#2345AB] rounded-md outline-none focus:border-2"/>
      <button onClick={handleAddLink} disabled={!title.trim() || !href.trim()} className="text-[#2345AB] disabled:text-gray-400 self-end font-semibold">
        Add Link
      </button>
    </NodeViewWrapper>
  );
}


export const LinkBlock = Node.create({
  name: 'linkBlock',
  group: 'block',
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      links: {
        default: [],
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="link-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'link-block' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(LinkBlockComponent);
  },
});
