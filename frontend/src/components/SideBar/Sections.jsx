import React from 'react'
import { getColorByDimension } from '../../utils/helpers';

const Sections = ({project}) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const yOffset = -110; // height of your fixed navbar
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className='flex flex-col items-start p-3 text-xs w-[232px] lg:w-[300px]'>
        { project.description && (
          <button onClick={() => scrollToSection("description")} className='capitalize hover:underline mb-1'>
            description
          </button>
        )}
        { project.sections.map((section, index) => {
          const color = getColorByDimension(section.dimension);
          return(
            <button key={section.id}  onClick={() => scrollToSection(`${section.id}`)} style={{ color: color}} className='capitalize hover:underline mb-1'>
            {section.dimension}
          </button>
          )
        })}
        { project.references && (
          <button onClick={() => scrollToSection("references")} className='capitalize hover:underline mb-1 text-gray-400'>
            references
          </button>
        )}
      </div>
      <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
    </>
  )
}

export default Sections