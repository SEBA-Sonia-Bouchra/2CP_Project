import React, { useState, useEffect, useRef  } from 'react';
import { getColorByDimension } from '../utils/helpers';
import SectionDropDown from './SectionDropDown';
import DescriptionDropDown from './DescriptionDropDown';
import '../index.css'

const File = ({ project, isOwner, currentUser, isProfessional }) => {
    const [selectedCoverPicture, setSelectedCoverPicure] = useState(null);
    const [sectionDropDown, setSectionDropDown] = useState(null);
    const [descriptionDropDown, setDescriptionDropDown] = useState(false);
    const [sections, setSections] = useState(project.sections || []);

    const descDropdownRef = useRef(null);
    const descButtonRef = useRef(null);
    const sectionDropdownRef = useRef(null);
    const sectionButtonRef = useRef(null);

    const localhost = "http://localhost:5000/";

    useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideDesc = descDropdownRef.current &&
        !descDropdownRef.current.contains(event.target) &&
        descButtonRef.current &&
        !descButtonRef.current.contains(event.target);

      const clickedOutsideSection = sectionDropdownRef.current &&
        !sectionDropdownRef.current.contains(event.target) &&
        sectionButtonRef.current &&
        !sectionButtonRef.current.contains(event.target);

      if (clickedOutsideDesc) {
        setDescriptionDropDown(false);
      }

      if (clickedOutsideSection) {
        setSectionDropDown(null);
      }
    };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

    

    useEffect(() => {
      setSections(project.sections || []);
    }, [project.sections]);
    
    const handleDeleteSection = (sectionId) => {
      setSections((prevSections) => prevSections.filter(section => section._id !== sectionId));
      setSectionDropDown(null); // Close dropdown
    };    

    useEffect(() => {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
          return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, []);
        
  return (
    <div className='w-full max-w-[900px] bg-white shadow-md h-fit rounded-md'>
        {/* cover picture section */}
        <div className='w-full h-72 overflow-hidden rounded-t-md'>
          {/* <img src={`${localhost}${project.coverPhoto}`} alt="cover-picture" className='w-full h-full object-contain object-center cursor-pointer' */}
            <img src={`${localhost}${project.coverPhoto}`} alt="cover-picture" className='w-full h-full object-cover object-center cursor-pointer'
            onClick={ () => setSelectedCoverPicure(`${localhost}${project.coverPhoto}`)}
            />
        {selectedCoverPicture && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-y-auto top-0 z-50">
            <div className="p-5 rounded-lg w-full flex justify-center relative">
              <button className="absolute left-4 top-4 p-[9px] rounded-full flex items-center justify-center hover:bg-[#00000033]" onClick={() => setSelectedCoverPicure(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                  <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.36a1 1 0 1 1 1.414 1.414L13.415 10.586l4.36 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.36-4.36-4.36-4.36a1 1 0 0 1 0-1.415z" clipRule="evenodd" />
                </svg>
              </button>
              <img src={selectedCoverPicture} alt="Selected Cover" className="max-w-full max-h-[90vh] rounded-md shadow-lg" />
            </div>
          </div>
        )} 
        </div>

        <div className='p-4'>
            {/* title */}
            <h1 className='pb-1 font-playfairdisplay'>{project.title}</h1>
            {/* date & author */}
            <p className='text-gray-500 text-[10px] font-montserral pb-1'>
              {new Date(project.dateOfPublish).toLocaleDateString()} - {project?.author?.firstname} {project?.author?.lastname}
            </p>
            {/* description */}
            { project.description &&
              <div id='description' className='my-3 w-full'>
                <div className='w-full flex flex-row justify-between mb-1'>
                  <h2 className='font-playfairdisplay mb-2 text-lg'>Description</h2>
                  <div className='relative flex flex-col'>
                    {isOwner && 
                    <button className='rounded-full p-2 hover:bg-[#00000023] self-center' ref={descButtonRef} onClick={() => setDescriptionDropDown(prev => !prev)}> 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#4f3726]">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg> 
                    </button>
                    }
                    {descriptionDropDown && 
                      <DescriptionDropDown dropdownRef={descDropdownRef} project={project}/>
                    }             
                  </div>
                </div>
                <div className='h-[1.5px] rounded-full bg-[#4f3726] mb-2'></div>
                <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: project.description }} />
                </div>
            }    

            {/* sections */}
             { sections.map((section, index) => {
              const color = getColorByDimension(section.dimension);

              return(
              <div key={index} id={`${section.id}`} className='my-3 w-full'>
                <div className='w-full flex flex-row justify-between mb-1'>
                  <h2 style={{color: color}} className='capitalize self-center text-lg font-playfairdisplay'>
                    { section.dimension }
                  </h2>
                  <div className='relative flex flex-col'>
                    { isProfessional && (
                      <button className='rounded-full p-2 hover:bg-[#00000023] self-center' ref={sectionButtonRef} onClick={() => setSectionDropDown(prev => (prev === index ? null : index))}> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" style={{ color: color }}>
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg> 
                      </button>
                    )}
                    {sectionDropDown === index && 
                    <SectionDropDown color={color} section={section} isOwner={isOwner} currentUser={currentUser} project={project} setSectionDropDown={setSectionDropDown} 
                    dropdownRef={sectionDropdownRef} onDeleteSection={handleDeleteSection}/>
                    }
                  </div>
                </div>
                <div style={{ backgroundColor: color }} className={`h-[1.5px] rounded-full mb-2`}></div> 
                 {/* section content */}
                 <div className='w-full'>
                  <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: section.content }} />
                 </div> 
              </div>
              );
            })}
            {/* refrences */}
              { project.references && project.references.length > 0 &&
              <div id='references' className='my-3 w-full'>
              <h2 className='font-playfairdisplay mb-2 text-lg'>References</h2>
              <div className='h-[1.5px] rounded-full bg-gray-400 mb-2'></div>
              <ol className='list-decimal list-inside font-montserral text-sm'>
                {project.references.map((reference, index) => (
                  <li key={index} id={`reference-${index}`} style={reference.styles}>
                    {reference.title} <span> </span>
                  {reference.link ? (
                    <a href={reference.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      {reference.link}
                    </a>
                    ) : (
                      <p></p>
                    )}
                </li>
                ))}
              </ol>
            </div>
            }
        </div>
    </div>
  )

}

export default File