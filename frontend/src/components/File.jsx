import React, { useState, useEffect } from 'react';
import { getColorByDimension } from '../utils/helpers';
import SectionDropDown from './SectionDropDown';

const File = ({ project, isOwner, currentUser, isProfessional }) => {
    const [selectedCoverPicture, setSelectedCoverPicure] = useState(null);
    const [sectionDropDown, setSectionDropDown] = useState(null);

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
        <div className='w-full h-56 overflow-hidden rounded-t-md'>
            <img src={project.coverPhoto} alt="cover-picture" className='w-full h-full object-cover object-center cursor-pointer'
            onClick={ () => setSelectedCoverPicure(project.coverPhoto)}
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
            <h1 style={project.title.styles} className='pb-1'>{project.title.content}</h1>
            {/* date & author */}
            <p className='text-gray-500 text-[10px] font-montserral pb-1'>
              {new Date(project.dateOfPublish).toLocaleDateString()} {project.author.name}
            </p>
            {/* description */}
            { project.description &&
              <div id='description' className='my-3 w-full'>
                <h2 className='font-playfairdisplay mb-2 text-lg'>Description</h2>
                <div className='h-[1.5px] rounded-full bg-[#4f3726] mb-2'></div>
                <p style={project.description.styles}>{ project.description.content }</p>
              </div>
            }    

            {/* sections */}
            { project.sections.map((section, index) => {
              const color = getColorByDimension(section.dimension);

              return(
              <div key={index} id={`${section.id}`} className='my-3 w-full'>
                <div className='w-full flex flex-row justify-between mb-1'>
                  <h2 style={{ color: color, fontFamily: project.title.styles.fontFamily}} className='capitalize self-center text-lg '>
                    { section.dimension }
                  </h2>
                  <div className='relative flex flex-col'>
                    { isProfessional && (
                      <button className='rounded-full p-2 hover:bg-[#00000023] self-center' onClick={() => (setSectionDropDown(sectionDropDown === index ? null : index))}> 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" style={{ color: color }}>
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg> 
                      </button>
                    )}
                    {sectionDropDown === index && <SectionDropDown color={color} section={section} isOwner={isOwner} currentUser={currentUser}/>}
                  </div>
                </div>
                <div style={{ backgroundColor: color }} className={`h-[1.5px] rounded-full mb-2`}></div>
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
                        <p style={element.styles}>
                          {element.content.split('\n').map((line, index) => (
                          <span key={index}>{line}<br /></span>
                        ))}
                        </p>
                      )}
                      { element.type === 'image' && (
                        <img src={element.content} alt="image" className='w-full h-full object-cover'/>
                      )}
                      { element.type === 'video' && (
                        <video controls src={element.content}></video>
                      )}
                      { element.type === 'link' && (
                        <a href={ element.url } style={element.styles} target='_blank'> 
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
                      { element.type === 'table' && (
                        <table style={element.styles} className="w-full border border-collapse">
                          <thead>
                            <tr>
                              {element.content.headers.map((header, idx) => (
                                <th key={idx} className="border px-2 py-1">{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {element.content.rows.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                  <td key={cellIndex} className="border px-2 py-1">{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}

                    </div>
                  ))} 
                  </div>  
              </div>
              );
            })}
            {/* refrences */}
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
        </div>
    </div>
  )

}

export default File