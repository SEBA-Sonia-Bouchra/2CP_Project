import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RecentIcon from "../assets/images/recent.png";

const RecentProjects = ({ projects }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    
    <div className="bg-[#f5f5dc] flex flex-col mt-[150px] mb-0 pb-0">
      <div className="w-full max-w-6xl mx-auto p-6 relative">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-3">
          <img src={RecentIcon} alt="Recent Icon" className="w-6 h-6" />
          <span>Recent</span>
        </h2>

        {/* Scrollable Container */}
        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#213824] p-2 rounded-full shadow-md hover:bg-[#1a2b1d]"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-sm text-gray-700">{project.description}</p>
                  </div>
                  <div className="flex justify-end">
                    <button className="mt-2 bg-[#213824CF] text-white w-[125px] h-[40px] rounded-full text-sm font-medium transition duration-300 hover:bg-transparent hover:text-[#213824] border border-[#213824]">
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#213824] p-2 rounded-full shadow-md hover:bg-[#1a2b1d]"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;
