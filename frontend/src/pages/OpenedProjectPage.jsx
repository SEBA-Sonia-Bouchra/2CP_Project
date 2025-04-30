import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectSideBar from '../components/ProjectSideBar';
import File from '../components/File';

const OpenedProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5001/projects");
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

  // If projects are still loading or there's an error
  if (loading) return <div className="pt-32">Loading...</div>;
  if (error) return <div className="pt-32">Error: {error}</div>;

  // Check if there are any projects and get the first one
  const project = projects[0]; 

  // If no projects found
  if (!project) return <div className="pt-32">Project not found...</div>;

  const token = localStorage.getItem("token");
  const currentUser = token ? JSON.parse(atob(token.split(".")[1])) : null;
  // const isOwner = project.author?.id === currentUser?.id;
  // const isProfessional = currentUser?.isProfessional ?? false;
  const isProfessional = true; // tessst
  const isOwner = true;    // tesssssssst

  return (
    <div className='pt-12 flex flex-row gap-[1%] justify-center bg-[#FFFFF1] w-full min-h-screen pb-20'>
      <File project={project} isOwner={isOwner} currentUser={currentUser} isProfessional={isProfessional} />
      <ProjectSideBar project={project} isOwner={isOwner} currentUser={currentUser} isProfessional={isProfessional} />
    </div>
  );
};

export default OpenedProjectPage;
