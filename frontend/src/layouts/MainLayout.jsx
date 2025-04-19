import React , {useState, useEffect} from 'react'
import NavbarNormal from '../components/NavbarNormal'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import NavbarProfessional from '../components/NavbarProfessional';
import Notifications from '../components/Notifications.jsx'
import NavbarAdmin from '../components/NavbarAdmin.jsx'
import useCurrentUser from '../../utils/useCurrentUser.js'

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
      <div className="min-h-screen">
        {/* <NavbarAdmin toggleNotifications={toggleNotifications} showNotifications={showNotifications}
        unreadCount={unreadCount} /> */}
        {user ? (
           user.isProfessional == true ? (
            <NavbarProfessional toggleNotifications={toggleNotifications} showNotifications={showNotifications}
            unreadCount={unreadCount} />
          ) : user.isProfessional == false ? (
            <NavbarNormal />
          ) : (
            <p>error loading navbar</p>
          )
        ) : (
          <p>Loading user info...</p>
        )}
          {showNotifications && (
              <div className='w-screen fixed top-0 z-50'>
                <Notifications toggleNotifications={() => setShowNotifications(false)} />
              </div>
            )}
        <main className='z-10'>
          <Outlet />
        </main>
        <Footer className='z-0'/>
      </div>
    </>
  )
}
