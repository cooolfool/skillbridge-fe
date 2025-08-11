import React from "react";
import useFetchProfile from "../hooks/useFetchProfile";
import Header from "../components/HeaderApplication";
import Footer from "../components/FooterApplication";

const ProfilePage = () => {
  const { profile, loading, error } = useFetchProfile();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile.</div>;

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Name</h2>
            <p>{profile.fullName}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Email</h2>
            <p>{profile.email}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Bio</h2>
            <p>{profile.bio || "No bio provided."}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Skills</h2>
            <ul className="list-disc list-inside">
              {profile.skills?.length > 0 ? (
                profile.skills.map((skill, index) => <li key={index}>{skill}</li>)
              ) : (
                <li>No skills added.</li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Your Projects</h2>
            {profile.projects?.length > 0 ? (
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
