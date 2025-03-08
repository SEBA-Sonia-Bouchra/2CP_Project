import React from 'react'
import search from '../assets/images/search.png'
import icon from '../assets/images/icon-placeholder.png'
import logo from '../assets/images/logo.svg'
import title from '../assets/images/BinaA.svg'

export default function NavbarNormal() {
  return (
    <>
      <div className='bg-[#8C9480] font-montserral grid grid-cols-2 items-center h-[125px]'>
        <div className='flex'>
            <img src={logo} alt="logo" className='w-8' />
            <img src={title} alt="logo-title" className='w-20'/>
        </div>
        <div className='flex'>
          <div className='bg-[#DFD8C8] flex rounded-[70px]'>
            <img src={search} alt="search" className='w-5 h-5'/>
            <p>Search</p>
          </div>
          <img src={icon} alt="icon" className='rounded-[50%] w-10 h-10'/>
        </div>
      </div>
    </>
  )
}
