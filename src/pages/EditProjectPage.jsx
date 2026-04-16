import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";

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

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

useEffect(() => {
const fetchProject = async () => {
try {
const res = await api.get(`/api/project/${id}`);

    if (res.data) {
      const { id, title, description, tags, repoUrl } = res.data;
      setProject({ id, title, description, tags, repoUrl });
    } else {
      navigate("/home");
    }

  } catch (err) {
    console.error("Error fetching project:", err);

    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      navigate("/home");
    }

  } finally {
    setLoading(false);
  }
};

fetchProject();


}, [id, navigate]);

const handleChange = (e) => {
setProject({ ...project, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
setSaving(true);

try {
  const res = await api.post(`/api/project/edit`, project);

  if (res.status === 200) {
    navigate(`/project/${id}`);
  }

} catch (error) {
  console.error("Error updating project:", error);

  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    navigate("/login");
  }

} finally {
  setSaving(false);
}


};

if (loading) {
return <div className="text-center p-10">Loading project...</div>;
}

return (
<> <Header /> <main className="max-w-3xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl mt-8 mb-8 border border-indigo-100"> <h2 className="text-2xl font-bold text-black-700 mb-6">
Edit Project </h2>

```
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 text-sm text-gray-700">

      <input
        type="text"
        name="title"
        placeholder="Project Title"
        value={project.title}
        onChange={handleChange}
        className="border p-3 rounded w-full"
        required
      />

      <textarea
        name="description"
        placeholder="Project Description"
        value={project.description}
        onChange={handleChange}
        className="border p-3 rounded w-full"
        rows={4}
        required
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={project.tags}
        onChange={handleChange}
        className="border p-3 rounded w-full"
        required
      />

      <input
        type="text"
        name="repoUrl"
        placeholder="Repository URL"
        value={project.repoUrl}
        onChange={handleChange}
        className="border p-3 rounded w-full"
        required
      />

      <button
        type="submit"
        disabled={saving}
        className="btn btn-primary w-full disabled:opacity-50"
      >
        {saving ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Updating...
          </span>
        ) : (
          "Update Project"
        )}
      </button>

    </form>
  </main>
  <Footer />
</>

);
};

export default EditProject;
