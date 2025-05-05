import React , {useState, useEffect} from 'react'
import NavbarNormal from '../components/NavbarNormal'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import NavbarProfessional from '../components/NavbarProfessional';
import Notifications from '../components/Notifications.jsx'
import NavbarAdmin from '../components/NavbarAdmin.jsx'
import useCurrentUser from '../utils/useCurrentUser.js'
import Search from "../components/search";
import ScrollToTop from "../components/ScrollToTop.jsx"

export default function MainLayout() {
  const user = useCurrentUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const toggleNotifications= () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setUnreadCount(0);
    }
  }

  useEffect(() => {
    if (showNotifications) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; 
    }
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [showNotifications]);
  
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen">
        {user ? (
           user.isProfessional == false ? (
            user.isAdmin == true ? (
              <NavbarAdmin />
            ) : (
              <NavbarNormal />
            )
          ) : user.isProfessional == true ? (
            <NavbarProfessional toggleNotifications={toggleNotifications} showNotifications={showNotifications}
            unreadCount={unreadCount} />
          ) : (
            <p>error loading navbar</p>
          )
        ) : (
          <p>Loading user info...</p>
        )}

          {showNotifications && (
              <div className='w-screen fixed top-0 z-40'>
                <Notifications toggleNotifications={() => setShowNotifications(false)} />
              </div>
            )}
        <main className="z-10 sm:pt-20 ">
          <Outlet />
        </main>
        <Footer className='z-0'/>
      </div>
    </>
  )
}
