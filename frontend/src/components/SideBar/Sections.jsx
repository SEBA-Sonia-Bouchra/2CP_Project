import React from 'react'
// todo
const Sections = ({project}) => {
  const colors = ["#5D9AD0", "#3CC435", "#D662C4", "#D05D5F"];
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
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
        { project.sections.map((section, index) => (
          <button key={section.id}  onClick={() => scrollToSection(`${section.id}`)} style={{ color: colors[index]}} className='capitalize hover:underline mb-1'>
            {section.dimension}
          </button>
        ) )}
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