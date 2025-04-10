import React, { useState } from "react";
import DiscoverIcon from "../assets/images/discover.png";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; // Import the modal component

const MyProjectsComponent = ({ projects, loading, error, onDeleteProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProject) {
      onDeleteProject(selectedProject.id); // Call delete function with project ID
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 relative mt-6">
      {/* Title */}
      <div className="w-full max-w-4xl flex items-center space-x-3 mb-6">
        <img src={DiscoverIcon} alt="Vector Icon" className="w-6 h-6" />
        <h2 className="text-2xl font-semibold text-gray-900 font-playfair">
          My Projects
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
              className="bg-white rounded-xl shadow-lg flex overflow-hidden border border-gray-200"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-1/3 object-cover"
              />
              <div className="p-6 flex flex-col justify-between w-2/3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 font-playfair">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {project.date} {project.author}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex gap-3 mt-4 overflow-hidden justify-end">
                  <button className="mt-2 bg-[#213824CF] text-white w-[125px] h-[40px] rounded-full text-sm font-medium transition duration-300 hover:bg-transparent hover:text-[#213824] border border-[#213824]">
                    Read
                  </button>
                  <button className="mt-2 bg-[#213824CF] text-white w-[125px] h-[40px] rounded-full text-sm font-medium transition duration-300 hover:bg-transparent hover:text-[#213824] border border-[#213824]">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(project)}
                    className="mt-2 bg-[#213824CF] text-white w-[125px] h-[40px] rounded-full text-sm font-medium transition duration-300 hover:bg-transparent hover:text-[#213824] border border-[#213824]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default MyProjectsComponent;
