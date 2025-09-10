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
    gitHub: "",
    linkedIn: "",
    role: "SDE(FULLSTACK)",
  });

  // errors: field -> message
  const [errors, setErrors] = useState({});
  // general top-level error (non-field)
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Clear a single field error when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // remove field-specific error if present
    setErrors((prev) => {
      if (!prev || !prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });

    // clear general error as user types
    if (generalError) setGeneralError("");
  };

  // helper for input classes
  const inputClass = (field) =>
    `w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 disabled:opacity-50 ${
      errors[field]
        ? "border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:ring-indigo-200"
    }`;

  const knownFields = [
    "name",
    "email",
    "password",
    "confirmPassword",
    "bio",
    "skills",
    "gitHub",
    "linkedIn",
    "role",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    setGeneralError("");

    // client checks first
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
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
      const resp = err.response?.data;
      // case 1: backend returned ErrorResponse { message, details: { field: msg } }
      if (resp && resp.details && typeof resp.details === "object") {
        // map details into known fields and general
        const fieldErrs = {};
        let general = "";
        Object.entries(resp.details).forEach(([k, v]) => {
          if (knownFields.includes(k)) fieldErrs[k] = String(v);
          else general = String(v);
        });
        if (Object.keys(fieldErrs).length) setErrors(fieldErrs);
        if (general) setGeneralError(general);
      }
      // case 2: backend returned a direct map like { field: message, ... }
      else if (resp && typeof resp === "object" && Object.keys(resp).length > 0 && !resp.message) {
        const fieldErrs = {};
        let general = "";
        Object.entries(resp).forEach(([k, v]) => {
          if (knownFields.includes(k)) fieldErrs[k] = String(v);
          else general = String(v);
        });
        if (Object.keys(fieldErrs).length) setErrors(fieldErrs);
        if (general) setGeneralError(general);
      }
      // case 3: backend returned { message: "..." } or unknown shape
      else {
        setGeneralError(resp?.message || "Registration failed. Please try again.");
      }
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

          {/* general error */}
          {(generalError || errors.general) && (
            <p className="text-red-600 text-sm mb-4">
              {generalError || errors.general}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <input
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Full Name"
                disabled={isLoading}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass("name")}
              />
              {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
                disabled={isLoading}
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass("email")}
              />
              {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Password"
                disabled={isLoading}
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={inputClass("password")}
              />
              {errors.password && <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                disabled={isLoading}
                required
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                className={inputClass("confirmPassword")}
              />
              {errors.confirmPassword && <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <textarea
                name="bio"
                onChange={handleChange}
                value={formData.bio}
                placeholder="Bio"
                rows="2"
                disabled={isLoading}
                aria-invalid={!!errors.bio}
                aria-describedby={errors.bio ? "bio-error" : undefined}
                className={inputClass("bio") + " resize-none"}
              />
              {errors.bio && <p id="bio-error" className="text-red-500 text-sm mt-1">{errors.bio}</p>}
            </div>

            <div>
              <input
                name="skills"
                onChange={handleChange}
                value={formData.skills}
                placeholder="Skills (comma-separated)"
                disabled={isLoading}
                aria-invalid={!!errors.skills}
                aria-describedby={errors.skills ? "skills-error" : undefined}
                className={inputClass("skills")}
              />
              {errors.skills && <p id="skills-error" className="text-red-500 text-sm mt-1">{errors.skills}</p>}
            </div>

            <div>
              <input
                name="gitHub"
                onChange={handleChange}
                value={formData.gitHub}
                placeholder="GitHub Profile (optional)"
                disabled={isLoading}
                aria-invalid={!!errors.gitHub}
                aria-describedby={errors.gitHub ? "gitHub-error" : undefined}
                className={inputClass("gitHub")}
              />
              {errors.gitHub && <p id="gitHub-error" className="text-red-500 text-sm mt-1">{errors.gitHub}</p>}
            </div>

            <div>
              <input
                name="linkedIn"
                onChange={handleChange}
                value={formData.linkedIn}
                placeholder="LinkedIn Profile (optional)"
                disabled={isLoading}
                aria-invalid={!!errors.linkedIn}
                aria-describedby={errors.linkedIn ? "linkedIn-error" : undefined}
                className={inputClass("linkedIn")}
              />
              {errors.linkedIn && <p id="linkedIn-error" className="text-red-500 text-sm mt-1">{errors.linkedIn}</p>}
            </div>

            <div>
              <select
                name="role"
                onChange={handleChange}
                value={formData.role}
                disabled={isLoading}
                aria-invalid={!!errors.role}
                aria-describedby={errors.role ? "role-error" : undefined}
                className={inputClass("role")}
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
              {errors.role && <p id="role-error" className="text-red-500 text-sm mt-1">{errors.role}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
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
