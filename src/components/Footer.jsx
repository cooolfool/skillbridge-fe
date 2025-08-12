// Footer.jsx - detailed footer with Why & How sections

import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <section id="why" className="mb-10">
        <h2 className="footer-title">🌟 Why SkillBridge?</h2>
        <p>
          SkillBridge connects developers who want to grow by helping each other through{" "}
          <span className="footer-highlight">skill-sharing</span>,{" "}
          <span className="footer-highlight">mentorship</span>, and{" "}
          <span className="footer-highlight">real-world collaboration</span>.
        </p>
      </section>

      <section id="how" className="mb-10">
        <h2 className="footer-title">⚙️ How it works</h2>
        <ul className="list-disc list-inside space-y-2">
          <li className="footer-list-item">Create your skill profile and show what you know</li>
          <li className="footer-list-item">Share and discover projects with other devs</li>
          <li className="footer-list-item">Request or offer mentorship based on your interests</li>
        </ul>
      </section>

      <div className="footer-copy">
        &copy; {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">SkillBridge</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
