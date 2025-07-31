// // src/components/ProjectCard.jsx
// import React from "react";

// const ProjectCard = ({ project }) => {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-md border border-indigo-100 hover:shadow-lg transition-all duration-300">
//       <span className="text-gray-500 font-semibold">Title:</span>
//       <h3 className="text-xl font-bold text-indigo-700 mb-2 truncate">
//           {project.title}
//       </h3>
//       <span className="text-gray-500 font-semibold">Description:</span>
//       <p className="text-sm text-gray-800 line-clamp-3 mb-3">
//         {project.description}
//       </p>
//       {/* <div className="text-xs text-indigo-500 font-medium mb-2">
//         {project.tags}
//       </div>
//       <a
//         href={project.repoUrl}
//         target="_blank"
//         rel="noreferrer"
//         className="inline-block text-sm text-blue-600 hover:underline"
//       >
//         View Repository →
//       </a> */}
//     </div>
//   );
// };

// export default ProjectCard;



// src/components/ProjectCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/project/${project.id}`}>
      <div className="bg-white p-5 rounded-xl shadow-md border border-indigo-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
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

