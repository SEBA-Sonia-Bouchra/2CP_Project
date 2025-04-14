import React from 'react'
import filledQuote from '../../assets/images/filled-quote.svg'

const ClickedAnnotation = ({setClickedAnnotation, clickedAnnotation}) => {
    const colors = ["#5D9AD0", "#3CC435", "#D662C4", "#D05D5F"];

  return (
    <div className='fixed top-0 w-full flex items-center justify-center h-screen bg-black bg-opacity-25 z-30'>
        <button className="absolute left-4 top-4 p-2 rounded-full flex items-center justify-center hover:bg-[#00000033]" onClick={() => setClickedAnnotation(null)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.36a1 1 0 1 1 1.414 1.414L13.415 10.586l4.36 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.36-4.36-4.36-4.36a1 1 0 0 1 0-1.415z" clipRule="evenodd" />
          </svg>
        </button>
        {/* annotation content */}
        <div className=' bg-white rounded-md w-full lg:w-1/2 max-w-lg p-4 text-base'>
          <div className='pt-3 px-3 flex flex-row gap-2 '>
            <img src={clickedAnnotation.profilePicture} alt="User profile picture" className='rounded-full h-7 w-7 self-center'/>
            <div className='flex flex-col items-start '>
              <p className='hover:underline whitespace-nowrap cursor-pointer'>{`${clickedAnnotation.name} ${clickedAnnotation.surname}`}</p>
              <span className='text-gray-500 text-xs'>
                {new Date(clickedAnnotation.createdAt).toLocaleDateString()}
              </span>
            </div>
            { clickedAnnotation.section.id === 'sec1' ? (
                <span style={{ color: colors[0] }} className='text-xs capitalize ml-auto'>{clickedAnnotation.dimension}</span>
            ) : clickedAnnotation.section.id === 'sec2' ? (
                <span style={{ color: colors[1] }} className='text-xs capitalize ml-auto'>{clickedAnnotation.dimension}</span>
            ) : clickedAnnotation.section.id === 'sec3' ? (
                <span style={{ color: colors[2] }} className='text-xs capitalize ml-auto'>{clickedAnnotation.dimension}</span>
            ) : (
                <span style={{ color: colors[3] }} className='text-xs capitalize ml-auto'>{clickedAnnotation.dimension}</span>
            )}               
          </div>
          <div className='px-3 pb-3 pt-2 w-full flex items-start'>
            <p className='overflow-hidden break-words clamped-text cursor-pointer'>
                <span>
                    { clickedAnnotation.section.id === 'sec1' ? (
                    <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2'/>
                    ) : clickedAnnotation.section.id === 'sec2' ? (
                    <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 green-filter'/>
                    ) : clickedAnnotation.section.id === 'sec3' ? (
                    <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 pink-filter'/>
                    ) : (
                    <img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2 red-filter'/>
                    )}
                </span>
              {clickedAnnotation.content}
            </p>
          </div>
        </div>
      </div>
  )
}

export default ClickedAnnotation