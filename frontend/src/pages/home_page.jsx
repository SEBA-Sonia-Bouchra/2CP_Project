import { useEffect, useState } from "react";
import RecentProjects from "../components/RecentProjects";
import AnnotatedProjects from "../components/AnnotatedProjects";
import DiscoverProjects from "../components/DiscoverProjects";
import useCurrentUser from "../utils/useCurrentUser"

export default function Projects() {
  const user = useCurrentUser();
    const [projects, setProjects] = useState({
      recent: [],
      annotated: [],
      discovered: []
    });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    // Fetch projects from backend API
   const fetchProjects = async () => {
    
      try {
        const token = localStorage.getItem('token');  // Get JWT from localStorage

      if (!token) {
        throw new Error("No token found");
                }
        const response = await fetch(`http://localhost:5000/homepage/Home` // Replace with your API URL
        , {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Include the JWT in the Authorization header
          }, 
        });
        if (!response.ok) {
           throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        
        setProjects({
              recent: [],  // You don't have recentProjects from backend yet so it is empty for the moment
              annotated: data.annotated || [],
              discovered: data.discovered || []
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
   }, []);

  return (
    <div className="bg-[#f5f5dc] min-h-screen flex flex-col pt-6"> 
      {user?.isProfessional === true && (
          <>
               {/* Recent Projects Section with Scrollable Feature  */}
              {projects.recent.length > 0 ? (
                <RecentProjects projects={projects.recent} loading={loading} error={error} />
              ) : loading ? (
                <p className="text-center">Loading projects...</p>
              ) : error ? (
                <p className="text-center">Error: {error}</p>
              ) : ( 
                <></>
              )}

               {/* Annotated Section  */}
              {projects.annotated.length > 0  ? (
                <AnnotatedProjects projects={projects.annotated} loading={loading} error={error} /> 
              ) : loading ? (
                <p className="text-center">Loading projects...</p>
              ) : error ? (
                <p className="text-center">Error: {error}</p>
              ) : (
                <></>
              )}
          </>
      )}

      {/* Discover Section */}
      {projects.discovered.length > 0  ? (
        <DiscoverProjects projects={projects.discovered} loading={loading} error={error} /> 
      ) : loading ? (
        <p className="text-center">Loading projects...</p>
      ) : error ? (
        <p className="text-center">Error: {error}</p>
      ) : ( 
        <p className="text-center">No projects available.</p>
      )}
      
    </div>
  );
}
