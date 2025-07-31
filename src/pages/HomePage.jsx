
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
import useFetchProfile from "../hooks/useFetchProfile";
import useFetchPostByUser from "../hooks/useFetchPostByUser";
import ProjectCard from "../components/ProjectCard";
import EditProfilePage from "./EditProfilePage";

const HomePage = () => {
  const navigate = useNavigate();
  const { posts, loading } = useFetchPostByUser();
  {
    // console.log("Fetched posts:", posts.length);
  }
  const { user } = useFetchProfile();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 border-solid"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100">
        <div className="max-w-xl mx-auto my-2 bg-white rounded-xl shadow-md border border-indigo-200 p-6 ">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-black-700">
              Welcome, {user.name}!
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
            <div>
              <span className="text-gray-500 font-semibold">Email:</span>
              <p>{user.email}</p>
            </div>

            <div>
              <span className="text-gray-500 font-semibold">Role:</span>
              <p>{user.role}</p>
            </div>

            <div>
             
              {user.gitHub ? (
                <a
                  href={user.gitHub}
                  className="text-blue-600 hover:underline ml-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              ) : (
                <>
                  <span className="text-gray-500 font-semibold">GitHub:</span>
                  <span className="ml-1 text-gray-400">Not Provided</span>
                </>
              )}
            </div>
            <div>
              {user.linkedIn ? (
                <a
                  href={user.linkedIn}
                  className="text-blue-600 hover:underline ml-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              ) : (
                <>
                  <span className="text-gray-500 font-semibold">LinkedIn:</span>
                  <span className="ml-1 text-gray-400">Not Provided</span>
                </>
              )}
            </div>

            <div>
              <span className="text-gray-500 font-semibold">Bio:</span>
              <p>{user.bio || "—"}</p>
            </div>

            <div>
              <span className="text-gray-500 font-semibold">Skills:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.skills?.split(",").map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 text-black-800 px-2 py-1 rounded-full text-xs font-semibold"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-center sm:justify-between gap-4">
            <button
              onClick={() => navigate("/edit-profile")}
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-10 rounded-lg"
            >
              Edit Profile
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-8 rounded-lg space-x-8"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex align-items-center justify-center mt-8">
          {posts.length === 0 ? (
            <div className="text-center text-gray-600 text-md mt-20">
              Post your first project!
            </div>
          ) : (
            <div>
              <div className="text-center text-md mt-3 text-gray-500 font-semibold">
                Browse your projects!
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((project, index) => (
                  <div key={index} className="w-[320px]">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
