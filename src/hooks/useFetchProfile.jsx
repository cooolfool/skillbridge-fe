import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useFetchProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        
        const res = await axios.get(`${baseUrl}/api/user`, {
          headers: {
            authToken: localStorage.getItem("token"),
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Session expired. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  return { user, loading, error };
};

export default useFetchProfile;