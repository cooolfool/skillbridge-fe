// src/components/ProjectCard.jsx
import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-indigo-100 hover:shadow-lg transition-all duration-300">
      <h3 className="text-xl font-bold text-indigo-700 mb-2 truncate">
        {project.title}
      </h3>
      <p className="text-sm text-gray-800 line-clamp-3 mb-3">
        {project.description}
      </p>
      <div className="text-xs text-indigo-500 font-medium mb-2">
        {project.tags}
      </div>
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block text-sm text-blue-600 hover:underline"
      >
        View Repository →
      </a>
    </div>
  );
};

export default ProjectCard;
