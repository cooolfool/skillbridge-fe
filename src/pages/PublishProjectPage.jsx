
// src/pages/PublishProject.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const PublishProject = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    title: "",
    description: "",
    tags: "",
    repoUrl: "",
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/project`, project, {
        headers: {
          authToken: localStorage.getItem("token"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 201 || res.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error publishing project:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl mt-8 mb-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-black-700 mb-6">Publish Project</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-sm text-gray-700">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={project.title}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={handleChange}
            className="border p-3 rounded"
            rows={4}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={project.tags}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />
          <input
            type="text"
            name="repoUrl"
            placeholder="Repository URL"
            value={project.repoUrl}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition"
          >
            Publish Project
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default PublishProject;
