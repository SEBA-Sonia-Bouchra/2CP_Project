import React, { useState } from 'react';
import DeleteAnnotation from './DeleteAnnotation';
import ReportConflict from './reportConflict';
import EditAnnotation from './EditAnnotation';

const AnnotationOptions = ({ isOwner, isAnnotator, isContributer, annotation }) => {
    const [deleteAnnotation, setDeleteAnnotation] = useState (false);
    const [reportConflict, setReportConflict] = useState (false);
    const [editAnnotation, setEditAnnotation] = useState (false);

  return (
    <>
      <div className='border border-[#4f3726] flex flex-col items-center rounded-lg absolute right-3 top-10 mt-2 z-10 bg-white shadow-md whitespace-nowrap text-xs' >
         { (isOwner || isContributer) && (
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
         { (isAnnotator || isOwner || isContributer) && (
             <>
             <button  onClick={() => {setDeleteAnnotation(true)}} className='py-2 px-4'>Delete annotation</button> 
            </>
         )}
      </div>
      { deleteAnnotation && (
        <DeleteAnnotation setDeleteAnnotation={setDeleteAnnotation}/>
      )}
      { editAnnotation && (
        <EditAnnotation setEditAnnotation={setEditAnnotation} annotation={annotation}/>
      )}
      { reportConflict && (
        <ReportConflict setReportConflict={setReportConflict} annotation={annotation} isOwner={isOwner}/>
      )}
    </>
  )
}

export default AnnotationOptions