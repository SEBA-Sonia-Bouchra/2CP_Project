import React, { useState } from 'react';
import AddAnnotation from './AddAnnotation';
import DeleteSection from './DeleteSection';

const SectionDropDown = ({color, section, isOwner, currentUser, project, setSectionDropDown, dropdownRef}) => {
  const [addAnnotation, setAddAnnotation] = useState (false);
  const [deleteSection, setDeleteSection] = useState (false);
  let isWriter = currentUser?._id === section.author;//////////////////////  

  return (
    <div ref={dropdownRef}>
      <div 
      
      className='flex z-10 flex-col items-center rounded-lg absolute right-0 top-full mt-2 bg-white shadow-md whitespace-nowrap'style={{ border: `1px solid ${color}` }} >
        <button className='py-2 px-4 text-sm' onClick={() => (setAddAnnotation(true))}>Add annotation</button>
        { isWriter && (
          <>
            <span className='h-[0.1px] w-full' style={{backgroundColor: `${color}`}}></span>
            <button className='py-2 px-4 text-sm'>Edit section</button>           
          </>
        )}
         { (isOwner || isWriter) && (
          <>
            <span className='h-[0.1px] w-full' style={{backgroundColor: `${color}`}}></span>
            <button className='py-2 px-4 text-sm' onClick={() => (setDeleteSection(true))}>Delete section</button> 
          </>
         )}
      </div>
      { addAnnotation && (
        <AddAnnotation color={color} section={section} setAddAnnotation={setAddAnnotation} projectId={project._id}
        onSaveAnnotation={() => {
          setAddAnnotation(false);      
          setSectionDropDown(null);     // Close dropdown
        }}
        />
      )}
      { deleteSection && (
        <DeleteSection setDeleteSection={setDeleteSection}/>
      )}
    </div>
  )
}

export default SectionDropDown