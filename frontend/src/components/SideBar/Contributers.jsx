import React, { useState } from 'react';
import ModifyPermissions from './ModifyPermissions';
import { getColorByDimension } from '../../utils/helpers';
import edit from '../../assets/images/edit.svg'

const Contributers = ({ project, isOwner }) => {
  const [showModifyPermissions, setShowModifyPermissions] = useState(false);
  const localhost = "http://localhost:5000";

  return (
    <div className='flex flex-col text-xs w-[232px] lg:w-[300px]'>
      <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
      
      {/* Project Owner */}
      <div className='p-2 flex flex-row justify-between'>
        <div className='flex flex-row items-center'>
          <img src={`${localhost}${project?.author?.profilePicture} ` || edit} alt="User profile picture" className='rounded-full h-6 w-6 object-cover object-center' />
          <span className='pl-1 pr-5 hover:underline cursor-pointer'>
            {(project?.author)? ` ${project.author.firstname} ${project.author.lastname}` : "Unknown"}
          </span>
        </div>
        <span className='self-center text-gray-400'>owner</span>
      </div>

      {/* Contributors List */}
      {project?.sections?.map((section) => {
        const color = getColorByDimension(section.dimension);

        return(
          <div key={section._id} className='p-2 flex flex-row justify-between'>
          <div className='flex flex-row items-center'>
            <img src={`${localhost}${section?.contributor?.profilePicture}`} alt="User profile picture" className='rounded-full h-6 w-6 object-cover object-center' />
            <span className='pl-1 pr-5 hover:underline cursor-pointer truncate max-w-[150px]'>
              {section?.contributor?.firstname || "Unknown"}
            </span>
          </div>
          <span style={{ color: color }} className='self-center capitalize'>
            {section?.dimension || "N/A"}
          </span>
        </div>
        );
      })}

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
