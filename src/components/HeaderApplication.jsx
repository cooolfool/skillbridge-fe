import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchProfile from "../hooks/useFetchProfile";

const HeaderApplication = () => {
  const { user } = useFetchProfile();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 shadow-md border-b border-purple-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo + Brand */}
          <Link to="/feed" className="nav-link">
            <span className="text-2xl md:text-3xl font-medium text-yellow-400 tracking-tight">
              SkillBridge
            </span>
          </Link>

          {/* Navigation */}
          <nav className="space-x-6 text-sm md:text-base font-medium hidden sm:flex items-center">
            <Link to="/home" className="nav-link">
              {user ? user.name : "Profile"}
            </Link>
            <Link to="/feed" className="nav-link">
              Feed
            </Link>
            {/* Logout button */}
            <button
              onClick={handleLogout}
               className="nav-link"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderApplication;
