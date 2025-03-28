import React, { useState, useEffect } from 'react';
import bg from '../assets/images/background.png'

const Projects = [
  {
    _id: '1',
    title: 'Timeless Elegance: The Architecture of Algiers',
    description: 'From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation.',
    author: { name: 'Dahmane Lharachi' },
    dateOfPublish: '2025-02-03T00:00:00Z',
    coverPhoto: bg, // Replace with actual image
    media: [],
    sections: [
      { content: 'From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation. [1]', dimension: 'archiecture' },
      { content: 'From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation. From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation. From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation. From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation. From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation. From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation.', dimension: 'history' },
      { content: 'From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation.', dimension: 'archeology' },
      { content: 'From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers\' architecture is a blend of history and innovation.', dimension: 'other' },
    ],
    references: [
      { title: '"The Architectural Heritage of Algiers" - A. Benyamina, 2021' },
      { title: 'National Institute of Urban Studies -', link: "www.nius-architecture.org"  },
    ],
  },
];

// useEffect(() => {
//   fetch(`http://localhost:5000/api/projects/1`) // Replace '1' with dynamic ID
//     .then((response) => response.json())
//     .then((data) => setProject(data))
//     .catch((error) => console.error(error));
// }, []);

const File = () => {
    const [selectedCoverPicture, setSelectedCoverPicure] = useState(null);
    const project = Projects[0];
    const colors = ["#5D9AD0", "#3CC435", "#D662C4", "#D05D5F"];

  return (
    <div className='w-full max-w-[800px] bg-white shadow-md h-fit rounded-md'>
        {/* cover picture section */}
        <div className='w-full h-56 overflow-hidden rounded-t-md'>
            <img src={bg} alt="cover-picture" className='w-full h-full object-cover object-center cursor-pointer'
            onClick={ () => setSelectedCoverPicure(project.coverPhoto)}
            />
        {selectedCoverPicture && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-y-auto">
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
            <h1 className='font-playfairdisplay pb-1 text-lg'>{project.title}</h1>
            {/* date & author */}
            <p className='text-gray-500 text-[10px] font-montserral pb-1'>
              {new Date(project.dateOfPublish).toLocaleDateString()} {project.author.name}
            </p>
            {/* description */}
            { project.description &&
              <div className='my-3 w-full'>
                <h2 className='font-playfairdisplay mb-2'>Description</h2>
                <div className='h-[1.5px] rounded-full bg-gray-300 mb-2'></div>
                <p className='font-montserral text-sm'>{ project.description }</p>
              </div>
            }
            {/* sections */}
            { project.sections.map((section, index) => (
              <div key={index} className='my-3 w-full'>
                <div className='w-full flex flex-row justify-between mb-1'>
                  <h2 style={{ color: colors[index] }} className='font-playfairdisplay capitalize self-center'>{ section.dimension }</h2>
                  <button className='rounded-full p-2 hover:bg-[#00000023] self-center'> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" style={{ color: colors[index] }}>
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg> 
                  </button>
                </div>
                <div style={{ backgroundColor: colors[index] }} className={`h-[1.5px] rounded-full mb-2`}></div>
                <p className='font-montserral text-sm'>{ section.content }</p>
              </div>
            ))}
            {/* refrences */}
              <div className='my-3 w-full'>
                <h2 className='font-playfairdisplay mb-2'>References</h2>
                <div className='h-[1.5px] rounded-full bg-gray-300 mb-2'></div>
                <ol className='list-decimal list-inside font-montserral text-sm'>
                  {project.references.map((reference, index) => (
                    <li key={index} id={`reference-${index}`} className="font-montserral text-sm">
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
        </div>
    </div>
  )

}

export default File