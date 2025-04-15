import React from 'react'

const ModifyPermissions = ({ project, setShowModifyPermissions }) => {
  const colors = ["#5D9AD0", "#3CC435", "#D662C4", "#D05D5F"];

  return (
    <div className='fixed left-0 top-0 w-full flex flex-col items-center justify-center h-screen bg-black bg-opacity-25 z-30 p-4'>
      {/* Close Button */}
      <button className="absolute left-4 top-28 p-2 rounded-full flex items-center justify-center hover:bg-[#00000033]" 
        onClick={() => setShowModifyPermissions(false)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.36a1 1 0 1 1 1.414 1.414L13.415 10.586l4.36 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.36-4.36-4.36-4.36a1 1 0 0 1 0-1.415z" clipRule="evenodd" />
        </svg>
      </button>
      
      {/* Modal Content */}
      <div className='flex flex-col text-xs bg-white rounded-md w-full lg:w-1/2 max-w-lg p-4'>
        
        {/* Project Owner */}
        <div className='p-2 flex flex-row justify-between items-center'>
          <div className='flex flex-row items-center'>
            <img src={project.author.profilePicture} alt="User profile picture" className='rounded-full h-6 w-6' />
            <span className='pl-1 pr-5 hover:underline cursor-pointer whitespace-nowrap truncate max-w-[150px]'>
              {project?.author?.name || "Unknown"}
            </span>
          </div>
          <span className='text-gray-400 mr-32'>Owner</span>
        </div>

        {/* Contributors List */}
        {project?.sections?.map((section, index) => (
          <div key={section.id} className='p-2 flex flex-row justify-between items-center'>
            <div className='flex flex-row items-center'>
              <img src={section.author.profilePicture} alt="User profile picture" className='rounded-full h-6 w-6' />
              <span className='pl-1 pr-5 hover:underline cursor-pointer truncate max-w-[150px]'>
                {section?.author?.name || "Unknown"}
              </span>
            </div>
            <span style={{ color: colors[index] }} className='ml-auto capitalize'>
              {section?.dimension || "N/A"}
            </span>
            <button className="hover:bg-[#4F3726] hover:text-white border-[#4F3726] border px-4 py-2 ml-3 rounded-full w-fit self-center whitespace-nowrap">
              Restrict Editing
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ModifyPermissions;
