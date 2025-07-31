// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/HeaderApplication";
// import Footer from "../components/FooterApplication";

// const PublishProjectPage = () => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     tags: "",
//     repoUrl: "",
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("You must be logged in to publish a project.");
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:8080/project",
//         form,
//         {
//           headers: {
//           authToken: localStorage.getItem("token"),
//            Authorization: `Bearer ${localStorage.getItem("token")}`
//         },
//         }
//       );
//       alert("Project published successfully!");
//       navigate("/feed"); // or /feed
//     } catch (err) {
//       if (err.response?.status === 400) {
//         setErrors(err.response.data); // Validation errors
//       } else {
//         alert("Something went wrong while publishing.");
//       }
//     }
//   };

//   return (
//       <>
//       <Header />
//     <div className="min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-indigo-100 p-4">
//       <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-md border border-indigo-200">
//         <h2 className="text-2xl font-bold mb-4 text-black-700">Publish a New Project</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Title</label>
//             <input
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               className="w-full mt-1 border rounded px-3 py-2"
//             />
//             {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               className="w-full mt-1 border rounded px-3 py-2"
//               rows="4"
//             />
//             {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//           </div>

//           {/* Tags */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
//             <input
//               name="tags"
//               value={form.tags}
//               onChange={handleChange}
//               className="w-full mt-1 border rounded px-3 py-2"
//             />
//             {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
//           </div>

//           {/* Repo URL */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">GitHub Repo URL</label>
//             <input
//               name="repoUrl"
//               value={form.repoUrl}
//               onChange={handleChange}
//               className="w-full mt-1 border rounded px-3 py-2"
//             />
//             {errors.repoUrl && <p className="text-red-500 text-sm">{errors.repoUrl}</p>}
//           </div>

//           {/* Submit */}
//            <button
//   type="submit"
//   className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md transition"
// >
//   Publish Project
// </button>
//         </form>
//       </div>
//     </div>
//     <Footer />
//         </>
//   );
// };

// export default PublishProjectPage;





// src/pages/PublishProject.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";

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
      const res = await axios.post("http://localhost:8080/project", project, {
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
