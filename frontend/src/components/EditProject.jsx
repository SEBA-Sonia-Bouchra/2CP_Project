import React , {useRef, useState, useEffect} from 'react'
import {Plus ,ChevronDown ,ChevronUp ,Minus} from 'lucide-react'
import { EditorContent, Editor, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder'
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { FontSize } from './extensions/FontSize.js'
import Color from '@tiptap/extension-color'
import {CustomHighlight} from './extensions/CustomHighlight.js'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Gapcursor from '@tiptap/extension-gapcursor'
import Youtube from '@tiptap/extension-youtube'
import { ReferenceBlock } from './extensions/ReferenceBlock.jsx'
import { LinkBlock } from './extensions/LinkBlock.jsx';
import { InternalLinkHandler } from './extensions/InternalLinkHandler'
import { ExtendedParagraph } from './extensions/ExtendedParagraph.js'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCurrentUser from '../utils/useCurrentUser.js';

export default function EditProject({ onEditorFocus, coverImageFile, savedProject }) {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [image,setImage]=useState('');
  const defaultSections = !savedProject ? [ 
  { id: 'desc', title: 'Description', content: '', showContent: true  },
  { id: 'arch', title: 'Architecture', content: '', showContent: true },
  { id: 'hist', title: 'History', content: '', showContent: true },
  { id: 'archaeo', title: 'Archeology', content: '', showContent: true },
  { id: 'rfrncs', title: 'References', content: '', showContent: true },
  ] : [ 
  { id: 'desc', title: 'Description', content: savedProject?.description, showContent: true  },
  { id: 'arch', title: 'Architecture', content: savedProject?.sections.find(s => s.title === 'Architecture')?.content, showContent: true },
  { id: 'hist', title: 'History', content: savedProject?.sections.find(s => s.title === 'History')?.content, showContent: true },
  { id: 'archaeo', title: 'Archeology', content: savedProject?.sections.find(s => s.title === 'Archeology')?.content, showContent: true },
  ...savedProject.sections // this adds the additional section (if it exists in savedProject) to defaultSections so that it appears in the editor when savedProject is edited
    .filter(section => !['Description', 'Architecture', 'History', 'Archeology', 'References']
      .includes(section.title))
    .map(section => ({
      id: section.title.toLowerCase(),
      title: section.title,
      content: section.content,
      showContent: true
    })),
  { id: 'rfrncs', title: 'References', content: '', showContent: true },
  ];
  const [sections, setSections] = useState(defaultSections); // To store sections
  const [showRemoveSection,setShowRemoveSection]=useState(false);
  const [errors,setErrors]= useState({});
  const ImageUrl = savedProject?.coverPhoto?.replace("\\", "/"); 
  const initialValues = {
    title: savedProject?.title || '',
    coverPicture: ImageUrl || null,
    description: savedProject?.description || '' 
  }; // initializes the values array with savedProject necessary fields if it's edit else empty if the project is new 
  const [values, setValues]=useState(initialValues);
  const [references, setReferences] = useState([]); 
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const coverPictureRef = useRef(null);

  const validate = (values) => {
    const errors = {};
    if(!values.title) {
      errors.title="Please enter a title to this project.";
    }
    if(!values.description || values.description.trim() === '' || values.description === '<p></p>'){
      errors.description="Please fill out the description."
    }
    if(!values.coverPicture){
      errors.coverPicture="Please upload a cover picture!"
    }
    return errors;
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const descriptionSection = sections.find(section => section.title === 'Description');
    const descriptionContent = descriptionSection?.editor?.getHTML() || '';
    const newValues = { ...values, description: descriptionContent };
    const validationErrors = validate(newValues); 
    setErrors(validationErrors); // treat errors
    if (validationErrors.title) {
      titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (validationErrors.description) {
      descriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.log(descriptionRef.current)
    } else if (validationErrors.coverPicture) {
      coverPictureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData(); // save the project information
        formData.append('title', newValues.title);
        formData.append('description', newValues.description);
        formData.append('coverPhoto', newValues.coverPicture); 
        const preparedSections = sections
        .filter(section => { if (section.title === "Description") return false; // exclude Description ( since it's not included with sections array in backend)
          if(section.title === "References") return false;
          const html = section.editor ? section.editor.getHTML() : section?.content;
          return html && html !== '<p></p>'; // only keep non-empty content
        })
        .map(section => ({
          title: section.title,
          content: section.editor.getHTML(),
          dimension: section.title.toLowerCase(),
          contributor: user?._id,
        }));

        formData.append('sections', JSON.stringify(preparedSections));
        formData.append('references', JSON.stringify(references || []));

        const token = sessionStorage.getItem("token");
        if (!token) {
          console.error("No auth token found.");
          return;
        }
        const isEdit = Boolean(savedProject?._id); // if this returns an id then we're in the edit mode of an existing project
        const url = isEdit // if it's edit mode we put new data in the route specefied else we post a new project to the route after : 
        ? `http://localhost:5000/api/projects/${savedProject._id}` : "http://localhost:5000/api/projects/";
        const method = isEdit ? "put" : "post";
        const response = await axios[method](url, formData, {
           headers: {
            "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}`
            }
        });
        console.log(`Project ${isEdit ? 'updated' : 'created'}:`, response.data);
        if(isEdit && (user._id !== savedProject?.author._id)){
          navigate('/My_contributions')
        }
        else{
          navigate("/My_Projects");
        }
      } catch (error) {
        console.error('Project save failed:', error.response?.data || error.message);
      }
    } else {
      console.log("Validation error");
    }
  }

  const handleChange = (e) => { // update form fields(when entering input)
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name]; // Remove error for the current field
      return newErrors;
    });
  };

  const handleImageChange = (e) => { // To add cover picture
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setValues(prev => ({...prev, coverPicture: file}));
    }
  };

  useEffect(() => {
    if (savedProject?.coverPhoto) {
      const fullCoverUrl = `http://localhost:5000/${savedProject.coverPhoto}`;
      setImage(fullCoverUrl);
    }
  }, [savedProject]);

  useEffect(() => { // initializing the editor of each section in defaultSections
    const initializedSections = defaultSections.map(section => ({
      ...section,
      editor: new Editor({
        content: section.content || '',
        extensions: [
          StarterKit.configure({
            bulletList: false,
            orderedList: false,
            listItem: false,
            paragraph: false, // disable default paragraph and replaced it with that extended one which contains id (so that links to references would work)
          }),
          BulletList,
          OrderedList,
          ListItem,
          Underline,
          TextStyle,
          FontFamily,
          FontSize,
          ImageResize,
          InternalLinkHandler,
          Gapcursor,
          ExtendedParagraph,
          Image.configure({
            inline: true,
            allowBase64: true, 
          }),
          ReferenceBlock.configure({
            addReferenceCallback: (newRef) => {
              setReferences((prev) => [...prev, newRef]);
            },
            getGlobalReferenceCount: () => references?.length, // Always uses latest value
          }),
          LinkBlock,
          Youtube.configure({
            controls: false,
            nocookie: true,
          }),
          Table.configure({
            resizable:true,
          }),
          TableRow,
          TableCell,
          TableHeader,
          TextAlign.configure({
            types: ['heading', 'paragraph'], 
            alignments: ['left', 'center', 'right', 'justify'], 
          }),
          Color,
          CustomHighlight,
          Link.configure({
            openOnClick: true,
            autolink: true,
            linkOnPaste: true,
          }),
          Placeholder.configure({
            placeholder: 'Enter some text...',
            emptyEditorClass: 'editor-initial-content',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],
        nodeViews: {
          image: ({ node }) => <ResizableImage node={node} />, 
        },
        editable: savedProject.title
        ? savedProject.author?._id === user?._id ||
          ((user?.role === 'Architect' && section.title === 'Architecture') ||
          (user?.role === 'Historian' && section.title === 'History') ||
          (user?.role === 'Archeologist' && section.title === 'Archeology'))
        : true
      }),
    }));
    setSections(initializedSections);
  }, [user, savedProject]);

  useEffect(() => { // to know which section editor is currently focused
      sections.forEach(section => {
        if (section.editor) { //just to make sure the editor exists
          section.editor.on('focus', () => onEditorFocus(section.editor));
        }
      })
  }, [sections])

  const addSection = (title) => {
      if (title === 'Other' && sections.some(s => s.title === 'Other')) return; 
      const newSection = { 
        id: 'other',
        title: 'Other',
        content: '',
        showContent: true,
        editor: new Editor({ extensions: [StarterKit.configure({
          bulletList: false,
          orderedList: false,
          listItem: false,
          paragraph:false,
        }),
        BulletList, OrderedList, ListItem, Underline , TextStyle, FontFamily, FontSize, Color, CustomHighlight, Image, ImageResize,Gapcursor,
        Table, TableRow, TableCell, TableHeader, LinkBlock, ExtendedParagraph, InternalLinkHandler,// the editor of the new section
          TextAlign.configure({
            types: ['heading', 'paragraph'], 
            alignments: ['left', 'center', 'right', 'justify'], 
          }),
          ReferenceBlock.configure({
            addReferenceCallback: (newRef) => {
              setReferences(prev => [...prev, newRef]); // updates references with the new reference that we got from the reference block
            },
          }),
          Link.configure({
            openOnClick: false,
            autolink: true,
            linkOnPaste: true,
          }),
          Placeholder.configure({
            placeholder: 'Enter some text...',
            emptyEditorClass: 'editor-initial-content',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true, }),], })
      };
      setSections([...sections, newSection]);
      setSections((prevSections) => { // interchanges between References and Other in the array so that references doesn't appear before Other in the editor (when creating a new project)
        const index1 = prevSections.findIndex((section) => section.title === 'References');
        const index2 = prevSections.findIndex((section) => section.title === 'Other');
        if (index1 === -1 || index2 === -1) {
          return prevSections;
        }
        const newSections = [...prevSections];
        [newSections[index1], newSections[index2]] = [newSections[index2], newSections[index1]];
        return newSections;
      })
  };

  useEffect(()=>{
    console.log(sections)
  },[sections])

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id)); //removes a section based on its id 
  };

  const toggleContentVisibility = (id) => { // to hide/show section content
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, showContent: !section.showContent } : section
      )
    );
  };  

  useEffect(() => {
    if (coverImageFile) {
      const imageUrl = URL.createObjectURL(coverImageFile);
      setImage(imageUrl);
      setValues(prev => ({ ...prev, coverPicture: coverImageFile }));
    }
  }, [coverImageFile]);

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

  useEffect(() => { // to fill references section with content whenever a reference is added 
    const referencesSection = sections.find(section => section.title === 'References');
    if (referencesSection?.editor && references?.length > 0) {
      const paragraphs = references.map((ref, idx) => ({
        type: 'paragraph',
        attrs: {
          id: `ref-${ref.id}`, 
        },
        content: [
          {
            type: 'text',
            text: `[${idx + 1}]. ${ref.title}`,
          },
        ],
      }));
      
      referencesSection.editor.commands.setContent({
        type: 'doc',
        content: paragraphs,
      });
    }
  }, [references, sections]);

  useEffect(() => {
    if (savedProject?.coverPhoto) {
      const imagePath = savedProject.coverPhoto.replace("\\", "/");
      setImage(`http://localhost:5000/${imagePath}`);
    }
  }, [savedProject]);

  useEffect(()=>{
    if(savedProject){
      setReferences(savedProject.references)
    }
  },[])

  const renderSection = (section) => {
    switch (section.title) {
      case 'Description':
        return (
        <div key={section.id}>
          <div className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-black py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl'>Description</h1>
              <div className='flex place-self-end gap-2'>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                 onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                 rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <div ref={descriptionRef}>
             <EditorContent editor={section.editor} className='editor tiptap'/>
             </div>}          
          </div>
          {errors.description && (<p className='text-red-700 text-md'>{errors.description}</p>)}
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
            {section.showContent && <EditorContent editor={section.editor} className='editor tiptap' />}
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
            {section.showContent && <EditorContent editor={section.editor} className="editor tiptap" />}
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
            {section.showContent && <EditorContent editor={section.editor} className="editor tiptap " />}
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
              {showRemoveSection && (<div className='w-screen fixed top-0 left-0 bg-black bg-opacity-25 z-50'>
                <div className='flex justify-center items-center min-h-screen   '>
                  <div className='bg-white rounded-md flex flex-col items-center justify-center px-16 py-10 gap-6 drop-shadow-lg'>
                    <p>Do you want to delete this section ?</p>
                    <div className='flex gap-2 text-lg'>
                      <button className='text-[#4F3726] border border-[#4F3726] rounded-full px-6 py-1' onClick={()=>setShowRemoveSection(!showRemoveSection)}>
                      Cancel</button>
                      <button className='text-white rounded-full bg-[#4F3726] px-6 py-1' onClick={()=>{removeSection(section.id)
                        setShowRemoveSection(!showRemoveSection);}}>
                      Confirm</button>
                    </div>
                  </div>
               </div>
              </div>)}
            </div>
            {section.showContent && <EditorContent editor={section.editor} className='editor tiptap' />}
          </div>
          );
        case 'References':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-black py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl '>References</h1>
              <div className='flex place-self-end gap-2'>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <EditorContent editor={section.editor} className="editor tiptap " />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-self-center font-montserral min-h-screen w-full max-w-[900px] shadow-lg overflow-y-auto mt-24 mb-8'>
        <div className='bg-[#4F3726] bg-opacity-20 flex items-center justify-center w-full h-[320px] ' style={{ backgroundImage: image ? `url("${image}")` : 'none' ,
        backgroundSize: 'cover', backgroundPosition: 'center',  }} ref={coverPictureRef}>
          <input type="file" accept="image/*" className="hidden" id="imageUpload" onChange={handleImageChange} name='coverPicture' />
          {(image=='') && <label htmlFor="imageUpload" className='group flex items-center text-lg cursor-pointer transition-all duration-300
           ease-in-out overflow-hidden bg-white drop-shadow-md rounded-full px-4 py-3 w-[55px] hover:w-64'>
            <Plus className='shrink-0'/>
            <span className='ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Add a cover picture</span>
          </label> } 
        </div>
        {errors.coverPicture && (image=='') && <p className='text-red-700 self-start'>{errors.coverPicture}</p>}
        <div className='py-4 px-8 flex flex-col gap-5 w-full '>
          <div className='border-gray-500 border rounded-md border-opacity-10 shadow-sm w-full'>
            { (savedProject.author?._id === user?._id || !savedProject.title ) ? (<input type="text" placeholder='Add a title' className={`outline-none appearance-none rounded-md py-2 px-4 text-md w-full`} name='title'
             value={values.title} onChange={handleChange} ref={titleRef}/>) : (<p className={`outline-none appearance-none rounded-md py-2 px-4 text-md w-full`}
             onChange={handleChange} ref={titleRef}>{values.title}</p>) }
            {errors.title && <p className='text-red-700 '>{errors.title}</p>}
          </div>       
          <div>
            {sections.map((section) =>{if(section.title!=='References' || references?.length > 0){
              return renderSection(section);
            }})} 
          </div>
          <div className="flex justify-start mt-4">
            <button onClick={() => addSection('Other')} className='flex items-center gap-2 text-lg cursor-pointer bg-white hover:bg-[#D9D9D9]
             hover:bg-opacity-50 transition-all duration-300 ease-in-out drop-shadow-md rounded-full px-4 py-3'>
              <Plus className="shrink-0" />
              <span>Add Section</span>
            </button>
          </div>
          <button className='bg-[#4F3726] text-white text-lg py-2.5 px-10 rounded-full place-self-end shadow-md ' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  )
}