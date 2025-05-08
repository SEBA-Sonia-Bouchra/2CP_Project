import { Node, mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react'
import { NodeViewWrapper } from '@tiptap/react'
import { useState } from 'react'

function ReferenceBlockComponent({ node, updateAttributes, getPos, editor, addReferenceCallback, getGlobalReferenceCount}) {
  const [newReference, setNewReference] = useState(''); // input only
  const references = node.attrs.references || [];
  const handleAddReference = () => {
    if (!newReference.trim()) return;
    const nextId = references.length + 1;
    const newRef = {
      title: newReference.trim(),
      id: nextId,
    };

    const updatedReferences = [...references, newRef];
    updateAttributes({ references: updatedReferences }); // correctly update node.attrs

    if (addReferenceCallback) {
      addReferenceCallback(newRef);
    }

    const newRefId = `ref-${nextId}`;
    editor
    .chain()
    .focus()
    .insertContent([
      {
        type: 'text',
        text: `[${getGlobalReferenceCount() + 1}]`,
        marks: [
          {
            type: 'link',
            attrs: {
              href: `#${newRefId}`,
              target: null,
              rel: null,
            },
          },
        ],
      },
      {
        type: 'text',
        text: ' ',
      },
    ])
    .run();
    setNewReference('');

    const pos = getPos();
    if (typeof pos === 'number') {
      editor.commands.deleteRange({ from: pos, to: pos + 1 });
    }
  };

  return (
    <NodeViewWrapper className="shadow-xl p-4 rounded-lg my-4 bg-white flex flex-col gap-2 font-montserral w-96">
      <input type="text" value={newReference} onChange={(e) => setNewReference(e.target.value)} placeholder="Reference" className="border-2 border-[#2345AB]
       rounded-md px-3 py-2 outline-none"/>
      <button disabled={!newReference.trim()} onClick={handleAddReference} className={`px-4 py-2 self-end rounded transition ${ newReference.trim() ? 'text-[#2345AB]' :
      'text-gray-500 cursor-not-allowed'}`}>
        Add reference
      </button>
    </NodeViewWrapper>
  )
}

//The add reference extension in tiptap

export const ReferenceBlock = Node.create({
  name: 'referenceBlock',
  group: 'inline',
  atom:true,
  selectable: true,
  inline:true,

  addAttributes() {
    return {
      reference: {
        default: null,
      },
    }
  },

  parseHTML() { // how to recognize the block when loading to html
    return [{ tag: 'div[data-type="reference-block"]' }]
  },

  renderHTML({ HTMLAttributes }) { // how to export the block when loading to html 
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'reference-block' }), 0]
  },

  addOptions() {
    return {
      addReferenceCallback: () => {},
      getGlobalReferenceCount: () => 0,
    };
  },
  
  addNodeView() {
    return ReactNodeViewRenderer((props) =>
      <ReferenceBlockComponent {...props} addReferenceCallback={this.options.addReferenceCallback} getGlobalReferenceCount={this.options.getGlobalReferenceCount} />
    );
  }
  
})

