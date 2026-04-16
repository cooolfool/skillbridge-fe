import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
import useFetchProfile from "../hooks/useFetchProfile";
import useFetchPostsForFeed from "../hooks/useFetchPostsForFeed";
import ProjectCard from "../components/ProjectCard";
import { useLocation } from "react-router-dom";

const FeedPage = () => {
   const location = useLocation();
const prefetchedFeed = location.state?.prefetchedFeed;

 const { posts, loading, error } = useFetchPostsForFeed(prefetchedFeed);
  const navigate = useNavigate();
  const { user, loading: profileLoading, error: profileError } = useFetchProfile();
 
 if ((loading && !prefetchedFeed) || profileLoading) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
  <div className="h-6 bg-gray-300 rounded w-1/3"></div>

  <div className="border rounded p-4 space-y-3">
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-32 bg-gray-300 rounded"></div>
  </div>

  <div className="border rounded p-4 space-y-3">
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-32 bg-gray-300 rounded"></div>
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
