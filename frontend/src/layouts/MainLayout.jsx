import React , {useState, useEffect, useRef} from 'react'
import { io } from 'socket.io-client';
import NavbarNormal from '../components/NavbarNormal'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import NavbarProfessional from '../components/NavbarProfessional';
import Notifications from '../components/Notifications.jsx'
import NavbarAdmin from '../components/NavbarAdmin.jsx'
import useCurrentUser from '../utils/useCurrentUser.js'
import Search from "../components/search";
import ScrollToTop from "../components/ScrollToTop.jsx";
import axios from 'axios';

export default function MainLayout() {
  const user = useCurrentUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef(null);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
  }
  
  useEffect(() => {
    if (!user?._id || socketRef.current) return; // Don't run if user not ready or socket already created

    const socket = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("register", user._id);

      // Optional: refresh count in case of missed events
      axios.get(`http://localhost:5000/api/notifications/unread-count/${user._id}`)
        .then(res => setUnreadCount(res.data.unreadCount))
        .catch(err => console.error("Error fetching unread count:", err));
    });

    socket.on("newNotification", () => {
      setUnreadCount(prev => prev + 1);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user?._id]); // Only trigger when user._id is ready

  useEffect(() => {
    if (!user?._id) return;

    // Initial unread count fetch
    axios
      .get(`http://localhost:5000/api/notifications/unread-count/${user._id}`)
      .then(res => setUnreadCount(res.data.unreadCount))
      .catch(err => console.error("Error fetching unread count:", err));
  }, [user?._id]);

  useEffect(() => {
    if (!user?._id) return;
  
    axios
      .get(`http://localhost:5000/api/notifications/unread-count/${user._id}`)
      .then(res => setUnreadCount(res.data.unreadCount))
      .catch(err => console.error("Error fetching unread count:", err));
  }, [user?._id]);  

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
                <Notifications toggleNotifications={toggleNotifications} setUnreadCount={setUnreadCount} />
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
