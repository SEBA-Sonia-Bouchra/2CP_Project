import React from 'react';
import {Link} from 'react-router-dom'

const DescriptionDropDown = ({ project, dropdownRef}) => {

  return (
    <div ref={dropdownRef}      
      className='font-montserral flex z-10 flex-col items-center rounded-lg absolute right-0 top-full mt-2 bg-white shadow-md whitespace-nowrap'style={{ border: `1px solid #4f3726` }} >
            <Link to={`/projects/${project._id}/edit`}>
                <button className='py-2 px-4 text-sm'>Edit section</button>
            </Link>          
    </div>
  )
}

export default DescriptionDropDown