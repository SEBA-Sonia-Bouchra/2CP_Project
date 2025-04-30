import { useState, useEffect } from "react";
import ProjectsSection from "./home_page_opened_for_the_first_time";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("GET http://localhost:5000/api/projects/") // Check if this API endpoint is correct
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#f5f5dc] min-h-screen flex flex-col mt-[110px]">
      {loading && <p className="text-gray-700 text-center">Loading projects...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!loading && !error && <ProjectsSection projects={projects} />}
    </div>
  );
}
