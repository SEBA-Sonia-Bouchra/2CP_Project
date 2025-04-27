// fetchName.js
import axios from "axios";

const fetchName = (id) => {
    const token = localStorage.getItem("token");

  return axios.get(`http://localhost:5000/api/projects/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  })
  .then((res) => res.data)
  .catch((err) => {
    console.error("Error fetching user:", err);
    throw err; 
  });
};

export default fetchName;
