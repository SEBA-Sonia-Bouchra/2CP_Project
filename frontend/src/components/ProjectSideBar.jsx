import React, { useState, useEffect } from 'react';
import options from '../assets/images/more-vertical.svg';
import users from '../assets/images/users.svg';
import edit from '../assets/images/edit.svg';
import sections from '../assets/images/thumbtack.svg';
import annotations from '../assets/images/quote.svg';
import Options from './SideBar/Options';
import Contributers from './SideBar/Contributers';
import Sections from './SideBar/Sections';
import EditRequest from './SideBar/EditRequest';
import Annotations from './SideBar/Annotations';
import ba from '../assets/images/ba.jpg'
import filledQuote from '../assets/images/filled-quote.svg' 

const ProjectSideBar = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [isStatic, setIsStatic] = useState(false); // Controls sidebar behavior, the sidebar becomes static (not affected by hovers) if we click on an option)
  const [clickedAnnotation, setClickedAnnotation] = useState(null); 

  const handleItemClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
      setIsStatic(false);
    } else {
      setSelectedItem(item);
      setIsStatic(true);
    }
  };

  useEffect(() => {
    if (clickedAnnotation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; 
    }
  
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [clickedAnnotation]);

  return (
    <>
      <div
        className={`sticky top-3 flex flex-col items-start bg-white shadow-md h-fit border border-[#4f37267b] 
          rounded-md text-[#4f3726] font-montserral overflow-clip
        ${isStatic ? 'w-auto' : 'hidden-div'}`} // Prevent hover effect when static
      >
        {/* Sidebar Items */}
        {[
          { id: 'options', label: 'Options', icon: options, component: <Options /> },
          { id: 'users', label: 'Contributors', icon: users, component: <Contributers /> },
          { id: 'edit', label: 'Edit Request', icon: edit, component: <EditRequest /> },
          { id: 'sections', label: 'Sections', icon: sections, component: <Sections /> },
          { id: 'annotations', label: 'Annotations', icon: annotations, component: <Annotations setClickedAnnotation={setClickedAnnotation} /> },
        ].map(({ id, label, icon, component }) => (
          <div key={id} className="w-full flex flex-col">
            <div
              onClick={() => handleItemClick(id)}
              className={`flex flex-row w-full cursor-pointer hover:bg-[#4f3726] ${selectedItem === id ? 'selected bg-[#4f3726]' : ''}`}
            >
              <img src={icon} alt={label} className={`h-5 w-5 m-4 hidden-img ${selectedItem === id ? 'selected-img' : ''}`} />
              <span className={`self-center hidden-span ${isStatic || selectedItem === id ? 'opacity-100 w-[200px]' : ''}`}>{label}</span>
            </div>
            <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
            {selectedItem === id && component}
          </div>
        ))}
      </div>

      {clickedAnnotation && (
      <div className='fixed top-0 w-full flex items-center justify-center h-screen bg-black bg-opacity-25'>
        <button className="absolute left-4 top-4 p-2 rounded-full flex items-center justify-center hover:bg-[#00000033]" onClick={() => setClickedAnnotation(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.36a1 1 0 1 1 1.414 1.414L13.415 10.586l4.36 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.36-4.36-4.36-4.36a1 1 0 0 1 0-1.415z" clipRule="evenodd" />
          </svg>
        </button>
        {/* annotation content */}
        <div className=' bg-white rounded-md w-1/2 max-w-lg p-2'>
          <div className='pt-3 px-3 flex flex-row gap-2 '>
            <img src={ba} alt="User profile picture" className='rounded-full h-6 w-6'/>
            <div className='flex flex-col items-start text-xs '>
              <p className='hover:underline whitespace-nowrap cursor-pointer'>{`${clickedAnnotation.name} ${clickedAnnotation.surname}`}</p>
              <span className='text-gray-500 text-[10px]'>
                {new Date(clickedAnnotation.createdAt).toLocaleDateString()}
              </span>
            </div>
            <span className='text-xs capitalize ml-auto'>architecture</span>
          </div>
          <div className='px-3 pb-3 pt-2 w-full flex items-start'>
            <p className='text-xs overflow-hidden break-words clamped-text cursor-pointer'>
              <span><img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2'/></span>
              {clickedAnnotation.content}
            </p>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default ProjectSideBar;
