import { useEffect, useState } from "react";
import Mycontributionscomponents from "../components/Mycontributionscomponents";

export default function Projects() {
  const [contributedProjects, setContributedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from backend API
    const fetchContributedProjects = async () => {
      try {
        const token = sessionStorage.getItem('token');  // Get JWT from sessionStorage

      if (!token) {
        throw new Error("No token found");
                }
        console.log("fetching projects");
        const response = await fetch(`http://localhost:5000/homepage` // Replace with your API URL
        , 
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Include the JWT in the Authorization header
          }, 
        });
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setContributedProjects(data.contributedProjects);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContributedProjects();
  }, []);
  
  console.log(contributedProjects);
  return (
    <div className="bg-[#FFFFF1] min-h-screen flex flex-col">


      {/* MyProjects Section */}
      <Mycontributionscomponents projects={contributedProjects} loading={loading} error={error} />

    </div>
  );
}
  