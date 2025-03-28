import React from 'react'
import ba from '../../assets/images/ba.jpg'
import filledQuote from '../../assets/images/filled-quote.svg'

const Annotations = () => {
  return (
    <div className='flex flex-col text-black w-full'>
      <div className='pt-3 px-3 flex flex-row gap-2'>
        <img src={ba} alt="User profile picture" className='rounded-full h-6 w-6'/>
        <div className='flex flex-col items-start text-xs '>
          <p className='hover:underline whitespace-nowrap'>Dahmane Lharachi</p>
          <span className='text-gray-500 text-[10px]'>24/02/2026</span>
        </div>
      </div>
      <div className='px-3 pb-3 pt-2 w-full max-w-[200px] flex items-start'>
        <p className='block text-xs overflow-hidden break-words line-clamp-6 clamped-text'>
        <span><img src={filledQuote} alt="quote icon" className='w-3 h-3 inline mr-2'/></span>
          From the intricate Moorish palaces of the Casbah to the striking modernist facades, Algiers' architecture is a blend of history and innovation.
        </p>
      </div>
      <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
    </div>
  )
}

export default Annotations