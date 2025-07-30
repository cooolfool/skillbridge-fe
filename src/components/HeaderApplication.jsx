import React from "react";
import { Link } from "react-router-dom";

const HeaderApplication = () => {
  return (
    <header className="bg-black shadow-md border-b border-purple-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <img
              src="/skillbridge-high-resolution-logo.png"
              alt="SkillBridge Logo"
              className="h-10 w-10 object-contain"
            /> */}
            <span className="text-2xl md:text-3xl font-medium text-[#efff14de] tracking-tight">
              SkillBridge
            </span>
          </Link>

          {/* Navigation */}
          <nav className="space-x-6 text-sm md:text-base font-medium hidden sm:flex">
            <Link
              to="/home"
              className="text-[#efff14de] hover:text-indigo-600 transition duration-200"
            >
              Profile
            </Link>
            <Link
  to="/feed"
  className="text-[#efff14de] hover:text-indigo-600 transition duration-200"
>
  Feed
</Link>

          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderApplication;
