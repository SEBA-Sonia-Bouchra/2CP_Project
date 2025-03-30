import React from 'react'

const Options = () => {
  return (
    <div className='flex flex-col items-center w-full'>
        <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
        <span className='text-[#4F3726] py-2 text-sm cursor-pointer'>Download as .pdf</span>
        <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
        <span className='text-[#4F3726] py-2 text-sm cursor-pointer'>Download as .html</span>
        <span className='h-[0.1px] bg-[rgba(79,55,38,0.48)] w-full'></span>
        <span className='text-[#4F3726] py-2 text-sm cursor-pointer'>Save to Drive</span>
        <span className='h-[0.1px] bg-[rgba(79,55,38,0.48)] w-full'></span>
    </div>
  )
}

export default Options