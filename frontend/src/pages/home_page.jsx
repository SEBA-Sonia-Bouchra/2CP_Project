import { useEffect, useState } from "react";
import AnnotatedIcon from "../assets/images/annotated.png";
import DiscoverIcon from "../assets/images/discover.png";
import RecentProjects from "../components/RecentProjects";
import AnnotatedProjects from "../components/AnnotatedProjects";
import DiscoverProjects from "../components/DiscoverProjects";

export default function Projects() {
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

  return (
    <div className="bg-[#f5f5dc] min-h-screen flex flex-col">

      {/* Recent Projects Section with Scrollable Feature */}
      <RecentProjects projects={projects} loading={loading} error={error}/>

      {/* Annotated Section */}
      <AnnotatedProjects projects={projects} loading={loading} error={error} />
      
      {/* Discover Section */}
      <DiscoverProjects projects={projects} loading={loading} error={error} />
      
    </div>
  );
}
