import React, { useEffect, useState, useRef } from 'react';
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
  const sideBarRef = useRef(null);
  const [isStatic, setIsStatic] = useState(false); // Controls sidebar behavior, the sidebar becomes static (not affected by hovers) if we click on an option)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setIsStatic(false);
        setSelectedItem(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
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
  
  const isOwner = project.author._id === currentUser?._id;
  const isProfessional = currentUser?.isProfessional ?? false;
  
  return (
    <div className='pt-12 flex flex-row gap-[1%] justify-center bg-[#FFFFF1] w-full min-h-screen pb-20'>
      <File project={project} isOwner={isOwner} currentUser={currentUser} isProfessional={isProfessional}/>
      <ProjectSideBar project={project} isOwner={isOwner} currentUser={currentUser} isProfessional={isProfessional} 
      isStatic={isStatic} setIsStatic={setIsStatic} sideBarRef={sideBarRef}
      selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
    </div>
  );
};

export default OpenedProjectPage;
