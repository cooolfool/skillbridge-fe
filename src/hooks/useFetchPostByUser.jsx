import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const useFetchPostByUser = () => {
const navigate = useNavigate();
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchPosts = async () => {
try {
const token = localStorage.getItem("token");

    // If no token → redirect to login
    if (!token) {
      navigate("/login");
      return;
    }

    // API call (token auto-attached via interceptor)
    const res = await api.get("/project");

    setPosts(res.data);
  } catch (error) {
    console.error("Error fetching posts:", error);

  } finally {
    setLoading(false);
  }
};

fetchPosts();

}, [navigate]);

return { posts, loading };
};

export default useFetchPostByUser;
