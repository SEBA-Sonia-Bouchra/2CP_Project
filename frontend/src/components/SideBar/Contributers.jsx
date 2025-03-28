import React from 'react'
import ba from '../../assets/images/ba.jpg'

const Contributers = () => {
  return (
    <div className='flex flex-col w-full'>
        <span className='h-[0.1px] bg-[#4f37267b] w-full'></span>
        <div className='p-2 flex flex-row text-xs  justify-between'>
            <div className='flex flex-row items-center'>
                <img src={ba} alt="User profile picture" className='rounded-full h-6 w-6'/>
                <span className='pl-1 pr-5 hover:underline'>Dahmane Lharachi</span>
            </div>
            <span className='self-center '>owner</span>
        </div>
    </div>
  )
}

export default Contributers