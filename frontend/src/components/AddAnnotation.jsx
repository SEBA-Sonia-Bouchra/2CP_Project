import React, { useEffect, useState } from 'react'
import filledQuote from '../assets/images/filled-quote.svg';
import useCurrentUser from '../utils/useCurrentUser'

const AddAnnotation = ({color, section, setAddAnnotation, onSaveAnnotation, projectId}) => {
  const [annotationText, setAnnotationText] = useState('');
  const user = useCurrentUser();

  // Handle saving the annotation
  const handleSave = async () => {
    if (annotationText.trim() === '') {
      return;
    }

    const token = localStorage.getItem('token'); // Or however you're storing JWT
    
    const annotationData = {
      user: user?._id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      content: annotationText,
      projectId: projectId,
      sectionId: section._id,
      dimension: section.dimension,
      createdAt: new Date().toISOString(),
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/annotations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token to the backend
        },
        body: JSON.stringify(annotationData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save annotation");
      }
  
      const savedAnnotation = await response.json();
      if (onSaveAnnotation) {
        onSaveAnnotation(savedAnnotation.annotation);
      }
      console.log('annotation added successfully')
      
      } catch (error) {
      console.error("Error saving annotation:", error);
    }
  };
  

  return (
    <div className='fixed left-0 top-0 w-full flex items-center justify-center h-screen bg-black bg-opacity-25 z-20'>
        {/* annotation content */}
        <div className=' bg-white rounded-md lg:w-1/2 max-w-lg min-w-96 p-2'>
            <div className='pt-3 px-3 flex flex-row gap-2 items-start w-full'>
                <span>
                    { color === '#5D9AD0' ? (
                    <img src={filledQuote} alt="quote icon" className='w-4 h-4 inline mr-2'/>
                    ) : color === '#3CC435' ? (
                    <img src={filledQuote} alt="quote icon" className='w-4 h-4 inline mr-2 green-filter'/>
                    ) : color === '#D662C4' ? (
                    <img src={filledQuote} alt="quote icon" className='w-4 h-4 inline mr-2 pink-filter'/>
                    ) : (
                    <img src={filledQuote} alt="quote icon" className='w-4 h-4 inline mr-2 red-filter'/>
                    )}
                </span>               
                <h3 >Add annotation</h3>
                    <span style={{ color: color }} className='text-xs capitalize ml-auto self-center'>{section.dimension}</span>
            </div>
            <textarea 
                placeholder='Add text here' 
                autoFocus
                rows="4"
                value={annotationText}
                onChange={(e) => setAnnotationText(e.target.value)}
                className='shadow-sm hover:shadow-md m-3 w-[95%] p-3 outline-none rounded-md border border-gray-200 resize-none text-sm hide-scrollbar'
            ></textarea>
            <div className="flex justify-end px-3 pb-3 gap-2">
                <button 
                  className="border-[#4F3726] border text-[#4F3726] px-5 py-2 rounded-full text-sm hover:bg-gray-50 shadow-sm"
                  onClick={() => setAddAnnotation(false)}
                >
                    Cancel
                </button>
                <button className="bg-[#4F3726] text-white px-5 py-2 rounded-full text-sm shadow-md"
                  onClick={() => handleSave()}
                >
                    Save
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddAnnotation
