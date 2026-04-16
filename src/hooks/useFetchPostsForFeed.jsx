import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const useFetchPostsForFeed = (prefetchedFeed) => {
const navigate = useNavigate();
const [posts, setPosts] = useState(prefetchedFeed || []);
const [loading, setLoading] = useState(!prefetchedFeed);
const [error, setError] = useState(null);

useEffect(() => {
  if (prefetchedFeed) return;
const fetchPosts = async () => {
try {
setLoading(true);
setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }


    const res = await api.get("/project/feed");
    setPosts(res.data);

  } catch (error) {
    console.error("Error fetching posts:", error);
      setError("Failed to load feed");
  

  } finally {
    setLoading(false);
  }
};

fetchPosts();


}, [navigate]);

return { posts, loading, error };
};

export default useFetchPostsForFeed;
