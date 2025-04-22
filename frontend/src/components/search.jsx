import { Listbox } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import filterIcon from '../assets/images/filter-icon.png';

const categories = ["Religious Sites", "Historical Monuments", "Cultural Spaces"];

const regions = [
  "Adrar", "Aïn Defla", "Aïn Témouchent", "Algiers", "Annaba", "Batna", "Béchar", "Béjaïa", "Béni Abbès",
  "Biskra", "Blida", "Bordj Badji Mokhtar", "Bordj Bou Arreridj", "Bouira", "Boumerdès", "Chlef", "Constantine",
  "Djanet", "Djelfa", "El Bayadh", "El Meniaa", "El M'Ghair", "El Oued", "El Tarf", "Ghardaïa", "Guelma",
  "Illizi", "In Guezzam", "In Salah", "Jijel", "Khenchela", "Laghouat", "Mascara", "Médéa", "Mila", "Mostaganem",
  "MSila", "Naâma", "Oran", "Ouargla", "Ouled Djellal", "Oum El Bouaghi", "Relizane", "Saïda", "Sétif",
  "Sidi Bel Abbès", "Skikda", "Souk Ahras", "Tamanrasset", "Tébessa", "Tipaza", "Tindouf", "Tiaret",
  "Tissemsilt", "Tizi Ouzou", "Tlemcen", "Timimoun", "Touggourt"
];

export default function Search({ projects, setFilteredProjects }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [regionSearch, setRegionSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredRegions = regions.filter((r) =>
    r.toLowerCase().includes(regionSearch.toLowerCase())
  );

  useEffect(() => {
    const filtered = projects.filter((project) =>
      project.title.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (category ? project.category === category : true) &&
      (region ? project.region === region : true)
    );
    setFilteredProjects(filtered);
  }, [searchQuery, category, region, projects, setFilteredProjects]);

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
          placeholder="Algiers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 focus:outline-none text-gray-700"
        />
        <div className="w-[1.5px] h-8 bg-[#213824] mx-2" />

        {/* Filter Icon */}
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

      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Filter */}
            <Listbox value={category} onChange={setCategory}>
              <div className="relative w-[200px]">
                <Listbox.Button
                  className={`relative w-full cursor-default rounded-xl border border-[#4B5E4B] py-2 pl-3 pr-10 text-center shadow-sm focus:outline-none font-[Montserrat] ${
                    category
                      ? "bg-[#4B5E4B] text-[#FFF8E3]"
                      : "bg-transparent text-white hover:bg-[#4B5E4B]"
                  }`}
                >
                  <span className={`block truncate ${category ? 'text-[#FFF8E3]' : 'text-[#213824]'}`}>{category || "Category"}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-[#213824]" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl bg-[#4B5E4B] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories.map((cat) => (
                    <Listbox.Option
                      key={cat}
                      value={cat}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-[#FFF8E3] text-black" : "text-white"
                        }`
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

            {/* Region Filter with searchable input inside */}
            <Listbox value={region} onChange={(value) => {
              setRegion(value);
              setRegionSearch(""); // reset after selection
            }}>
              <div className="relative w-[200px]">
                <Listbox.Button
                  className={`relative w-full cursor-default rounded-xl border border-[#4B5E4B] py-2 pl-3 pr-10 text-center shadow-sm focus:outline-none font-[Montserrat] ${
                    region
                      ? "bg-[#4B5E4B] text-[#FFF8E3]"
                      : "bg-transparent text-white hover:bg-[#4B5E4B]"
                  }`}
                >
                  <span className={`block truncate ${region ? 'text-[#FFF8E3]' : 'text-[#213824]'}`}>{region || "Region"}</span>
                  <ChevronUpDownIcon className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-[#213824]" />
                </Listbox.Button>

                <Listbox.Options className="absolute mt-1 w-full rounded-2xl bg-[#4B5E4B] py-1 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-h-[250px] overflow-y-auto custom-scroll box-content">
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
                          `relative cursor-pointer select-none py-2 px-4 ${
                            active ? "bg-[#FFF8E3] text-black" : "text-white"
                          }`
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
        </div>
      )}
    </div>
  );
}
