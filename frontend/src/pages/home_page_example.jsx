import { useEffect, useState } from "react";
import NavbarProfessional from "../components/NavbarProfessional";
import Footer from "../components/Footer";

import Casbah_of_Algiers_Restoration from '../assets/images/Casbah of Algiers Restoration.jpg';
import Conservation_of_the_Beni_Hammad_Fort from '../assets/images/Conservation of the Beni Hammad Fort.jpg';
import Revival_of_the_Ghardaïa_Ksour from '../assets/images/Revival of the Ghardaïa Ksour.jpeg';
import great_mosque_or_tlemcen from '../assets/images/great-mosque-or-tlemcen.jpg';
import Ahmed_Bey_palace_Ottoman from '../assets/images/Ahmed Bey palace Ottoman architecture Constantine Algeria.jpg';
import DiscoverIcon from '../assets/images/discover.png';

export default function Projects() {
  const projects = [
    {
      title: "Restoration of the Casbah of Algiers",
      description: "Preserving the historic Casbah, a symbol of Algeria’s resistance and cultural heritage.",
      image: Casbah_of_Algiers_Restoration,
    },
    {
      title: "Conservation of the Beni Hammad Fort",
      description: "A project to restore the ruins of the 11th-century Beni Hammad Fort, a UNESCO World Heritage Site.",
      image: Conservation_of_the_Beni_Hammad_Fort,
    },
    {
      title: "Revival of the Ghardaïa Ksour",
      description: "Documenting and restoring the unique Mozabite ksour (fortified villages) in the M'zab Valley.",
      image: Revival_of_the_Ghardaïa_Ksour,
    },
    {
      title: "Great Mosque of Tlemcen",
      description: "A historical restoration project of the 11th-century Almoravid mosque in Tlemcen.",
      image: great_mosque_or_tlemcen,
    },
    {
      title: "Ahmed Bey Palace in Constantine",
      description: "Preserving the Ottoman-era palace, a significant architectural and cultural landmark in Algeria.",
      image: Ahmed_Bey_palace_Ottoman,
    }
  ];

  return (
    <div className="bg-[#f5f5dc] min-h-screen flex flex-col">
      <div className="h-28"></div>
      {/* Discover Section */}
      <div className="flex flex-col items-center w-full p-6">
        <div className="w-full max-w-4xl flex items-center space-x-3 mb-6">
          <img src={DiscoverIcon} alt="Vector Icon" className="w-6 h-6" />
          <h2 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
            Discover
          </h2>
        </div>

        {/* Project Cards */}
        <div className="w-full max-w-4xl space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg flex overflow-hidden">
              <img src={project.image} alt={project.title} className="w-1/3 object-cover" />
              <div className="p-6 flex flex-col justify-between w-2/3">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                </div>
                <div className="flex justify-end">
                  <button className="mt-2 bg-[#213824] text-white px-5 py-2 rounded-full text-sm font-medium">
                    View Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
