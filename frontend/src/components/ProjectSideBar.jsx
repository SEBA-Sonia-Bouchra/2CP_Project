import React, { useState } from 'react'
import options from '../assets/images/more-vertical.svg'
import users from '../assets/images/users.svg'
import edit from '../assets/images/edit.svg'
import sections from '../assets/images/thumbtack.svg'
import annotations from '../assets/images/quote.svg'
import Options from './SideBar/Options'
import Contributers from './SideBar/Contributers'
import Sections from './SideBar/Sections'
import EditRequest from './SideBar/EditRequest'
import Annotations from './SideBar/Annotations'

const ProjectSideBar = () => {
  return (
    <div className='sticky top-12 flex flex-col items-start bg-white  shadow-md h-fit border border-[#4f37267b] rounded-md hidden-div hover:min-w-[180px] text-[#4f3726] font-montserral'>
        <div className='flex flex-row hover:bg-[#4f3726] rounded-tr-md rounded-tl-md w-full'>
          <img src={options} alt="options" className='h-5 w-5 m-4 hidden-img' />
          <span className='self-center hidden-span'>Options</span>
        </div>
        <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
        <div className='flex flex-row hover:bg-[#4f3726] w-full'>
          <img src={users} alt="users" className='h-5 w-5 m-4 hidden-img' />
          <span className='self-center hidden-span'>Contributers</span>
        </div>
        <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
        <div className='flex flex-row hover:bg-[#4f3726] w-full'>
          <img src={edit} alt="edit" className='h-5 w-5 m-4 hidden-img' />
          <span className='self-center hidden-span'>Edit request</span>
        </div>
        <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
        <div className='flex flex-row hover:bg-[#4f3726] w-full'>
          <img src={sections} alt="sections" className='h-5 w-5 m-4 hidden-img' />
          <span className='self-center hidden-span'>Sections</span>
        </div>
        <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
        <div className='flex flex-row hover:bg-[#4f3726] w-full'>
          <img src={annotations} alt="annotations" className='h-5 w-5 m-4 hidden-img' />
          <span className='self-center hidden-span'>Annotations</span>
        </div>
    </div>
  );
};

export default ProjectSideBar;