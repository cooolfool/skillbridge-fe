import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetchProfile from "../hooks/useFetchProfile";
import axios from "axios";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const EditProfilePage = () => {
  const { user } = useFetchProfile();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    skills: "",
    gitHub: "",
    linkedIn: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        bio: user.bio || "",
        skills: user.skills || "",
        gitHub: user.gitHub || "",
        linkedIn: user.linkedIn || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);
  try {

    const requestBody = {
      id: user.id, 
      name: formData.name,
      email: formData.email,
      role: formData.role,
      bio: formData.bio,
      skills: formData.skills,
      gitHub: formData.gitHub,    
      linkedIn: formData.linkedIn  
    };

    await axios.post(`${baseUrl}/user`, requestBody, {
      headers: {
          authToken: localStorage.getItem("token"),
           Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    });

    alert("Profile updated successfully.");
    navigate("/home");

  } catch (err) {
    console.error("Failed to update profile", err);
    alert("Update failed. Try again.");
  } finally {
    setSaving(false);
  }
};


  if (!user) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
     <>
      <Header />
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-indigo-100">
      <h2 className="text-2xl font-bold text-black-700 mb-6 text-center">
        Edit Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "role", "bio", "skills", "gitHub", "linkedIn"].map(
          (field) => (
            <div key={field}>
              <label className="block font-medium text-gray-700 capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                readOnly={field === "email"}
                className={`mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                  field === "email"
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "focus:ring-indigo-500"
                }`}
                 required={field !== "name" && field !== "skills" && field !== "bio" && field !== "role"}
              />
            </div>
          )
        )}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
     <Footer />
    </>
  );
};

export default EditProfilePage;
