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
    title: "Restoration of the Casbah of Algiers",
    description: "Preserving the historic Casbah, a symbol of Algeria’s resistance and cultural heritage.",
    image: "/images/Casbah_of_Algiers_Restoration.jpg"
  },
  {
    id: 2,
    title: "Conservation of the Beni Hammad Fort",
    description: "A project to restore the ruins of the 11th-century Beni Hammad Fort, a UNESCO World Heritage Site.",
    image: "/images/Conservation_of_the_Beni_Hammad_Fort.jpg"
  },
  {
    id: 3,
    title: "Revival of the Ghardaïa Ksour",
    description: "Documenting and restoring the unique Mozabite ksour (fortified villages) in the M'zab Valley.",
    image: "/images/Revival_of_the_Ghardaïa_Ksour.jpeg"
  },
  {
    id: 4,
    title: "Great Mosque of Tlemcen",
    description: "A historical restoration project of the 11th-century Almoravid mosque in Tlemcen.",
    image: "/images/great-mosque-or-tlemcen.jpg"
  },
  {
    id: 5,
    title: "Ahmed Bey Palace in Constantine",
    description: "Preserving the Ottoman-era palace, a significant architectural and cultural landmark in Algeria.",
    image: "/images/Ahmed_Bey_palace_Ottoman.jpg"
  }
];

// API route to fetch projects
app.get("/projects", (req, res) => {
  res.json(projects);
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
