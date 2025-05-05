import React from 'react'
import { getColorByDimension } from '../../utils/helpers';

const Sections = ({project}) => {
  const scrollToSection = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      const yOffset = -110;
      if (element) {
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100); // small delay
  };

  return (
    <>
      <div className='flex flex-col items-start p-3 text-xs w-[232px] lg:w-[300px]'>
        { project.description && (
          <button onClick={() => scrollToSection("description")} className='capitalize hover:underline mb-1'>
            description
          </button>
        )}
        { project.sections.map((section) => {
          const color = getColorByDimension(section.dimension);
          return(
            <button key={section._id} onClick={() => scrollToSection(`${section._id}`)} style={{ color: color}} className='capitalize hover:underline mb-1'>
            {section.dimension}
          </button>
          )
        })}
        { project.references?.length > 0 && (
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