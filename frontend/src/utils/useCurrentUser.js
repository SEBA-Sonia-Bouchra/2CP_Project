// return current user info
import { useEffect, useState } from "react";
import axios from "axios";

const useCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setUser(res.data))
    .catch((err) => {
      console.error("Error fetching user:", err);
    
      if (err.response?.status === 401) {
        sessionStorage.removeItem("token");
        window.location.href = "/signin";
      }
    });
    }, []);

  return user;
};

export default useCurrentUser;
