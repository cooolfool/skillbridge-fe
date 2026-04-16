import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

const [errors, setErrors] = useState({});
const [generalError, setGeneralError] = useState("");
const [isLoading, setIsLoading] = useState(false);

const handleChange = (e) => {
const { name, value } = e.target;

setFormData((prev) => ({ ...prev, [name]: value }));

setErrors((prev) => {
  if (!prev || !prev[name]) return prev;
  const copy = { ...prev };
  delete copy[name];
  return copy;
});

if (generalError) setGeneralError("");


};

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

if (formData.password !== formData.confirmPassword) {
  setErrors({ confirmPassword: "Passwords do not match." });
  setIsLoading(false);
  return;
}

try {
  const response = await api.post("/api/auth/register", formData);

  if (response.status === 201 || response.status === 200) {
    localStorage.setItem("token", response.data.token);
    navigate("/home");
  }

} catch (err) {
  const resp = err.response?.data;

  if (resp && resp.details && typeof resp.details === "object") {
    const fieldErrs = {};
    let general = "";

    Object.entries(resp.details).forEach(([k, v]) => {
      if (knownFields.includes(k)) fieldErrs[k] = String(v);
      else general = String(v);
    });

    if (Object.keys(fieldErrs).length) setErrors(fieldErrs);
    if (general) setGeneralError(general);

  } else if (
    resp &&
    typeof resp === "object" &&
    Object.keys(resp).length > 0 &&
    !resp.message
  ) {
    const fieldErrs = {};
    let general = "";

    Object.entries(resp).forEach(([k, v]) => {
      if (knownFields.includes(k)) fieldErrs[k] = String(v);
      else general = String(v);
    });

    if (Object.keys(fieldErrs).length) setErrors(fieldErrs);
    if (general) setGeneralError(general);

  } else {
    setGeneralError(
      resp?.message || "Registration failed. Please try again."
    );
  }

} finally {
  setIsLoading(false);
}


};

return (
<> <Header /> <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-6"> <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-indigo-100">


      <h2 className="text-2xl font-extrabold mb-6 text-center tracking-wide drop-shadow-md">
        Create Your Account on{" "}
        <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
          SkillBridge
        </span>
      </h2>

      {(generalError || errors.general) && (
        <p className="text-red-600 text-sm mb-4">
          {generalError || errors.general}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>

        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClass("name")} required />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={inputClass("email")} required />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className={inputClass("password")} required />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className={inputClass("confirmPassword")} required />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

        <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className={inputClass("bio")} />

        <input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" className={inputClass("skills")} />

        <input name="gitHub" value={formData.gitHub} onChange={handleChange} placeholder="GitHub" className={inputClass("gitHub")} />

        <input name="linkedIn" value={formData.linkedIn} onChange={handleChange} placeholder="LinkedIn" className={inputClass("linkedIn")} />

        <select name="role" value={formData.role} onChange={handleChange} className={inputClass("role")}>
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
          className="btn btn-primary w-full disabled:opacity-50"
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
