import React, { useState } from 'react';
import DeleteAnnotation from './DeleteAnnotation';
import ReportConflict from './ReportConflict';
import EditAnnotation from './EditAnnotation';
import useCurrentUser from '../../utils/useCurrentUser';

const AnnotationOptions = ({project, isOwner, isAnnotator, annotation, onDeleteSuccess, onUpdateAnnotation, annOptionsRef}) => {
  const [deleteAnnotation, setDeleteAnnotation] = useState (false);
  const [reportConflict, setReportConflict] = useState (false);
  const [editAnnotation, setEditAnnotation] = useState (false);
  const user  = useCurrentUser();
  return (
    <div ref={annOptionsRef}>
      <div 
      className='border border-[#4f3726] flex flex-col items-center rounded-lg absolute right-3 top-10 mt-2 z-20 bg-white shadow-md whitespace-nowrap text-xs overflow-hidden' >
         { (user?.isProfessional === true && !isAnnotator) && (
             <>
             <button onClick={() => {setReportConflict(true)}}  className='py-2 px-4'>Report conflict</button>           
             <span className='h-[0.1px] w-full bg-[#4f3726]' ></span>
          </>
         )}
         { (isAnnotator) && (
             <>
             <button onClick={() => {setEditAnnotation(true)}}  className='py-2 px-4'>Edit annotation</button>           
             <span className='h-[0.1px] w-full bg-[#4f3726]' ></span>
          </>
         )}
         { (isAnnotator || isOwner ) && (      
             <>
             <button  onClick={() => {setDeleteAnnotation(true)}} className='py-2 px-4'>Delete annotation</button> 
            </>
         )}
      </div>
      { deleteAnnotation && (
        <DeleteAnnotation
          annotationId={annotation._id}
          setDeleteAnnotation={setDeleteAnnotation}
          onDeleteSuccess={onDeleteSuccess}
        />
      )}
      { editAnnotation && (
        <EditAnnotation setEditAnnotation={setEditAnnotation} annotation={annotation} 
        onSaveAnnotation={(updated) => {
          onUpdateAnnotation(updated);
          setEditAnnotation(false);
        }}/>
      )}
      { reportConflict && (
        <ReportConflict setReportConflict={setReportConflict} annotation={annotation} project={project}/>
      )}
    </div>
  )
}

export default AnnotationOptions