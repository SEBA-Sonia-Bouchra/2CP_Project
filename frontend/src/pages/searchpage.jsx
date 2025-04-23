import React, {useState, useEffect} from 'react';
import Search from '../components/search';

const searchpage = () => {
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [projects, setProjects] = useState([]);

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
            <div className="min-h-screen pt-28 bg-[#FFFFF1]">
                <Search projects={projects} setFilteredProjects={setFilteredProjects}/>
            </div>
        </>
  )
}

export default searchpage