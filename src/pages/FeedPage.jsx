
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
import useFetchProfile from "../hooks/useFetchProfile";
import ProjectCard from "../components/ProjectCard";
import useFetchPostsForFeed from "../hooks/useFetchPostsForFeed";

const FeedPage = () => {
  const { posts, loading } = useFetchPostsForFeed();
  const navigate = useNavigate();
  const { user } = useFetchProfile();

  if (loading) {
    return (
      <div className="text-center mt-16 text-indigo-600 text-lg font-medium animate-pulse">
        Loading feed...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
        <div className="max-w-6xl mx-auto">
          {user && (
            <h2 className="text-3xl font-semibold text-black-800 mb-6">
              Hi {user.name}, Explore Projects
            </h2>
          )}

          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate("/publish-project")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
            >
              + Post a Project
            </button>
          </div>

          {posts.length === 0 ? (
            <div className="text-center text-gray-600 text-md mt-20">
              No projects found. Be the first to post!
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeedPage;
