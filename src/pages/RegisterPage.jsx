
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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, formData);
      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
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
          <input 
            name="name" 
            onChange={handleChange} 
            value={formData.fullName} 
            placeholder="Full Name" 
            className="input" 
            disabled={isLoading}
            required
          />
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            value={formData.email} 
            placeholder="Email" 
            className="input" 
            disabled={isLoading}
            required
          />
          <input 
            type="password" 
            name="password" 
            onChange={handleChange} 
            value={formData.password} 
            placeholder="Password" 
            className="input" 
            disabled={isLoading}
            required
          />
          <input 
            type="password" 
            name="confirmPassword" 
            onChange={handleChange} 
            value={formData.confirmPassword} 
            placeholder="Confirm Password" 
            className="input" 
            disabled={isLoading}
            required
          />
          <textarea 
            name="bio" 
            onChange={handleChange} 
            value={formData.bio} 
            placeholder="Bio" 
            rows="2" 
            className="input" 
            disabled={isLoading}
          />
          <input 
            name="skills" 
            onChange={handleChange} 
            value={formData.skills} 
            placeholder="Skills (comma-separated)" 
            className="input" 
            disabled={isLoading}
          />
          <input 
            name="github" 
            onChange={handleChange} 
            value={formData.github} 
            placeholder="GitHub Profile (optional)" 
            className="input" 
            disabled={isLoading}
          />
          <input 
            name="linkedin" 
            onChange={handleChange} 
            value={formData.linkedin} 
            placeholder="LinkedIn Profile (optional)" 
            className="input" 
            disabled={isLoading}
          />

          <select 
            name="role" 
            onChange={handleChange} 
            value={formData.role} 
            className="input"
            disabled={isLoading}
          >
            <option value="SDE(BE)">SDE(BE)</option>
            <option value="SDE(FE)">SDE(FE)</option>
            <option value="SDE(FULLSTACK)">SDE(FULLSTACK)</option>
            <option value="ARCHITECT">ARCHITECT</option>
            <option value="DEVOPS">DEVOPS</option>
            <option value="RECRUITER">RECRUITER</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Register"}
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

