import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";
import ProjectCard from "../components/ProjectCard";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const PublicProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseUrl}/api/user/${id}`, {
          headers: {
            authToken: token,
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100">
        <div className="max-w-xl mx-auto my-2 bg-white rounded-xl shadow-md border border-indigo-200 p-6">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 border-solid"></div>
            </div>
          ) : error || !profile ? (
            <div className="text-center text-red-600 text-lg">
              Profile not found.
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-black-700">
                  {profile.name || "Unnamed User"}
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
                <div>
                  <span className="text-gray-500 font-semibold">Email:</span>
                  <p>{profile.email}</p>
                </div>

                <div>
                  <span className="text-gray-500 font-semibold">Role:</span>
                  <p>{profile.role}</p>
                </div>

                <div>
                  <span className="text-gray-500 font-semibold">GitHub:</span>
                  {profile.gitHub ? (
                    <a
                      href={profile.gitHub}
                      className="text-blue-600 hover:underline ml-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  ) : (
                    <span className="ml-1 text-gray-400">Not Provided</span>
                  )}
                </div>

                <div>
                  <span className="text-gray-500 font-semibold">LinkedIn:</span>
                  {profile.linkedIn ? (
                    <a
                      href={profile.linkedIn}
                      className="text-blue-600 hover:underline ml-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  ) : (
                    <span className="ml-1 text-gray-400">Not Provided</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <span className="text-gray-500 font-semibold">Bio:</span>
                  <p>{profile.bio || "—"}</p>
                </div>

                <div className="sm:col-span-2">
                  <span className="text-gray-500 font-semibold">Skills:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.skills?.split(",").map((skill, idx) => (
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
            </>
          )}
        </div>

        {!loading && !error && profile?.projects?.length > 0 && (
          <div className="flex align-items-center justify-center mt-8">
            <div>
              <div className="text-center text-md mt-3 text-gray-500 font-semibold">
                Projects by {profile.name}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                {profile.projects.map((project, index) => (
                  <div key={index} className="w-[320px]">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PublicProfilePage;
