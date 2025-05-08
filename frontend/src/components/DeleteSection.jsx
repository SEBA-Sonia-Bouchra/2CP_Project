import axios from 'axios';
import React from 'react'

const DeleteSection = ({setDeleteSection, projectId, sectionId, onDeleteSection}) => {
  const handleDelete = async () => {
    try{
      const token = sessionStorage.getItem('token');
      const res = await axios.delete(`http://localhost:5000/api/projects/${projectId}/sections/${sectionId}`,{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (onDeleteSection) onDeleteSection(sectionId);
      setDeleteSection(false);
      
    }catch(err){
      console.log('Error deleting the section: ', err);
    }
  }



  return (
    <div className='fixed left-0 top-0 w-full flex items-center justify-center h-screen bg-black bg-opacity-25 z-30'>
        <div className=' bg-white rounded-md lg:w-1/2 max-w-lg p-2 text-[#]'>
            <p className='m-3 mb-7 text-center'>Do you want to delete this section?</p>
            <div className="flex justify-center px-3 pb-3 gap-2">
                <button 
                  className="border-[#4F3726] border text-[#4F3726] px-5 py-2 rounded-full text-sm hover:bg-gray-50 shadow-sm"
                  onClick={() => setDeleteSection(false)}
                >
                    Cancel
                </button>
                <button className="bg-[#4F3726] text-white px-5 py-2 rounded-full text-sm shadow-md"
                  onClick={handleDelete}
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeleteSection