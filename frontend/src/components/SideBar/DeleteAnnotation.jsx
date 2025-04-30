import React from 'react';
import axios from 'axios';

const DeleteAnnotation = ({ annotationId, setDeleteAnnotation, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:5000/api/annotations/${annotationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
      }});
      onDeleteSuccess(annotationId); // remove it from UI state
      setDeleteAnnotation(false); 
      alert("Annotation deleted successfully")  
    } catch (err) {
      console.error("Failed to delete annotation:", err);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className='fixed left-0 top-0 w-full flex items-center justify-center h-screen bg-black bg-opacity-25 z-30'>
      <div className='bg-white rounded-md lg:w-1/2 max-w-lg p-2'>
        <p className='m-3 mb-7 text-center'>Do you want to delete this annotation?</p>
        <div className="flex justify-center px-3 pb-3 gap-2">
          <button
            className="border-[#4F3726] border text-[#4F3726] px-5 py-2 rounded-full text-sm hover:bg-gray-50 shadow-sm"
            onClick={() => setDeleteAnnotation(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#4F3726] text-white px-5 py-2 rounded-full text-sm shadow-md"
            onClick={handleDelete}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAnnotation;
