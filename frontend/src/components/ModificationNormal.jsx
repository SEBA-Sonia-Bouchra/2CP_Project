import React from 'react'
import icon from '../assets/images/icon-placeholder.png'

export default function ModificationNormal() {
  return (
    <>
      <div className='bg-[#FFFFFF] h-screen flex place-content-center overflow-x-hidden'>
        <div className='bg-[#213824] bg-opacity-[46%] grid md:grid-cols-2 rounded-bl-[20px] rounded-tr-[20px] rounded-br-[70px]
         rounded-tl-[70px] items-center self-center drop-shadow px-28 md:px-0 gap-6 md:gap-32 md:py-16'>
          <div className='justify-center items-center pt-10 md:pt-0 flex md:pl-40'>
            <img src={icon} alt="icon" className='w-48 md:min-w-[224px] rounded-[50%]'/>
          </div>
          <div className='flex justify-center md:pr-40'>
            <form action="" className='font-montserral flex flex-col text-[#213824] gap-2 md:gap-4'>
              <div className='flex flex-col '>
                <label htmlFor="first-name" className='text-lg md:text-xl'>First name</label>
                <input type="text" className='appearance-none outline-none rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8]'/>
              </div>
              <div className='flex flex-col '>
                <label htmlFor="last-name" className='text-lg md:text-xl'>Last name</label>
                <input type="text" className='appearance-none outline-none rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8]' />
              </div>
              <div className='flex flex-col '>
                <label htmlFor="email" className='text-lg md:text-xl'>Email address</label>
                <input type="email" className='appearance-none outline-none rounded-[5px] py-1 px-1 md:py-2 md:px-2 bg-[#DFD8C8]' />
              </div>
              <button className='text-[#FFFFFF] bg-[#213824] bg-opacity-80 my-4 md:my-8 py-2 rounded-[15px] text-xl drop-shadow'>Edit profile</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
