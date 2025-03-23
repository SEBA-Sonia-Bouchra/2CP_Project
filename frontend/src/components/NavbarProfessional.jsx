import React from 'react'
import search from '../assets/images/search.png'
import icon from '../assets/images/icon-placeholder.png'
import logo from '../assets/images/logo.svg'
import title from '../assets/images/BinaA.svg'
import notifications from '../assets/images/notifications.svg'
import down from '../assets/images/down.svg'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function NavbarProfessional() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
        <div className='bg-[#8C9480] font-montserral md:grid items-center h-fit md:h-[110px] py-4 fixed top-0 left-0
        z-50 drop-shadow-lg md:grid-cols-4 md:px-10 gap-4 md:gap-0 w-full flex flex-col' >
           <div className='flex gap-2 justify-center md:justify-start'>
             <img src={logo} alt="logo" className='w-8' />
             <img src={title} alt="logo-title" className='w-20'/>
           </div>
           <div className='flex items-center text-white text-xl col-span-2 gap-6 md:justify-end md:pr-16 justify-center'>
              <Link to='#' className='justify-self-center mr-4' >Home</Link>
             <Link className='flex items-center'>
                <img src={down} alt="down-icon" className='w-5 h-5' />
                <div className="relative inline-block group">
                  <button className="px-4 py-2 rounded-md focus:outline-none">
                    Projects
                  </button>
                   <ul className="absolute left-0 mt-14 md:mt-2 w-56 bg-[#A3AD92] text-white shadow-lg rounded-md opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 z-50">
                      <li className="px-4 py-2 hover:bg-[#F5F5DC] hover:text-[#213824] cursor-pointer">My projects</li>
                      <li className="px-4 py-2 hover:bg-[#F5F5DC] hover:text-[#213824] cursor-pointer">My contributions</li>
                   </ul>
                </div>
             </Link>
              <Link className='whitespace-nowrap pl-2'>Add project</Link>
           </div>
           <div className='md:grid flex md:grid-cols-4 gap-2 md:gap-4 justify-center md:justify-end'>
             <button className='bg-[#DFD8C8] flex rounded-[70px] py-2 px-8 md:gap-2 place-content-center justify-self-end
              drop-shadow hover:bg-[#FFF8E3] md:col-span-2'>
               <img src={search} alt="search-icon" className='self-center w-4 h-4' />
               <p className='self-center text-xl'>Search</p>
             </button>
            <Link>
              <img src={notifications} alt="notifications-icon" className='rounded-full bg-[#DFD8C8] p-4 w-14 h-14 text-[#213824] justify-self-center' />
            </Link>
            <img src={icon} alt="icon" className='w-14 h-14 rounded-full'/>
           </div>
        </div>
    </>
  )
}
