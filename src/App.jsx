import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import PublishProjectPage from "./pages/PublishProjectPage";
import FeedPage from "./pages/FeedPage";
import EditProfilePage from "./pages/EditProfilePage";
import ProjectDetails from "./pages/ProjectDetailsPage"; 
import EditProject from "./pages/EditProjectPage";
import PublicProfilePage from "./pages/PublicProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* These can be created next */}
       <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/publish-project" element={<PublishProjectPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
      <Route path="/edit-project/:id" element={<EditProject />} />
      <Route path="/profile/:id" element={<PublicProfilePage />} />

      </Routes>
    </Router>
  );
}

export default App;
