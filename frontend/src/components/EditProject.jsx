import React , {useRef, useState, useEffect} from 'react'
import {Plus ,ChevronDown ,ChevronUp ,Minus} from 'lucide-react'
import { EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder'
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style'

export default function EditProject({ onEditorFocus }) {
  const [image,setImage]=useState("");
  const defaultSections = [ //this initializes "sections" with this predefined sections, I didn't want to redo my code since i allowed users to
    // insert sections as architecture or history at the begginning but since they must be predefined i did this. 
    { id: 'desc', type: 'Description', content: '', showContent: true  },
    { id: 'arch', type: 'Architecture', content: '', showContent: true },
    { id: 'hist', type: 'History', content: '', showContent: true },
    { id: 'archaeo', type: 'Archeology', content: '', showContent: true },
  ];
  const [sections, setSections] = useState(defaultSections); // To store sections
  const [showRemoveSection,setShowRemoveSection]=useState(false);
  const dropdownList=useRef(null); 
  const handleImageChange = (e) => { // To add cover picture
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  useEffect(() => {
    const initializedSections = defaultSections.map(section => ({
      ...section,
      editor: new Editor({
        extensions: [
          StarterKit,
          Underline,
          TextStyle,
          FontFamily,
          Placeholder.configure({
            placeholder: 'Enter some text...',
            emptyEditorClass: 'editor-initial-content',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],
      }),
    }));
    setSections(initializedSections);
  }, []);
  useEffect(() => {
      sections.forEach(section => {
        if (section.editor) { //just to make sure the editor exists
          section.editor.on('focus', () => onEditorFocus(section.editor));
        }
      })
    }, [sections])
  const addSection = (type) => {
    if (type === 'Other' && sections.some(s => s.type === 'Other')) return; 
    const newSection = { 
      id: Date.now(),
      type,
      title: '',
      content: '',
      showContent: true,
      editor: new Editor({ extensions: [StarterKit, Underline , TextStyle, FontFamily,// the editor of the new section
        Placeholder.configure({
          placeholder: 'Enter some text...',
          emptyEditorClass: 'editor-initial-content',
          showOnlyWhenEditable: true,
          showOnlyCurrent: true, }),], })
    };
    setSections([...sections, newSection]);
  };
  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id)); //removes a section based on its id 
  };
  const toggleContentVisibility = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, showContent: !section.showContent } : section
      )
    );
  };  
  useEffect(() => {
      if (showRemoveSection) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto"; 
      }
      return () => {
        document.body.style.overflow = "auto"; 
      };
    }, [showRemoveSection]);
  const renderSection = (section) => {
    switch (section.type) {
      case 'Description':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-black py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl'>Description</h1>
              <div className='flex place-self-end gap-2'>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                 onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                 rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <EditorContent editor={section.editor} className='editor' />}
          </div>
        );
      case 'Architecture':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-[#5D9AD0] py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl text-[#5D9AD0]'>Architecture</h1>
              <div className='flex place-self-end gap-2'>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <EditorContent editor={section.editor} className='editor' />}
          </div>
        );
      case 'History':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-[#3CC435] py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl text-[#3CC435]'>History</h1>
              <div className='flex place-self-end gap-2'>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <EditorContent editor={section.editor} className="editor" />}
          </div>
        );
      case 'Archeology':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-[#D662C4] py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl text-[#D662C4]'>Archeology</h1>
              <div className='flex place-self-end gap-2'>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <EditorContent editor={section.editor} className="editor " />}
          </div>
        );
      case 'Other':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3 ' >
            <div className='border-b border-[#D05D5F] py-3 grid grid-cols-2'>
            <h1 className='font-playfairdisplay text-2xl text-[#D05D5F]'>Other</h1>
              <div className='flex place-self-end gap-2'> 
                <Minus className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full' onClick={()=>setShowRemoveSection(!showRemoveSection)}/>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full' 
                onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
              {showRemoveSection && (<div className='w-screen fixed top-0 bg-black bg-opacity-25 z-50'>
                <div className='flex justify-center items-center min-h-screen   '>
                  <div className='bg-white rounded-md flex flex-col items-center justify-center px-16 py-10 gap-6 drop-shadow-lg'>
                    <p>Do you want to delete this section ?</p>
                    <div className='flex gap-2 text-lg'>
                      <button className='text-[#4F3726] border border-[#4F3726] rounded-full px-6 py-1' onClick={()=>setShowRemoveSection(!showRemoveSection)}>
                      Cancel</button>
                      <button className='text-white rounded-full bg-[#4F3726] px-6 py-1' onClick={()=>removeSection(section.id)} >
                      Confirm</button>
                    </div>
                  </div>
               </div>
              </div>)}
            </div>
            {section.showContent && <EditorContent editor={section.editor} className='editor' />}
          </div>
          );
      default:
        return null;
    }
  };
  return (
    <>
      <div className='flex flex-col items-center justify-self-center font-montserral min-h-screen w-full max-w-[900px] shadow-lg overflow-y-auto mt-24
      '>
        <div className='bg-[#4F3726] bg-opacity-20 flex items-center justify-center w-full h-[320px] '  style={{ backgroundImage: image ? `url(${image})` : 'none',
        backgroundSize: 'cover', backgroundPosition: 'center', }}>
          <input type="file" accept="image/*" className="hidden" id="imageUpload" onChange={handleImageChange}/>
          {(image=='') && <label htmlFor="imageUpload" className='group flex items-center text-lg cursor-pointer transition-all duration-300
           ease-in-out overflow-hidden bg-white drop-shadow-md rounded-full px-4 py-3 w-[55px] hover:w-64'>
            <Plus className='shrink-0'/>
            <span className='ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Add a cover picture</span>
          </label> }
        </div>
        <div className='py-4 px-8 flex flex-col gap-5 w-full '>
          <div className='border-gray-500 border rounded-md border-opacity-10 shadow-sm w-full'>
            <input type="text" placeholder='Add a title' className='outline-none appearance-none rounded-md py-2 px-4 text-md w-full' />
          </div>
          <div className="section-list">
            {sections.map((section) => renderSection(section))} 
          </div>
          <div className="flex justify-start mt-4">
            <button onClick={() => addSection('Other')} className='flex items-center gap-2 text-lg cursor-pointer bg-white hover:bg-[#D9D9D9]
             hover:bg-opacity-50 transition-all duration-300 ease-in-out drop-shadow-md rounded-full px-4 py-3'>
              <Plus className="shrink-0" />
              <span>Add Section</span>
            </button>
          </div>

          <button className='bg-[#4F3726] text-white text-lg py-2.5 px-10 rounded-full place-self-end shadow-md '>
            Save
          </button>
        </div>
      </div>
    </>
  )
}