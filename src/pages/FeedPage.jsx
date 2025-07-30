import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
import useFetchProfile from "../hooks/useFetchProfile";

const FeedPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFeed = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    console.log("Token in localStorage:", localStorage.getItem("token"));
    try {
      const res = await axios.get("http://localhost:8080/project/feed", {
        headers: {
          authToken: localStorage.getItem("token"),
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      alert("Session expired or error loading feed.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
   const {user} = useFetchProfile();

  useEffect(() => {
    fetchFeed();
  }, []);

  if (loading) return <div className="text-center mt-10 text-indigo-600 text-lg">Loading feed...</div>;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 p-6">
        <div className="max-w-5xl mx-auto">
              {user &&(
          <h2 className="text-2xl font-bold text-black-700 mb-6">Hi {user.name}, Explore Projects</h2>
              )}

          {projects.length === 0 ? (
            <p className="text-gray-500">No projects found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border border-indigo-100 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold text-indigo-800">{project.title}</h3>
                  <p className="text-sm text-gray-700 my-2">{project.description}</p>

                  <div className="text-xs text-gray-500 mb-2">{project.tags}</div>

                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Repo →
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedPage;
