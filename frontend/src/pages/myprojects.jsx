import { useEffect, useState } from "react";
import MyProjectsComponent from "../components/MyProjectsComponent";
import useCurrentUser from "../utils/useCurrentUser";

export default function Projects() {
  const user = useCurrentUser();
  const [ownedProjects, setOwnedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch projects from backend API
    const fetchOwnedProjects  = async () => {
      try {
      console.log("fetching projects...");
      const token = localStorage.getItem('token');

      if (!token) throw new Error("No token found");
        const response = await fetch("http://localhost:5000/homepage", {
          method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },}); 
        // Replace with your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
       
        
        setOwnedProjects(data.ownedProjects);
        
        
      
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnedProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem('token'); // Get JWT from localStorage
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      // After successful deletion, update the local state to remove the project
      setOwnedProjects(prevProjects => prevProjects.filter(project => project._id !== projectId));
      
    } catch (error) {
      setError(error.message);
    }
  }; 

  return (
    <div className="bg-[#FFFFF1] min-h-screen flex flex-col">

      {/* MyProjects Section */}
        <MyProjectsComponent projects={ownedProjects} loading={loading} error={error} onDelete={handleDelete}/>

    </div>
  );
}
