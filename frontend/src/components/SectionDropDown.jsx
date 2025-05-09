import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import AddAnnotation from './AddAnnotation';
import DeleteSection from './DeleteSection';

const SectionDropDown = ({color, section, isOwner, currentUser, project, setSectionDropDown, dropdownRef, onDeleteSection}) => {
  const [addAnnotation, setAddAnnotation] = useState (false);
  const [deleteSection, setDeleteSection] = useState (false);
  let isWriter = currentUser?._id === section?.contributor?._id; 

  return (
    <div ref={dropdownRef}>
      <div    
      className='flex z-10 flex-col items-center rounded-lg absolute right-0 top-full mt-2 bg-white shadow-md whitespace-nowrap font-montserral'style={{ border: `1px solid ${color}` }} >
        <button className='py-2 px-4 text-sm' onClick={() => (setAddAnnotation(true))}>Add annotation</button>
        { isWriter && (
          <>
            <span className='h-[0.1px] w-full' style={{backgroundColor: `${color}`}}></span>
            <Link to={`/projects/${project._id}/edit`}>
              <button className='py-2 px-4 text-sm'>Edit section</button>
            </Link>           
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
        <DeleteSection setDeleteSection={setDeleteSection} sectionId={section._id} projectId={project._id} onDeleteSection={onDeleteSection}/>
      )}
    </div>
  )
}

export default SectionDropDown