import React, { useState } from 'react'
import AnnotationOptions from './AnnotationOptions'
import ba from '../../assets/images/ba.jpg'
import filledQuote from '../../assets/images/filled-quote.svg'
import more from '../../assets/images/more-vertical.svg'

const annotationsData = [
  {
    _id: "66123abcde4567f890423456",
    user: "660f12ab34cd56ef78901234",
    name: "Mohammed",
    surname: "Amine",
    profilePicture: ba,
    content: "From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers' architecture is a blend of history and innovation.",
    project: "661987abcdef123456789012", 
    section:{
      id: "sec1",
      authorID : "660f12ab34cd56ef78901235", 
      name: "Amine",
      surname: "Mohammed",
      profilePicture: ba,
    } , 
    dimension: "architecture",
    createdAt: "2026-02-24T10:30:00Z",
  },
  {
    _id: "66123abcde4567f890123456",
    user: "660f12ab34cd56ef78901224",
    name: "Hanachi",
    surname: "Ibrahim",
    profilePicture: ba,
    content: "From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers' architecture is a blend of history and innovation.",
    project: "661987abcdef123456789012",
    section:{
      id: "sec2",
      authorID : "660f12ab34cd56ef78901235", 
      name: "Ali",
      surname: "Hamach",
      profilePicture: ba,
     } , 
    dimension: "history",
    createdAt: "2026-02-24T10:30:00Z",
  },
  {
    _id: "66123abcde4567f890123457",
    user: "660f12ab34cd56ef78901234",
    name: "Mohammed",
    surname: "Amine",
    profilePicture: ba,
    content: "From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers' architecture is a blend of history and innovation.",
    project: "661987abcdef123456789012", 
    section:{
      id: "sec3",
      authorID : "660f12ab34cd56ef78901235", 
      name: "Sidahmad",
      surname: "Zaouch",
      profilePicture: ba,
     } ,
    dimension: "archeology",
    createdAt: "2026-02-24T10:30:00Z",
  },
  {
    _id: "66123abcde4567f890113457",
    user: "660f12ab34cd56ef78901235",
    name: "Sidahmad",
    surname: "Zaouch",
    profilePicture: ba,
    content: "The fusion of Ottoman, French colonial, and contemporary styles creates a unique architectural identity in Algiers.",
    project: "661987abcdef123456789013",
    section:{
      id: "sec3",
      authorID : "660f12ab34cd56ef78901235", 
      name: "Sidahmad",
      surname: "Zaouch",
      profilePicture: ba,
    },
    dimension: "archeology",
    createdAt: "2026-03-10T15:45:00Z",
  },
];

const Annotations = ({ setClickedAnnotation, currentUser, isOwner}) => {
  let id = '660f12ab34cd56ef78901234'; //test
  const [annotationOptions, setAnnotationOptions] = useState(null);

  return (
    <div className='text-black h-[300px] overflow-y-auto hide-scrollbar'>
      {annotationsData.map((annotation) => (
        <div key={annotation._id} className='w-full flex-grow flex flex-col relative'>
          <span className='h-[0.1px] bg-[#4f37267b] w-full '></span>
          {/* Author Info */}
          <div className='pt-3 px-3 flex flex-row gap-2'>
            <img src={ba} alt="User profile picture" className='rounded-full h-6 w-6'/>
            <div className='flex flex-col items-start text-xs '>
              <p className='hover:underline whitespace-nowrap cursor-pointer ]'>{`${annotation.surname} ${annotation.name}`}</p>
              <span className='text-gray-500 text-[10px]'>
                {new Date(annotation.createdAt).toLocaleDateString()}
              </span>
            </div>
            {((id === annotation.user) || isOwner || (id === annotation.section.authorID))  ? (      //id should be replaced by currentUser.id
             <button className='rounded-full p-1 hover:bg-[#00000023] self-start ml-auto' onClick={() => {setAnnotationOptions(annotationOptions === annotation._id ? null : annotation._id)}}> 
                <img src={more} alt="options" className='w-4 h-4 inline mx-1'/>
              </button>
            ) : (
              <></>
            )}
            { annotationOptions === annotation._id && (
              <AnnotationOptions isAnnotator={id === annotation.user} isOwner={isOwner} isContributer={id === annotation.section.authorID} annotation={annotation}/>
            )}
          </div>

          {/* Annotation Content */}
          <div className='px-3 pb-3 pt-2 w-full flex items-start'>
            <p className='text-xs overflow-hidden break-words clamped-text cursor-pointer'
              onClick={() => setClickedAnnotation(annotation)}>
              <span>
                { annotation.section.id === 'sec1' ? (
                  <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2'/>
                ) : annotation.section.id === 'sec2' ? (
                  <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 green-filter'/>
                ) : annotation.section.id === 'sec3' ? (
                  <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 pink-filter'/>
                ) : annotation.section.id === 'sec4' ?(
                  <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 red-filter'/>
                ) : (
                  	<p>{annotation.section.id}</p>
                )}
              </span>
              {annotation.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Annotations