import React from 'react'
import title from '../assets/images/BinaA.svg'
import logo from '../assets/images/LOGO.svg'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-3 bg-[#8C9480] text-[#FFFFFF] font-montserral py-10
       drop-shadow gap-6 sm:gap-4 text-center sm:text-left`}>
        <div className='flex flex-col gap-6 items-center sm:items-start sm:justify-self-center'>
            <div className='flex gap-2 justify-center sm:justify-start'>
                <img src={logo} alt="binaa-logo" className='w-8' />
                <img src={title} alt="binaa-name" className='w-24' />
            </div>
            <p>@ Binaa app Team22</p>
        </div>
        <div className='flex flex-col sm:flex-row gap-6 sm:gap-20 col-span-2 items-center sm:items-start flex-wrap'>           
            <div className='flex flex-col gap-4'>
               <p className='text-xl'>Contact us</p>
               <p>binaateam.dz@gmail.com</p>
               <p>+213 987 098 765</p>
            </div>
            <Link to="/About_Us">
              <button className='text-xl'>About Us </button>
            </Link>
            <p className='text-xl'>Help</p>
            <Link to="/terms">
              <button className='text-xl'>Terms & privacy policy</button>
            </Link>
        </div>
      </div>
    </>
  )
}
