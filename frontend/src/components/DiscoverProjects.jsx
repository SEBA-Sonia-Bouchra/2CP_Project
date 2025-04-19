import React from "react";
import DiscoverIcon from "../assets/images/discover.png";

const DiscoverProjects = ({ projects, loading, error }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 relative">
      {/* Title */}
      <div className="w-full max-w-4xl flex items-center space-x-3 mb-6">
        <img src={DiscoverIcon} alt="Vector Icon" className="w-6 h-6" />
        <h2
          className="text-2xl font-semibold text-gray-900"
          style={{ fontFamily: "Playfair Display" }}
        >
          Discover
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
              key={project.id}
              className="bg-white rounded-lg shadow-lg flex overflow-hidden"
            >
              <img
                src={project.coverPhoto}
                alt='project cover picture'
                className="w-1/3 object-cover"
              />
              <div className="p-6 flex flex-col justify-between w-2/3">
                <div>
                  <h3
                    className="text-xl font-serif font-semibold text-gray-900"
                    style={{ fontFamily: "Playfair Display" }}
                  >
                    {project.title.content}
                  </h3>
                  <p className='text-gray-500 text-[10px] font-montserral pb-1'>
                      {new Date(project.dateOfPublish).toLocaleDateString()} {project.author?.name}
                    </p>
                  <p className="text-sm text-gray-700 mt-1">
                    {project.description.content}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button className="mt-2 bg-[#213824CF] text-white w-[132px] h-[40px] rounded-full text-sm font-medium transition duration-300 hover:bg-transparent hover:text-[#213824] border border-[#213824]">
                    View Project
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DiscoverProjects;
