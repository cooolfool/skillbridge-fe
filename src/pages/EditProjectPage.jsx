import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    id: "",
    title: "",
    description: "",
    tags: "",
    repoUrl: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseUrl}/project/${id}`, {
          headers: {
            authToken: token,
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) {
          const { id, title, description, tags, repoUrl } = res.data;
          setProject({ id, title, description, tags, repoUrl });
        } else {
          navigate("/home");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        navigate("/home");
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${baseUrl}/project/edit`,
        project,
        {
          headers: {
            authToken: token,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        navigate(`/project/${id}`);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl mt-8 mb-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-black-700 mb-6">Edit Project</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 text-sm text-gray-700">
          <div>
            <label htmlFor="title" className="block font-semibold mb-1 text-gray-800">
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Project Title"
              value={project.title}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold mb-1 text-gray-800">
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Project Description"
              value={project.description}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              rows={4}
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block font-semibold mb-1 text-gray-800">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Tags (comma separated)"
              value={project.tags}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="repoUrl" className="block font-semibold mb-1 text-gray-800">
              Repository URL
            </label>
            <input
              type="text"
              id="repoUrl"
              name="repoUrl"
              placeholder="Repository URL"
              value={project.repoUrl}
              onChange={handleChange}
              className="border p-3 rounded w-full"
              required
            />
          </div>

          <button
            type="submit"
           className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update Project
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default EditProject;
