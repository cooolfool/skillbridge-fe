import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
  <header className="bg-gradient-to-r from-purple-900 to-indigo-900 shadow-md border-b border-purple-500 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center py-4">
      <Link to="/" className="nav-link">
        <span className="text-2xl md:text-3xl font-medium text-yellow-400 tracking-tight">
          SkillBridge
        </span>
      </Link>
     <nav className="space-x-6 text-sm md:text-base font-medium hidden sm:flex">
  <a href="#why" className="nav-link">Why</a>
  <a href="#how" className="nav-link">How</a>
</nav>
    </div>
  </div>
</header>


  );
};

export default Header;
