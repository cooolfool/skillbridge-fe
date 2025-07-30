import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useFetchProfile from "./useFetchProfile";

const useFetchPostByUser = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useFetchProfile();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get("http://localhost:8080/project", {
           headers: {
          authToken: localStorage.getItem("token"),
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        });
        setPosts(res.data);
        {console.log("Fetched posts by user:", user.name);}
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
}

export default useFetchPostByUser;