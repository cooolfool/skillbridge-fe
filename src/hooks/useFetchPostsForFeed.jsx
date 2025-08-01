import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useFetchPostsForFeed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get(`${baseUrl}/project/feed`, {
         headers: {
          authToken: localStorage.getItem("token"),
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        });
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Session expired. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [navigate]);

  return { posts, loading };
};

export default useFetchPostsForFeed;