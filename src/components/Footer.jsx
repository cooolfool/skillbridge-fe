import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 bg-gradient-to-br from-white to-purple-50 p-6 text-sm text-gray-700 border-t border-purple-100">
      
      <section id="why" className="mb-10">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-2">🌟 Why SkillBridge?</h2>
        <p>
          SkillBridge connects developers who want to grow by helping each other through
          <span className="font-medium text-purple-700"> skill-sharing</span>,
          <span className="font-medium text-purple-700"> mentorship</span>, and
          <span className="font-medium text-purple-700"> real-world collaboration</span>.
        </p>
      </section>

      <section id="how" className="mb-10">
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">⚙️ How it works</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><span className="font-semibold text-indigo-600">Create your skill profile</span> and show what you know</li>
          <li><span className="font-semibold text-indigo-600">Share and discover projects</span> with other devs</li>
          <li><span className="font-semibold text-indigo-600">Request or offer mentorship</span> based on your interests</li>
        </ul>
      </section>


     

      <div className="text-center mt-10 text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} <span className="text-[#efff14de] font-semibold">SkillBridge</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
