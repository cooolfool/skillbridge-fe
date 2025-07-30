import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/HomePage";
import PublishProjectPage from "./pages/PublishProjectPage";
import FeedPage from "./pages/FeedPage";

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


      </Routes>
    </Router>
  );
}

export default App;
