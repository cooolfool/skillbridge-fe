import React from "react";
import useFetchProfile from "../hooks/useFetchProfile";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";

const ProfilePage = () => {
  const { profile, loading, error } = useFetchProfile();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 border-solid"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 p-10">
        Error loading profile. Please try again.
      </div>
    );

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6 mt-8 mb-8 bg-white rounded-xl shadow-md border border-indigo-100">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

        <div className="space-y-6 text-gray-800">
          <div>
            <h2 className="text-xl font-semibold mb-1">Name</h2>
            <p>{profile.fullName || "—"}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Email</h2>
            <p>{profile.email || "—"}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Bio</h2>
            <p>{profile.bio || "No bio provided."}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Skills</h2>
            {profile.skills && profile.skills.length > 0 ? (
              <ul className="list-disc list-inside">
                {profile.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills added.</p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Your Projects</h2>
            {profile.projects && profile.projects.length > 0 ? (
              <ul className="list-disc list-inside">
                {profile.projects.map((project, index) => (
                  <li key={index}>{project.name}</li>
                ))}
              </ul>
            ) : (
              <p>No projects yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
