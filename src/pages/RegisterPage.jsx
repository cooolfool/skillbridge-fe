
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header"; 
import Footer from "../components/Footer";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    role: "SDE(FULLSTACK)" // Default role, 
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, formData);
      if (response.status === 201 || response.status === 200) {
        // console.log("User registered:", response.data);
      // Optionally save token and navigate
       localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
     <>
      <Header />
<div className="min-h-screen bg-gray-100 flex items-center justify-center px-2 py-2 overflow-auto">
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-4">
    <h2 className="text-2xl font-bold mb-6 text-center text-black-600">Create Your Account</h2>     
     <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg border border-purple-100"
      >
      {/*   <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Create Your Account</h2>*/}

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="grid grid-cols-1 gap-2">
          <input name="name" onChange={handleChange} value={formData.fullName} placeholder="Full Name" className="input" />
          <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Email" className="input" />
          <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" className="input" />
          <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm Password" className="input" />
          <textarea name="bio" onChange={handleChange} value={formData.bio} placeholder="Bio" rows="2" className="input" />
          <input name="skills" onChange={handleChange} value={formData.skills} placeholder="Skills (comma-separated)" className="input" />
          <input name="github" onChange={handleChange} value={formData.github} placeholder="GitHub Profile (optional)" className="input" />
          <input name="linkedin" onChange={handleChange} value={formData.linkedin} placeholder="LinkedIn Profile (optional)" className="input" />

          <select name="role" onChange={handleChange} value={formData.role} className="input">
            <option value="SDE(BE)">SDE(BE)</option>
            <option value="SDE(FE)">SDE(FE)</option>
            <option value="SDE(FULLSTACK)">SDE(FULLSTACK)</option>
            <option value="ARCHITECT">ARCHITECT</option>
            <option value="DEVOPS">DEVOPS</option>
            <option value="RECRUITER">RECRUITER</option>
          </select>

          <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
            Register
          </button>
        </div>
         <div className="text-center mt-4">
  <Link to="/" className="text-blue-600 hover:underline">
    ← Back to Home
  </Link>
</div>
      </form>
     
    </div>
     </div>
     <Footer />
     </>
  );
  
}

export default Register;

