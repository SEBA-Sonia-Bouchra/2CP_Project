import React, { useState, useEffect } from 'react';
import bg from '../assets/images/background.png'
import vid from '../assets/Videos/vid.mp4'

const Projects = [
  {
    _id: '1',
    title: {
      content: 'Timeless Elegance: The Architecture of Algiers',
      styles: { fontFamily: 'PlayfairDisplay' , fontSize: '20px' },
    },
    description: {
      content: 'Exploring the blend of Moorish, Ottoman, and modernist architectural styles in Algiers.',
      styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
    },
    author: { name: 'Dahmane Lharachi' },
    dateOfPublish: '2025-02-03T00:00:00Z',
    coverPhoto: bg, 
    media: [
      bg, 
      vid 
    ],
    sections: [
      {
        id: 'sec1',
        dimension: 'architecture',
        elements: [
          {
            type: 'text',
            content: 'Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings. Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings Algiers is home to a fusion of architectural influences, from Ottoman mosques to French colonial buildings [1]',
            position: { rowStart: 1, colStart: 1, colSpan: 2, rowSpan: 1 },
            styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
          },
          {
            type: 'image',
            content: bg,
            position: { rowStart: 1, colStart: 3, colSpan: 1, rowSpan: 2 },
          }
        ]
      },
      {
        id: 'sec2',
        dimension: 'history',
        elements: [
          {
            type: 'text',
            content: 'This video explores the historical evolution of Algiers\' architecture.',
            position: { rowStart: 1, colStart: 1, colSpan: 3, rowSpan: 1 },
            styles: { fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' },
          },
          {
            type: 'video',
            content: vid,
            position: { rowStart: 2, colStart: 1, colSpan: 3, rowSpan: 2 },
          }
        ]
      },
      {
        id: 'sec3',
        dimension: 'archeology',
        elements: [
          {
            type: 'text',
            content: 'Highlighted architectural dimensions:',
            position: { rowStart: 1, colStart: 1, colSpan: 2, rowSpan: 1 },
            styles: { fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold' },
          },
          {
            type: 'link',
            url: 'https://talents.esi.dz/scolar/index',
            content: "Learn more about Algiers' archeological sites",
            position: { rowStart: 2, colStart: 2, colSpan: 2, rowSpan: 2 },
            styles: { color: 'blue', textDecoration: 'underline' },
          },
          {
            type: 'shape',
            shapeType: 'triangle',
            position: { rowStart: 2, colStart: 2, colSpan: 2, rowSpan: 2 },
            styles: { fill: '#ffcc00', rotation: '45' },
          },
          {
            type: 'shape',
            shapeType: 'line',
            position: { rowStart: 4, colStart: 2, colSpan: 3, rowSpan: 1 },
            styles: { stroke: '#000', x1: 10, y1: 50, x2: 300, y2: 50, rotation: 0 },
          },
          {
            type: 'shape',
            shapeType: 'arrow',
            position: { rowStart: 5, colStart: 2, colSpan: 2, rowSpan: 1 },
            styles: { stroke: '#000', fill: 'transparent',x1: 10, y1: 50, x2: 50, y2: 50, rotation: 60 }
          },
          {
            type: 'shape',
            shapeType: 'circle',
            position: { rowStart: 2, colStart: 1, colSpan: 1, rowSpan: 1 },
            styles: { fill: '#3498db'}
          },
          {
            type: 'shape',
            shapeType: 'rectangle', // Can be 'line', 'arrow', 'rectangle', 'triangle', 'circle'
            position: { rowStart: 3, colStart: 1, colSpan: 2, rowSpan: 2 },
            styles: { fill: 'transparent', stroke: '#000', width: 100, height: 50 }
          }
        ]
      }
    ],
    references: [
      { title: '"The Architectural Heritage of Algiers" - A. Benyamina, 2021',             
        styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
      },
      { title: 'National Institute of Urban Studies -', link: "https://www.nius-architecture.org" ,
        styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
      },
    ],
  },
];

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
            <h1 style={project.title.styles} className='pb-1'>{project.title.content}</h1>
            {/* date & author */}
            <p className='text-gray-500 text-[10px] font-montserral pb-1'>
              {new Date(project.dateOfPublish).toLocaleDateString()} {project.author.name}
            </p>
            {/* description */}
            { project.description &&
              <div className='my-3 w-full'>
                <h2 className='font-playfairdisplay mb-2'>Description</h2>
                <div className='h-[1.5px] rounded-full bg-gray-300 mb-2'></div>
                <p style={project.description.styles}>{ project.description.content }</p>
              </div>
            }
            {/* sections */}
            { project.sections.map((section, index) => (
              <div key={index} className='my-3 w-full'>
                <div className='w-full flex flex-row justify-between mb-1'>
                  <h2 style={{ color: colors[index], fontFamily: project.title.styles.fontFamily}} className='capitalize self-center text-[16px]'>{ section.dimension }</h2>
                  <button className='rounded-full p-2 hover:bg-[#00000023] self-center'> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" style={{ color: colors[index] }}>
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg> 
                  </button>
                </div>
                <div style={{ backgroundColor: colors[index] }} className={`h-[1.5px] rounded-full mb-2`}></div>
                {/* section content */}
                <div className='grid grid-cols-3 gap-4 w-full border-gray-300'>
                { section.elements.map((element, index) => (
                    <div key={index} style={{
                      gridColumnStart: `${element.position.colStart}`,
                      gridColumnEnd: `span ${element.position.colSpan}`,
                      gridRowStart: `${element.position.rowStart}`,
                      gridRowEnd: `span ${element.position.rowSpan}`
                    }}>
                      { element.type === 'text' && (
                        <p style={element.styles}>{ element.content }</p>
                      )}
                      { element.type === 'image' && (
                        <img src={element.content} alt="image" className='w-full h-full object-cover'/>
                      )}
                      { element.type === 'video' && (
                        <video controls src={element.content}></video>
                      )}
                      { element.type === 'link' && (
                        <a href={ element.url } style={element.styles}> 
                          { element.content }
                        </a>
                      )}       
                      { element.type === 'shape' && (
                        <svg className="w-full h-full">
                          {/* Line */}
                          { element.shapeType === 'line' && (
                            <line   x1={element.styles.x1} y1={element.styles.y1} x2={element.styles.x2} y2={element.styles.y2} 
                              stroke={element.styles.stroke} strokeWidth={element.styles.strokeWidth} 
                              transform={`rotate(${element.styles.rotation || 0}, ${(element.styles.x1 + element.styles.x2) / 2}, ${(element.styles.y1 + element.styles.y2) / 2})`}                            />
                          )}
                          {/* arrow */}
                          {element.shapeType === 'arrow' && (
                            <>
                              <line x1={element.styles.x1} y1={element.styles.y1} x2={element.styles.x2} y2={element.styles.y2} 
                                stroke={element.styles.stroke} 
                                strokeWidth="1"
                                transform={`rotate(${element.styles.rotation || 0}, ${element.styles.x2}, ${element.styles.y2})`} 
                              />

                              <polygon points="-5,-5 0,0 -5,5"  
                                fill={element.styles.stroke} 
                                transform={`
                                  translate(${element.styles.x2}, ${element.styles.y2}) 
                                  rotate(${element.styles.rotation || 0})
                                `}
                              />
                            </>
                          )}


                          {/* Rectangle */}
                          { element.shapeType === 'rectangle' && (
                            <rect x="20" y="20" width={element.styles.width || 50} height={element.styles.height || 30}
                              fill={element.styles.fill} stroke={element.styles.stroke} strokeWidth='1'
                              transform={`rotate(${element.styles.rotation || 0}, 45, 45)`} // Center rotation
                            />
                          )}

                          {/* Circle */}
                          { element.shapeType === 'circle' && (
                            <circle cx="50" cy="50" r="30" 
                              fill={element.styles.fill} stroke={element.styles.stroke} strokeWidth='1'
                              transform={`rotate(${element.styles.rotation || 0}, 50, 50)`} // Circles rotate around their center naturally
                            />
                          )}

                          {/* Triangle */}
                          { element.shapeType === 'triangle' && (
                            <polygon points="50,10 10,80 90,80"
                              fill={element.styles.fill} stroke={element.styles.stroke} strokeWidth='1' 
                              transform={`rotate(${element.styles.rotation || 0}, 50, 50)`} // Rotate around center
                            />
                          )}
                        </svg>
                      )}


                    </div>
                  ))} 
                  </div>  
              </div>
            ))}
            {/* refrences */}
              <div className='my-3 w-full'>
                <h2 className='font-playfairdisplay mb-2'>References</h2>
                <div className='h-[1.5px] rounded-full bg-gray-300 mb-2'></div>
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
        </div>
    </div>
  )

}

export default File