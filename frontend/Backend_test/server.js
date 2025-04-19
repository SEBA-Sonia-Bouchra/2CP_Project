const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express(); // Ajout de cette ligne

// Servir le dossier public du frontend
app.use("/images", express.static(path.join(__dirname, '../../public/images')));

// Enable CORS for frontend requests
app.use(cors());

const projects = [
  {
      id: 1,
      title: {
        content: 'Restoration of the Casbah of Algiers',
        styles: { fontFamily: 'PlayfairDisplay' , fontSize: '20px' },
      },
      description: {
        content: "Preserving the historic Casbah, a symbol of Algeria's resistance and cultural heritage.",
        styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
      },
      author: { 
        name: 'Amine Mohammed',
        id: '660f12ab34cd56ef78901234',
        profilePicture: '/images/Revival_of_the_Ghardaïa_Ksour.jpeg'
       },
      dateOfPublish: '2025-02-03T00:00:00Z',
      coverPhoto: "/images/Casbah_of_Algiers_Restoration.jpg", 
      sections: [
        {
          id: 'sec1',
          dimension: 'architecture',
          author: {
            name: 'Hamach Ali',
            id: '660f12ab34cd54ef78901234',
            profilePicture: '/images/Revival_of_the_Ghardaïa_Ksour.jpeg'
          },
          elements: [
            {
              type: 'text',
              content: "The Casbah of Algiers features a complex network of narrow streets, traditional Ottoman-style houses, and intricate urban planning that reflects centuries of architectural evolution. The restoration process focuses on:\n Reinforcing the structural integrity of ancient homes.\n Reviving traditional craftsmanship using local materials.\n Preserving the whitewashed walls, wooden mashrabiyas, and interior courtyards.\n Rehabilitating public spaces like fountains, stairs, and small plazas.\n This effort ensures that modern interventions remain discreet and respectful to the original urban fabric of the Medina. [1]",
              position: { rowStart: 1, colStart: 1, colSpan: 2, rowSpan: 1 },
              styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
            },
            {
              type: 'image',
              content: '/images/Casbah Of Algiers.jpg',
              position: { rowStart: 1, colStart: 3, colSpan: 1, rowSpan: 1 },
            }
          ]
        },
        {
          id: 'sec2',
          dimension: 'history',
          author: {
            name: 'Zaouch Sidahmad',
            id: '660f12ab34cd56ef78901222',
            profilePicture: '/images/Revival_of_the_Ghardaïa_Ksour.jpeg'
          },
          elements: [
            {
              type: 'text',
              content: "The Casbah, or Al Qasbah, meaning \"the citadel,\" dates back to the 10th century and flourished under Ottoman rule. It became a focal point of Algeria's resistance, especially during the Algerian War of Independence (1954-1962). Key historical highlights:\n Capital of the Regency of Algiers (1516-1830).\n A hub for anti-colonial resistance movements.\n Home to prominent historical figures, including Emir Abdelkader and revolutionary militants.\n Declared a UNESCO World Heritage Site in 1992.\n Its historical depth is intertwined with Algeria's national identity and fight for sovereignty.[2]",
              position: { rowStart: 1, colStart: 1, colSpan: 3, rowSpan: 1 },
              styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
            },
          ]
        },
        {
          id: 'sec3',
          dimension: 'archeology',
          author: {
            name: 'Safi Sidra',
            id: '660f12ab34cd56ef78901232',
            profilePicture: '/images/Revival_of_the_Ghardaïa_Ksour.jpeg'
          },
          elements: [
            {
              type: 'text',
              content: `Excavations and studies conducted during the restoration process revealed:
              Remnants of Phoenician and Roman-era settlements beneath some modern structures.
              Hidden water canals and old hammams (public baths) once used during the Ottoman period.
              Artifacts such as pottery, coins, and mosaic fragments that helped date certain buildings.
              Archaeologists work alongside architects to ensure findings are documented and preserved without halting progress.`,
              position: { rowStart: 1, colStart: 1, colSpan: 3, rowSpan: 1 },
              styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal'},
            },
            {
              type: 'link',
              url: 'https://talents.esi.dz/scolar/index',
              content: "Learn more about Algiers' archeological sites",
              position: { rowStart: 2, colStart: 1, colSpan: 2, rowSpan: 2 },
              styles: { color: 'blue', textDecoration: 'underline' },
            },
                   
          ]
        },
        {
          id: 'sec4',
          dimension: 'other',
          author: {
            name: 'Amine Mohammed',
            id: '660f12ab34cd56ef78901234',
            profilePicture: '/images/Revival_of_the_Ghardaïa_Ksour.jpeg'
          },
          elements: [
            {
              type: 'text',
              content: 'The following table contains more details:',
              position: { rowStart: 1, colStart: 1, colSpan: 2, rowSpan: 1 },
              styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
            },
            {
              type: 'table',
              position: { rowStart: 2, colStart: 1, colSpan: 3, rowSpan: 4 },
              content: {
                headers: ['Feature', 'Description'],
                rows: [
                  ['Locaion', 'Casbah of Algiers, Algeria'],
                  ['Start Date', 'March 2023'],
                  ['Responsible Authority', 'Ministry of Culture and Arts'],
                  ['Funding Sources', '	Algerian Government, UNESCO, and International Donors'],
                  ['Current Phase', 'Phase 2 - Structural Rehabilitation'],
                  ['Projected Completion', 'Late 2026'],
                  ['Cultural Significance', '	UNESCO World Heritage Site (since 1992)']
                ]
              },
              styles: { border: '1px solid #000000', fontSize: '14px', textAlign: 'left' }
            }
          ]
        },
      ],
      references: [
        { title: 'National Institute of Urban Studies -', link: "https://www.nius-architecture.org" ,
          styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
        },
        { title: '"The Architectural Heritage of Algiers" - A. Benyamina, 2021',             
          styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
        },
      ],
    },
  {
    id: 2,
    title: {
      content: 'Conservation of the Beni Hammad Fort',
      styles: { fontFamily: 'PlayfairDisplay' , fontSize: '20px' },
    },
    author: { 
      name: 'Amine Mohammed',
      id: '660f12ab34cd56ef78901234',
      profilePicture: '/images/Revival_of_the_Ghardaïa_Ksour.jpeg'
     },
     dateOfPublish: '2024-11-07T00:00:00Z',
    description: {
      content: "A project to restore the ruins of the 11th-century Beni Hammad Fort, a UNESCO World Heritage Site.",
      styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
    },
    coverPhoto: "/images/Conservation_of_the_Beni_Hammad_Fort.jpg"
  },
  {
    id: 3,
    title: {
      content: 'Revival of the Ghardaïa Ksour',
      styles: { fontFamily: 'PlayfairDisplay' , fontSize: '20px' },
    },
    author: { 
      name: 'Amine Mohammed',
      id: '660f12ab34cd56ef78901234',
      profilePicture: '/images/Revival_of_the_Ghardaïa_Ksour.jpeg'
    },
    dateOfPublish: '2024-12-23T00:00:00Z',
    description: {
      content: "Documenting and restoring the unique Mozabite ksour (fortified villages) in the M'zab Valley.",
      styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
    },
    coverPhoto: "/images/Revival_of_the_Ghardaïa_Ksour.jpeg"
  },
  {
    id: 4,
    title: {
      content: 'Great Mosque of Tlemcen',
      styles: { fontFamily: 'PlayfairDisplay' , fontSize: '20px' },
    },
    author: { 
      name: 'Amine Mohammed',
      id: '660f12ab34cd56ef78901234',
      profilePicture: '/images/Revival_of_the_Ghardaïa_Ksour.jpeg'
    },
    dateOfPublish: '2025-02-01T00:00:00Z',
    description: {
      content: "A historical restoration project of the 11th-century Almoravid mosque in Tlemcen.",
      styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
    },
    coverPhoto: "/images/great-mosque-or-tlemcen.jpg"
  },
  {
    id: 5,
    title: {
      content: 'Ahmed Bey Palace in Constantine',
      styles: { fontFamily: 'PlayfairDisplay' , fontSize: '20px' },
    },
    author: { 
      name: 'Amine Mohammed',
      id: '660f12ab34cd56ef78901234',
      profilePicture: '/images/Revival_of_the_Ghardaïa_Ksour.jpeg'
    },
    dateOfPublish: '2024-12-12T00:00:00Z',
    description: {
      content: "Preserving the Ottoman-era palace, a significant architectural and cultural landmark in Algeria.",
      styles: { fontFamily: 'Arial' , fontSize: '14px', color: '#000', fontWeight: 'normal' },
    },
    coverPhoto: "/images/Ahmed_Bey_palace_Ottoman.jpg"
  }
];

// API route to fetch projects
app.get("/projects", (req, res) => {
  res.json(projects);
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
