import React, { useState, useEffect } from "react";
import DiscoverIcon from "../assets/images/discover.png";
import { Link } from "react-router-dom";

const Mycontributionscomponents = ({ projects, loading, error }) => {

  return (
    <div className="w-full max-w-5xl mx-auto p-6 relative mt-6">
      {/* Title */}
      <div className="w-full max-w-4xl flex items-center space-x-3 mb-6">
        <img src={DiscoverIcon} alt="Vector Icon" className="w-6 h-6" />
        <h2 className="text-2xl text-black font-playfairdisplay">
          My Contributions
        </h2>
      </div>

      {/* Project List */}
      <div className="w-full max-w-6xl space-y-6">
        {loading ? (
          <p className="text-gray-700 font-montserral">Loading projects...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500 font-montserral">No projects available.</p>
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
                    {new Date(project.dateOfPublish).toLocaleDateString()} -  {project.author?.firstname} {project.author?.lastname}
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
                <Link to={`/projects/${project._id}/edit`}
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
