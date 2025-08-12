import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header"; 
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen text-gray-800">
      {/* Common Header */}
      <Header />

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
          
          <p className="text-md text-gray-600 max-w-xl mx-auto">
            A platform for developers to learn, share, and grow together.
          </p>
          <div className="mt-6">
            <a href="/login" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </motion.header>

       
      </main>
 <Footer />
    
    </div>
    
  );
}

export default LandingPage;
