import { useEffect, useState } from "react";
import RecentProjects from "../components/RecentProjects";
import AnnotatedProjects from "../components/AnnotatedProjects";
import DiscoverProjects from "../components/DiscoverProjects";
import useCurrentUser from "../utils/useCurrentUser"

export default function Projects() {
  const user = useCurrentUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p className="text-center">Loading projects...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;

  return (
    <div className="bg-[#f5f5dc] min-h-screen flex flex-col pt-32"> 
      {/* Recent Projects Section with Scrollable Feature */}
      {projects.length > 0 ? (
        <RecentProjects projects={projects} loading={loading} error={error} />
      ) : (
        <></>
      )}

      {/* Annotated Section */}
      {projects.length > 0  ? (
        <AnnotatedProjects projects={projects} loading={loading} error={error} /> 
      ) : ( 
        <></>
      )}

      {/* Discover Section */}
      {projects.length > 0  ? (
        <DiscoverProjects projects={projects} loading={loading} error={error} /> 
      ) : ( 
        <p className="text-center">No projects available.</p>
      )}
      
    </div>
  );
}
