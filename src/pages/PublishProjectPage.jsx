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
      alert("Failed to publish project. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl mt-8 mb-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-black-700 mb-6 text-center">
          Publish Project
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 text-sm text-gray-700"
        >
          <label className="font-semibold" htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Project Title"
            value={project.title}
            onChange={handleChange}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <label className="font-semibold" htmlFor="description">Project Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={handleChange}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            required
          />

          <label className="font-semibold" htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Tags (comma separated)"
            value={project.tags}
            onChange={handleChange}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <label className="font-semibold" htmlFor="repoUrl">Repository URL</label>
          <input
            type="text"
            id="repoUrl"
            name="repoUrl"
            placeholder="Repository URL"
            value={project.repoUrl}
            onChange={handleChange}
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
className="btn btn-primary"          >
            Publish Project
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default PublishProject;
