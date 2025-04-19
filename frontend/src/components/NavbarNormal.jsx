import React, { useState } from 'react'
import search from '../assets/images/search.png'
import icon from '../assets/images/icon-placeholder.png'
import logo from '../assets/images/logo.svg'
import title from '../assets/images/BinaA.svg'
import { Link } from 'react-router-dom'

export default function NavbarNormal() {
  const [page, setPage] = useState("/profile-page");

  const togglePage = (page) => {
    if (page == "/profile-page"){
      setPage("/home_page");
    }
    if (page == "/home_page"){
      setPage("/profile-page");
    }
  };

  return (
    <>
      <div className='bg-[#8C9480] font-montserral grid items-center h-[80px] md:h-[110px] grid-cols-2 drop-shadow-lg
       fixed top-0 left-0 w-full z-50'>
        <div className='flex gap-2 self-center justify-self-start md:px-14 col-span-1 px-4'>
            <img src={logo} alt="logo" className='w-8' />
            <img src={title} alt="logo-title" className='w-20'/>
        </div>
        <div className='flex self-center gap-4 md:gap-6 justify-self-end md:px-10 px-6'>
          <button className='bg-[#DFD8C8] flex rounded-[70px] py-2 px-8 gap-2 place-content-center drop-shadow hover:bg-[#FFF8E3]'>
            <img src={search} alt="search-icon" className='self-center w-4 h-4' />
            <p className='self-center text-xl'>Search</p>
          </button>
          <Link to={ page } className=' w-14 h-14 ' 
            onClick={() => (togglePage(page))}>
            <img src={icon} alt="icon" className='rounded-full'/>
          </Link>
        </div>
      </div>
    </>
  )
}
