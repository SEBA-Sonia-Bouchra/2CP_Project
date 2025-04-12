import React , {useRef, useState, useEffect} from 'react'
import {Plus ,ChevronDown ,ChevronUp ,Minus} from 'lucide-react'

export default function EditProject() {
  const [image,setImage]=useState("");
  const [showTypeSection, setShowTypeSection]=useState(false);
  const [sections, setSections] = useState([]);
  const dropdownList=useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownList.current && !dropdownList.current.contains(event.target)) {
        setShowTypeSection(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const addSection = (type) => {
    const newSection = {
      id: sections.length + 1, // Unique ID for each section
      type: type,      // Default section title
      content: '',             // Content for the section (can be empty to start)
      showContent: true,
    };
    setSections([...sections, newSection]);
    setShowTypeSection(false);
  };
  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };
  const toggleContentVisibility = (id) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, showContent: !section.showContent } : section
      )
    );
  };  
  const renderSection = (section) => {
    switch (section.type) {
      case 'Description':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-black py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl'>Description</h1>
              <div className='flex place-self-end gap-2'>
                <Minus className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full' onClick={()=>removeSection(section.id)}/>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                 onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                 rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <textarea value={section.content} onChange={(e) => setSections( sections.map((sec) => sec.id === section.id ? 
            { ...sec, content: e.target.value } : sec ))} className="border-0 p-0 m-0 bg-transparent outline-none resize-none w-full py-4"/>}
          </div>
        );
      case 'Architecture':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-[#5D9AD0] py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl text-[#5D9AD0]'>Architecture</h1>
              <div className='flex place-self-end gap-2'>
                <Minus className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full' onClick={()=>removeSection(section.id)}/>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <textarea value={section.content} onChange={(e) => setSections( sections.map((sec) => sec.id === section.id ? 
            { ...sec, content: e.target.value } : sec ))} className="border-0 p-0 m-0 bg-transparent outline-none resize-none w-full py-4"/>}
          </div>
        );
      case 'History':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-[#3CC435] py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl text-[#3CC435]'>History</h1>
              <div className='flex place-self-end gap-2'>
                <Minus className='cursor-pointer' onClick={()=>removeSection(section.id)}/>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <textarea value={section.content} onChange={(e) => setSections( sections.map((sec) => sec.id === section.id ? 
            { ...sec, content: e.target.value } : sec ))} className="border-0 p-0 m-0 bg-transparent outline-none resize-none w-full py-4"/>}
          </div>
        );
      case 'Archeology':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-[#D662C4] py-3 grid grid-cols-2'>
              <h1 className='font-playfairdisplay text-2xl text-[#D662C4]'>Archeology</h1>
              <div className='flex place-self-end gap-2'>
                <Minus className='cursor-pointer' onClick={()=>removeSection(section.id)}/>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full'
                onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <textarea value={section.content} onChange={(e) => setSections( sections.map((sec) => sec.id === section.id ? 
            { ...sec, content: e.target.value } : sec ))} className="border-0 p-0 m-0 bg-transparent outline-none resize-none w-full py-4"/>}
          </div>
        );
      case 'Other':
        return (
          <div key={section.id} className='shadow-lg rounded-lg px-4 py-3' >
            <div className='border-b border-black py-3 grid grid-cols-2'>
              <input type='text' className='appearance-none outline-none font-playfairdisplay text-2xl' placeholder='Add a title'>
              </input>
              <div className='flex place-self-end gap-2'>
                <Minus className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full' onClick={()=>removeSection(section.id)}/>
                {section.showContent ? <ChevronDown className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-full' 
                onClick={()=>toggleContentVisibility(section.id)}/> : <ChevronUp className='cursor-pointer hover:bg-[#D9D9D9] hover:bg-opacity-50
                rounded-full' onClick={()=>toggleContentVisibility(section.id)}/>}
              </div>
            </div>
            {section.showContent && <textarea value={section.content} onChange={(e) => setSections( sections.map((sec) => sec.id === section.id ? 
            { ...sec, content: e.target.value } : sec ))} className="border-0 p-0 m-0 bg-transparent outline-none resize-none w-full py-4"/>}
          </div>
          );
      default:
        return null;
    }
  };
  return (
    <>
      <div className='flex flex-col items-center justify-self-center font-montserral min-h-screen w-[900px] shadow-lg overflow-y-auto'>
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
          <div  ref={dropdownList}>
            <div className={`group flex items-center text-lg cursor-pointer transition-all duration-300 ease-in-out overflow-hidden drop-shadow-md
            rounded-full px-4 py-3 ${showTypeSection ? 'bg-[#D9D9D9] bg-opacity-50 w-48' : 'bg-white hover:w-48 w-[54px]'} hover:bg-[#D9D9D9] hover:bg-opacity-50`} 
            onClick={() => setShowTypeSection((prev) => !prev)}>
              <Plus  className="shrink-0"/>
              <span className={`ml-3 whitespace-nowrap ${!showTypeSection && 'opacity-0'} group-hover:opacity-100 transition-opacity duration-300`}>Add a section</span>
            </div>
            {showTypeSection && (<ul className='shadow-xl text-center  w-48 cursor-pointer rounded-md mt-2 bg-white divide-y
             divide-[#D9D9D9]'>
                <li className=' py-2 px-4 hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-t-md' onClick={() => addSection('Description')}>Description</li>
                <li className=' py-2 px-4 hover:bg-[#D9D9D9] hover:bg-opacity-50' onClick={() => addSection('Architecture')}>Architecture</li>
                <li className=' py-2 px-4 hover:bg-[#D9D9D9] hover:bg-opacity-50' onClick={() => addSection('History')}>History</li>
                <li className=' py-2 px-4 hover:bg-[#D9D9D9] hover:bg-opacity-50' onClick={() => addSection('Archeology')}>Archeology</li>
                <li className='py-2 px-4 hover:bg-[#D9D9D9] hover:bg-opacity-50 rounded-b-md' onClick={() => addSection('Other')}>Other</li>
              </ul>)}
          </div>
          <button className='bg-[#4F3726] text-white text-lg py-2.5 px-10 rounded-full place-self-end shadow-md '>
            Save
          </button>
        </div>
      </div>
    </>
  )
}
