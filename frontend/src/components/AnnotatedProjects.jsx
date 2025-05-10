import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnnotatedIcon from "../assets/images/annotated.png";

const AnnotatedProjects = ({ projects }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

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
    <div className="w-full max-w-5xl mx-auto pt-6 px-6 relative">
      {/* Title */}
      <h2 className="text-2xl mb-4 flex items-center space-x-3">
        <img src={AnnotatedIcon} alt="Vector Icon" className="w-6 h-6" />
        <span className="text-2xl text-black font-playfairdisplay">Annotated</span>
      </h2>

      {/* Scrollable Container */}
      <div className="">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#213824] p-2 rounded-full shadow-md hover:bg-[#1a2b1d]"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto overflow-y-visible hide-scrollbar scroll-smooth pb-5 px-4"
        >
          {projects.slice(0, 6).map((project) => (
            <div
              key={project._id}
              className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-clip flex flex-col border"
            >
              <img 
              src={`http://localhost:5000/${project.coverPhoto}`} alt='project cover picture' className="w-full h-40 object-cover" />
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-playfairdisplay">{project.title}</h3>
                  <p className='text-gray-500 text-[10px] font-montserral pb-1'>
                      {new Date(project.dateOfPublish).toLocaleDateString()} - {project.author?.firstname} {project.author?.lastname}
                    </p>
                    <p className="text-sm text-gray-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: project.description }} />
                    </div>
                <div className="flex justify-end">
                  <button className="mt-2 bg-[#213824CF] text-white w-[125px] h-[40px] rounded-full text-sm font-medium transition duration-300 hover:bg-transparent hover:text-[#213824] border border-[#213824]"
                          onClick={() => navigate(`/projects/${project._id}`)}
                  >
                    <p className="">View Project</p>
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
  );
};

export default AnnotatedProjects;
