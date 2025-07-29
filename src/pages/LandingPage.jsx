import React from "react";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 text-gray-800">
      {/* --- same code you have in App.jsx --- */}
      {/* Navbar */}
            <nav className="bg-white shadow-md p-4 px-6 flex justify-between items-center sticky top-0 z-50 border-b border-purple-200">
              <h1 className="text-4xl font-bold text-indigo-700">SkillBridge</h1>
              <div className="space-x-6 text-sm">
                <a href="#why" className="text-gray-700 hover:text-indigo-600 transition">Why</a>
                <a href="#how" className="text-gray-700 hover:text-indigo-600 transition">How</a>
                <a href="#get-started" className="text-gray-700 hover:text-indigo-600 transition">Get Started</a>
              </div>
            </nav>
      
            <main className="p-6">
              
              {/* SVG Illustration */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
                className="flex justify-center mb-10"
              >
                <img 
                  src="/undraw_engineering-team_13ax.svg" 
                  alt="Developers working together" 
                   className="w-[200px] h-[120px] md:w-[300px] md:h-[200px] rounded-xl shadow-md border border-gray-200"
                />
              </motion.div>
              {/* Hero Section */}
              <motion.header 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg p-6 rounded-3xl mb-8 border border-purple-200 text-center"
              >
                {/*  <h1 className="text-4xl font-extrabold text-indigo-700 mb-2">SkillBridge</h1> */}
                <p className="text-md text-gray-600 max-w-xl mx-auto">
                  A platform for developers to learn, share, and grow together.
                </p>
                <div className="mt-6">
                  <a
                    href="/login"
                    className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition"
                  >
                    Get Started
                  </a>
                </div>
              </motion.header>
      
      
              <motion.section
                id="why"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-3xl shadow-lg border border-purple-100 mb-6"
              >
                <h2 className="text-2xl font-semibold text-indigo-700 mb-3">🌟 Why SkillBridge?</h2>
                <p className="text-gray-700 leading-relaxed">
                  SkillBridge connects developers who want to grow by helping each other through
                  <span className="font-medium text-purple-700"> skill-sharing</span>,
                  <span className="font-medium text-purple-700"> mentorship</span>, and
                  <span className="font-medium text-purple-700"> real-world collaboration</span>.
                </p>
              </motion.section>
      
              <motion.section
                id="how"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-3xl shadow-lg border border-indigo-100"
              >
                <h2 className="text-2xl font-semibold text-purple-700 mb-3">⚙️ How it works</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <span className="font-semibold text-indigo-600">Create your skill profile</span> and show what you know
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-600">Share and discover projects</span> with other devs
                  </li>
                  <li>
                    <span className="font-semibold text-indigo-600">Request or offer mentorship</span> based on your interests
                  </li>
                </ul>
              </motion.section>
            </main>
      
            <footer className="mt-12 text-center text-sm text-gray-500 py-4">
              &copy; {new Date().getFullYear()} <span className="text-indigo-600 font-semibold">SkillBridge</span>. All rights reserved.
            </footer>
    </div>
  );
}

export default LandingPage;
