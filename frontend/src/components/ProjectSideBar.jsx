import React, { useState, useEffect } from 'react';
import options from '../assets/images/more-vertical.svg';
import users from '../assets/images/users.svg';
import edit from '../assets/images/edit-request.svg';
import sections from '../assets/images/thumbtack.svg';
import annotations from '../assets/images/quote.svg';
import Options from './SideBar/Options';
import Contributers from './SideBar/Contributers';
import Sections from './SideBar/Sections';
import EditRequest from './SideBar/EditRequest';
import Annotations from './SideBar/Annotations';
import ClickedAnnotation from './SideBar/ClickedAnnotation'
import EditRequests from './SideBar/EditRequests';

const ProjectSideBar = ({ project, isOwner, currentUser, isProfessional, name }) => {
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

  const sidebarItems = [
    { id: 'options', label: 'Options', icon: options, component: <Options isOwner={isOwner} project={project}/> },
    { id: 'users', label: 'Contributors', icon: users, component: <Contributers project={project} isOwner={isOwner} name={name} /> },
    ...(isProfessional ? [{
      id: 'edit',
      label: isOwner ? 'Edit Requests' : 'Edit Request',
      icon: edit,
      component: isOwner ? <EditRequests /> : <EditRequest />
    }] : []),
    { id: 'sections', label: 'Sections', icon: sections, component: <Sections project={project}/> },
    { id: 'annotations', label: 'Annotations', icon: annotations, component: <Annotations setClickedAnnotation={setClickedAnnotation} currentUser={currentUser} isOwner={isOwner} projectID={project._id}/>},
  ];
  
  return (
    <>
    
    <div className={`sticky sm:top-28 lg:top-32 h-fit ${isStatic ? 'w-[232px] lg:w-[300px]' : 'hover:lg:w-[300px] hidden-div'}`}> {/* Prevent hover effect when static' */}
      <div
        className={`z-10 flex flex-col items-start bg-white shadow-md h-fit border border-[#4f37267b] 
          rounded-md text-[#4f3726] overflow-hidden font-montserral`}>
          { sidebarItems.map(({id, label, icon, component}, index) => (
          <div key={id} className="w-full flex flex-col">
            <div
              onClick={() => handleItemClick(id)}
              className={`flex flex-row w-full cursor-pointer hover:bg-[#4f3726] transition-all duration-300 ease-in-out ${selectedItem === id ? 'selected bg-[#4f3726]' : ''}`}
            >
              <img src={icon} alt={label} className={`h-5 w-5 m-4 hidden-img ${selectedItem === id ? 'selected-img' : ''}`} />
              <span className={`self-center hidden-span ${isStatic || selectedItem === id ? 'opacity-100 w-[200px]' : ''}`}>{label}</span>
            </div>
            {index < sidebarItems.length - 1 && (
              <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
            )}
            {selectedItem === id && component}
          </div>
        ))}
      </div>
      </div> 

      {clickedAnnotation && (
        <ClickedAnnotation setClickedAnnotation={setClickedAnnotation} clickedAnnotation={clickedAnnotation}/>
      )}
    </>
  );
};

export default ProjectSideBar;
