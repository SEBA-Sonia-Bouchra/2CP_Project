import React, { useState } from 'react';
import ModifyPermissions from './ModifyPermissions';
// todo
const Contributers = ({ project, isOwner }) => {
  const [showModifyPermissions, setShowModifyPermissions] = useState(false);
  const colors = ["#5D9AD0", "#3CC435", "#D662C4", "#D05D5F"];

  return (
    <div className='flex flex-col text-xs w-[232px] lg:w-[300px]'>
      <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
      
      {/* Project Owner */}
      <div className='p-2 flex flex-row justify-between'>
        <div className='flex flex-row items-center'>
          <img src={project.author.profilePicture} alt="User profile picture" className='rounded-full h-6 w-6' />
          <span className='pl-1 pr-5 hover:underline cursor-pointer'>{project?.author?.name || "Unknown"}</span>
        </div>
        <span className='self-center text-gray-400'>owner</span>
      </div>

      {/* Contributors List */}
      {project?.sections?.map((section, index) => (
        <div key={section.id} className='p-2 flex flex-row justify-between'>
          <div className='flex flex-row items-center'>
            <img src={section.author.profilePicture} alt="User profile picture" className='rounded-full h-6 w-6' />
            <span className='pl-1 pr-5 hover:underline cursor-pointer truncate max-w-[150px]'>
              {section?.author?.name || "Unknown"}
            </span>
          </div>
          <span style={{ color: colors[index] }} className='self-center capitalize'>
            {section?.dimension || "N/A"}
          </span>
        </div>
      ))}

      {/* Modify Permissions Button */}
      {isOwner && (
        <button 
          onClick={() => setShowModifyPermissions(!showModifyPermissions)}
          className=" bg-[#4F3726] text-white px-5 py-2 mb-2 rounded-full w-fit self-center"
        >
          Modify Permission
        </button>
      )}

      {/* Show ModifyPermissions Component */}
      {showModifyPermissions && <ModifyPermissions project={project} setShowModifyPermissions={setShowModifyPermissions}/>}

      <span className='mt-1 h-[0.1px] bg-[#4f37267b] w-full'></span>
    </div>
  );
};

export default Contributers;
