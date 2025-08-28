import React from "react";
import { Link } from "react-router-dom";
import LikeButton from "./LikeButton";

const ProjectCard = ({ project }) => {
  return (
    <div className="relative bg-white p-5 rounded-xl shadow-md border border-indigo-100
                    hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-500 hover:to-pink-500
                    transition-all duration-300">
      
      {/* Top-right like button */}
      <div className="absolute top-2 right-2">
        <LikeButton entityId={project.id}
    entityType="project"
    initialCount={project.likesCount || 0} clickable={false} />
      </div>

      <Link to={`/project/${project.id}`} className="no-underline hover:no-underline block">
        <span className="text-gray-500 font-semibold">Title:</span>
        <h3 className="text-xl font-bold text-black-700 mb-2 truncate">
          {project.title}
        </h3>
        <span className="text-gray-500 font-semibold">Description:</span>
        <p className="text-sm text-gray-800 line-clamp-3 mb-3">
          {project.description}
        </p>
      </Link>
    </div>
  );
};

export default ProjectCard;
