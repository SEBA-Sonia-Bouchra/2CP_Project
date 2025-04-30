import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectSideBar from '../components/ProjectSideBar';
import File from '../components/File';
import useCurrentUser from '../utils/useCurrentUser'

const OpenedProjectPage = () => {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const currentUser = useCurrentUser();
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data);  // put it in array 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id]);
  
  
  // If projects are still loading or there's an error
  if (loading) return <div className="pt-32">Loading...</div>;
  if (error) return <div className="pt-32">Error: {error}</div>;
  
  // If no projects found
  if (!project) return <div className="pt-32">Project not found...</div>;
  
  const isOwner = project.author === currentUser?._id;
  const isProfessional = currentUser?.isProfessional ?? false;
  
  return (
    <div className='pt-12 flex flex-row gap-[1%] justify-center bg-[#FFFFF1] w-full min-h-screen pb-20'>
      <File project={project} isOwner={isOwner} currentUser={currentUser} isProfessional={isProfessional}/>
      <ProjectSideBar project={project} isOwner={isOwner} currentUser={currentUser} isProfessional={isProfessional}/>
    </div>
  );
};

export default OpenedProjectPage;
