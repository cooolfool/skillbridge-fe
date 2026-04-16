import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

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

    const res = await api.get("/api/user");

    console.log("Fetched user profile:", res.data);
    setUser(res.data);

  } catch (error) {
    console.error("Error fetching profile:", error);
      setError("Failed to load profile");
    

  } finally {
    setLoading(false);
  }
};

fetchProfile();

}, [navigate]);

return { user, loading, error };
};

export default useFetchProfile;
