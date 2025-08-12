import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
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
    role: "SDE(FULLSTACK)"
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
      <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-indigo-100">
          <h2 className="text-2xl font-extrabold mb-6 text-center tracking-wide drop-shadow-md">
            Create Your Account on{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </h2>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              onChange={handleChange}
              value={formData.name}
              placeholder="Full Name"
              disabled={isLoading}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
              disabled={isLoading}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              placeholder="Password"
              disabled={isLoading}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
            />
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              disabled={isLoading}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
            />
            <textarea
              name="bio"
              onChange={handleChange}
              value={formData.bio}
              placeholder="Bio"
              rows="2"
              disabled={isLoading}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50 resize-none"
            />
            <input
              name="skills"
              onChange={handleChange}
              value={formData.skills}
              placeholder="Skills (comma-separated)"
              disabled={isLoading}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
            />
            <input
              name="github"
              onChange={handleChange}
              value={formData.github}
              placeholder="GitHub Profile (optional)"
              disabled={isLoading}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
            />
            <input
              name="linkedin"
              onChange={handleChange}
              value={formData.linkedin}
              placeholder="LinkedIn Profile (optional)"
              disabled={isLoading}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
            />
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              disabled={isLoading}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
            >
              <option value="SDE(BE)">SDE(BE)</option>
              <option value="SDE(FE)">SDE(FE)</option>
              <option value="SDE(FULLSTACK)">SDE(FULLSTACK)</option>
              <option value="SOFTWARE ENGINEER">SOFTWARE ENGINEER</option>
              <option value="ARCHITECT">ARCHITECT</option>
              <option value="DEVOPS">DEVOPS</option>
              <option value="RECRUITER">RECRUITER</option>
              <option value="OTHERS">OTHERS</option>
            </select>

            <button
              type="submit"
              disabled={isLoading}
className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"            >
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="text-indigo-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
