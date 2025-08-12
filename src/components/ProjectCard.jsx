import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`} className="no-underline hover:no-underline">
  <div className="bg-white p-5 rounded-xl shadow-md border border-indigo-100
                  hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-500 hover:to-pink-500
                  transition-all duration-300 cursor-pointer">
    <span className="text-gray-500 font-semibold">Title:</span>
    <h3 className="text-xl font-bold text-black-700 mb-2 truncate">
      {project.title}
    </h3>
    <span className="text-gray-500 font-semibold">Description:</span>
    <p className="text-sm text-gray-800 line-clamp-3 mb-3">
      {project.description}
    </p>
  </div>
</Link>

  );
};

export default ProjectCard;
