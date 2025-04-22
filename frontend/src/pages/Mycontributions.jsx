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
    <div className="bg-[#FFFFF1] min-h-screen flex flex-col">


      {/* MyProjects Section */}
      <Mycontributionscomponents projects={projects} loading={loading} error={error} />

    </div>
  );
}
  