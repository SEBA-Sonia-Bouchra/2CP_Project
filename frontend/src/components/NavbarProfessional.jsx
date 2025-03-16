import React from 'react'
import search from '../assets/images/search.png'
import icon from '../assets/images/icon-placeholder.png'
import logo from '../assets/images/logo.svg'
import title from '../assets/images/BinaA.svg'
import notifications from '../assets/images/notifications.svg'
import down from '../assets/images/down.svg'
import { Link } from 'react-router-dom'

export default function NavbarProfessional() {
  return (
    <>
        <div className='bg-[#8C9480] font-montserral grid items-center h-[80px] md:h-[110px] grid-cols-2 w-contain'>
           <div className='flex gap-2 self-center justify-self-start md:px-14 px-4'>
             <img src={logo} alt="logo" className='w-8' />
             <img src={title} alt="logo-title" className='w-20'/>
           </div>
           <div className='flex self-center gap-4 md:gap-6 justify-self-end md:px-10 px-6'>
             <div>
                <Link to='#' >Home</Link>
             </div>
             <div className='flex'>
                <img src={down} alt="down-icon" className='w-5 h-5' />
                <Link>My projects</Link>
             </div>
             <div>
                <Link>Add project</Link>
             </div>
             <button className='bg-[#DFD8C8] flex rounded-[70px] py-2 px-8 gap-2 place-content-center
              drop-shadow hover:bg-[#FFF8E3]'>
               <img src={search} alt="search-icon" className='self-center w-4 h-4' />
               <p className='self-center text-xl'>Search</p>
             </button>
             <div>
                <img src={notifications} alt="notifications-icon" className='rounded-full bg-[#DFD8C8] p-4 w-14 h-14 text-[#213824]' />
             </div>
             <div className=' w-14 h-14 '>
               <img src={icon} alt="icon" className='rounded-full'/>
             </div>
            </div>
        </div>
    </>
  )
}
