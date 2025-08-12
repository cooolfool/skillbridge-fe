import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
import useFetchProfile from "../hooks/useFetchProfile";
import useFetchPostsForFeed from "../hooks/useFetchPostsForFeed";
import ProjectCard from "../components/ProjectCard";

const FeedPage = () => {
  const { posts, loading, error } = useFetchPostsForFeed();
  const navigate = useNavigate();
  const { user, loading: profileLoading, error: profileError } = useFetchProfile();

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 border-solid mx-auto mb-4"></div>
          <p className="text-indigo-600 text-lg font-medium">Loading feed...</p>
        </div>
      </div>
    );
  }

  if (error || profileError) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || profileError}</p>
          <button 
            onClick={() => navigate("/login")}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-app-gradient p-6">
        <div className="max-w-6xl mx-auto">
          {user && (
            <h2 className="text-3xl font-semibold text-black mb-6">
              Hi {user.name}, Explore Projects
            </h2>
          )}

          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate("/publish-project")}
              className="btn btn-primary"
            >
               Post a Project
            </button>
          </div>

          {posts.length === 0 ? (
            <div className="text-center text-gray-600 text-md mt-20">
              No projects found. Be the first to post!
            </div>
          ) : (
           <div
  className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2"
  style={{ scrollbarWidth: "thin" }} // for Firefox thinner scrollbar
>
  {posts.map((project, index) => (
    <div key={index} className="w-full">
      <ProjectCard project={project} />
    </div>
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
