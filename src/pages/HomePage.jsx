import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Session expired. Please login again.");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <div className="text-center mt-10 text-indigo-600 text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md border border-indigo-200 p-6">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-indigo-700">Welcome, {user.name}!</h1>
        
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <span className="text-gray-500 font-semibold">Email:</span>
            <p>{user.email}</p>
          </div>

          <div>
            <span className="text-gray-500 font-semibold">Role:</span>
            <p className="text-indigo-700">{user.role}</p>
          </div>

          {user.bio && (
            <div className="sm:col-span-2">
              <span className="text-gray-500 font-semibold">Bio:</span>
              <p>{user.bio}</p>
            </div>
          )}

          {user.skills && (
            <div className="sm:col-span-2">
              <span className="text-gray-500 font-semibold">Skills:</span>
              <p>{user.skills}</p>
            </div>
          )}

          {user.gitHub && (
            <div>
              <span className="text-gray-500 font-semibold">GitHub:</span>
              <a
                href={user.gitHub}
                className="text-blue-600 hover:underline break-all"
                target="_blank"
                rel="noreferrer"
              >
                {user.gitHub}
              </a>
            </div>
          )}

          {user.linkedIn && (
            <div>
              <span className="text-gray-500 font-semibold">LinkedIn:</span>
              <a
                href={user.linkedIn}
                className="text-blue-600 hover:underline break-all"
                target="_blank"
                rel="noreferrer"
              >
                {user.linkedIn}
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
