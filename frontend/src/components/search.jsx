import { Listbox } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import filterIcon from '../assets/images/filter-icon.png';
import { Link } from 'react-router-dom'

const categories = ["Architecture", "History", "Archeology"];

const regions = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "bejaia", "Biskra", "Béchar", "bechar",
  "Blida", "Bouira", "Tamanrasset", "Tébessa","tebessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Algiers", "Alger",
  "Djelfa", "Jijel", "Sétif","setif", "Saïda", "saida", "Skikda", "Sidi Bel Abbès","sidi bel abbes", "Annaba", "Guelma", "Constantine",
  "Médéa","medea", "Mostaganem", "M'Sila","msila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Bordj Bou Arreridj",
  "Boumerdès", "Boumerdes", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila",
  "Aïn Defla", "Aïn Defla",  "Naâma", "naama", "Aïn Témouchent", "Ain Témouchent", "Ghardaïa", "Ghardaia", "Relizane", "Timimoun", "Bordj Badji Mokhtar",
  "Ouled Djellal", "Béni Abbès","Beni Abbes", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El MGhair", "El Meniaa"
  
];


function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Search({ projects, initialLoading }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ category: "", region: "" });
  const [regionSearch, setRegionSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState([]);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const filteredRegions = regions.filter((r) =>
    r.toLowerCase().includes(regionSearch.toLowerCase())
  );

  // Initialize with all projects when component mounts or projects change
  useEffect(() => {
    if (!initialLoading && projects.length > 0) {
      setDisplayedProjects(projects);
    }
  }, [initialLoading, projects]);

  // Handle all filtering logic
  useEffect(() => {
    const fetchFilteredProjects = async () => {
      setLoading(true);
      try {
       
        // If no filters are active, show all projects
        if (!debouncedSearchQuery && !filters.region && !filters.category) {
          setDisplayedProjects(projects);
          setLoading(false);
          return;
        }
        
        let url;
        let shouldFetch = false;

        if (debouncedSearchQuery && debouncedSearchQuery.trim() !== '') {
         // console.log(SearchQuerydebounced)
       
       //  console.log(SearchQuerydebounced);
          url = `http://localhost:5000/api/search?q=${encodeURIComponent(debouncedSearchQuery)}`;
       
          shouldFetch = true;
        } else if (filters.region) {
          url = `http://localhost:5000/api/filter/region?region=${encodeURIComponent(filters.region)}`;
          shouldFetch = true;
        } else if (filters.category) {
          url = `http://localhost:5000/api/filter/category?category=${encodeURIComponent(filters.category)}`;
          shouldFetch = true;
        }
      
        if (shouldFetch) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }
          const data = await response.json();
          setDisplayedProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setDisplayedProjects([]);
      } finally {
        setLoading(false);
      }
    };

    if (!initialLoading) {
      fetchFilteredProjects();
    }
  }, [debouncedSearchQuery, filters.region, filters.category, projects, initialLoading]);

  const handleCategoryChange = (value) => {
    setFilters({ ...filters, category: value, region: "" });
    setSearchQuery("");
  };

  const handleRegionChange = (value) => {
    setFilters({ ...filters, region: value, category: "" });
    setSearchQuery("");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setFilters({ category: "", region: "" });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full pb-6">
      {/* Search bar */}
      <div className="flex items-center w-full max-w-2xl rounded-full overflow-hidden bg-white shadow-md">
        <div className="bg-[#213824] px-4 py-3 flex items-center justify-center">
          <svg
            className="text-white w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 focus:outline-none text-gray-700"
        />
        <div className="w-[1.5px] h-8 bg-[#213824] mx-2" />
        <div
          className="pr-4 flex items-center justify-center cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <img
            src={filterIcon}
            alt="Filter"
            className="w-9 h-5 object-contain"
          />
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filter */}
          <Listbox value={filters.category} onChange={handleCategoryChange}>
            <div className="relative w-[200px]">
              <Listbox.Button className={`relative w-full cursor-default rounded-xl border border-[#4B5E4B] py-2 pl-3 pr-10 text-center shadow-sm focus:outline-none font-[Montserrat] ${filters.category ? "bg-[#4B5E4B] text-[#FFF8E3]" : "bg-transparent text-white hover:bg-[#4B5E4B]"}`}>
                <span className={`block truncate ${filters.category ? 'text-[#FFF8E3]' : 'text-[#213824]'}`}>{filters.category || "Category"}</span>
                <ChevronUpDownIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-[#213824]" />
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl bg-[#4B5E4B] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories.map((cat) => (
                  <Listbox.Option
                    key={cat}
                    value={cat}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-[#FFF8E3] text-black" : "text-white"}`
                    }
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {cat}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          {/* Region Filter */}
          <Listbox value={filters.region} onChange={handleRegionChange}>
            <div className="relative w-[200px]">
              <Listbox.Button className={`relative w-full cursor-default rounded-xl border border-[#4B5E4B] py-2 pl-3 pr-10 text-center shadow-sm focus:outline-none font-[Montserrat] ${filters.region ? "bg-[#4B5E4B] text-[#FFF8E3]" : "bg-transparent text-white hover:bg-[#4B5E4B]"}`}>
                <span className={`block truncate ${filters.region ? 'text-[#FFF8E3]' : 'text-[#213824]'}`}>{filters.region || "Region"}</span>
                <ChevronUpDownIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-[#213824]" />
              </Listbox.Button>
              <Listbox.Options className="absolute mt-1 w-full rounded-2xl bg-[#4B5E4B] py-1 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-h-[250px] overflow-y-auto">
                <div className="px-4 py-2 sticky top-0 bg-[#4B5E4B] z-10">
                  <input
                    type="text"
                    placeholder="Search region..."
                    value={regionSearch}
                    onChange={(e) => setRegionSearch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFF8E3] text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4B5E4B] border border-[#4B5E4B]"
                  />
                </div>
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((r, index) => (
                    <Listbox.Option
                      key={index}
                      value={r}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 px-4 ${active ? "bg-[#FFF8E3] text-black" : "text-white"}`
                      }
                    >
                      {r}
                    </Listbox.Option>
                  ))
                ) : (
                  <div className="px-4 py-2 text-white italic">No results</div>
                )}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      )}

      {/* Display Projects */}
      <div className="w-full max-w-4xl mt-6 flex flex-col gap-4">
        {initialLoading || loading ? (
          <div className="text-gray-500 text-center">Loading projects...</div>
        ) : displayedProjects.length > 0 ? (
          displayedProjects.map((project) => (
            <Link to={`/projects/${project._id}`}>
              <div key={project._id} className="p-4 bg-white shadow rounded-xl">
              <h2 className="text-lg font-semibold text-[#213824]">{project.title}</h2>
              <p className="text-sm text-gray-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: project.description }} />
                {project.author && (
                  <p className="text-sm text-gray-500 mt-2">
                    By: {project.author.firstname} {project.author.lastname}
                  </p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-gray-500 text-center">No projects found.</div>
        )}
      </div>
    </div>
  );
}