import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useFetchProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get("http://localhost:8080/api/user", {
          headers: {
          authToken: localStorage.getItem("token"),
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        });
        // {console.log("Fetched user profile:", res.data);}
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Session expired. Please login again.");
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  return { user };
};

export default useFetchProfile;