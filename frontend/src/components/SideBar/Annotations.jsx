import React, { useState } from 'react'
import ba from '../../assets/images/ba.jpg'
import filledQuote from '../../assets/images/filled-quote.svg'

const annotationsData = [
  {
    _id: "66123abcde4567f890123456",
    user: "660f12ab34cd56ef78901234",
    name: "Dahmane",
    surname: "Lharachi",
    profilePicture: ba,
    content: "From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers' architecture is a blend of history and innovation.",
    project: "661987abcdef123456789012", 
    sectionId: "sec1", 
    dimension: "architecture",
    createdAt: "2026-02-24T10:30:00Z",
  },
  {
    _id: "66123abcde4567f890123456",
    user: "660f12ab34cd56ef78901234",
    name: "Dahmane",
    surname: "Lharachi",
    profilePicture: ba,
    content: "From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers' architecture is a blend of history and innovation.",
    project: "661987abcdef123456789012", 
    sectionId: "sec2", 
    dimension: "history",
    createdAt: "2026-02-24T10:30:00Z",
  },
  {
    _id: "66123abcde4567f890123456",
    user: "660f12ab34cd56ef78901234",
    name: "Dahmane",
    surname: "Lharachi",
    profilePicture: ba,
    content: "From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers' architecture is a blend of history and innovation.",
    project: "661987abcdef123456789012", 
    sectionId: "sec3", 
    dimension: "archeology",
    createdAt: "2026-02-24T10:30:00Z",
  },
  {
    _id: "66123abcde4567f890123457",
    user: "660f12ab34cd56ef78901235",
    name: "Amina",
    surname: "Bouzid",
    profilePicture: ba,
    content: "The fusion of Ottoman, French colonial, and contemporary styles creates a unique architectural identity in Algiers.",
    project: "661987abcdef123456789013",
    sectionId: "sec3",
    dimension: "archeology",
    createdAt: "2026-03-10T15:45:00Z",
  },
];

const Annotations = ({ setClickedAnnotation }) => {
  return (
    <div className='text-black h-[300px] overflow-y-auto hide-scrollbar'>
      {annotationsData.map((annotation) => (
        <div key={annotation._id} className='w-full flex-grow flex flex-col'>
          {/* Author Info */}
          <div className='pt-3 px-3 flex flex-row gap-2'>
            <img src={ba} alt="User profile picture" className='rounded-full h-6 w-6'/>
            <div className='flex flex-col items-start text-xs '>
              <p className='hover:underline whitespace-nowrap cursor-pointer ]'>{`${annotation.name} ${annotation.surname}`}</p>
              <span className='text-gray-500 text-[10px]'>
                {new Date(annotation.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Annotation Content */}
          <div className='px-3 pb-3 pt-2 w-full flex items-start'>
            <p className='text-xs overflow-hidden break-words clamped-text cursor-pointer'
              onClick={() => setClickedAnnotation(annotation)}>
              <span>
                { annotation.sectionId === 'sec1' ? (
                  <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2'/>
                ) : annotation.sectionId === 'sec2' ? (
                  <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 green-filter'/>
                ) : annotation.sectionId === 'sec3' ? (
                  <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 pink-filter'/>
                ) : (
                  <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 red-filter'/>
                )}
              </span>
              {annotation.content}
            </p>
          </div>
          <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
        </div>
      ))}
    </div>
  );
};

export default Annotations