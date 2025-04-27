import React, { useState, useEffect } from "react";
import DiscoverIcon from "../assets/images/discover.png";
import { Link } from "react-router-dom";
import fetchName from "../utils/fetchName";

const Mycontributionscomponents = ({ projects, loading, error, onDeleteProject }) => {
  const [authors, setAuthors] = useState({firstname:"", lastname:""});

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorNames = {};
      for (let project of projects) {
        if (project.author && !authorNames[project.author]) {
          // Fetch name only if not already fetched
          const authorName = await fetchName(project.author); // Assuming author is an ID
          authorNames[project.author] = authorName;
        }
      }
      setAuthors(authorNames);
    };

    if (projects.length > 0) {
      fetchAuthors();
    }
  }, [projects]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 relative mt-6">
      {/* Title */}
      <div className="w-full max-w-4xl flex items-center space-x-3 mb-6">
        <img src={DiscoverIcon} alt="Vector Icon" className="w-6 h-6" />
        <h2 className="text-2xl font-semibold text-gray-900 font-playfairdisplay">
          My Contributions
        </h2>
      </div>

      {/* Project List */}
      <div className="w-full max-w-6xl space-y-6">
        {loading ? (
          <p className="text-gray-700">Loading projects...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">No projects available.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl shadow-lg flex overflow-hidden border border-gray-200 h-[220px]"
            >
              <img
                src={`http://localhost:5000/${project.coverPhoto}`}
                alt='project cover picture'
                className="w-1/3 object-cover"
              />
              <div className="p-6 flex flex-col justify-between w-2/3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 font-playfair">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(project.dateOfPublish).toLocaleDateString()} - {authors[project.author] ? `${authors[project.author].firstname} ${authors[project.author].lastname}` : "Loading..."}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: project.description }} />
                </div>
                <div className="flex gap-3 mt-4 overflow-hidden justify-end">
                <Link 
                  to={`/projects/${project._id}`} 
                  className="mt-2 bg-[#213824CF] text-white w-[125px] h-[40px] rounded-full text-sm font-medium transition duration-300 hover:bg-transparent hover:text-[#213824] border border-[#213824] flex items-center justify-center"
                >
                  Read
                </Link>
                <Link to={"/editor"} 
                  className="mt-2 bg-[#213824CF] text-white w-[125px] h-[40px] rounded-full text-sm font-medium transition duration-300 hover:bg-transparent hover:text-[#213824] border border-[#213824] flex items-center justify-center">                
                    Edit
                </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Mycontributionscomponents;
