import React, {useState , useEffect} from 'react'
import search from '../assets/images/search.png'
import icon from '../assets/images/icon-placeholder.png'
import logo from '../assets/images/logo.svg'
import title from '../assets/images/BinaA.svg'
import notifications from '../assets/images/notifications.svg'
import down from '../assets/images/down.svg'
import { Link, useNavigate } from 'react-router-dom'
import burger from '../assets/images/hamburger-icon.svg'
import close from '../assets/images/x.svg'
import useCurrentUser from '../utils/useCurrentUser'

export default function NavbarProfessional({toggleNotifications , showNotifications, unreadCount}) {
  const user = useCurrentUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
      if (user?.profilePicture){
        setImage(`http://localhost:5000${user.profilePicture}`);
      }
  }, [user])

  return (
    <>
        <div className={`bg-[#8C9480] grid ${menuOpen && "grid-rows-2"} grid-cols-2 1200:grid-cols-4 1200:grid-rows-1 font-montserral items-center 1200:h-[110px] py-4 
        fixed top-0 left-0 z-50 drop-shadow-lg px-4 1200:px-10 gap-0 1200:gap-4 w-full `} >
          <div className='flex gap-4 justify-center 1200:justify-start'>
           <div className='flex gap-2 justify-center 1200:justify-start'>
             <img src={logo} alt="logo" className='w-8' />
             <img src={title} alt="logo-title" className='w-20'/>
           </div>
           {/* This will hide/show the list button in sm screens depending on menu state (opened/closed)*/}
           <button
            className="1200:hidden text-white text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (<img src={close} className='font-cold w-5 h-5'/>) :(<img src={burger} className='w-5 h-5'/>) }
           </button>
          </div>
          {/*This will be hidden in sm screens*/}
           <div className="hidden 1200:flex justify-end items-center 1200:col-span-2 text-white text-xl gap-6 mr-4">
                <Link to="/home_page" className="mr-4">Home</Link>
                <Link to="/accounts" className="ml-2">Accounts</Link>
            </div>
           <div className='1200:grid flex 1200:grid-cols-4 gap-2 1200:gap-4 justify-center 1200:justify-end'>
             <button className='bg-[#DFD8C8] flex rounded-[70px] py-1 px-3 1200:py-2 1200:px-8 gap-2 place-content-center justify-self-end
              drop-shadow hover:bg-[#FFF8E3] 1200:col-span-2' onClick={() => navigate("/search")}>
               <img src={search} alt="search-icon" className='self-center w-4 h-4' />
               <p className='self-center text-lg 1200:text-xl'>Search</p>
             </button>
          
             <Link to='/profile-page' className='w-14 h-14' >
               <img src={image || icon} alt="icon" className='rounded-full w-full h-full object-cover object-center'/>
             </Link>
            </div>

            {/*Used to move the home, projects...etc section down a line in small screens*/}
            <div className={`${menuOpen ? "flex" : "hidden"} 1200:hidden text-white text-lg gap-10 justify-center col-span-2 `}>
                <Link to="/home_page" className="py-2 border-[#F5F5DC]">Home</Link>
                <Link to="/accounts" className="py-2">Accounts</Link>
            </div>
        </div>
    </>
  )
}
