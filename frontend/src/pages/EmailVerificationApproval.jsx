import React from 'react'
import tickCircle from '../assets/images/tick-circle.png'
import image from '../assets/images/background.png'

export default function () {
  return (
    <>
      <div className='sm:flex gap-8 sm:flex-col md:grid md:grid-cols-3 md:h-screen'>
        <div className=' col-span-1 '>
          <img src={image} alt="background" className='sm:w-full md:h-screen md:w-full object-cover rounded-br-[50px] 
          rounded-tr-[50px] min-w-full'/>
        </div>
        <div className='bg-[#b57d57]/30 rounded-[100px] place-self-center text-[#b57d57]
        shadow-lg mt-10 md:col-span-2 px-20 py-20 mb-10 md:mr-24 flex-1 overflow-hidden place-content-center'>
          <div className='font-montserral grid place-content-center gap-8'>
            <h2 className='font-playfairdisplay text-[#b57d57] text-[30px] text-center drop-shadow-lg'>
              Email verification
            </h2>  
            <img src={tickCircle} alt="tick-circle" className='place-self-center w-[100px]' />
            <p className='text-center max-w-[300px]'>Email verified successfully</p>
          </div>
        </div>
      </div>
    </>
  )
}
