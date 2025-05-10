import React, { useState, useEffect } from 'react';
import Search from '../components/search';

const SearchPage = () => {
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch projects from backend API
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/projects/"); // Replace with your API URL
                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }
                const data = await response.json();
              
                setProjects(data.results || data); // Adjusted to handle both response formats
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
            <div className="min-h-screen pt-28 bg-[#fffcf4]">
                 <Search 
                     projects={projects} 
                    setFilteredProjects={setFilteredProjects}
                    initialLoading={loading}
                  /> 

                {error && <div className="text-red-500 text-center mt-4">{error}</div>}
            </div>
        </>
    );
};

export default SearchPage;