import { useEffect, useState } from "react";
import NavbarProfessional from "../components/NavbarProfessional";
import Footer from "../components/Footer";
import Mycontributionscomponents from "../components/Mycontributionscomponents";

export default function Projects() {
  const [projects, setProjects] = useState([]);
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
        console.log("fetching projects");
        const userId = "680a7a93196653d6f0000cfc";
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
        setProjects(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  console.log(projects);
  return (
    <div className="bg-[#FFFFF1] min-h-screen flex flex-col">


      {/* MyProjects Section */}
      <Mycontributionscomponents projects={projects} loading={loading} error={error} />

    </div>
  );
}
  