import React , {useState, useEffect} from 'react'
import NavbarNormal from '../components/NavbarNormal'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import NavbarProfessional from '../components/NavbarProfessional';
import Notifications from '../components/Notifications.jsx'
import NavbarAdmin from '../components/NavbarAdmin.jsx'
import useCurrentUser from '../utils/useCurrentUser.js'
import Search from "../components/search";

export default function MainLayout() {
  const user = useCurrentUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    // Fetch projects from backend API
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5001/projects"); // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  
  return (
    <>
      <div className="min-h-screen">
        {user ? (
           user.isProfessional == true ? (
            user.isAdmin == true ? (
              <NavbarAdmin toggleNotifications={toggleNotifications} showNotifications={showNotifications}
              unreadCount={unreadCount} onSearchClick={() => setShowSearch((prev) => !prev)}  />
            ) : (
              <NavbarProfessional toggleNotifications={toggleNotifications} showNotifications={showNotifications}
              unreadCount={unreadCount} onSearchClick={() => setShowSearch((prev) => !prev)} />
            )
          ) : user.isProfessional == false ? (
            <NavbarNormal />
          ) : (
            <p>error loading navbar</p>
          )
        ) : (
          <p>Loading user info...</p>
        )}
          {/* Search & Filter Section */}
          {showSearch ? (
            <Search projects={projects} onFilter={setFilteredProjects} />
          ) : (
            // Spacer with same height as search bar to maintain layout
            <></>
          )}

          {showNotifications && (
              <div className='w-screen fixed top-0 z-50'>
                <Notifications toggleNotifications={() => setShowNotifications(false)} />
              </div>
            )}
        <main className={`z-10 ${!showSearch ? 'sm:pt-20 ' : ''}`}>
          <Outlet />
        </main>
        <Footer className='z-0'/>
      </div>
    </>
  )
}
