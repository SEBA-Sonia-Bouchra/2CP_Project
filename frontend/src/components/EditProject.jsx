import React , {useRef, useState, useEffect} from 'react'
import {Plus ,ChevronDown ,ChevronUp ,Minus} from 'lucide-react'
import { EditorContent, Editor } from '@tiptap/react';
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
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditProject({ onEditorFocus }) {
  const navigate = useNavigate();
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
  const [errors,setErrors]= useState({});
  const initialValues={title:'',coverPicture:'',description:''}
  const [values, setValues]=useState(initialValues);
  const dropdownList=useRef(null); 
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const coverPictureRef = useRef(null);

  const validate = (values) => {
    const errors = {};
    if(!values.title) {
      errors.title="Please enter a title to this project.";
    }
    if(!values.description || values.description=='<p></p>'){
      errors.description="Please fill out the description."
    }
    if(!values.coverPicture){
      errors.coverPicture="Please upload a cover picture!"
    }
    return errors;
  }
  const handleSave = async (e) => {
    e.preventDefault();
    const descriptionSection = sections.find(section => section.type === 'Description');
    const descriptionContent = descriptionSection?.editor?.getHTML() || '';
    const newValues = { ...values, description: descriptionContent };
    const validationErrors = validate(newValues); 
    setErrors(validationErrors); // treat errors
    if (validationErrors.title) {
      titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (validationErrors.description) {
      descriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (validationErrors.coverPicture) {
      coverPictureRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append('title', newValues.title);
        formData.append('description', newValues.description);
        formData.append('coverPhoto', newValues.coverPicture); 
  
        // const preparedSections = sections
        // .filter(section => {
        //   if (section.type === "Description") return false; // exclude Description
        //   // const html = section.editor ? section.editor.getHTML() : section.content;
        //   // return html && html !== '<p></p>'; // only keep non-empty content
        // })
        // .map(section => ({
        //   title: section.type,
        //   content: section.editor.getHTML(),
        //   dimension: section.type.toLowerCase()
        // }));

        const preparedSections = sections
        .filter(section => section.type !== "Description")
        .map(section => ({
          title: section.type,
          content: section.editor ? section.editor.getHTML() : section.content,
          dimension: section.type.toLowerCase()
        }));
  
        formData.append('sections', JSON.stringify(preparedSections));
  
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:5000/api/projects/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Project created:', response.data);
        navigate("/My_Projects");
      } catch (error) {
        console.error('Project creation failed:', error.response?.data || error.message);
      }
    }
    else {
      console.log("error")
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
    const initializedSections = defaultSections.map(section => ({
      ...section,
      editor: new Editor({
        extensions: [
          StarterKit.configure({
            bulletList: false,
            orderedList: false,
            listItem: false,
          }),
          BulletList,
          OrderedList,
          ListItem,
          Underline,
          TextStyle,
          FontFamily,
          FontSize,
          TextAlign.configure({
            types: ['heading', 'paragraph'], 
            alignments: ['left', 'center', 'right', 'justify'], 
          }),
          Color,
          CustomHighlight,
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
      editor: new Editor({ extensions: [StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList, OrderedList, ListItem, Underline , TextStyle, FontFamily, FontSize, Color, CustomHighlight,// the editor of the new section
        TextAlign.configure({
          types: ['heading', 'paragraph'], 
          alignments: ['left', 'center', 'right', 'justify'], 
        }),
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
          <>
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
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
          </>
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
                        setShowRemoveSection(!showRemoveSection);
                      }} >
                      Confirm</button>
                    </div>
                  </div>
               </div>
              </div>)}
            </div>
            {section.showContent && <EditorContent editor={section.editor} className='editor tiptap' />}
          </div>
          );
      default:
        return null;
    }
  };
  return (
    <>
      <div className='flex flex-col items-center justify-self-center font-montserral min-h-screen w-full max-w-[900px] shadow-lg overflow-y-auto mt-24 mb-8
      '>
        <div className='bg-[#4F3726] bg-opacity-20 flex items-center justify-center w-full h-[320px] '  style={{ backgroundImage: image ? `url(${image})` : 'none',
        backgroundSize: 'cover', backgroundPosition: 'center', }}>
          <input type="file" accept="image/*" className="hidden" id="imageUpload" onChange={handleImageChange} name='coverPicture' ref={coverPictureRef}/>
          {(image=='') && <label htmlFor="imageUpload" className='group flex items-center text-lg cursor-pointer transition-all duration-300
           ease-in-out overflow-hidden bg-white drop-shadow-md rounded-full px-4 py-3 w-[55px] hover:w-64'>
            <Plus className='shrink-0'/>
            <span className='ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300'>Add a cover picture</span>
          </label> }
        </div>
        {errors.coverPicture && (image=='') && <p className='text-red-700 self-start'>{errors.coverPicture}</p>}
        <div className='py-4 px-8 flex flex-col gap-5 w-full '>
          <div className='border-gray-500 border rounded-md border-opacity-10 shadow-sm w-full'>
            <input type="text" placeholder='Add a title' className={`outline-none appearance-none rounded-md py-2 px-4 text-md w-full`} name='title'
             value={values.title} onChange={handleChange} ref={titleRef}/>
            {errors.title && <p className='text-red-700 '>{errors.title}</p>}
          </div>
          <div className="section-list">
            {sections.map((section) =>renderSection(section) )} 
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