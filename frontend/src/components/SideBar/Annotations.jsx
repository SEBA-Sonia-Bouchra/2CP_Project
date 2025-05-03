import React, { useState,useEffect, useRef } from 'react'
import AnnotationOptions from './AnnotationOptions'
import filledQuote from '../../assets/images/filled-quote.svg'
import more from '../../assets/images/more-vertical.svg'
import useCurrentUser from '../../utils/useCurrentUser';
import edit from '../../assets/images/edit.svg'

const Annotations = ({ setClickedAnnotation, currentUser, isOwner, projectID}) => {
  const [annotationOptions, setAnnotationOptions] = useState(null);
  const [annotationsData, setAnnotationsData] = useState([]);
  const annOptionsRef = useRef(null);
  const id = currentUser?._id;
  const user = useCurrentUser();
  const localhost = "http://localhost:5000";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (annOptionsRef.current && !annOptionsRef.current.contains(event.target)) {
        setAnnotationOptions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchAnnotations();
  }, [projectID]);

  const fetchAnnotations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/annotations/project/${projectID}/grouped`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error fetching annotations:", data.message);
        return;
      }

      // Flatten grouped annotations to render simply
      const flattened = data.groupedAnnotations.flatMap(group =>
        group.annotations.map(annotation => ({
          ...annotation,
          section: { id: group._id }, 
        }))
      );

      setAnnotationsData(flattened);
    } catch (error) {
      console.error("Error fetching annotations:", error);
    }
  };

  const handleUpdateAnnotation = (updatedAnnotation) => {     // this to update the annotation when it is modified
    setAnnotationsData(prev =>
      prev.map(ann => ann._id === updatedAnnotation._id ? updatedAnnotation : ann)
    );
    setAnnotationOptions(null); // close the 3-dot menu
  };
  

  return (
    <div className='text-black max-h-[300px] overflow-y-auto hide-scrollbar pb-11'>
      { annotationsData.length > 0 ? (
        annotationsData.map((annotation) => (
          <div key={annotation._id} className='w-full flex-grow flex flex-col relative'>
            <span className='h-[0.1px] bg-[#4f37267b] w-full '></span>
            {/* Author Info */}
            <div className='pt-3 px-3 flex flex-row gap-2'>
              <img src={`${localhost}${annotation.profilePicture} ` || edit}  alt="User profile picture" className='rounded-full h-6 w-6 object-cover object-cover'/>
              <div className='flex flex-col items-start text-xs '>
                <p className='hover:underline whitespace-nowrap cursor-pointer ]'>{`${annotation.firstname} ${annotation.lastname}`}</p>
                <span className='text-gray-500 text-[10px]'>
                  {new Date(annotation.createdAt).toLocaleDateString()}
                </span>
              </div>
              {(user.isProfessional === true)  ? (       
               <button className='rounded-full p-1 hover:bg-[#00000023] self-start ml-auto' onClick={() => {setAnnotationOptions(annotationOptions === annotation._id ? null : annotation._id)}}> 
                  <img src={more} alt="options" className='w-4 h-4 inline mx-1'/>
                </button>
              ) : (
                <></>
              )}
              { annotationOptions === annotation._id && (
                <AnnotationOptions isAnnotator={id === annotation.user} annotation={annotation} isOwner={isOwner} annOptionsRef={annOptionsRef}
                onDeleteSuccess={(deletedId) => {
                  setAnnotationsData(prev => prev.filter(a => a._id !== deletedId));
                  setAnnotationOptions(null); // closes the 3-dot menu
                }}
                onUpdateAnnotation={handleUpdateAnnotation}
                />
              )}
            </div>
  
            {/* Annotation Content */}
            <div className='px-3 pb-3 pt-2 w-full flex items-start'>
              <p className='text-xs overflow-hidden break-words clamped-text cursor-pointer'
                onClick={() => setClickedAnnotation(annotation)}>
                <span>
                  { annotation?.dimension?.toLowerCase() === 'architecture' ? (
                    <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2'/>
                  ) : annotation?.dimension?.toLowerCase() === 'history' ? (
                    <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 green-filter'/>
                  ) : annotation?.dimension?.toLowerCase() === 'archeology' ? (
                    <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 pink-filter'/>
                  ) : annotation?.dimension?.toLowerCase() === 'other' ?(
                    <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 red-filter'/>
                  ) : (
                      <span>{annotation.sectionId}</span>
                  )}
                </span>
                {annotation.content}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className='text-center p-5 text-sm'>
          there are no annotations
        </div>
      )}
    </div>
  );
};

export default Annotations